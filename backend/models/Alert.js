const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
    },
    deviceName: {
      type: String,
      required: true,
    },
    previousStatus: {
      type: String,
      enum: ['up', 'down', 'warning'],
    },
    newStatus: {
      type: String,
      enum: ['up', 'down', 'warning'],
      required: true,
    },
    severity: {
      type: String,
      enum: ['critical', 'warning', 'info'],
      default: 'info',
    },
    message: {
      type: String,
      required: true,
    },
    acknowledged: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);
