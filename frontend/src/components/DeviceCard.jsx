import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const typeIcons = {
  router: 'RTR',
  switch: 'SW',
  server: 'SRV',
  firewall: 'FW',
  'access-point': 'AP',
};

const DeviceCard = ({ device }) => {
  return (
    <Link
      to={`/devices/${device._id}`}
      className="block bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
            {typeIcons[device.type] || device.type}
          </span>
          <h3 className="text-slate-100 font-medium">{device.name}</h3>
        </div>
        <StatusBadge status={device.status} />
      </div>
      <div className="text-xs text-slate-400 space-y-1">
        <p>IP: {device.ipAddress}</p>
        <p>Location: {device.location}</p>
        <p>Site: {device.site}</p>
        <p>Uptime: {device.uptimePercentage}%</p>
      </div>
    </Link>
  );
};

export default DeviceCard;
