const express = require("express");
const authMiddleware = require("../auth/auth");
const {
  registerStudent,
  loginStudent,
  updateStudent,
  getStudentOwnData,
  getStudentsWithQuery,
  getStudentWithId,
  deleteStudentWithId,
} = require("../controllers/student.controller");

const router = express.Router();

router.post("/register", authMiddleware(["SCHOOL"]), registerStudent);
router.get("/all", authMiddleware(["SCHOOL"]), getStudentsWithQuery);
router.post("/login", loginStudent);
router.patch("/update", authMiddleware(["SCHOOL"]), updateStudent); //authenticated user for update
router.get("/fetch-single", authMiddleware(["STUDENT"]), getStudentOwnData);
router.get("/fetch/:id", authMiddleware(["SCHOOL"]), getStudentWithId);
router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteStudentWithId);

module.exports = router;
