import {model, Schema} from 'mongoose';

const PatientSchema = new Schema(
    {
        name:{
            type:String,
            required:[true,"Name is required!"],
            minlength:[1,"A patient's name must be at least 1 characters long!"],
            maxlength:[40,"A patient's name must be less than 40 characters long!"]
        },
        
        age:{
            type:Number,
            required:[true,"Age is required!"],
            min:[1,'A person must be at least 1 year old!'], 
            max:[140, 'A person must be less than 140 years old!']
        },
        symptoms:{
            type:String,
            required:[true,"Symptoms are required!"], 
            minlength:[4, "Symptoms must be at least 4 characters long!"]
        }
    }, 
    {timestamps:true}
);

const Patient = model("Patient", PatientSchema);

export default Patient;