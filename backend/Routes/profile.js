const express = require('express');
const router = express.Router();
const { createPersonalInfo, fetchAllPersonalInfo, updatePersonalInfo, deletePersonalInfo } = require('../controllers/personalInfoController');
const { createEducation, fetchAllEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
const { createCourse, fetchAllCourses, updateCourse, deleteCourse } = require('../controllers/courseController');

// Personal Info Routes
router.post('/personal-info', createPersonalInfo);
router.get('/personal-info', fetchAllPersonalInfo);
router.put('/personal-info/:id', updatePersonalInfo);
router.delete('/personal-info/:id', deletePersonalInfo);

// Education Routes
router.post('/education', createEducation);
router.get('/education', fetchAllEducation);
router.put('/education/:id', updateEducation);
router.delete('/education/:id', deleteEducation);

// Courses Routes
router.post('/courses', createCourse);
router.get('/courses', fetchAllCourses);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

module.exports = router;
