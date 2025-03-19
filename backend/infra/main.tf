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

resource "null_resource" "upload_data" {
  triggers = {
    script_hash = filemd5("/home/camnowil96/Documents/discography/backend/app/upload_data.py")
  }

  provisioner "local-exec" {
    command = "python3 /home/camnowil96/Documents/discography/backend/app/upload_data.py"
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