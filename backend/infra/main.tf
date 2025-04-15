terraform {
  backend "s3" {
    bucket = "discography-terraform-sf"
    region = "us-east-1"
  }
}

resource "aws_dynamodb_table" "tf_state_lock" {
  attribute {
    name = "LockID"
    type = "S"
  }
  billing_mode   = "PAY_PER_REQUEST"
  hash_key  = "LockID"
  name = "discography-terraform-sf"
  tags = {
    app = "terraform"
  }
}
resource "aws_dynamodb_table" "discography" {
  name           = "discography"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "title"  

  attribute {
    name = "title"
    type = "S"
  }
}

resource "aws_s3_bucket" "bey_discography" {
  bucket = "bey-discography-cnw"
}

resource "aws_s3_object" "folders" {
  for_each = toset(["albumcovers/", "music/", "carousel/"])

  bucket = aws_s3_bucket.bey_discography.id
  key    = "${each.value}"
}

resource "aws_s3_bucket_policy" "discography" {
  bucket = aws_s3_bucket.bey_discography.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
        {
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: "${aws_s3_bucket.bey_discography.arn}/*"
        }
    ]
  })
    depends_on = [
    aws_s3_bucket_public_access_block.discography_public    
  ]
}

resource "aws_s3_bucket_public_access_block" "discography_public" {
  bucket = aws_s3_bucket.bey_discography.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_cors_configuration" "discography_cors" {
  bucket = aws_s3_bucket.bey_discography.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    expose_headers  = []
    max_age_seconds = 3000
  }
}

resource "null_resource" "upload_data" {
  triggers = {
    script_hash = filemd5("../app/upload_data.py")
  }

  provisioner "local-exec" {
    command = "python3 ../app/upload_data.py"
  }

  depends_on = [
    aws_s3_bucket.bey_discography,
    aws_dynamodb_table.discography
  ]
}

resource "aws_iam_role" "s3_dynamodb_role" {
  name = "S3DynamoDBAccessRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "s3.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "s3_dynamodb_policy" {
  name        = "S3DynamoDBAccessPolicy"
  description = "Allows S3 to write/update items in DynamoDB"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ],
        Resource = "arn:aws:dynamodb:*:*:table/discography"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_s3_dynamodb_policy" {
  role       = aws_iam_role.s3_dynamodb_role.name
  policy_arn = aws_iam_policy.s3_dynamodb_policy.arn
}

# Create VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
}

# Create subnets 
resource "aws_subnet" "subnet_1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true  
}

resource "aws_subnet" "subnet_2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "us-east-1b"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "subnet_3" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.5.0/24"
  availability_zone = "us-east-1c"
  map_public_ip_on_launch = true
}

#create internet gateway
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}
#create route table and routes 
resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
  route {
    cidr_block = "10.0.0.0/16"
    gateway_id = "local"
  }

  depends_on = [
    aws_vpc.main
  ]
}

# associate subnets with the route table
resource "aws_route_table_association" "subnet_1_association" {
  subnet_id = aws_subnet.subnet_1.id
  route_table_id = aws_route_table.route_table.id
}

resource "aws_route_table_association" "subnet_2_association" {
  subnet_id = aws_subnet.subnet_2.id
  route_table_id = aws_route_table.route_table.id
}

resource "aws_route_table_association" "subnet_3_association" {
  subnet_id = aws_subnet.subnet_3.id
  route_table_id = aws_route_table.route_table.id
}

# create the eks cluster using terraform module
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = "discography-cluster"
  cluster_version = "1.28"

  cluster_addons = {    
    eks-pod-identity-agent = {
      most_recent = true
    }
  }

  cluster_endpoint_public_access = true

  vpc_id                   = aws_vpc.main.id
  subnet_ids               = [aws_subnet.subnet_1.id, aws_subnet.subnet_2.id, aws_subnet.subnet_3.id]
  control_plane_subnet_ids = [aws_subnet.subnet_1.id, aws_subnet.subnet_2.id, aws_subnet.subnet_3.id]

  eks_managed_node_groups = {
    green = {
      min_size       = 1
      max_size       = 2
      desired_size   = 1
      instance_types = ["t2.micro"]
    }     
  }
}

# Create service account 
resource "kubernetes_service_account" "eks_sa" {
  provider = kubernetes.eks

  metadata {
    name      = "eks-service-account"
    namespace = "default"    
  }

  depends_on = [null_resource.update_kubeconfig]
}

# Run kubeconfig update 
resource "null_resource" "update_kubeconfig" {
  provisioner "local-exec" {
    command = "aws eks update-kubeconfig --region us-east-1 --name ${module.eks.cluster_name}"
  }

  triggers = {
    cluster_name = module.eks.cluster_name
  }
}

#Creates an EKS Pod Identity association between a service account in an Amazon EKS cluster and an IAM role with EKS Pod Identity. 
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["pods.eks.amazonaws.com"]
    }

    actions = [
      "sts:AssumeRole",
      "sts:TagSession"
    ]
  }
}

resource "aws_iam_role" "backend" {
  name               = "eks-pod-identity-backend"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy_attachment" "disco_s3" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
  role       = aws_iam_role.backend.name
}

resource "aws_iam_role_policy_attachment" "disco_db" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBReadOnlyAccess"
  role       = aws_iam_role.backend.name
}

resource "aws_eks_pod_identity_association" "pod_backend" {
  cluster_name    = module.eks.cluster_name
  namespace       = "default"
  service_account = "eks-service-account"
  role_arn        = aws_iam_role.backend.arn

  depends_on = [module.eks.cluster_name]
}