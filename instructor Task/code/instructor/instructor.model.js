import mongoose from 'mongoose';
import { string, number } from 'joi';
const instructorSchema= new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    }
    ,
    address:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    jobType:{
        type:String,
        
    }


},{ timestamps: true })

export const Instructor=mongoose.model('instructor',instructorSchema);