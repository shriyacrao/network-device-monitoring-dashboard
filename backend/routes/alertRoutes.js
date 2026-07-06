const express = require('express');
const router = express.Router();
const { getAlerts, acknowledgeAlert } = require('../controllers/alertController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAlerts);
router.patch('/:id/acknowledge', protect, acknowledgeAlert);

module.exports = router;
