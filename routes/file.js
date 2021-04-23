const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../libraries/auth');
var path = require('path');

/**
 * Tutorial url
 * https://attacomsian.com/blog/uploading-files-nodejs-express#
 *
 **/

router.use('/upload', auth.verify);
router.post('/upload/image', async (req, res ) => {
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "image") to retrieve the uploaded file
        let image = req.files.image;

        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        image.mv('../files/' + image.name);

        //send response
        res.json({
            status: true,
            message: 'File is uploaded',
            data: {
                name: image.name,
                mimetype: image.mimetype,
                size: image.size
            }
        });
    }
} catch (err) {
    res.status(500).send(err);
}
})

router.post('/upload/images', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          let data = [];

          //loop all files
          _.forEach(_.keysIn(req.files.photos), (key) => {
              let photo = req.files.photos[key];

              //move photo to uploads directory
              photo.mv('./uploads/' + photo.name);

              //push file details
              data.push({
                  name: photo.name,
                  mimetype: photo.mimetype,
                  size: photo.size
              });
          });

          //return response
          res.send({
              status: true,
              message: 'Files are uploaded',
              data: data
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

router.get("/:filename", (req, res) => {
    console.log('geting image')
    res.sendFile(path.resolve(__dirname + "/../files/" + req.params.filename));
});

module.exports = router;
