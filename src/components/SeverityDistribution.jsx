import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './SeverityDistribution.css';

function SeverityDistribution({ data, loading }) {
  const COLORS = {
    Critical: '#d32f2f',
    High: '#f57c00',
    Medium: '#fbc02d',
    Low: '#388e3c',
  };

  const defaultData = [
    { name: 'Critical', value: 0 },
    { name: 'High', value: 0 },
    { name: 'Medium', value: 0 },
    { name: 'Low', value: 0 },
  ];

  const chartData = data || defaultData;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{entry.name}</p>
          <p className="tooltip-value">
            {entry.value} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="severity-distribution">
        <h2>Severity Distribution</h2>
        <div className="chart-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="severity-distribution">
      <h2>Severity Distribution</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name] || '#999'}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SeverityDistribution;
