const mongoose = require("mongoose");

const scheduledExamSchema = mongoose.Schema({
    examCode: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    problemStatement: {
        type: String,
        required: true
    },
    students: [{
        prn: String,
        name: String,
        passkey: String // You can generate this using MongoDB functions or any encryption library
    }]
});

module.exports = mongoose.model("ScheduledExam", scheduledExamSchema);
