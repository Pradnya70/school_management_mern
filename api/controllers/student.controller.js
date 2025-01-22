require("dotenv").config();
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Student = require("../models/student.model");

module.exports = {
  registerStudent: async (req, res) => {
    console.log(req.body);
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        const student = await Student.findOne({ email: fields.email[0] });
        if (student) {
          return res
            .status(409)
            .json({ success: false, message: "Email is already registered" });
        } else {
          const photo = files.student_image[0];
          let filepath = photo.filepath;
          let originalFilename = photo.originalFilename.replace("", "_");
          let newPath = path.join(
            __dirname,
            process.env.STUDENT_IMAGE_PATH,
            originalFilename
          );

          // console.log("new path", newPath);
          // console.log("read file path", filepath);

          let photoData = fs.readFileSync(filepath);
          console.log(photoData);
          fs.writeFileSync(newPath, photoData);

          const salt = bcrypt.genSaltSync(10);
          const hashPassword = bcrypt.hashSync(fields.password[0], salt);

          console.log(req.body);

          const newStudent = new Student({
            school: req.user.schoolId,

            email: fields.email[0],
            name: fields.name[0],
            student_class: fields.student_class[0],
            age: fields.age[0],
            gender: fields.gender[0],
            guardian: fields.guardian[0],
            guardian_phone: fields.guardian_phone[0],
            student_image: originalFilename,
            password: hashPassword,
          });

          console.log(newStudent);

          const savedStudent = await newStudent.save();
          res.status(200).json({
            success: true,
            data: savedStudent,
            message: "Student is Registered Successfully",
          });
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Student Registration Failed" });
    }
  },

  loginStudent: async (req, res) => {
    try {
      const student = await Student.findOne({ email: req.body.email });

      if (student) {
        const isAuth = bcrypt.compareSync(req.body.password, student.password);

        if (isAuth) {
          // login
          const jwtSecret = process.env.JWT_SECRET;

          const token = jwt.sign(
            {
              id: student._id,
              schooId: student.school,
              name: student.student,
              image_url: student.student_image,
              role: "STUDENT",
            },
            jwtSecret
          );

          res.header("Authorization", token);
          // res.setHeader("Authorization", token);
          // console.log(token);

          res.status(200).json({
            success: true,
            message: "Success Login.",
            user: {
              id: student._id,
              schooId: student.school,
              owner_name: student.owner_name,
              Student_name: student.student_name,
              image_url: student.student_image,
              role: "STUDENT",
            },
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Password is Incorrect",
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: "Email is not registered",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error [Student Login]",
      });
    }
  },

  getStudentsWithQuery: async (req, res) => {
    try {
      const filterQuery = {};
      const schoolId = req.user.schooId;
      filterQuery["school"] = schoolId;

      if (req.query.hasOwnProperty("search")) {
        filterQuery["name"] = { $regex: req.query.search, $options: "i" };
      }

      if (req.query.hasOwnProperty("student_class")) {
        filterQuery["student_class"] = req.query.student_class;
      }

      const students = await Student.find(filterQuery).select(["-password"]);
      res.status(200).json({
        success: true,
        message: "success in fetching all Students",
        students,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error [Student Get Data]",
      });
    }
  },

  getStudentOwnData: async (req, res) => {
    try {
      const id = req.user.id;
      const schoolId = req.user.schoolId;
      const student = await Student.findOne({
        _id: id,
        school: schoolId,
      }).select(["-password"]);

      if (student) {
        res.status(200).json({ success: true, student });
      } else {
        res.status(404).json({ success: false, message: "Student not found." });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "internal server error [Own Student Data]",
      });
    }
  },

  getStudentWithId: async (req, res) => {
    try {
      const id = req.params.id;
      const schoolId = req.user.schoolId;
      const student = await Student.findOne({
        _id: id,
        school: schoolId,
      }).select(["-password"]);

      if (student) {
        res.status(200).json({ success: true, student });
      } else {
        res.status(404).json({ success: false, message: "Student not found." });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "internal server error [Own Student Data]",
      });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const id = req.user.id;
      const schoolId = req.user.schoolId;
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        const student = await Student.findOne({ _id: id, school: schoolId });
        if (files.image) {
          const photo = files.image[0];
          let filepath = photo.filepath;
          let originalFilename = photo.originalFilename.replace(" ", "_");

          if (student.student_image) {
            let oldImagePath = path.join(
              __dirname,
              process.env.STUDENT_IMAGE_PATH,
              student.student_image
            );
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath, (err) => {
                if (err) console.log("Error deleting old image", err);
              });
            }
          }

          let newPath = path.join(
            __dirname,
            process.env.STUDENT_IMAGE_PATH,
            originalFilename
          );

          let photoData = fs.readFileSync(filepath);
          fs.writeFileSync(newPath, photoData);

          Object.keys(fields).forEach((field) => {
            student[field] = fields[field][0];
          });
          student["student_image"] = originalFilename;
        } else {
          Object.keys(fields).forEach((field) => {
            student[field] = fields[field][0];
          });
        }
        await student.save();
        res.status(200).json({
          success: true,
          message: "Student updated successfully.",
          Student,
        });
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Student Registration Failed" });
    }
  },
  deleteStudentWithId: async (req, res) => {
    try {
      const id = req.params.id;
      const schoolId = req.params.schoolId;
      await Student.findOneAnddelete({ _id: id, schoolId: schoolId });
      const students = await Student.find({ school: schoolId });
      res.status.json({ success: true, message: "Student deleted", students });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Student Delete Failed" });
    }
  },
};
