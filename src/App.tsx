import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PlannerPage from './pages/PlannerPage';
import StaffPage from './pages/StaffPage';
import B2QuizPage from './pages/B2QuizPage';
import './index.css';

function App() {
  return (
    <HashRouter>
      <nav style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000, background: 'rgba(0,0,0,0.8)', padding: '10px 16px', borderRadius: '8px', display: 'flex', gap: '15px', flexWrap: 'wrap', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🏠 Trang Chủ</Link>
        <Link to="/staff" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>🧑‍🍳 Nhân Viên</Link>
        <Link to="/planner" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>📊 Cổ Đông</Link>
        <Link to="/b2-quiz" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 'bold' }}>🚗 Thi Lý Thuyết B2</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/b2-quiz" element={<B2QuizPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
