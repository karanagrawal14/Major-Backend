const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceResponseSchema = new Schema({
  attendance_id: { type: String, required: true},
  student_id: {type: String, required: true},
  student_name: { type: String },
  
});

const attendanceResponse = mongoose.model('AttendanceResponse', attendanceResponseSchema);

module.exports = attendanceResponse;
