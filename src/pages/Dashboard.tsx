import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const { authenticated, ready, user, logout } = usePrivy();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  useEffect(() => {
    if (ready && !authenticated) {
      navigate('/login');
    }
  }, [ready, authenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!ready || !authenticated) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // Sample data for charts
  const barChartData = [65, 78, 82, 70, 88, 75, 90, 85];
  const areaChartData = [40, 55, 65, 70, 75, 80, 85, 90];
  const donutData = [
    { label: 'Rain', value: 35, color: '#00d4ff' },
    { label: 'Sunny', value: 28, color: '#6366f1' },
    { label: 'Cloudy', value: 22, color: '#8b5cf6' },
    { label: 'Snow', value: 15, color: '#ec4899' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">🌍</div>
            <span className="logo-text">wEaTHer</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div 
              className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveMenu('dashboard')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span>Dashboard</span>
            </div>
            <div 
              className={`nav-item ${activeMenu === 'markets' ? 'active' : ''}`}
              onClick={() => navigate('/markets')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span>Markets</span>
            </div>
            <div 
              className={`nav-item ${activeMenu === 'predictions' ? 'active' : ''}`}
              onClick={() => setActiveMenu('predictions')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <span>My Predictions</span>
            </div>
            <div 
              className={`nav-item ${activeMenu === 'history' ? 'active' : ''}`}
              onClick={() => setActiveMenu('history')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <span>History</span>
          </div>
            <div 
              className={`nav-item ${activeMenu === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setActiveMenu('leaderboard')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>Leaderboard</span>
            </div>
          </div>
          <div className="nav-section">
            <div className="nav-section-title">Settings</div>
            <div 
              className={`nav-item ${activeMenu === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveMenu('settings')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/>
              </svg>
              <span>Settings</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main-wrapper">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search here..." />
          </div>
          <div className="header-actions">
            <button className="header-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button className="header-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                {user?.wallet?.address?.slice(0, 2).toUpperCase() || 'U'}
              </div>
              <span className="user-name">
                {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4) ||
                 user?.email?.address || 'User'}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
            </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="dashboard-main">
          {/* Overview Section */}
          <section className="overview-section">
            <h2 className="section-title">Overview Performance in 2024</h2>
            <div className="overview-grid">
              {/* Left Card - KPIs and Bar Chart */}
              <div className="overview-card">
                <div className="kpi-row">
                  <div className="kpi-item">
                    <span className="kpi-label">Sales</span>
                    <span className="kpi-value">9.28K</span>
                    <span className="kpi-trend up">↑</span>
                  </div>
                  <div className="kpi-item">
                    <span className="kpi-label">Profit</span>
                    <span className="kpi-value">3.60K</span>
                    <span className="kpi-trend up">↑</span>
              </div>
                  <div className="kpi-item">
                    <span className="kpi-label">Avg. Sale</span>
                    <span className="kpi-value">0.94K</span>
                    <span className="kpi-trend up">↑</span>
                  </div>
                </div>
                <div className="chart-container">
                  <div className="chart-title">Sales Trend</div>
                  <div className="bar-chart">
                    {barChartData.map((height, i) => (
                      <div key={i} className="bar-wrapper">
                        <div 
                          className="bar" 
                          style={{ height: `${height}%` }}
                        />
                        <span className="bar-label">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Card - KPIs and Area Chart */}
              <div className="overview-card">
                <div className="kpi-row">
                  <div className="kpi-item">
                    <span className="kpi-label">Total</span>
                    <span className="kpi-value">2.39K</span>
                    <span className="kpi-trend up">↑</span>
                  </div>
                  <div className="kpi-item">
                    <span className="kpi-label">Orders</span>
                    <span className="kpi-value">3.99K</span>
                    <span className="kpi-trend up">↑</span>
            </div>
                  <div className="kpi-item">
                    <span className="kpi-label">Total</span>
                    <span className="kpi-value">28.49%</span>
                    <span className="kpi-trend up">↑</span>
              </div>
                  <div className="kpi-item">
                    <span className="kpi-label">Profit</span>
                    <span className="kpi-value">5.98%</span>
                    <span className="kpi-trend up">↑</span>
                  </div>
                </div>
                <div className="chart-container">
                  <div className="chart-title">Growth Trend</div>
                  <div className="area-chart">
                    <svg viewBox="0 0 300 120" className="area-chart-svg">
                      <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path
                        d={`M 0,${120 - areaChartData[0] * 0.8} ${areaChartData.map((val, i) => `L ${(i + 1) * 37.5},${120 - val * 0.8}`).join(' ')} L 300,120 L 0,120 Z`}
                        fill="url(#areaGradient)"
                      />
                      <path
                        d={`M 0,${120 - areaChartData[0] * 0.8} ${areaChartData.map((val, i) => `L ${(i + 1) * 37.5},${120 - val * 0.8}`).join(' ')}`}
                        fill="none"
                        stroke="#00d4ff"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Middle Section */}
          <section className="middle-section">
            {/* Lead Table */}
            <div className="table-card">
              <h3 className="card-title">Recent Predictions</h3>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Prediction</th>
                      <th>Status</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="table-cell-content">
                          <div className="table-avatar">JW</div>
                          <span>New York Rain</span>
                        </div>
                      </td>
                      <td>New York</td>
                      <td>Will rain</td>
                      <td><span className="status-badge active">Active</span></td>
                      <td>
                        <svg width="60" height="20" viewBox="0 0 60 20" className="mini-chart">
                          <polyline points="5,15 15,10 25,12 35,8 45,5 55,3" fill="none" stroke="#00d4ff" strokeWidth="2"/>
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-cell-content">
                          <div className="table-avatar">EH</div>
                          <span>London Temp</span>
                        </div>
                      </td>
                      <td>London</td>
                      <td>Above 20°C</td>
                      <td><span className="status-badge active">Active</span></td>
                      <td>
                        <svg width="60" height="20" viewBox="0 0 60 20" className="mini-chart">
                          <polyline points="5,10 15,8 25,6 35,4 45,3 55,2" fill="none" stroke="#6366f1" strokeWidth="2"/>
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-cell-content">
                          <div className="table-avatar">GH</div>
                          <span>Tokyo Humidity</span>
                        </div>
                      </td>
                      <td>Tokyo</td>
                      <td>Above 70%</td>
                      <td><span className="status-badge active">Active</span></td>
                      <td>
                        <svg width="60" height="20" viewBox="0 0 60 20" className="mini-chart">
                          <polyline points="5,12 15,10 25,8 35,6 45,4 55,3" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-cell-content">
                          <div className="table-avatar">WW</div>
                          <span>Seoul Snow</span>
                        </div>
                      </td>
                      <td>Seoul</td>
                      <td>Will snow</td>
                      <td><span className="status-badge active">Active</span></td>
                      <td>
                        <svg width="60" height="20" viewBox="0 0 60 20" className="mini-chart">
                          <polyline points="5,8 15,6 25,5 35,4 45,3 55,2" fill="none" stroke="#ec4899" strokeWidth="2"/>
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Markets */}
            <div className="table-card">
              <h3 className="card-title">Active Markets</h3>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Market</th>
                      <th>Date</th>
                      <th>Pool</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>New York Weather</td>
                      <td>12/02/2024</td>
                      <td>$1,234</td>
                      <td><span className="status-badge active">Active</span></td>
                    </tr>
                    <tr>
                      <td>London Temperature</td>
                      <td>12/02/2024</td>
                      <td>$856</td>
                      <td><span className="status-badge active">Active</span></td>
                    </tr>
                    <tr>
                      <td>Tokyo Humidity</td>
                      <td>12/02/2024</td>
                      <td>$2,145</td>
                      <td><span className="status-badge active">Active</span></td>
                    </tr>
                    <tr>
                      <td>Seoul Snow</td>
                      <td>12/02/2024</td>
                      <td>$1,567</td>
                      <td><span className="status-badge active">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
                  </div>

            {/* Donut Chart */}
            <div className="chart-card">
              <h3 className="card-title">Weather Distribution</h3>
              <div className="donut-chart-container">
                <svg width="200" height="200" viewBox="0 0 200 200" className="donut-chart">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#1e293b" strokeWidth="40"/>
                  {donutData.map((item, i) => {
                    const total = donutData.reduce((sum, d) => sum + d.value, 0);
                    const startAngle = donutData.slice(0, i).reduce((sum, d) => sum + (d.value / total) * 360, 0);
                    const endAngle = startAngle + (item.value / total) * 360;
                    const startX = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                    const startY = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                    const endX = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
                    const endY = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
                    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                    return (
                      <path
                        key={i}
                        d={`M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArc} 1 ${endX} ${endY} Z`}
                        fill={item.color}
                      />
                    );
                  })}
                  <circle cx="100" cy="100" r="50" fill="#0f172a"/>
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="24" fontWeight="700">
                    {donutData.reduce((sum, d) => sum + d.value, 0)}%
                  </text>
                </svg>
                <div className="donut-legend">
                  {donutData.map((item, i) => (
                    <div key={i} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                      <span>{item.label}</span>
                      <span className="legend-value">{item.value}%</span>
                  </div>
                  ))}
                </div>
            </div>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}

export default Dashboard;
