import { crudControllers } from '../../utils/crud';
import {Lecture} from './lecture.model'
import mongoose from 'mongoose';

export const getOne =  async (req, res) => {
    var id = new mongoose.Types.ObjectId(req.params.id)
    try {
        console.log('sdss');
        
      const docs = await Lecture
      .findById(id);

      if (!docs) {
        return res.status(400).send({ message: 'No Data Found.' });
      }
      res.status(200).json({
        data: docs
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({ message: e.message });
    }
  };
  
export default crudControllers(Lecture)