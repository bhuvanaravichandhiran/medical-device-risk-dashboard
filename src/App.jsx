import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">+</div>

          <div>
            <h2>MedRisk</h2>
            <span>Device Intelligence</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="navigation">

          <button className="nav-item active">
            <span>▣</span>
            Dashboard
          </button>

          <button className="nav-item">
            <span>▤</span>
            Devices
          </button>

          <button className="nav-item">
            <span>△</span>
            Risk Analysis
          </button>

          <button className="nav-item">
            <span>⊙</span>
            Incidents
          </button>

          <button className="nav-item">
            <span>⚒</span>
            Maintenance
          </button>

          <button className="nav-item">
            <span>▥</span>
            Reports
          </button>

        </nav>

        {/* Bottom Section */}
        <div className="sidebar-bottom">

          <button className="nav-item">
            <span>⚙</span>
            Settings
          </button>

          {/* User Profile */}
          <div className="profile">
            <div className="profile-circle">B</div>

            <div>
              <strong>Bhuvana</strong>
              <span>Biomedical Analyst</span>
            </div>
          </div>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="main">

        {/* Header */}
        <header className="header">

          <div>
            <h1>Medical Device Risk Dashboard</h1>

            <p>
              Monitor device safety, failure risks and preventive maintenance
            </p>
          </div>

          <div className="header-actions">

            <button className="notification">
              🔔
            </button>

            <div className="user-avatar">
              B
            </div>

          </div>

        </header>


        {/* Dashboard Component */}
        <Dashboard />

      </main>

    </div>
  );
}

export default App;