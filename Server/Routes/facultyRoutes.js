const express = require('express')
const router=express.Router();
const {getFaculty,createFaculty,getOneFaculty,updateFaculty,deleteFaculty,}=require("../Controller/facultyController");
router.route("/").post(createFaculty);
router.route("/login").post(getFaculty);




module.exports= router;