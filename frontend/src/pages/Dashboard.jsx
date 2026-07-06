import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/api';
import StatCard from '../components/StatCard';
import DeviceCard from '../components/DeviceCard';
import AlertFeed from '../components/AlertFeed';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [devices, setDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [summaryRes, devicesRes, alertsRes] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/devices'),
        api.get('/alerts?limit=20'),
      ]);
      setSummary(summaryRes.data);
      setDevices(devicesRes.data);
      setAlerts(alertsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Poll every 30s so the dashboard feels "live" as the heartbeat job runs server-side.
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleAcknowledge = async (id) => {
    await api.patch(`/alerts/${id}/acknowledge`);
    setAlerts((prev) => prev.map((a) => (a._id === id ? { ...a, acknowledged: true } : a)));
  };

  if (loading) {
    return <div className="text-slate-400 p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-slate-100 text-2xl font-semibold mb-6">Network Overview</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total Devices" value={summary.totalDevices} />
        <StatCard label="Up" value={summary.up} color="green" />
        <StatCard label="Warning" value={summary.warning} color="amber" />
        <StatCard label="Down" value={summary.down} color="red" />
        <StatCard label="Avg Uptime" value={summary.avgUptime} suffix="%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-slate-300 text-sm font-medium uppercase tracking-wide mb-3">
            Devices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {devices.map((device) => (
              <DeviceCard key={device._id} device={device} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-slate-300 text-sm font-medium uppercase tracking-wide mb-3">
            Recent Alerts
          </h2>
          <AlertFeed alerts={alerts} onAcknowledge={handleAcknowledge} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
