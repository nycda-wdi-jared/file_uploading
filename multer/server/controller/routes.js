var express = require('express');
var path = require('path');
var multer = require('multer');
var fs = require('fs');

/*

	Multer Middleware
	This is creating the destination for where the uploaded file will get saved
	& setting a convention for the how the file is going be named in that directory

*/
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './app/client/public/uploaded_images');
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage});

var router = express.Router();

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../../app/client/public/index.html'));
});

/*
	
	Remember name='myFile' in the index.html, well here it is on the server side.
	Here's how the client --> server connection is made for the file

*/
router.post('/fileupload/:name', upload.single('myFile'), (req,res) => {
	res.json({result: "Image Uploaded"})
});

// look for this route in the ajax call. How is it being used in the app and what is it doing?
router.get('/images', function(req,res){
	var images = []
	fs.readdirSync(path.join(__dirname, '../../app/client/public/uploaded_images')).forEach((name) => {
		images.push(name)
	});
	res.json(images)
});

module.exports = router;