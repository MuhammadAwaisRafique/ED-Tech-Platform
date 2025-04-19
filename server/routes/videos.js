const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const { mockTranscript } = require('../services/transcriptionService');
const router = express.Router();

// Configure multer for video upload
const storage = multer.diskStorage({
  destination: './uploads/videos',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Upload video to course
router.post('/:courseId', auth, upload.single('video'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.tutor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const videoUrl = `/uploads/videos/${req.file.filename}`;
    const transcript = await mockTranscript(videoUrl);

    course.videos.push({
      title: req.body.title,
      url: videoUrl,
      transcript,
      order: course.videos.length + 1
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get video transcript
router.get('/:courseId/:videoId/transcript', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const video = course.videos.id(req.params.videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ transcript: video.transcript });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;