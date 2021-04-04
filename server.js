var express = require('express');
var mongoose = require('mongoose');
var gridfs = require('gridfs-stream');
var fs = require('fs');

var app = express();
var PORT = 4000

mongoose.Promise  = global.Promise;
const uri = 'mongodb+srv://jhu357:12345@chronicjic.y24nv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Chronic'
});

gridfs.mongo = mongoose.mongo;
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', () => {

    var gfs = gridfs(connection.db);

    app.get('/', (req, res) => {
        res.send('Download/Upload GridFS files to MongoDB');
    });
    app.get('/api/file/upload', (req, res) => {
		
		var filename = req.query.filename;
		
        var writestream = gfs.createWriteStream({ filename: filename });
        fs.createReadStream(__dirname + "/uploads/" + filename).pipe(writestream);
        writestream.on('close', (file) => {
            res.send('Stored File: ' + file.filename);
        });
    });
    app.get('/api/file/download', (req, res) => {
        // Check file exist on MongoDB
		
		var filename = req.query.filename;
		
        gfs.exist({ filename: filename }, (err, file) => {
            if (err || !file) {
                res.status(404).send('File Not Found');
				return
            } 
			
			var readstream = gfs.createReadStream({ filename: filename });
			readstream.pipe(res);            
        });
    });
    app.get('/api/file/delete', (req, res) => {
		
		var filename = req.query.filename;
		
		gfs.exist({ filename: filename }, (err, file) => {
			if (err || !file) {
				res.status(404).send('File Not Found');
				return;
			}
			
			gfs.remove({ filename: filename }, (err) => {
				if (err) res.status(500).send(err);
				res.send('File Deleted');
			});
		});
    });
    app.get('/api/file/meta', (req, res) => {
		
		var filename = req.query.filename;
		
		gfs.exist({ filename: filename }, (err, file) => {
			if (err || !file) {
				res.send('File Not Found');
				return;
			}
			
			gfs.files.find({ filename: filename }).toArray( (err, files) => {
				if (err) res.send(err);
				res.json(files);
			});
		});
	});
    var server = app.listen(PORT, () => {
		
        var host = server.address().address
        var port = server.address().port
       
        console.log("App listening at http://localhost:%s",port); 
      });
  
  });

