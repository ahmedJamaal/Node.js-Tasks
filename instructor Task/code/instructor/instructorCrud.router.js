import { Router } from 'express'
import controllers from './instructor.controler';
import {getOne} from './instructor.controler';

const router = Router();

  // get by id
  router
  .route('/:id')
  .get(getOne)

  // update by id 
  router
  .route('/:id')
  .get(getOne) 
  .put(controllers.updateOne)
  
  // add 
// instrutor
router
.route('/')
.post(controllers.createOne)


export default router 
