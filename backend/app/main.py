## main.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 
from typing import List
import boto3
import os
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()

aws_access_key = os.getenv("aws_access_key_id") 
aws_secret_key = os.getenv("aws_secret_access_key")
region = os.getenv("AWS_REGION")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # double check this 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#connect to dynamodb
dynamodb = boto3.resource('dynamodb')
		       
#connect to s3
s3_client = boto3.client("s3")

table = dynamodb.Table('discography')
bucket_name = 'bey-discography-cnw'

class Albums(BaseModel):
	title: str
	releaseYear: int
	coverUrl: str

class EachAlbum(BaseModel):
	title: str
	releaseYear: int
	genre: List[str]
	tracklist: List[str]
	coverUrl: str
	audioSrc: str
	songTitle: str

def get_images_from_s3(prefix: str) -> List[str]:
    images = []
    try:
        response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
        if "Contents" in response:
            images = [f"https://{bucket_name}.s3.amazonaws.com/{obj['Key']}" for obj in response["Contents"]]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    
    return images

@app.get("/")
def read_root():
	return {"message": "FastAPI Yuh!"}

@app.get("/albums", response_model=List[Albums])
async def get_albums():
	try: 
		response = table.scan()
		items = response.get ('Items', [])

		albums = [Albums(**item) for item in items]

		return albums
	except Exception as e:
		return {"error": str(e)}


@app.get("/album/{title}", response_model=EachAlbum)
async def get_albumdetails(title: str):
	try: 
		response = table.get_item(Key={'title': title})
		
		if 'Item' in response:
			album = EachAlbum(**response['Item'])
			return album
		else:
			return {"error": "Album not found"}
	except Exception as e:
		return {"error": str(e)}

@app.get("/get_images", response_model=List[str])
async def get_images(prefix: str = Query(..., description="carousel")):
    return get_images_from_s3(prefix)
