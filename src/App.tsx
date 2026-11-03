import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import PosPage from './pages/PosPage';
import StaffPage from './pages/StaffPage';
import PlannerPage from './pages/PlannerPage';
import './App.css';

export default function App() {
  const getTabFromUrl = (): 'landing' | 'pos' | 'staff' | 'planner' => {
    if (typeof window === 'undefined') return 'landing';
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (hash.includes('planner') || hash.includes('codong') || hash.includes('baocao') || hash.includes('report') || search.includes('codong') || search.includes('planner')) {
      return 'planner';
    }
    if (hash.includes('staff') || hash.includes('recipes') || hash.includes('chamcong')) {
      return 'staff';
    }
    if (hash.includes('pos') || hash.includes('order') || hash.includes('banhang')) {
      return 'pos';
    }
    return 'landing';
  };

  const [activeTab, setActiveTab] = useState<'landing' | 'pos' | 'staff' | 'planner'>(getTabFromUrl);

  // Listen to Hash change in URL
  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(getTabFromUrl());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changeTab = (tab: 'landing' | 'pos' | 'staff' | 'planner') => {
    setActiveTab(tab);
    window.location.hash = `#/${tab}`;
  };

  const isShareholderOnly = window.location.hash.toLowerCase().includes('codong') || 
                            window.location.search.toLowerCase().includes('codong');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="brand" onClick={() => changeTab('landing')}>
            <span className="brand-icon">🌿</span>
            <div>
              <div className="brand-title">SÂM MIX HEALTHY</div>
              <div className="brand-subtitle">
                {isShareholderOnly 
                  ? '📊 Cổng Thông Tin Báo Cáo Doanh Thu Cổ Đông' 
                  : 'Nước Sâm Thảo Mộc · Bánh Bao Kẹp Tai Bao · Nước Ép Tươi · KDC Conic'}
              </div>
            </div>
          </div>

          <nav className="nav-tabs">
            <button 
              className={activeTab === 'landing' ? 'nav-tab active' : 'nav-tab'}
              onClick={() => changeTab('landing')}
            >
              🏠 Thực Đơn (Khách)
            </button>
            <button 
              className={activeTab === 'pos' ? 'nav-tab active' : 'nav-tab'}
              onClick={() => changeTab('pos')}
            >
              💻 Bán Hàng (POS)
            </button>
            <button 
              className={activeTab === 'staff' ? 'nav-tab active' : 'nav-tab'}
              onClick={() => changeTab('staff')}
            >
              👥 Nhân Viên / Ca
            </button>
            <button 
              className={activeTab === 'planner' ? 'nav-tab active' : 'nav-tab'}
              onClick={() => changeTab('planner')}
            >
              📊 Báo Cáo Doanh Thu
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'pos' && <PosPage />}
        {activeTab === 'staff' && <StaffPage />}
        {activeTab === 'planner' && <PlannerPage />}
      </main>
    </div>
  );
}
