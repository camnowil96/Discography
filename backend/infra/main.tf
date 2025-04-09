terraform {
  backend "s3" {
    bucket = "discography-terraform-sf"
    region = "us-east-1"
  }
}

resource "aws_s3_bucket" "remote_backend"{
  bucket = "discography-terraform-sf"
  
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "versioning" {
    bucket = "aws_s3_bucket.remote_backend.id"    
    versioning_configuration {
      status = "Enabled"
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
