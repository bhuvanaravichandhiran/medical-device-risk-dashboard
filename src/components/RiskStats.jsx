import React from 'react';
import './RiskStats.css';

function RiskStats({ stats, loading }) {
  if (loading) {
    return (
      <div className="risk-stats">
        <div className="stat-card skeleton">
          <div className="stat-skeleton"></div>
        </div>
        <div className="stat-card skeleton">
          <div className="stat-skeleton"></div>
        </div>
        <div className="stat-card skeleton">
          <div className="stat-skeleton"></div>
        </div>
        <div className="stat-card skeleton">
          <div className="stat-skeleton"></div>
        </div>
      </div>
    );
  }

  const defaultStats = {
    total_devices: 0,
    high_risk_devices: 0,
    total_assessments: 0,
    recall_events: 0,
  };

  const data = stats || defaultStats;

  return (
    <div className="risk-stats">
      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#e3f2fd' }}>
          <span className="icon">📱</span>
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Devices</p>
          <h3 className="stat-value">{data.total_devices}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#ffebee' }}>
          <span className="icon">⚠️</span>
        </div>
        <div className="stat-content">
          <p className="stat-label">High Risk</p>
          <h3 className="stat-value" style={{ color: '#d32f2f' }}>
            {data.high_risk_devices}
          </h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#f3e5f5' }}>
          <span className="icon">📊</span>
        </div>
        <div className="stat-content">
          <p className="stat-label">Assessments</p>
          <h3 className="stat-value">{data.total_assessments}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#fff3e0' }}>
          <span className="icon">🔔</span>
        </div>
        <div className="stat-content">
          <p className="stat-label">Recall Events</p>
          <h3 className="stat-value" style={{ color: '#f57c00' }}>
            {data.recall_events}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default RiskStats;
