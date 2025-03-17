resource "aws_dynamodb_table" "discography" {
  name           = "discography"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "title"  

  attribute {
    name = "title"
    type = "S"
  }
}

locals {
  s3_folders = [
    "albumcovers",
    "music",
    "carousel",    
  ]
}

resource "aws_s3_object" "s3 bucket" {
  for_each = local.s3_folders

  bucket       = "bey-discography-cnw"
  key          = "${each.value}/"
  content_type = "application/x-directory"
}
