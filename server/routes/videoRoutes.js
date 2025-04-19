const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadVideo, getTranscript } = require('../controllers/videoController');

const router = express.Router();

router.post('/:courseId', auth, upload.single('video'), uploadVideo);
router.get('/:courseId/:videoId/transcript', auth, getTranscript);

module.exports = router;