import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import PosPage from './pages/PosPage';
import StaffPage from './pages/StaffPage';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'pos' | 'staff'>('landing');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <span className="brand-icon">🌿</span>
            <span className="brand-title">SÂM MIX</span>
          </div>
          <nav className="nav-tabs">
            <button 
              className={activeTab === 'landing' ? 'nav-tab active' : 'nav-tab'}
              onClick={() => setActiveTab('landing')}
            >
              🏠 Trang Chủ (Khách)
            </button>
            <button 
              className={activeTab === 'pos' ? 'nav-tab active' : 'nav-tab'}
              onClick={() => setActiveTab('pos')}
            >
              💻 Bán Hàng (POS)
            </button>
            <button 
              className={activeTab === 'staff' ? 'nav-tab active' : 'nav-tab'}
              onClick={() => setActiveTab('staff')}
            >
              👥 Nhân Viên
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'pos' && <PosPage />}
        {activeTab === 'staff' && <StaffPage />}
      </main>
    </div>
  );
}
