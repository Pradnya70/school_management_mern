const Class = require("../models/class.model");

const Student = require("../models/student.model");
const Exam = require("../models/examination.model");
const Schedule = require("../models/schedule.model");
const mongoose = require("mongoose");

module.exports = {
  getAllClasses: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const allClasses = await Class.find({ schoolId });
      res.status(200).json({
        success: true,
        message: "Success in fetching all classes",
        data: allClasses,
      });
    } catch (error) {
      console.log("GetAllClasses error", error);
      res
        .status(500)
        .json({ success: false, message: "Server Error in Getting Class" });
    }
  },

  createClass: async (req, res) => {
    try {

    // console.log(req);

    const newClass = new Class({
      school: req.user.schoolId,
      class_text: req.body.class_text,
      class_num: req.body.class_num,
    });
    await newClass.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully created the class." });
     } catch (error){
        res.status(500).json({success:false, message:"Server Error in Creating Class"})

      }
  },
  updateClassWithId: async (req, res) => {
    try {
      let id = req.params.id;
      await Class.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
      const classAfterUpdate = await Class.findOne({ _id: id });
      res.status(200).json({
        success: true,
        message: "Class updated.",
        data: classAfterUpdate,
      });
    } catch (error) {
      console.log("Update class Error=>", error);
      res
        .status(500)
        .json({ success: false, message: "Server Error in Updating Class" });
    }
  },
  deleteClassWithId: async (req, res) => {
    try {
      let id = req.params.id;
      let schoolId = req.user.schoolId;

      const classStudentCount = (
        await Student.find({ student_class: id, school: schoolId })
      ).length;
      const classExamCount = (await Exam.find({ class: id, school: schoolId }))
        .length;
      const classScheduleCount = (
        await Schedule.find({ class: id, school: schoolId })
      ).length;

      if (
        classStudentCount === 0 &&
        classExamCount === 0 &&
        classScheduleCount === 0
      ) {
        await Class.findOneAndDelete({ _id: id, school: schoolId });
        res
          .status(200)
          .json({ success: true, message: "Class Deleted Successfully." });
      } else {
        res
          .status(500)
          .json({ success: false, message: "This Class is already in use." });
      }
    } catch (error) {
      console.log("Delate  class Error=>", error);
      res
        .status(500)
        .json({ success: false, message: "Server Error in Deleting Class" });
    }
  },
};
