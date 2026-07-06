const Device = require('../models/Device');
const Alert = require('../models/Alert');

// @desc    Get aggregated stats for the dashboard header cards
// @route   GET /api/dashboard/summary
const getSummary = async (req, res) => {
  try {
    const totalDevices = await Device.countDocuments();
    const up = await Device.countDocuments({ status: 'up' });
    const down = await Device.countDocuments({ status: 'down' });
    const warning = await Device.countDocuments({ status: 'warning' });

    const avgUptimeAgg = await Device.aggregate([
      { $group: { _id: null, avgUptime: { $avg: '$uptimePercentage' } } },
    ]);
    const avgUptime = avgUptimeAgg.length > 0 ? avgUptimeAgg[0].avgUptime : 100;

    const unacknowledgedAlerts = await Alert.countDocuments({ acknowledged: false });

    // Breakdown by site, useful for a multi-site view
    const bySite = await Device.aggregate([
      {
        $group: {
          _id: '$site',
          total: { $sum: 1 },
          up: { $sum: { $cond: [{ $eq: ['$status', 'up'] }, 1, 0] } },
          down: { $sum: { $cond: [{ $eq: ['$status', 'down'] }, 1, 0] } },
          warning: { $sum: { $cond: [{ $eq: ['$status', 'warning'] }, 1, 0] } },
        },
      },
    ]);

    res.json({
      totalDevices,
      up,
      down,
      warning,
      avgUptime: Number(avgUptime.toFixed(2)),
      unacknowledgedAlerts,
      bySite,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSummary };
