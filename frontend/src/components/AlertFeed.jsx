import React from 'react';

const severityStyles = {
  critical: 'border-l-red-500 text-red-400',
  warning: 'border-l-amber-500 text-amber-400',
  info: 'border-l-slate-500 text-slate-400',
};

const AlertFeed = ({ alerts, onAcknowledge }) => {
  if (!alerts.length) {
    return <p className="text-slate-500 text-sm">No alerts yet. All quiet.</p>;
  }

  return (
    <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
      {alerts.map((alert) => (
        <div
          key={alert._id}
          className={`bg-slate-900 border border-slate-800 border-l-4 ${severityStyles[alert.severity]} rounded-md p-3 flex items-start justify-between gap-3`}
        >
          <div>
            <p className="text-sm text-slate-200">{alert.message}</p>
            <p className="text-xs text-slate-500 mt-1">
              {new Date(alert.createdAt).toLocaleString()}
            </p>
          </div>
          {!alert.acknowledged && (
            <button
              onClick={() => onAcknowledge(alert._id)}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded shrink-0"
            >
              Ack
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AlertFeed;
