import React from 'react';

const styles = {
  up: 'bg-green-500/10 text-status-up border-green-500/30',
  warning: 'bg-amber-500/10 text-status-warning border-amber-500/30',
  down: 'bg-red-500/10 text-status-down border-red-500/30',
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'up' ? 'bg-status-up' : status === 'warning' ? 'bg-status-warning' : 'bg-status-down'
        }`}
      />
      {status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;
