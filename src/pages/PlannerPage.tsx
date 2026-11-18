import { useEffect, useMemo, useState } from 'react';
import LoginGate from '../components/LoginGate';

const API_URL = 'https://script.google.com/macros/s/AKfycbyETg2znWnDrNsgq3G2eB0IJxFeb_GdLKo5N68FkFlJVMvTzdt_M_C3YFzL7fcgiyY1/exec?action=data';
const fmtVND = (v: number) => (v || 0).toLocaleString('vi-VN') + ' đ';
type Period = 'live' | '7d' | '30d' | 'month';
type Row = { day: string; revenue: number };
type RevenueData = { ok: boolean; kpi?: { doanhThu?: number; tienMat?: number; soDon?: number; soMon?: number }; ngay30?: { keys?: string[]; vals?: number[] }; thangNay?: { doanhThu?: number } };

export default function PlannerPage() {
  const [period, setPeriod] = useState<Period>('live');
  const [data, setData] = useState<RevenueData | null>(null);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const fetchData = async () => {
    try {
      const r = await fetch(`${API_URL}&_=${Date.now()}`, { headers: { Accept: 'application/json' }, cache: 'no-store' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      if (!(r.headers.get('content-type') || '').includes('application/json')) throw new Error('Google Sheets không trả JSON');
      const d = await r.json() as RevenueData;
      if (!d.ok) throw new Error('API Google Sheets báo lỗi');
      setData(d); setError(''); setLastUpdate(new Date().toLocaleTimeString('vi-VN'));
    } catch (e) { setError(`Kết nối Google Sheets lỗi: ${e instanceof Error ? e.message : 'không rõ lỗi'}`); }
  };
  useEffect(() => { fetchData(); const timer = window.setInterval(fetchData, 30000); return () => window.clearInterval(timer); }, []);
  const days30 = useMemo<Row[]>(() => (data?.ngay30?.keys || []).map((day, i) => ({ day, revenue: Number(data?.ngay30?.vals?.[i] || 0) })), [data]);
  const days7 = days30.slice(-7);
  const rows = period === '7d' ? days7 : period === '30d' ? days30 : [];
  const total = period === 'live' ? Number(data?.kpi?.doanhThu || 0) : period === 'month' ? Number(data?.thangNay?.doanhThu || 0) : rows.reduce((sum, row) => sum + row.revenue, 0);
  const months = useMemo(() => { const groups: Record<string, number> = {}; for (const row of days30) { const p = row.day.split('/'); const key = p.length === 3 ? `${p[1]}/${p[2]}` : row.day; groups[key] = (groups[key] || 0) + row.revenue; } return Object.entries(groups); }, [days30]);
  return <LoginGate expectedPassword="sammixgymer" storageKey="auth_planner" title="Báo cáo doanh thu Sâm Mix">
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '1.4rem' }}><h1 style={{ color: '#10b981', margin: 0 }}>📊 SÂM MIX HEALTHY</h1><h2 style={{ margin: '8px 0', fontSize: '1.2rem' }}>BÁO CÁO DOANH THU</h2><span style={{ background: data ? '#16a34a' : '#b45309', padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{data ? `🟢 Google Sheets LIVE · ${lastUpdate}` : '🟡 Đang kết nối Google Sheets'}</span></header>
      {error && <div style={{ background: '#991b1b', padding: 12, borderRadius: 8, marginBottom: 16, textAlign: 'center' }}>⚠️ {error}</div>}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 }}>{([['live', '🔴 Live'], ['7d', '📅 7 ngày'], ['30d', '📆 30 ngày'], ['month', '🗓️ Tháng này']] as const).map(([key, label]) => <button key={key} type="button" onClick={() => setPeriod(key)} style={{ padding: '10px 16px', borderRadius: 20, border: `1px solid ${period === key ? '#34d399' : '#64748b'}`, background: period === key ? '#047857' : '#1e293b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>{label}</button>)}</div>
      <section style={{ background: 'rgba(255,255,255,.1)', borderRadius: 14, padding: 22, marginBottom: 18, textAlign: 'center' }}><div style={{ opacity: .8 }}>{period === 'live' ? 'DOANH THU LIVE HÔM NAY' : period === '7d' ? 'DOANH THU 7 NGÀY' : period === '30d' ? 'DOANH THU 30 NGÀY' : 'DOANH THU THÁNG HIỆN TẠI'}</div><div style={{ color: '#34d399', fontSize: '2.4rem', fontWeight: 800, margin: '8px 0' }}>{fmtVND(total)}</div>{period === 'live' && <div style={{ opacity: .8 }}>{data?.kpi?.soDon || 0} đơn · {data?.kpi?.soMon || 0} món · Tiền mặt {fmtVND(Number(data?.kpi?.tienMat || 0))}</div>}</section>
      {period !== 'live' && <section style={{ background: 'rgba(255,255,255,.08)', borderRadius: 14, padding: 16, marginBottom: 18 }}><h3 style={{ marginTop: 0, color: '#facc15' }}>Chi tiết doanh thu</h3>{period === 'month' ? <div>Tổng tháng hiện tại lấy trực tiếp từ sheet Don hang.</div> : rows.length ? rows.map(row => <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,.12)', padding: '10px 4px' }}><span>{row.day}</span><strong style={{ color: '#6ee7b7' }}>{fmtVND(row.revenue)}</strong></div>) : <div>Chưa có dữ liệu.</div>}</section>}
      <section style={{ background: 'rgba(255,255,255,.08)', borderRadius: 14, padding: 16, marginBottom: 18 }}><h3 style={{ marginTop: 0, color: '#60a5fa' }}>Các tháng có dữ liệu</h3>{months.length ? months.map(([month, revenue]) => <div key={month} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,.12)', padding: '10px 4px' }}><span>Tháng {month}</span><strong style={{ color: '#93c5fd' }}>{fmtVND(revenue)}</strong></div>) : <div>Chưa có dữ liệu tháng.</div>}</section>
      <div style={{ textAlign: 'center' }}><button type="button" onClick={fetchData} style={{ padding: '9px 16px', border: 0, borderRadius: 8, background: '#2563eb', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>↻ Cập nhật ngay</button></div>
    </div>
  </LoginGate>;
}
