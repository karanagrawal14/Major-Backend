const express = require('express');
const Attendance = require('../models/attendance')
const attendanceResponse = require('../models/AttendanceResponse');
const router = new express.Router();

router.get("/attendance/course/:course_id",async(req,res)=>{
  console.log(req.params.course_id);
    const course_id = req.params.course_id;
    
    try {
        const attendance = await Attendance.find({ course_id:course_id });
        //  console.log(attendance);
        if (!attendance || attendance.length == 0)
          return res.status(404).send({ success: false, data: "No response found" });
    
        res.send({ success: true, data: attendance });
      } catch (error) {
       
        res.status(500).send({ success: false, error });
      }
})
router.post("/attendance",async(req,res,next)=>{
    const attendance = new Attendance(req.body);
    try {
      await attendance.save();
      res.send({ data: attendance, success: true });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
})
// http://localhost:8000/api/attendence/${attendenceId}
router.get("/attendance/:id", async (req, res) => {
    const _id = req.params.id;
    try {
      const attendance = await Attendance.findById({ _id });
      if (!attendance)
        return res.status(404).send({ success: false, data: "No Attendance found" });
  
      res.send({ success: true, data: attendance });
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  });
//   http://localhost:8000/api/attendence/hasSubmitted/${attendenceId}/${user._id}
router.get("/attendance/hasSubmitted/:attendanceId/:studentId", async (req, res) => {
    const attendance_id = req.params.attendanceId;
    const student_id = req.params.studentId;
    try {
      const response = await attendanceResponse.findOne({ quiz_id, student_id });
      if (!response)
        return res.send({ success: false, data: false });
  
      res.send({ success: true, data: true });
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  });
//   http://localhost:8000/api/startAttendence/${attendenceId}
router.post("/startAttendance/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const attendance = await Attendance.findByIdAndUpdate(_id, {
            is_active: true
        }, {new: true, runValidators: true});
        res.send({data: attendance, success: true});
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
  })
//   http://localhost:8000/api/endAttendence/${attendenceId}
router.post("/endQuiz/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const attendance = await Attendance.findByIdAndUpdate(_id, {
            is_active: false
        }, {new: true, runValidators: true});
        res.send({data: attendance, success: true});
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
  })
//   http://localhost:8000/api/assignment/${assID}

  
module.exports = router;