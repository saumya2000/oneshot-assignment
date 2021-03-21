const mongoose = require("mongoose");

const CollegeSchema = mongoose.Schema({
  Id: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Year_founded: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Number_of_students: {
    type: Number,
    required: true,
  },
  Courses: {
    type: [String],
    required: true,
  },
});
module.exports = mongoose.model("college", CollegeSchema);
