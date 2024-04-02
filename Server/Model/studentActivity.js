const mongoose = require("mongoose");

const studentAvtivitySchema = mongoose.Schema({
    courseCode : {
        type : String,
        required: [true,"please add the course code"]
    },
    studentName : {
        type : String,
        required : [true,"please add the student name"]
    },
    prn:{
        type:String,
        required: [true,"please add the prn number"]
        
    },
    startTime : {
        type : Date,
        required: [true,"please provide start time"],
    },
    tabChange : {
        type : Number,
        required: [true,"please provide tab switch count"],
    },
    triedCopyPaste : {
        type : Number,
        required: [true,"please provide tab copy count"],
    },
    hardwareDetected : {
        type : Boolean,
        required: [true,"provide hardware piracy data"],
    },
    nofaceDetected : {
        type : Number,
        required: [true,"provide hardware piracy data"],
    },
    action : {
        type : String,
        required: [true,"provide hardware piracy data"],
    },
    _status : {
        type : String,
        required: [true,"provide hardware piracy data"]
    }
})

module.exports = mongoose.model("studentActivity", studentAvtivitySchema);