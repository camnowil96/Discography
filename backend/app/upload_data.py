import boto3
import os
import logging
import json
from botocore.exceptions import ClientError

# Function definitions
def upload_file(file_name, bucket, folder, object_name=None):
    """Upload a file to an S3 bucket."""
    if object_name is None:
        object_name = f"{folder}/{os.path.basename(file_name)}"
    try:
        s3_client = boto3.client("s3")
        s3_client.upload_file(file_name, bucket, object_name)
        logging.info(f"Uploaded {file_name} to {bucket}/{object_name}")
    except ClientError as e:
        logging.error(f"Error uploading {file_name} to S3: {e}")
        raise
    
# Function to upload an entire local folder to S3
def upload_folder(local_folder, bucket, s3_folder):
    """Uploads all files from a local folder to an S3 bucket under the given folder."""
    try:
        for file_name in os.listdir(local_folder):
            file_path = os.path.join(local_folder, file_name)
            if os.path.isfile(file_path):  # Ensure it's a file, not a subdirectory
                upload_file(file_path, bucket, s3_folder)
    except ClientError as e:
        logging.error(f"Error uploading folder '{local_folder}': {e}")
        raise

def upload_album_covers(local_folder, bucket, folder):
    """Upload all album cover images from a local folder to the S3 bucket."""
    try:
        for file_name in os.listdir(local_folder):
            file_path = os.path.join(local_folder, file_name)
            if os.path.isfile(file_path):
                upload_file(file_path, bucket, folder)
    except ClientError as e:
        logging.error(f"Error uploading album covers: {e}")
        raise

def add_album(table, title, releaseYear, genre, tracklist, songTitle, coverUrl, audioSrc=None):
    """Add an album to the DynamoDB table."""
    try:
        item = {
            "title": title,
            "releaseYear": releaseYear,
            "genre": genre,
            "tracklist": tracklist,
            "coverUrl": coverUrl,
            "songTitle": songTitle
        }
        
        # Add audioSrc to item if it's provided
        if audioSrc:
            item["audioSrc"] = audioSrc

        table.put_item(Item=item)
        logging.info(f"Added album '{title}' to table {table.name}")
    except ClientError as e:
        logging.error(f"Couldn't add album '{title}' to table {table.name}. Error: {e}")
        raise

def process_album_data(json_file, table, bucket, s3_folders):
    """
    Processes album data from a JSON file, uploads covers to S3, 
    and inserts metadata into DynamoDB.
    """
    with open(json_file, "r") as file:
        album_data = json.load(file)

    for album in album_data:
        title = album["title"]
        releaseYear = album["releaseYear"]
        genre = album["genre"]
        tracklist = album["tracklist"]
        songTitle = album["songTitle"]
        local_cover_path = album["cover_path"]
        local_music_path = album["music_path"]

        # Upload album cover to S3 (albumcovers folder)
        object_name_cover = f"{s3_folders[0]}/{os.path.basename(local_cover_path)}"
        upload_file(local_cover_path, bucket, s3_folders[0], object_name_cover)

        # Construct S3 URL for the cover
        coverUrl = f"https://{bucket}.s3.amazonaws.com/{object_name_cover}"

        # Insert album metadata into DynamoDB (for albumcovers)
        add_album(table, title, releaseYear, genre, tracklist, songTitle, coverUrl, None)

        # Upload music files to S3 (music folder)
        object_name_music = f"{s3_folders[1]}/{os.path.basename(local_music_path)}"
        upload_file(local_music_path, bucket, s3_folders[1], object_name_music)

        # Construct S3 URL for the music
        audioSrc = f"https://{bucket}.s3.amazonaws.com/{object_name_music}"

        # Insert music URL into DynamoDB (along with cover URL)
        add_album(table, title, releaseYear, genre, tracklist, songTitle, coverUrl, audioSrc)

# Main Script Execution
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)

    # Configuration
    dynamodb_client = boto3.resource("dynamodb")
    table = dynamodb_client.Table("discography")  
    bucket_name = "bey-discography-cnw"
    s3_folders = ["albumcovers", "music", "carousel"]  
    json_file = "/home/camnowil96/Documents/discography/src/albums.json"
    
    folder_mappings = {
        "albumcovers": "/home/camnowil96/Documents/discography/src/Album_Cover_Art", 
        "music": "/home/camnowil96/Documents/discography/src/AudioFiles",
        "carousel": "/home/camnowil96/Documents/discography/src/CarouselPics"  
    }

    # Process album data
    process_album_data(json_file, table, bucket_name, s3_folders)
    process_album_data(json_file, table, bucket_name, s3_folders)

    # Upload carousel photos
    upload_folder(folder_mappings["carousel"], bucket_name, "carousel")