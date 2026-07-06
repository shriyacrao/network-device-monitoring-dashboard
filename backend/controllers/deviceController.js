const Device = require('../models/Device');
const UptimeLog = require('../models/UptimeLog');

// @desc    Get all devices
// @route   GET /api/devices
const getDevices = async (req, res) => {
  try {
    const { site, status, type } = req.query;
    const filter = {};
    if (site) filter.site = site;
    if (status) filter.status = status;
    if (type) filter.type = type;

    const devices = await Device.find(filter).sort({ createdAt: -1 });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single device by id
// @route   GET /api/devices/:id
const getDeviceById = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new device
// @route   POST /api/devices
const createDevice = async (req, res) => {
  try {
    const { name, type, ipAddress, location, site, notes } = req.body;

    if (!name || !type || !ipAddress || !location) {
      return res.status(400).json({ message: 'name, type, ipAddress, and location are required' });
    }

    const device = await Device.create({ name, type, ipAddress, location, site, notes });
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a device
// @route   PUT /api/devices/:id
const updateDevice = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    const updatable = ['name', 'type', 'ipAddress', 'location', 'site', 'notes'];
    updatable.forEach((field) => {
      if (req.body[field] !== undefined) device[field] = req.body[field];
    });

    const updated = await device.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a device
// @route   DELETE /api/devices/:id
const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    await device.deleteOne();
    await UptimeLog.deleteMany({ device: device._id });
    res.json({ message: 'Device removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get uptime history for a device (for charting)
// @route   GET /api/devices/:id/history
const getDeviceHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const logs = await UptimeLog.find({ device: req.params.id })
      .sort({ checkedAt: -1 })
      .limit(limit);
    res.json(logs.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  getDeviceHistory,
};
