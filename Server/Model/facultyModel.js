const mongoose = require("mongoose");

const facultySchema=mongoose.Schema({
        email:{
            type:String,
            index: true,
            unique: true,
            required: [true,"please add the faculty email"],
        },
        name:{
            type:String,
            required: [true,"please add the faculty name"],
        },
        password:{
            type:String,
            required: [true,"please add the faculty password"],

        }
    });
    module.exports=mongoose.model("Faculty",facultySchema);