const express = require('express');
const Attendance = require('../models/attendance')
const router = new express.Router();

router.get("attendance/course/:id",async(req,res,next)=>{
    const course_id = req.params._id;
    try {
        const attendance = await Attendance.find({ course_id });
        if (!attendance || attendance.length == 0)
          return res.status(404).send({ success: false, data: "No response found" });
    
        res.send({ success: true, data: attendance });
      } catch (error) {
        res.status(500).send({ success: false, error });
      }
})
router.post("attendance",async(req,res,next)=>{
    const attendance = new Attendance(req.body);
    try {
      await attendance.save();
      res.send({ data: attendance, success: true });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
})
module.exports = router;