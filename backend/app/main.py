## main.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 
from typing import List
from prometheus_fastapi_instrumentator import Instrumentator
import boto3

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://discography.cameronnwilson.com"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Instrumentator().instrument(app).expose(app)

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
    
    print(f"Returning images: {images}")  # Log what you're returning
    print(f"Type: {type(images)}")        # Confirm it's a list
    return images

@app.get("/api/test")
def test():
    return {"message": "API is reachable"}

@app.get("/api/albums", response_model=List[Albums])
async def get_albums():
	try:
		response = table.scan()

		if 'Items' in response:
			albums = [EachAlbum(**item) for item in response['Items']]
			sorted_albums = sorted(albums, key=lambda x: x.releaseYear)  # Sort by releaseYear
			return sorted_albums
		else:
			return []
	except Exception as e:
		return {"error": str(e)}


@app.get("/api/album/{title}", response_model=EachAlbum)
async def get_albumdetails(title: str):
    try:
        response = table.get_item(Key={'title': title})
        if 'Item' in response:
            item = response['Item']
            
            # If tracklist is a single string, split it into an array
            if item.get('tracklist') and len(item.get('tracklist')) == 1 and isinstance(item['tracklist'][0], str) and ',' in item['tracklist'][0]:
                item['tracklist'] = [track.strip() for track in item['tracklist'][0].split(',')]
            
            album = EachAlbum(**item)
            return album
        else:
            return {"error": "Album not found"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/get_images", response_model=List[str])
async def get_images(prefix: str = Query(..., description="carousel")):
    return get_images_from_s3(prefix)
