import React, { useState } from 'react';
import './Devices.css';

function Devices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const mockDevices = [
    {
      id: 1,
      name: 'Ventilator V-102',
      manufacturer: 'MedTech Inc.',
      model: 'VM-2024-001',
      category: 'Respiratory',
      risk_score: 92,
      severity: 'Critical',
      last_assessment: '2026-08-14',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Infusion Pump IP-45',
      manufacturer: 'Health Solutions Ltd.',
      model: 'IP-2024-045',
      category: 'Infusion',
      risk_score: 87,
      severity: 'High',
      last_assessment: '2026-08-13',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Patient Monitor PM-21',
      manufacturer: 'CardioTech Industries',
      model: 'PM-2024-021',
      category: 'Monitoring',
      risk_score: 81,
      severity: 'High',
      last_assessment: '2026-08-12',
      status: 'Active',
    },
    {
      id: 4,
      name: 'ECG Device',
      manufacturer: 'CardioTech Industries',
      model: 'ECG-3500',
      category: 'Monitoring',
      risk_score: 56,
      severity: 'Medium',
      last_assessment: '2026-08-10',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Glucose Meter GM-X1',
      manufacturer: 'DiabetesCare Corp.',
      model: 'GM-2024-X1',
      category: 'Diagnostic',
      risk_score: 32,
      severity: 'Low',
      last_assessment: '2026-08-09',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Oxygen Concentrator',
      manufacturer: 'RespireCare Ltd.',
      model: 'OC-5000',
      category: 'Respiratory',
      risk_score: 45,
      severity: 'Medium',
      last_assessment: '2026-08-08',
      status: 'Maintenance',
    },
    {
      id: 7,
      name: 'Blood Pressure Monitor',
      manufacturer: 'Health Solutions Ltd.',
      model: 'BP-500',
      category: 'Monitoring',
      risk_score: 38,
      severity: 'Low',
      last_assessment: '2026-08-07',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Defibrillator AED-2000',
      manufacturer: 'CriticalCare Med.',
      model: 'AED-2000',
      category: 'Emergency',
      risk_score: 28,
      severity: 'Low',
      last_assessment: '2026-08-06',
      status: 'Active',
    },
  ];

  const filteredDevices = mockDevices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = filterRisk === 'all' || device.severity === filterRisk;
    const matchesCategory = filterCategory === 'all' || device.category === filterCategory;

    return matchesSearch && matchesRisk && matchesCategory;
  });

  const getSeverityClass = (severity) => {
    return `severity-${severity.toLowerCase()}`;
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: 'status-active',
      Maintenance: 'status-maintenance',
      Inactive: 'status-inactive',
    };
    return statusClasses[status] || 'status-active';
  };

  return (
    <div className="devices-page">
      <div className="page-header">
        <h1>Device Management</h1>
        <p>Search, filter, and view all medical devices in your facility</p>
      </div>

      <div className="controls-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by device name, manufacturer, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Risk Level</label>
            <select value={filterRisk} onChange={(e) => setFilterRisk(e.target.value)}>
              <option value="all">All Risk Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="Respiratory">Respiratory</option>
              <option value="Infusion">Infusion</option>
              <option value="Monitoring">Monitoring</option>
              <option value="Diagnostic">Diagnostic</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <button
            className="reset-btn"
            onClick={() => {
              setSearchTerm('');
              setFilterRisk('all');
              setFilterCategory('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="devices-count">
        Showing {filteredDevices.length} of {mockDevices.length} devices
      </div>

      <div className="devices-grid">
        {filteredDevices.length === 0 ? (
          <div className="empty-state">
            <p>No devices found matching your criteria</p>
          </div>
        ) : (
          filteredDevices.map((device) => (
            <div key={device.id} className="device-card">
              <div className="device-header">
                <div>
                  <h3>{device.name}</h3>
                  <p className="manufacturer">{device.manufacturer}</p>
                </div>
                <span className={`severity-badge ${getSeverityClass(device.severity)}`}>
                  {device.severity}
                </span>
              </div>

              <div className="device-details">
                <div className="detail-row">
                  <span className="label">Model:</span>
                  <span className="value">{device.model}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Category:</span>
                  <span className="value">{device.category}</span>
                </div>
              </div>

              <div className="risk-section">
                <div className="risk-score">
                  <span className="label">Risk Score</span>
                  <div className="score-bar">
                    <div className="score-fill" style={{ width: `${device.risk_score}%` }}></div>
                  </div>
                  <span className="score-value">{device.risk_score}/100</span>
                </div>
              </div>

              <div className="device-meta">
                <div className="meta-item">
                  <span className="meta-label">Last Assessment</span>
                  <span className="meta-value">
                    {new Date(device.last_assessment).toLocaleDateString()}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Status</span>
                  <span className={`status-badge ${getStatusBadge(device.status)}`}>
                    {device.status}
                  </span>
                </div>
              </div>

              <button className="view-details-btn">View Details →</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Devices;
