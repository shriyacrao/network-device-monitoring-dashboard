const cron = require('node-cron');
const Device = require('../models/Device');
const Alert = require('../models/Alert');
const UptimeLog = require('../models/UptimeLog');

// Weighted random status: mostly stays "up", occasionally flips to "warning" or "down".
// This simulates a real heartbeat/ping check without needing actual network access.
const rollNextStatus = (currentStatus) => {
  const roll = Math.random();

  if (currentStatus === 'down') {
    // Devices that are down have a decent chance of recovering.
    if (roll < 0.5) return 'up';
    if (roll < 0.7) return 'warning';
    return 'down';
  }

  if (currentStatus === 'warning') {
    if (roll < 0.5) return 'up';
    if (roll < 0.8) return 'warning';
    return 'down';
  }

  // currentStatus === 'up'
  if (roll < 0.88) return 'up';
  if (roll < 0.97) return 'warning';
  return 'down';
};

const severityFor = (newStatus) => {
  if (newStatus === 'down') return 'critical';
  if (newStatus === 'warning') return 'warning';
  return 'info';
};

const runHeartbeatCheck = async () => {
  try {
    const devices = await Device.find();

    for (const device of devices) {
      const previousStatus = device.status;
      const newStatus = rollNextStatus(previousStatus);

      // Always log the check for uptime history/charting, even if status is unchanged.
      await UptimeLog.create({ device: device._id, status: newStatus });

      if (newStatus !== previousStatus) {
        device.status = newStatus;
        device.lastStatusChange = new Date();
        await Alert.create({
          device: device._id,
          deviceName: device.name,
          previousStatus,
          newStatus,
          severity: severityFor(newStatus),
          message: `${device.name} changed from ${previousStatus} to ${newStatus}`,
        });
      }

      // Recompute a simple rolling uptime percentage from recent history.
      const recentLogs = await UptimeLog.find({ device: device._id })
        .sort({ checkedAt: -1 })
        .limit(100);
      const upCount = recentLogs.filter((log) => log.status === 'up').length;
      device.uptimePercentage = recentLogs.length
        ? Number(((upCount / recentLogs.length) * 100).toFixed(2))
        : 100;

      await device.save();
    }

    console.log(`[heartbeat] checked ${devices.length} devices at ${new Date().toISOString()}`);
  } catch (error) {
    console.error(`[heartbeat] error: ${error.message}`);
  }
};

// Runs every minute. Adjust the cron expression to slow it down for a demo
// (e.g. '*/5 * * * *' for every 5 minutes) if you want fewer status flips.
const startHeartbeatJob = () => {
  cron.schedule('* * * * *', runHeartbeatCheck);
  console.log('[heartbeat] job scheduled to run every minute');
};

module.exports = { startHeartbeatJob, runHeartbeatCheck };
