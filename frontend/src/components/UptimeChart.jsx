import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const statusToValue = { down: 0, warning: 1, up: 2 };

const UptimeChart = ({ history }) => {
  const data = history.map((log) => ({
    time: new Date(log.checkedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: statusToValue[log.status],
    status: log.status,
  }));

  if (!data.length) {
    return <p className="text-slate-500 text-sm">No history yet — check back after the next heartbeat cycle.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
        <YAxis
          domain={[0, 2]}
          ticks={[0, 1, 2]}
          tickFormatter={(v) => ({ 0: 'Down', 1: 'Warn', 2: 'Up' }[v])}
          stroke="#64748b"
          fontSize={11}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: 12 }}
          formatter={(value, name, props) => [props.payload.status.toUpperCase(), 'Status']}
        />
        <Line type="stepAfter" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UptimeChart;
