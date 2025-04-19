const express = require('express');
const { protect, tutorOnly } = require('../middleware/auth');
const {
  createCourse,
  getCourses,
  getCourseById,
  enrollCourse
} = require('../controllers/courseController');

const router = express.Router();

router.post('/', protect, tutorOnly, createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/:id/enroll', protect, enrollCourse);

module.exports = router;