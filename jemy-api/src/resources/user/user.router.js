import { Router } from 'express'
import { me, updateMe } from './user.controllers'
import controllers from './user.controllers';
const multer  = require('multer');
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, './assets/uploads');
    },
    filename: (req, file, cb) => {
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});

const router = Router()

router.get('/me', me)
router.put('/', updateMe)


// /api/user
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

 // /api/user/count
 router
 .route('/count')
 .get(controllers.getCount)

// /api/user/role/:id
router
.route('/role/:id')
.get(controllers.filterByRole)


// /api/user/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);
 
  
  
  // /api/user/:id/info
    router
    .route('/:id/info')
    .put(me);


// /api/user/:id/photo
router
.route('/photo')
.post(
upload.single('image'),
(req, res) => {
    if(!req.file) {res.status(500).end("No File uploaded!");}
    if (!req.file.mimetype.startsWith('image'))
    {res.status(400).end("Please upload an image file!");}
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: req.file.filename,
                  pathLink: 'uploads/'+req.file.filename,
                  path: req.file.path,
                  mimetype: req.file.mimetype,
                  size: req.file.size
              }
          });
}
);


export default router
