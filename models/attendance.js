const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  course_id: { type: String, required: true},
  teacher_id: { type: String, required: true },
  date: {type:String,required:true},
  is_active: {type: Boolean}

},
{
  timestamps: true
}
);

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;