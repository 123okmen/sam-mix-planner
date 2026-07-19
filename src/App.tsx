import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PlannerPage from './pages/PlannerPage';
import './index.css';

function App() {
  return (
    <HashRouter>
      <nav style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000, background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px' }}>
        <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>🏠 Trang Khách</Link>
        <Link to="/planner" style={{ color: 'white', textDecoration: 'none' }}>🛠️ Quản Lý Cổ Đông</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/planner" element={<PlannerPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
