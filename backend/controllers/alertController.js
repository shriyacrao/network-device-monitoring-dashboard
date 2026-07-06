const Alert = require('../models/Alert');

// @desc    Get recent alerts
// @route   GET /api/alerts
const getAlerts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(limit).populate('device', 'name type');
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Acknowledge an alert
// @route   PATCH /api/alerts/:id/acknowledge
const acknowledgeAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    alert.acknowledged = true;
    await alert.save();
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAlerts, acknowledgeAlert };
