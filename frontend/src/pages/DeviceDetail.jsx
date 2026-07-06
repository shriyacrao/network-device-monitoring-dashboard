import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import StatusBadge from '../components/StatusBadge';
import UptimeChart from '../components/UptimeChart';

const DeviceDetail = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [deviceRes, historyRes] = await Promise.all([
        api.get(`/devices/${id}`),
        api.get(`/devices/${id}/history?limit=60`),
      ]);
      setDevice(deviceRes.data);
      setHistory(historyRes.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-slate-400 p-8">Loading device...</div>;
  }

  if (!device) {
    return <div className="text-slate-400 p-8">Device not found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/devices" className="text-sky-400 text-sm hover:underline">
        ← Back to Devices
      </Link>

      <div className="flex items-center justify-between mt-4 mb-6">
        <h1 className="text-slate-100 text-2xl font-semibold">{device.name}</h1>
        <StatusBadge status={device.status} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-xs mb-1">Type</p>
          <p className="text-slate-200 capitalize">{device.type}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-xs mb-1">IP Address</p>
          <p className="text-slate-200 font-mono">{device.ipAddress}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-xs mb-1">Location</p>
          <p className="text-slate-200">{device.location}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-xs mb-1">Uptime</p>
          <p className="text-slate-200">{device.uptimePercentage}%</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-slate-300 text-sm font-medium uppercase tracking-wide mb-4">
          Status History
        </h2>
        <UptimeChart history={history} />
      </div>

      {device.notes && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-6">
          <h2 className="text-slate-300 text-sm font-medium uppercase tracking-wide mb-2">Notes</h2>
          <p className="text-slate-300 text-sm">{device.notes}</p>
        </div>
      )}
    </div>
  );
};

export default DeviceDetail;
