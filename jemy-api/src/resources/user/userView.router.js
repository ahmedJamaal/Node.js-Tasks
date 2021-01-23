import { Router } from 'express'
import { checkEmailandPhone } from './user.controllers'
import controllers from './user.controllers';


const router = Router()



router
.route('check/:phone/:email')
.get(checkEmailandPhone);
 


export default router
