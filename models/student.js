const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  Id: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Year_of_batch: {
    type: String,
    required: true,
  },
  College_id: {
    type: String,
    required: true,
  },
  Skills: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("student", StudentSchema);
