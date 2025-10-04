const express = require('express');
const multer = require('multer');
const { classifyItem, getUserItems } = require('../controllers/itemController');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/classify', auth, upload.single('image'), classifyItem);
router.get('/my-items', auth, getUserItems);

module.exports = router;