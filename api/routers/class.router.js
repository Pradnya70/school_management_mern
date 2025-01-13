const express = require('express');
const authMiddleware = require('../auth/auth');
const { getAllClasses, createClass, updateClassWithId, deleteClassWithId } = require('../controllers/class.controller');

const router = express.Router();

router.post ("/create", authMiddleware(['SCHOOL']),createClass);
router.get("/all", authMiddleware(['SCHOOL']), getAllClasses);
router.patch("/update/:id", authMiddleware(['SCHOOL']),updateClassWithId); //authenticated user for update
router.delete("/delete/:id", authMiddleware(['SCHOOL']),deleteClassWithId);



module.exports = router;