const Subject = require("../models/subject.model");

const Student = require("../models/student.model");
const Exam = require("../models/examination.model");
const Schedule = require("../models/schedule.model");
const mongoose = require("mongoose");

module.exports = {
  getAllSubjects: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      console.log("in function");
      console.log(schoolId);
      const allSubjects = await Subject.find({ school: schoolId });
      console.log(allSubjects);
      res.status(200).json({
        success: true,
        message: "Success in fetching all Subjects",
        data: allSubjects,
      });
    } catch (error) {
      console.log("GetAllSubjects error", error);
      res
        .status(500)
        .json({ success: false, message: "Server Error in Getting Subject" });
    }
  },

  createSubject: async (req, res) => {
    try {
      const newSubject = new Subject({
        school: req.user.schoolId,
        subject_name: req.body.subject_name,
        subject_codename: req.body.subject_codename,
      });
      await newSubject.save();
      res

        .status(200)
        .json({ success: true, message: "Successfully created the Subject." });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server Error in Creating Subject" });
    }
  },

  updateSubjectWithId: async (req, res) => {
    try {
      let id = req.params.id;
      await Subject.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
      const SubjectAfterUpdate = await Subject.findOne({ _id: id });
      res.status(200).json({
        success: true,
        message: "Subject updated.",
        data: SubjectAfterUpdate,
      });
    } catch (error) {
      console.log("Update Subject Error=>", error);
      res
        .status(500)
        .json({ success: false, message: "Server Error in Updating Subject" });
    }
  },
  deleteSubjectWithId: async (req, res) => {
    try {
      let id = req.params.id;
      let schoolId = req.user.schoolId;

      const SubjectExamCount = (
        await Exam.find({ subject: id, school: schoolId })
      ).length;
      const SubjectScheduleCount = (
        await Schedule.find({ subject: id, school: schoolId })
      ).length;

      if (SubjectExamCount === 0 && SubjectScheduleCount === 0) {
        await Subject.findOneAndDelete({ _id: id, school: schoolId });
        res
          .status(200)
          .json({ success: true, message: "Subject Deleted Successfully." });
      } else {
        res
          .status(500)
          .json({ success: false, message: "This Subject is already in use." });
      }
    } catch (error) {
      console.log("Delate  Subject Error=>", error);
      res
        .status(500)
        .json({ success: false, message: "Server Error in Deleting Subject" });
    }
  },
};
