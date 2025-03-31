FROM python:3.12-alpine

#working directory within the image - creates backend folder if it doesn't exist
WORKDIR /app/

#copies everything from build context (local directory) into working directory
COPY /app/requirements.txt /app/requirements.txt

#installs requirements file
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

#copies local backend directory into backend directory
COPY . .

#starts fastapi and exposes port 8000
CMD ["fastapi", "run", "app/main.py", "--port", "8000"]