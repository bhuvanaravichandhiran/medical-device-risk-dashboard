import React, { useState } from 'react';
import './Incidents.css';

function Incidents() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const mockIncidents = [
    {
      id: 1,
      date: '2026-08-14',
      type: 'Device Malfunction',
      device_name: 'Ventilator V-102',
      manufacturer: 'MedTech Inc.',
      severity: 'Critical',
      status: 'Open',
      description: 'Unexpected shutdown during patient use. Potential power supply issue detected.',
      actions_taken: 'Device immediately removed from service. Incident report filed.',
      investigation_status: 'In Progress',
    },
    {
      id: 2,
      date: '2026-08-12',
      type: 'Recall Notice',
      device_name: 'Infusion Pump IP-45',
      manufacturer: 'Health Solutions Ltd.',
      severity: 'High',
      status: 'Resolved',
      description: 'Manufacturer issued recall for firmware version 2.1 due to potential dosing error.',
      actions_taken: 'All units updated to firmware 2.3. Verification testing completed.',
      investigation_status: 'Completed',
    },
    {
      id: 3,
      date: '2026-08-10',
      type: 'Safety Alert',
      device_name: 'Patient Monitor PM-21',
      manufacturer: 'CardioTech Industries',
      severity: 'High',
      status: 'In Progress',
      description: 'Intermittent signal loss detected. Potential electrode connection issue.',
      actions_taken: 'Electrodes replaced and signal quality verified.',
      investigation_status: 'Awaiting Vendor Response',
    },
    {
      id: 4,
      date: '2026-08-08',
      type: 'Maintenance Issue',
      device_name: 'ECG Device',
      manufacturer: 'CardioTech Industries',
      severity: 'Medium',
      status: 'Resolved',
      description: 'Routine calibration revealed accuracy deviation outside tolerance range.',
      actions_taken: 'Recalibration performed. Device returned to service.',
      investigation_status: 'Completed',
    },
    {
      id: 5,
      date: '2026-08-05',
      type: 'Adverse Event Report',
      device_name: 'Ventilator V-102',
      manufacturer: 'MedTech Inc.',
      severity: 'Critical',
      status: 'Open',
      description: 'Patient experienced delayed alarm response. Device requires firmware update.',
      actions_taken: 'Firmware update scheduled. Device restricted to backup use only.',
      investigation_status: 'In Progress',
    },
    {
      id: 6,
      date: '2026-07-28',
      type: 'Compliance Violation',
      device_name: 'Blood Pressure Monitor',
      manufacturer: 'Health Solutions Ltd.',
      severity: 'Low',
      status: 'Resolved',
      description: 'Device maintenance log incomplete. Missing calibration records.',
      actions_taken: 'Records updated and filed. Compliance training provided to staff.',
      investigation_status: 'Completed',
    },
  ];

  const filteredIncidents = mockIncidents.filter((incident) => {
    const statusMatch = filterStatus === 'all' || incident.status === filterStatus;
    const severityMatch = filterSeverity === 'all' || incident.severity === filterSeverity;
    return statusMatch && severityMatch;
  });

  const getSeverityClass = (severity) => {
    return `severity-${severity.toLowerCase()}`;
  };

  const getStatusClass = (status) => {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  };

  const stats = {
    total: mockIncidents.length,
    open: mockIncidents.filter((i) => i.status === 'Open').length,
    inProgress: mockIncidents.filter((i) => i.status === 'In Progress').length,
    resolved: mockIncidents.filter((i) => i.status === 'Resolved').length,
  };

  return (
    <div className="incidents-page">
      <div className="page-header">
        <h1>Safety & Recall Information</h1>
        <p>Track incidents, adverse events, and manufacturer recalls</p>
      </div>

      <div className="incidents-stats">
        <div className="stat-box">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Incidents</span>
        </div>
        <div className="stat-box open">
          <span className="stat-number">{stats.open}</span>
          <span className="stat-label">Open Issues</span>
        </div>
        <div className="stat-box in-progress">
          <span className="stat-number">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-box resolved">
          <span className="stat-number">{stats.resolved}</span>
          <span className="stat-label">Resolved</span>
        </div>
      </div>

      <div className="incidents-controls">
        <div className="filter-group">
          <label>Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Severity</label>
          <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
            <option value="all">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button
          className="reset-btn"
          onClick={() => {
            setFilterStatus('all');
            setFilterSeverity('all');
          }}
        >
          Reset Filters
        </button>
      </div>

      <div className="incidents-list">
        {filteredIncidents.length === 0 ? (
          <div className="empty-state">
            <p>No incidents found matching your criteria</p>
          </div>
        ) : (
          filteredIncidents.map((incident) => (
            <div key={incident.id} className="incident-card">
              <div className="incident-header">
                <div className="incident-title">
                  <h3>{incident.type}</h3>
                  <span className="incident-date">
                    {new Date(incident.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="incident-badges">
                  <span className={`severity-badge ${getSeverityClass(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className={`status-badge ${getStatusClass(incident.status)}`}>
                    {incident.status}
                  </span>
                </div>
              </div>

              <div className="device-info">
                <strong>{incident.device_name}</strong>
                <span className="manufacturer">{incident.manufacturer}</span>
              </div>

              <div className="incident-description">
                <h4>Description</h4>
                <p>{incident.description}</p>
              </div>

              <div className="incident-details-grid">
                <div className="detail-box">
                  <h4>Actions Taken</h4>
                  <p>{incident.actions_taken}</p>
                </div>
                <div className="detail-box">
                  <h4>Investigation Status</h4>
                  <p className="investigation-status">{incident.investigation_status}</p>
                </div>
              </div>

              <button className="view-more-btn">View Full Details →</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Incidents;
