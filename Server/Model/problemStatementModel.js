const mongoose = require("mongoose");

const problemStatementSchema=mongoose.Schema({
        problemStatementNumber:{
            type:Number,
            required: [true,"please add the faculty email"],
        },
        problemStatementDescription:{
            type:String,
            required: [true,"please add the faculty name"],
        }, 
    });
    module.exports=mongoose.model("ProblemStatement",problemStatementSchema);