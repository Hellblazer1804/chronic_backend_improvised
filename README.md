# Chronic Backend - Allows to upload/download files

## Steps to start server:

Clone this repository, then run the following commands:

`cd chronic_backend_improvised`

`mkdir uploads`

`npm install` 

`npm start`

## API calls:

### To download files:

http://localhost:8081/api/file/download?filename="filename"

### To upload files(make sure the files to upload is in the uploads folder):

http://localhost:8081/api/file/upload?filname="filename"

### To delete files:

http://localhost:8081/api/file/delete?filename="filename"

### To get file metadata:

http://localhost:8081/api/file/meta?filename="filename"
