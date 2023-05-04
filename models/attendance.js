const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  course_id: { type: String, required: true},
  teacher_id: { type: String, required: true },
  date: {type:String,required:true},
  is_active: {type: Boolean,default:false}

},
{
  timestamps: true
}
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;