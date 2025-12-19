import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // localStorage에서 상태 불러오기
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });

  useEffect(() => {
    // 상태를 localStorage에 저장하고 body에 클래스 추가
    localStorage.setItem('sidebarCollapsed', String(isCollapsed));
    if (isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      // 필요시 정리 작업
    };
  }, [isCollapsed]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo" onClick={() => navigate('/app')}>
          <div className="logo-icon">🌍</div>
          {!isCollapsed && <span className="logo-text">wEaTHer</span>}
        </div>
        <button 
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isCollapsed ? (
              <path d="M9 18l6-6-6-6"/>
            ) : (
              <path d="M15 18l-6-6 6-6"/>
            )}
          </svg>
        </button>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div 
            className={`nav-item ${isActive('/app') ? 'active' : ''}`}
            onClick={() => navigate('/app')}
            title={isCollapsed ? 'Dashboard' : ''}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            {!isCollapsed && <span>Dashboard</span>}
          </div>
          <div 
            className={`nav-item ${isActive('/markets') ? 'active' : ''}`}
            onClick={() => navigate('/markets')}
            title={isCollapsed ? 'Markets' : ''}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            {!isCollapsed && <span>Markets</span>}
          </div>
          <div 
            className={`nav-item ${isActive('/predictions') ? 'active' : ''}`}
            onClick={() => navigate('/predictions')}
            title={isCollapsed ? 'My Predictions' : ''}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            {!isCollapsed && <span>My Predictions</span>}
          </div>
          <div 
            className={`nav-item ${isActive('/history') ? 'active' : ''}`}
            onClick={() => navigate('/history')}
            title={isCollapsed ? 'History' : ''}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            {!isCollapsed && <span>History</span>}
          </div>
          <div 
            className={`nav-item ${isActive('/leaderboard') ? 'active' : ''}`}
            onClick={() => navigate('/leaderboard')}
            title={isCollapsed ? 'Leaderboard' : ''}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            {!isCollapsed && <span>Leaderboard</span>}
          </div>
        </div>
        <div className="nav-section">
          {!isCollapsed && <div className="nav-section-title">Settings</div>}
          <div 
            className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
            onClick={() => navigate('/settings')}
            title={isCollapsed ? 'Settings' : ''}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/>
            </svg>
            {!isCollapsed && <span>Settings</span>}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;

