var express = require('express');
var path = require('path');
var multer = require('multer');
var fs = require('fs');

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

router.post('/fileupload/:name', upload.single('myFile'), (req,res) => {
	res.json({result: "Image Uploaded"})
});

router.get('/images', function(req,res){
	var images = []
	fs.readdirSync(path.join(__dirname, '../../app/client/public/uploaded_images')).forEach((name) => {
		images.push(name)
	});
	res.json(images)
});

module.exports = router;