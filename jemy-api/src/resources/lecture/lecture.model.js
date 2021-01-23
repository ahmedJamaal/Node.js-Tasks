import mongoose from 'mongoose';


const lectureSchema= new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    instructorName:{
        type: String
    },
    
    courseId:{
        type: String
    },
    lectureInfo:{
        filetype:{
            type:String,
            enum: ['video','image','pdf','slide']
        },
        fileLocation:{
            type:String,
            enum: ['server', 'external'],
            default: 'server'
        },
        time:{
            type:Date,
        },
        lectutreUrl:{
            type:String,
            
        }
    }


},{ timestamps: true })

export const Lecture=mongoose.model('lecture',lectureSchema);