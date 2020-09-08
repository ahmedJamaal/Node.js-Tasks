import { Router } from 'express'
import controllers from './instructor.controler';


const router = Router();


//get all
  router
  .route('/')
  .get(controllers.getMany)


 
  export default router