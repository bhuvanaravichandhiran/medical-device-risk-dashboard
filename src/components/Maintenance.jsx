import React, { useState } from 'react';
import './Maintenance.css';

function Maintenance() {
  const [filterStatus, setFilterStatus] = useState('all');

  const mockMaintenanceTasks = [
    {
      id: 1,
      device_name: 'Ventilator V-102',
      manufacturer: 'MedTech Inc.',
      maintenance_type: 'Preventive',
      scheduled_date: '2026-08-16',
      status: 'Overdue',
      last_completed: '2026-06-15',
      priority: 'Critical',
      estimated_duration: '2 hours',
      tasks: [
        'Check power supply voltage',
        'Verify alarm functionality',
        'Inspect fan and filters',
        'Recalibrate pressure sensors',
      ],
    },
    {
      id: 2,
      device_name: 'Infusion Pump IP-45',
      manufacturer: 'Health Solutions Ltd.',
      maintenance_type: 'Calibration',
      scheduled_date: '2026-08-20',
      status: 'Scheduled',
      last_completed: '2026-05-20',
      priority: 'High',
      estimated_duration: '1.5 hours',
      tasks: [
        'Verify flow rate accuracy',
        'Check dose accuracy',
        'Test safety limits',
        'Update software if available',
      ],
    },
    {
      id: 3,
      device_name: 'Patient Monitor PM-21',
      manufacturer: 'CardioTech Industries',
      maintenance_type: 'Preventive',
      scheduled_date: '2026-08-15',
      status: 'In Progress',
      last_completed: '2026-07-15',
      priority: 'High',
      estimated_duration: '1 hour',
      tasks: [
        'Replace electrodes',
        'Check battery condition',
        'Verify signal quality',
        'Test all alarm functions',
      ],
    },
    {
      id: 4,
      device_name: 'ECG Device',
      manufacturer: 'CardioTech Industries',
      maintenance_type: 'Calibration',
      scheduled_date: '2026-08-25',
      status: 'Scheduled',
      last_completed: '2026-08-08',
      priority: 'Medium',
      estimated_duration: '45 minutes',
      tasks: [
        'Calibrate electrocardiograph',
        'Verify accuracy within tolerance',
        'Check display quality',
        'Test connectivity',
      ],
    },
    {
      id: 5,
      device_name: 'Blood Pressure Monitor',
      manufacturer: 'Health Solutions Ltd.',
      maintenance_type: 'Preventive',
      scheduled_date: '2026-08-22',
      status: 'Scheduled',
      last_completed: '2026-06-22',
      priority: 'Medium',
      estimated_duration: '30 minutes',
      tasks: [
        'Check tubing and connections',
        'Verify measurement accuracy',
        'Clean sensor',
        'Test memory and data transfer',
      ],
    },
    {
      id: 6,
      device_name: 'Oxygen Concentrator',
      manufacturer: 'RespireCare Ltd.',
      maintenance_type: 'Repair',
      scheduled_date: '2026-08-17',
      status: 'In Progress',
      last_completed: '2026-07-20',
      priority: 'Critical',
      estimated_duration: '3 hours',
      tasks: [
        'Inspect and replace filters',
        'Check oxygen purity output',
        'Verify compressor function',
        'Test all safety features',
      ],
    },
  ];

  const filteredTasks = mockMaintenanceTasks.filter((task) => {
    if (filterStatus === 'all') return true;
    return task.status === filterStatus;
  });

  const getStatusClass = (status) => {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority.toLowerCase()}`;
  };

  const stats = {
    total: mockMaintenanceTasks.length,
    overdue: mockMaintenanceTasks.filter((t) => t.status === 'Overdue').length,
    inProgress: mockMaintenanceTasks.filter((t) => t.status === 'In Progress').length,
    scheduled: mockMaintenanceTasks.filter((t) => t.status === 'Scheduled').length,
    completed: mockMaintenanceTasks.filter((t) => t.status === 'Completed').length,
  };

  return (
    <div className="maintenance-page">
      <div className="page-header">
        <h1>Maintenance Management</h1>
        <p>Track and manage preventive maintenance tasks and schedules</p>
      </div>

      <div className="maintenance-stats">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card overdue">
          <span className="stat-value">{stats.overdue}</span>
          <span className="stat-label">Overdue</span>
        </div>
        <div className="stat-card in-progress">
          <span className="stat-value">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card scheduled">
          <span className="stat-value">{stats.scheduled}</span>
          <span className="stat-label">Scheduled</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="maintenance-controls">
        <div className="filter-group">
          <label>Filter by Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="Overdue">Overdue</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          className="reset-btn"
          onClick={() => setFilterStatus('all')}
        >
          Reset Filter
        </button>
      </div>

      <div className="maintenance-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>No maintenance tasks found</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="maintenance-card">
              <div className="card-header">
                <div className="card-title">
                  <h3>{task.device_name}</h3>
                  <p className="manufacturer">{task.manufacturer}</p>
                </div>
                <div className="card-badges">
                  <span className={`status-badge ${getStatusClass(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>

              <div className="card-meta">
                <div className="meta-item">
                  <span className="meta-label">Maintenance Type</span>
                  <span className="meta-value">{task.maintenance_type}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Scheduled Date</span>
                  <span className="meta-value">
                    {new Date(task.scheduled_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Duration</span>
                  <span className="meta-value">{task.estimated_duration}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Last Completed</span>
                  <span className="meta-value">
                    {new Date(task.last_completed).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="maintenance-tasks">
                <h4>Tasks to Complete</h4>
                <ul>
                  {task.tasks.map((taskItem, idx) => (
                    <li key={idx}>
                      <span className="checkbox">☐</span>
                      <span className="task-text">{taskItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-actions">
                <button className="action-btn primary">
                  {task.status === 'In Progress' ? 'Continue' : 'Start'} Maintenance
                </button>
                <button className="action-btn secondary">Schedule</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Maintenance;
