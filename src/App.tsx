import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PlannerPage from './pages/PlannerPage';
import StaffPage from './pages/StaffPage';
import RecipePage from './pages/RecipePage';
import './index.css';

function App() {
  return (
    <HashRouter>
      <nav style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000, background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🏠 Trang Chủ</Link>
        <Link to="/staff" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>🧑‍🍳 Nhân Viên</Link>
                <Link to="/recipe" style={{ color: '#f1c40f', textDecoration: 'none', fontWeight: 'bold' }}>🎉 Khai Trương 10K</Link>
        <Link to="/planner" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>📊 Cổ Đông</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/staff" element={<StaffPage />} />
        
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/planner" element={<PlannerPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
