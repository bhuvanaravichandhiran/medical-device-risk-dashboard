import React from 'react';
import './RecentEvents.css';

function RecentEvents({ events, loading }) {
  const defaultEvents = [];

  const data = events || defaultEvents;

  const getSeverityColor = (severity) => {
    const severityMap = {
      Critical: '#d32f2f',
      High: '#f57c00',
      Medium: '#fbc02d',
      Low: '#388e3c',
    };
    return severityMap[severity] || '#999';
  };

  const getSeverityBadgeClass = (severity) => {
    return `severity-badge severity-${severity.toLowerCase()}`;
  };

  if (loading) {
    return (
      <div className="recent-events">
        <h2>Recent Assessments</h2>
        <div className="table-skeleton">
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-events">
      <h2>Recent Assessments</h2>
      {data.length === 0 ? (
        <div className="empty-state">
          <p>No assessment data available</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Risk Score</th>
                <th>Severity</th>
                <th>Assessment Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((event, index) => (
                <tr key={index}>
                  <td className="device-name">{event.device_name}</td>
                  <td>{event.manufacturer}</td>
                  <td>{event.model}</td>
                  <td className="risk-score">
                    <span className="score">{event.risk_score}</span>
                  </td>
                  <td>
                    <span className={getSeverityBadgeClass(event.severity)}>
                      {event.severity}
                    </span>
                  </td>
                  <td className="assessment-date">
                    {new Date(event.assessment_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentEvents;
