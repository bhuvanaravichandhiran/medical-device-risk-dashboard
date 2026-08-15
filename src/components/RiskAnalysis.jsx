import React, { useState } from 'react';
import './RiskAnalysis.css';

function RiskAnalysis() {
  const [selectedDevice, setSelectedDevice] = useState(null);

  const mockDevices = [
    {
      id: 1,
      name: 'Ventilator V-102',
      manufacturer: 'MedTech Inc.',
      model: 'VM-2024-001',
      risk_score: 92,
      severity: 'Critical',
      shap_factors: [
        { factor: 'Age of Device', importance: 0.28, impact: 'High' },
        { factor: 'Previous Failures', importance: 0.22, impact: 'High' },
        { factor: 'Maintenance History', importance: 0.18, impact: 'Medium' },
        { factor: 'Usage Hours', importance: 0.15, impact: 'Medium' },
        { factor: 'Environmental Conditions', importance: 0.12, impact: 'Low' },
        { factor: 'Calibration Status', importance: 0.05, impact: 'Low' },
      ],
      recommendations: [
        '🔴 CRITICAL: Immediate inspection required',
        '⚠️ Schedule preventive maintenance within 48 hours',
        '📋 Review recent incident history',
        '🔧 Check calibration and electrical systems',
        '🧪 Perform comprehensive diagnostic tests',
      ],
      last_failure: '2026-07-15',
      maintenance_due: '2026-08-16',
    },
    {
      id: 2,
      name: 'Infusion Pump IP-45',
      manufacturer: 'Health Solutions Ltd.',
      model: 'IP-2024-045',
      risk_score: 87,
      severity: 'High',
      shap_factors: [
        { factor: 'Software Version', importance: 0.30, impact: 'High' },
        { factor: 'Previous Errors', importance: 0.25, impact: 'High' },
        { factor: 'Usage Frequency', importance: 0.20, impact: 'Medium' },
        { factor: 'Parts Replacement', importance: 0.15, impact: 'Medium' },
        { factor: 'Power Cycles', importance: 0.10, impact: 'Low' },
      ],
      recommendations: [
        '⚠️ HIGH PRIORITY: Schedule maintenance within 1 week',
        '📱 Consider software update availability',
        '🔍 Monitor error logs closely',
        '🧰 Review infusion accuracy tests',
      ],
      last_failure: '2026-06-20',
      maintenance_due: '2026-08-20',
    },
    {
      id: 3,
      name: 'Patient Monitor PM-21',
      manufacturer: 'CardioTech Industries',
      model: 'PM-2024-021',
      risk_score: 81,
      severity: 'High',
      shap_factors: [
        { factor: 'Electrode Wear', importance: 0.27, impact: 'High' },
        { factor: 'Battery Condition', importance: 0.23, impact: 'High' },
        { factor: 'Signal Quality', importance: 0.20, impact: 'Medium' },
        { factor: 'Display Issues', importance: 0.16, impact: 'Medium' },
        { factor: 'Alarm Settings', importance: 0.14, impact: 'Low' },
      ],
      recommendations: [
        '📌 Replace electrodes and battery',
        '🔋 Test battery backup functionality',
        '📊 Verify signal quality thresholds',
        '⚡ Check all alarm functionalities',
      ],
      last_failure: '2026-07-01',
      maintenance_due: '2026-08-15',
    },
  ];

  const device = selectedDevice
    ? mockDevices.find((d) => d.id === selectedDevice)
    : mockDevices[0];

  if (!device) {
    return <div className="risk-analysis-page">Loading...</div>;
  }

  const getSeverityClass = (severity) => {
    return `severity-${severity.toLowerCase()}`;
  };

  return (
    <div className="risk-analysis-page">
      <div className="page-header">
        <h1>Risk Analysis</h1>
        <p>Detailed risk assessment with explainable AI factors (SHAP)</p>
      </div>

      <div className="analysis-container">
        <div className="device-selector">
          <h3>Select Device</h3>
          <div className="device-list">
            {mockDevices.map((d) => (
              <button
                key={d.id}
                className={`device-option ${selectedDevice === d.id ? 'active' : ''}`}
                onClick={() => setSelectedDevice(d.id)}
              >
                <div className="device-name">{d.name}</div>
                <div className="device-score">
                  <span className={`score-badge ${getSeverityClass(d.severity)}`}>
                    {d.risk_score}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="analysis-content">
          {/* Risk Score Overview */}
          <section className="analysis-section risk-overview">
            <h2>Risk Assessment Overview</h2>
            <div className="overview-grid">
              <div className="overview-card">
                <span className="label">Risk Score</span>
                <div className={`large-score ${getSeverityClass(device.severity)}`}>
                  {device.risk_score}
                </div>
                <span className="severity">{device.severity}</span>
              </div>

              <div className="overview-card">
                <span className="label">Device Information</span>
                <div className="device-info">
                  <p>
                    <strong>{device.name}</strong>
                  </p>
                  <p>{device.manufacturer}</p>
                  <p className="model">Model: {device.model}</p>
                </div>
              </div>

              <div className="overview-card">
                <span className="label">Maintenance Status</span>
                <div className="maintenance-info">
                  <p className="last-failure">
                    Last Failure: {new Date(device.last_failure).toLocaleDateString()}
                  </p>
                  <p className="maintenance-due">
                    Maintenance Due: {new Date(device.maintenance_due).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SHAP Factors */}
          <section className="analysis-section shap-factors">
            <h2>Risk Factors (SHAP Feature Attribution)</h2>
            <div className="shap-container">
              {device.shap_factors.map((factor, index) => (
                <div key={index} className="shap-factor">
                  <div className="factor-info">
                    <span className="factor-name">{factor.factor}</span>
                    <span className={`impact-badge impact-${factor.impact.toLowerCase()}`}>
                      {factor.impact}
                    </span>
                  </div>
                  <div className="factor-bar">
                    <div
                      className="factor-fill"
                      style={{ width: `${factor.importance * 100}%` }}
                    ></div>
                  </div>
                  <span className="factor-value">{(factor.importance * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <section className="analysis-section recommendations">
            <h2>Recommendations</h2>
            <div className="recommendations-list">
              {device.recommendations.map((rec, index) => (
                <div key={index} className="recommendation-item">
                  <span className="recommendation-text">{rec}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recall Events */}
          <section className="analysis-section recall-events">
            <h2>Related Recall Events</h2>
            <div className="recall-table">
              <table>
                <thead>
                  <tr>
                    <th>Recall Date</th>
                    <th>Reason</th>
                    <th>Severity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2026-06-15</td>
                    <td>Potential safety issue with power supply</td>
                    <td>
                      <span className="recall-severity critical">Critical</span>
                    </td>
                    <td>
                      <span className="recall-status resolved">Resolved</span>
                    </td>
                  </tr>
                  <tr>
                    <td>2026-05-20</td>
                    <td>Firmware update required</td>
                    <td>
                      <span className="recall-severity high">High</span>
                    </td>
                    <td>
                      <span className="recall-status resolved">Resolved</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RiskAnalysis;
