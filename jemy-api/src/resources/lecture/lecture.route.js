const multer = require('multer');
import { Router } from 'express';
import {lecture} from './lecture.model';
import controllers from './lecture.controller';
import {getOne} from './lecture.controller';


const router = Router();

/*
var upload = multer({
  storage: storage
});
*/
//get all
router
.route('/')
.get(controllers.getMany)




  // update by id 
  router
  .route('/:id')
  .get(controllers.updateOne)
  
 //delete 
 router.route('/:id')
  .get(getOne)
  .delete(controllers.removeOne)
  
  // add 
// instrutor
router.route('/')
.post(controllers.createOne)

// /api/lecture/:id/photo
/*
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/uploads');
  },
  filename: (req, file, cb) => {
    var filetype = '';

    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }

    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }

    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }

    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
router.route('/').post(upload.single('image'), (req, res) => {
    if (!req.file) {
      res.status(500).end("No File uploaded!");
    }
  
    if (!req.file.mimetype.startsWith('image')) {
      res.status(400).end("Please upload an image file!");
    }
  
    res.send({
      status: true,
      message: 'File is uploaded',
      data: {
        name: req.file.filename,
        pathLink: 'uploads/' + req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  });
*/
  export default router
  