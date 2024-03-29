 //emmai prn name year division batch pass
const mongoose = require("mongoose");
const studentSchema=mongoose.Schema({
        email:{
            type:String,
            required: [true,"please add the student email"],
        },
        prn:{
            type:String,
            required: [true,"please add the prn number"],
            index: true,
            unique: true,
        },
        name:{
            type:String,
            required: [true,"please add the name of student"],

        },
        year:{
            type:String,
            required: [true,"please add the year"],

        },
        division:{
            type:String,
            require:[true,"please add the division"],
        },
        batch:{
            type:String,
            require:[true,"please add the batch"],
        },
        password:{
            type:String,
            require:[true,"please add the password"]
        }
    });
    module.exports=mongoose.model("Student",studentSchema);