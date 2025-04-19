const Course = require('../models/Course');
const { generateTranscript } = require('../services/transcriptionService');

const uploadVideo = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.tutor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const videoUrl = `/uploads/videos/${req.file.filename}`;
    const transcript = await generateTranscript(videoUrl);

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
};

const getTranscript = async (req, res) => {
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
};

module.exports = { uploadVideo, getTranscript };