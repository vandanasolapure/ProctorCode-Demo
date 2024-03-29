const mongoose = require("mongoose");
const problemStatement=require("../Model/problemStatementModel");

const examSchema=mongoose.Schema({
        course:{
            type:String,
            required: [true,"please add the course name"],
        },
        examCode:{
            type:String,
            required: [true,"please add the examCode"],
            index: true,
            unique: true,
        },
        dateTimeField:{
            type:Date,
            required: [true,"please add the date time of exam"],

        },
        year:{
            type:String,
            required: [true,"please add the year"],

        },
        divison:{
            type:String,
            require:[true,"please add the division"],
        },
        batch:{
            type:String,
            require:[true,"please add the batch"],
        },
        problemStatements:[{
            type:String,
        }]
    });
    module.exports=mongoose.model("Exam",examSchema);