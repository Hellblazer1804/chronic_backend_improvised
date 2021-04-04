# Chronic Backend - Allows to upload/download files

## Steps to start server:

First Clone repo

cd chronic_backend_improvised

Create a folder named uploads

npm install

npm start

## API calls:

### To download files:

http://localhost:4000/api/file/download?filename="filename"

### To upload files(make sure the files to upload is in the uploads folder):

http://localhost:4000/api/file/upload?filname="filename"

### To delete files:

http://localhost:4000/api/file/delete?filename="filename"

### To get file metadata:

http://localhost:4000/api/file/meta?filename="filename"
