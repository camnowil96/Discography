FROM python:3.13-alpine

#working directory within the image - creates backend folder if it doesn't exist
WORKDIR /app/

#copies everything from build context (local directory) into working directory
COPY /app/requirements.txt /app/requirements.txt

#installs requirements file
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

#copies local backend directory into backend directory
COPY . .

#exposes port 8000
EXPOSE 8000

#starts fastapi and exposes port 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]