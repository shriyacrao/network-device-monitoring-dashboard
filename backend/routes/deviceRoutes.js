const express = require('express');
const router = express.Router();
const {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  getDeviceHistory,
} = require('../controllers/deviceController');
const { protect, adminOnly } = require('../middleware/auth');

router.route('/').get(protect, getDevices).post(protect, adminOnly, createDevice);

router
  .route('/:id')
  .get(protect, getDeviceById)
  .put(protect, adminOnly, updateDevice)
  .delete(protect, adminOnly, deleteDevice);

router.get('/:id/history', protect, getDeviceHistory);

module.exports = router;
