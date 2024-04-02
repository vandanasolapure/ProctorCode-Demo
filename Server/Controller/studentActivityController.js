const StudentActivity = require("../Model/studentActivity")
const Student = require("../Model/studentModel")

const UpdateType = {
    COURSE_CODE: 'courseCode',
    STUDENT_NAME: 'studentName',
    PRN: 'prn',
    START_TIME: 'startTime',
    TAB_CHANGE: 'tabChange',
    TRIED_COPY_PASTE: 'triedCopyPaste',
    HARDWARE_DETECTED: 'hardwareDetected',
    NO_FACE_DETECTED: 'nofaceDetected',
    ACTION: 'action',
    STATUS: '_status'
};

const ops = {
    INC : 'inc',
    DESC : 'desc',
    EQUAL : 'eq'
};

const statusList = {
    PENDING : "Pending",
    SUBMITTED : "submitted"
}

const actionList = {
    EDIT : "Edit"
}

const initActivity = async (req,res) => {
    try{

        const student = Student.findOne({prn : req.body.prn})
        if(!student){
            return res.json({
                error : true,
                errorMsg : "student doesn't exist"
            })
        }
    
    
        const obj = {
            courseCode, 
            studentName, 
            prn, 
            startTime, 
            tabChange, 
            triedCopyPaste, 
            hardwareDetected, 
            nofaceDetected,
            action,
            _status 
        } = {
            ...req.body, 
            startTime : new Date(), 
            tabChange : 0, 
            triedCopyPaste : 0,
            hardwareDetected : false,
            nofaceDetected : 0,
            action : actionList.EDIT,
            _status : statusList.PENDING
        };
    
        const _activity = await StudentActivity.findOne({courseCode, prn})
        if(_activity){
            return res.json({
                message : "you already have given the test"
            })
        }
    
        const activity = new StudentActivity(obj);
        await activity.save();
    
        return res.json(activity)
    }
    catch(err){
        return res.json({
            error : true,
            errorMsg : err.message
        })
    }
}

const updateActivity = async (req, res) => {
    const {courseCode, prn} = req.body;

    const type = req.query.type;
    const op = req.query.op;
    const value = req.query.value;

    const activity = await StudentActivity.findOne({courseCode, prn})

    if(type === UpdateType.STATUS) activity._status = value;
    else if(type === UpdateType.HARDWARE_DETECTED) activity.hardwareDetected = value;
    else if(type === UpdateType.TAB_CHANGE) {
        console.log("i im in : ", activity.tabChange)
        activity.tabChange += parseInt(value);
        console.log(activity.tabChange)
    }
    else if(type === UpdateType.TRIED_COPY_PASTE) activity.triedCopyPaste += parseInt(value);
    else if(type === UpdateType.NO_FACE_DETECTED) activity.nofaceDetected += parseInt(value);

    console.log(activity);
    const response = await activity.save();
    return res.json(response)
};




module.exports = {initActivity, updateActivity};