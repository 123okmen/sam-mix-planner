import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PlannerPage from './pages/PlannerPage';
import RecipePage from './pages/RecipePage';
import './index.css';

function App() {
  return (
    <HashRouter>
      <nav style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000, background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 Trang Khách</Link>
        <Link to="/recipes" style={{ color: '#f39c12', textDecoration: 'none', fontWeight: 'bold' }}>📖 Công Thức</Link>
        <Link to="/planner" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>🛠️ Cổ Đông</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/planner" element={<PlannerPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
