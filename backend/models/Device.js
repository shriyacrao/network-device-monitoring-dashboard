const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Device name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['router', 'switch', 'server', 'firewall', 'access-point'],
      required: true,
    },
    ipAddress: {
      type: String,
      required: [true, 'IP address is required'],
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    site: {
      type: String,
      default: 'Main Office',
      trim: true,
    },
    status: {
      type: String,
      enum: ['up', 'down', 'warning'],
      default: 'up',
    },
    lastStatusChange: {
      type: Date,
      default: Date.now,
    },
    uptimePercentage: {
      type: Number,
      default: 100,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Device', deviceSchema);
