import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { generatePlan } from './lib/gemini';
import './index.css';

const ApiKeyModal = ({ onSave }: { onSave: (key: string) => void }) => {
  const [key, setKey] = useState('');

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <h2 style={{ marginTop: 0 }}>Kết Nối Gemini AI</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Vui lòng nhập Gemini API Key của bạn để sử dụng tính năng tạo kế hoạch bằng AI. Key được lưu cục bộ trên trình duyệt của bạn.</p>
        <input 
          type="password" 
          className="input-field" 
          placeholder="Nhập API Key (AIzaSy...)" 
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <button 
          className="btn-primary" 
          onClick={() => onSave(key)}
          disabled={!key.trim()}
          style={{ width: '100%' }}
        >
          Lưu & Bắt Đầu
        </button>
      </div>
    </div>
  );
};

function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveKey = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
  };

  const handleChangeKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey(null);
  };

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const newPlan = await generatePlan(apiKey!, idea);
      setPlan(newPlan);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!apiKey && <ApiKeyModal onSave={handleSaveKey} />}
      
      <header style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
        <button onClick={handleChangeKey} style={{ position: 'absolute', top: 0, right: 0, background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>⚙️ Đổi API Key</button>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', color: '#10b981' }}>Sâm Mix Planner</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Hệ thống AI tổng hợp ý tưởng cổ đông & thiết lập kế hoạch</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Cột Trái: Nhập Ý Tưởng */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3>💡 Thêm Ý Tưởng Mới</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Dữ liệu gốc (60m2 KDC Conic, vốn 80tr, vận hành ca gãy) đã được AI nạp sẵn.
          </p>
          <textarea 
            className="input-field" 
            rows={6}
            placeholder="Ví dụ: Tôi muốn bổ sung thêm món bánh mì vào buổi sáng, và thay đổi giờ đóng cửa tối thành 23h..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={loading || !idea.trim()}
          >
            {loading ? 'AI Đang Xử Lý...' : 'Tạo Kế Hoạch Bằng AI'}
          </button>
          {error && <div style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>{error}</div>}
        </div>

        {/* Cột Phải: Hiển Thị Kế Hoạch */}
        <div className="glass-panel markdown-body" style={{ minHeight: '400px' }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
              Đang phân tích ý tưởng và tổng hợp...
            </div>
          ) : plan ? (
            <ReactMarkdown>{plan}</ReactMarkdown>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
              Bản kế hoạch hoàn chỉnh sẽ hiển thị tại đây.
            </div>
          )}
        </div>
        
      </div>
    </>
  );
}

export default App;
