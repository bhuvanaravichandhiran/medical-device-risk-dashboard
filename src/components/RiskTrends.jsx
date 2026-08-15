import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './RiskTrends.css';

function RiskTrends({ data, loading }) {
  const defaultData = [
    { date: 'Day 1', average_risk: 45, high_risk_count: 5 },
    { date: 'Day 2', average_risk: 48, high_risk_count: 6 },
    { date: 'Day 3', average_risk: 42, high_risk_count: 4 },
    { date: 'Day 4', average_risk: 50, high_risk_count: 8 },
    { date: 'Day 5', average_risk: 46, high_risk_count: 6 },
    { date: 'Day 6', average_risk: 52, high_risk_count: 9 },
    { date: 'Day 7', average_risk: 49, high_risk_count: 7 },
  ];

  const chartData = data || defaultData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="risk-trends">
        <h2>Risk Trends (Last 30 Days)</h2>
        <div className="chart-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="risk-trends">
      <h2>Risk Trends (Last 30 Days)</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="date"
              stroke="#666"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#666" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="average_risk"
              stroke="#2196f3"
              strokeWidth={2}
              name="Average Risk Score"
              dot={{ fill: '#2196f3', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="high_risk_count"
              stroke="#f57c00"
              strokeWidth={2}
              name="High Risk Count"
              dot={{ fill: '#f57c00', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RiskTrends;
