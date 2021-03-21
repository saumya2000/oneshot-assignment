const express = require("express");
const router = express.Router();
var controller = require("../controller/controller");

router.post("/college_entry", controller.college_entries);
router.post("/student_entry", controller.student_entries);
router.get("/countCollege_byState", controller.countCollege_byState);
router.get("/college_details", controller.college_details);
router.get("/countCollege_byCourses", controller.countCollege_byCourses);
router.get("/college_byState", controller.college_byState);
router.get("/student_byCollegeID", controller.student_byCollegeID);
router.get("/similarColleges", controller.similarColleges);
router.get("/student_details", controller.student_details);

module.exports = router;
