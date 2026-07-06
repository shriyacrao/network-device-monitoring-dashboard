// Run with: npm run seed
// Populates sample devices and an admin user for demoing the dashboard.
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Device = require('./models/Device');
const User = require('./models/User');
const Alert = require('./models/Alert');
const UptimeLog = require('./models/UptimeLog');

const sampleDevices = [
  { name: 'Core-Router-01', type: 'router', ipAddress: '10.0.0.1', location: 'Server Room A', site: 'HQ - Bengaluru' },
  { name: 'Edge-Switch-12', type: 'switch', ipAddress: '10.0.0.12', location: 'Floor 2 IDF', site: 'HQ - Bengaluru' },
  { name: 'Firewall-Perimeter', type: 'firewall', ipAddress: '10.0.0.254', location: 'Server Room A', site: 'HQ - Bengaluru' },
  { name: 'App-Server-03', type: 'server', ipAddress: '10.0.1.30', location: 'Server Room B', site: 'HQ - Bengaluru' },
  { name: 'DB-Server-01', type: 'server', ipAddress: '10.0.1.10', location: 'Server Room B', site: 'HQ - Bengaluru' },
  { name: 'AP-Lobby-01', type: 'access-point', ipAddress: '10.0.2.5', location: 'Lobby', site: 'HQ - Bengaluru' },
  { name: 'Branch-Router-Mum', type: 'router', ipAddress: '10.1.0.1', location: 'Branch Server Room', site: 'Branch - Mumbai' },
  { name: 'Branch-Switch-Mum', type: 'switch', ipAddress: '10.1.0.10', location: 'Branch Server Room', site: 'Branch - Mumbai' },
];

const seed = async () => {
  await connectDB();

  await Device.deleteMany();
  await Alert.deleteMany();
  await UptimeLog.deleteMany();

  const createdDevices = await Device.insertMany(sampleDevices);
  console.log(`Seeded ${createdDevices.length} devices`);

  const adminExists = await User.findOne({ email: 'admin@example.com' });
  if (!adminExists) {
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Seeded admin user: admin@example.com / admin123');
  }

  const viewerExists = await User.findOne({ email: 'viewer@example.com' });
  if (!viewerExists) {
    await User.create({
      name: 'Viewer User',
      email: 'viewer@example.com',
      password: 'viewer123',
      role: 'viewer',
    });
    console.log('Seeded viewer user: viewer@example.com / viewer123');
  }

  console.log('Seeding complete.');
  mongoose.connection.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
