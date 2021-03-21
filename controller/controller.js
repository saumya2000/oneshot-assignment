var College_entry = require("../models/college");
var Student_entry = require("../models/student");

exports.college_entries = function (req, res) {
  var college_entry = new College_entry({
    Id: req.body.id,
    Name: req.body.name.toUpperCase(),
    Year_founded: req.body.year_founded,
    City: req.body.city.toUpperCase(),
    State: req.body.state.toUpperCase(),
    Country: req.body.country.toUpperCase(),
    Number_of_students: req.body.number_of_students,
    Courses: req.body.courses.toUpperCase().split(",").sort(),
  });
  college_entry.save(function (err, result) {
    if (err) {
      res.json({
        message: "Sorry! Error Occurred, Please try again.",
      });
    } else {
      res.json({
        message: "College records added successfully!",
      });
    }
  });
};

exports.student_entries = function (req, res) {
  var student_entry = new Student_entry({
    Id: req.body.id,
    Name: req.body.name.toUpperCase(),
    Year_of_batch: req.body.year_of_batch,
    College_id: req.body.college_id,
    Skills: req.body.skills.toUpperCase().split(",").sort(),
  });

  student_entry.save(function (err, result) {
    if (err) {
      res.json({
        message: "Sorry! Error Occurred, Please try again.",
      });
    } else {
      res.json({
        message: "Student records added successfully!",
      });
    }
  });
};

exports.countCollege_byState = async function (req, res) {
  var colleges = [];
  var count = [];
  College_entry.distinct("State", {}).then(async (results) => {
    await Promise.all(
      results.map(async (state) => {
        await College_entry.findOne({ State: state })
          .count()
          .then((c) => {
            colleges.push(state);
            count.push(c);
          });
      })
    );
    res.json({ colleges, count });
  });
};

exports.college_details = function (req, res) {
  College_entry.findOne({ Id: req.query.id }).then((results) => {
    if (results) res.json(results);
    else {
      res.json({ message: "No results found" });
    }
  });
};

exports.countCollege_byCourses = async function (req, res) {
  var courses = [];
  var count = [];
  College_entry.distinct("Courses", {}).then(async (results) => {
    await Promise.all(
      results.map(async (course) => {
        await College_entry.findOne({ Courses: course })
          .count()
          .then((c) => {
            courses.push(course);
            count.push(c);
          });
      })
    );
    res.json({ courses, count });
  });
};

exports.college_byState = function (req, res) {
  College_entry.find({ State: req.query.state }).then((results) => {
    if (results) res.json(results);
    else {
      res.json({ message: "No results found" });
    }
  });
};

exports.student_byCollegeID = function (req, res) {
  Student_entry.find({ College_id: req.query.college_id }).then((results) => {
    if (results.length > 0) res.json(results);
    else {
      res.json({ message: "No results found" });
    }
  });
};

exports.similarColleges = function (req, res) {
  var state = req.query.state;
  var courses = [];
  courses = req.query.courses.split(",");

  const number_of_students = Number(req.query.number_of_students);
  const min = number_of_students - 100;
  const max = number_of_students + 100;
  College_entry.find({
    State: state,
    Number_of_students: {
      $gte: min,
      $lte: max,
    },
    Courses: courses,
  }).then((results) => {
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json({ message: "No results found" });
    }
  });
};
exports.student_details = function (req, res) {
  Student_entry.findOne({ Id: req.query.id }).then((results) => {
    if (results) res.json(results);
    else {
      res.json({ message: "No results found" });
    }
  });
};
