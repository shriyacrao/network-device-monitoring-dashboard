import React from 'react';

const colorMap = {
  slate: 'text-slate-100',
  green: 'text-status-up',
  amber: 'text-status-warning',
  red: 'text-status-down',
};

const StatCard = ({ label, value, color = 'slate', suffix = '' }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">{label}</p>
      <p className={`text-3xl font-semibold ${colorMap[color]}`}>
        {value}
        {suffix}
      </p>
    </div>
  );
};

export default StatCard;
