const mongoose = require('mongoose');

// One entry is written each time the heartbeat job runs, per device.
// This powers the historical uptime chart on the frontend.
const uptimeLogSchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
    },
    status: {
      type: String,
      enum: ['up', 'down', 'warning'],
      required: true,
    },
    checkedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

uptimeLogSchema.index({ device: 1, checkedAt: -1 });

module.exports = mongoose.model('UptimeLog', uptimeLogSchema);
