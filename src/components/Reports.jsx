import React, { useState } from 'react';
import './Reports.css';

function Reports() {
  const [selectedReport, setSelectedReport] = useState('risk-summary');
  const [dateRange, setDateRange] = useState('30days');

  const reports = [
    {
      id: 'risk-summary',
      name: 'Risk Summary Report',
      icon: '📊',
      description: 'Overview of current risk landscape across all devices',
      lastGenerated: '2026-08-14',
      format: ['PDF', 'Excel'],
    },
    {
      id: 'device-inventory',
      name: 'Device Inventory Report',
      icon: '📋',
      description: 'Complete listing of all devices with current status',
      lastGenerated: '2026-08-13',
      format: ['PDF', 'Excel'],
    },
    {
      id: 'maintenance-schedule',
      name: 'Maintenance Schedule',
      icon: '🔧',
      description: 'Upcoming and overdue maintenance tasks',
      lastGenerated: '2026-08-12',
      format: ['PDF', 'Excel', 'Calendar'],
    },
    {
      id: 'incident-analysis',
      name: 'Incident Analysis Report',
      icon: '⚠️',
      description: 'Detailed analysis of incidents and corrective actions',
      lastGenerated: '2026-08-14',
      format: ['PDF', 'Excel'],
    },
    {
      id: 'compliance',
      name: 'Compliance Report',
      icon: '✓',
      description: 'Regulatory compliance status and audit trail',
      lastGenerated: '2026-08-10',
      format: ['PDF'],
    },
    {
      id: 'trend-analysis',
      name: 'Risk Trend Analysis',
      icon: '📈',
      description: 'Historical risk trends and predictive analysis',
      lastGenerated: '2026-08-14',
      format: ['PDF', 'Excel'],
    },
  ];

  const selectedReportData = reports.find((r) => r.id === selectedReport);

  const reportContent = {
    'risk-summary': {
      sections: [
        {
          title: 'Executive Summary',
          content:
            'This report provides a comprehensive overview of the medical device risk landscape. Current assessment shows 287 active devices with an average risk score of 45.2/100.',
        },
        {
          title: 'Key Findings',
          items: [
            '12 devices at Critical risk level requiring immediate attention',
            '45 devices at High risk level requiring priority maintenance',
            '145 devices at Medium risk level under monitoring',
            '85 devices at Low risk level',
          ],
        },
        {
          title: 'Recommendations',
          items: [
            'Escalate 12 critical devices for immediate inspection',
            'Schedule preventive maintenance for 45 high-risk devices within 7 days',
            'Implement enhanced monitoring for medium-risk devices',
            'Continue routine maintenance for low-risk devices',
          ],
        },
      ],
    },
    'device-inventory': {
      sections: [
        {
          title: 'Device Count by Category',
          items: [
            'Respiratory Devices: 120',
            'Patient Monitors: 105',
            'Infusion Pumps: 95',
            'Diagnostic Devices: 80',
            'Emergency Equipment: 40',
            'Other Devices: 47',
          ],
        },
        {
          title: 'Status Distribution',
          items: [
            'Active Devices: 275',
            'Under Maintenance: 8',
            'Retired: 4',
          ],
        },
      ],
    },
    'maintenance-schedule': {
      sections: [
        {
          title: 'Overdue Tasks',
          items: [
            'Ventilator V-102: Preventive maintenance (2 hours)',
            'Oxygen Concentrator: Repair and replacement (3 hours)',
          ],
        },
        {
          title: 'Scheduled This Month',
          items: [
            'Infusion Pump IP-45: Calibration',
            'Patient Monitor PM-21: Preventive maintenance',
            'ECG Device: Calibration',
            'Blood Pressure Monitor: Preventive maintenance',
          ],
        },
      ],
    },
    'incident-analysis': {
      sections: [
        {
          title: 'Incident Statistics',
          items: [
            'Total Incidents: 6',
            'Open Issues: 2',
            'In Progress: 1',
            'Resolved: 3',
          ],
        },
        {
          title: 'Critical Incidents Requiring Action',
          items: [
            'Ventilator V-102: Unexpected shutdown during patient use',
            'Oxygen Concentrator: Repair and system testing required',
          ],
        },
      ],
    },
  };

  const content = reportContent[selectedReport] || { sections: [] };

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Reports & Analytics</h1>
        <p>Generate, view, and export comprehensive reports</p>
      </div>

      <div className="reports-container">
        <div className="reports-sidebar">
          <h3>Available Reports</h3>
          <div className="reports-list">
            {reports.map((report) => (
              <button
                key={report.id}
                className={`report-option ${selectedReport === report.id ? 'active' : ''}`}
                onClick={() => setSelectedReport(report.id)}
              >
                <span className="report-icon">{report.icon}</span>
                <span className="report-name">{report.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="reports-content">
          {selectedReportData && (
            <>
              <div className="report-header">
                <div>
                  <h2>{selectedReportData.name}</h2>
                  <p>{selectedReportData.description}</p>
                </div>
                <div className="report-actions">
                  <div className="date-range-select">
                    <label>Date Range</label>
                    <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                      <option value="7days">Last 7 Days</option>
                      <option value="30days">Last 30 Days</option>
                      <option value="90days">Last 90 Days</option>
                      <option value="1year">Last Year</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  <button className="export-btn">📥 Export PDF</button>
                  <button className="export-btn excel">📊 Export Excel</button>
                </div>
              </div>

              <div className="report-info">
                <span>Last Generated: {selectedReportData.lastGenerated}</span>
                <span>Available Formats: {selectedReportData.format.join(', ')}</span>
              </div>

              <div className="report-preview">
                <h3>Report Preview</h3>
                {content.sections.map((section, index) => (
                  <div key={index} className="report-section">
                    <h4>{section.title}</h4>
                    {section.content && <p>{section.content}</p>}
                    {section.items && (
                      <ul>
                        {section.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="report-actions-footer">
                <button className="btn-primary">📥 Download Full Report</button>
                <button className="btn-secondary">🖨️ Print Report</button>
                <button className="btn-secondary">📧 Email Report</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
