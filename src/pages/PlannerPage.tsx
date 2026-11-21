import { useEffect, useMemo, useState } from 'react';
import LoginGate from '../components/LoginGate';

const SHEET_CSV = 'https://docs.google.com/spreadsheets/d/1_0QCA-TeIsyDuilqh7rql7nnTnnxaQisKpuWObY0iMQ/gviz/tq?tqx=out:csv&sheet=Don%20hang';
const fmtVND = (v: number) => (v || 0).toLocaleString('vi-VN') + ' đ';
type Period = 'live' | '7d' | '30d' | 'month';
type Row = { day: string; revenue: number; orders: number; items: number; cash: number };
type RevenueData = { rows: Row[]; latestDay: string; latestMonth: string };

function parseCSV(text: string): string[][] {
  const out: string[][] = []; let row: string[] = []; let cell = ''; let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (c === '"' && quoted && next === '"') { cell += '"'; i++; continue; }
    if (c === '"') { quoted = !quoted; continue; }
    if (c === ',' && !quoted) { row.push(cell); cell = ''; continue; }
    if ((c === '\n' || c === '\r') && !quoted) { if (c === '\r' && next === '\n') i++; row.push(cell); if (row.some(Boolean)) out.push(row); row = []; cell = ''; continue; }
    cell += c;
  }
  if (cell || row.length) { row.push(cell); if (row.some(Boolean)) out.push(row); }
  return out;
}
function parseMoney(value: string) { const n = Number(String(value || '').replace(/[^0-9.-]/g, '')); return Number.isFinite(n) ? n : 0; }
function buildData(csv: string): RevenueData {
  const byDay: Record<string, Row> = {};
  for (const cells of parseCSV(csv).slice(1)) {
    const day = (cells[1] || '').trim(); if (!day) continue;
    const item = byDay[day] || { day, revenue: 0, orders: 0, items: 0, cash: 0 };
    item.revenue += parseMoney(cells[7]); item.orders++; item.items += parseMoney(cells[6]); item.cash += parseMoney(cells[8]); byDay[day] = item;
  }
  const rows = Object.values(byDay).sort((a, b) => { const [ad, am, ay] = a.day.split('/').map(Number), [bd, bm, by] = b.day.split('/').map(Number); return new Date(ay, am - 1, ad).getTime() - new Date(by, bm - 1, bd).getTime(); });
  const latestDay = rows.at(-1)?.day || ''; const p = latestDay.split('/');
  return { rows, latestDay, latestMonth: p.length === 3 ? `${p[1]}/${p[2]}` : '' };
}

export default function PlannerPage() {
  const [period, setPeriod] = useState<Period>('live'); const [data, setData] = useState<RevenueData | null>(null); const [error, setError] = useState(''); const [lastUpdate, setLastUpdate] = useState('');
  const fetchData = async () => { try { const response = await fetch(`${SHEET_CSV}&_=${Date.now()}`, { cache: 'no-store' }); if (!response.ok) throw new Error(`HTTP ${response.status}`); const next = buildData(await response.text()); if (!next.rows.length) throw new Error('Sheet Don hang không có dữ liệu'); setData(next); setError(''); setLastUpdate(new Date().toLocaleTimeString('vi-VN')); } catch (e) { setError(`Không đọc được Google Sheets: ${e instanceof Error ? e.message : 'không rõ lỗi'}`); } };
  useEffect(() => { fetchData(); const timer = window.setInterval(fetchData, 30000); return () => window.clearInterval(timer); }, []);
  const latest = data?.rows.at(-1); const rows = period === '7d' ? (data?.rows.slice(-7) || []) : period === '30d' ? (data?.rows.slice(-30) || []) : [];
  const total = period === 'live' ? (latest?.revenue || 0) : period === 'month' ? (data?.rows.filter(r => r.day.endsWith(`/${data.latestMonth}`)).reduce((s, r) => s + r.revenue, 0) || 0) : rows.reduce((s, r) => s + r.revenue, 0);
  const months = useMemo(() => { const grouped: Record<string, number> = {}; for (const row of data?.rows || []) { const p = row.day.split('/'); const key = p.length === 3 ? `${p[1]}/${p[2]}` : row.day; grouped[key] = (grouped[key] || 0) + row.revenue; } return Object.entries(grouped); }, [data]);
  return <LoginGate expectedPassword="sha256:8b3eead54fd24562a4643718e06827e331bc71413b7fb1c14bce6b0f83fed041" storageKey="auth_planner" title="Báo cáo doanh thu Sâm Mix"><div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto', color: '#fff', fontFamily: 'sans-serif' }}>
    <header style={{ textAlign: 'center', marginBottom: '1.4rem' }}><h1 style={{ color: '#10b981', margin: 0 }}>📊 SÂM MIX HEALTHY</h1><h2 style={{ margin: '8px 0', fontSize: '1.2rem' }}>BÁO CÁO DOANH THU</h2><span style={{ background: data ? '#16a34a' : '#b45309', padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{data ? `🟢 Google Sheets LIVE · ${lastUpdate}` : '🟡 Đang kết nối Google Sheets'}</span></header>
    {error && <div style={{ background: '#991b1b', padding: 12, borderRadius: 8, marginBottom: 16, textAlign: 'center' }}>⚠️ {error}</div>}{data && <div style={{ textAlign: 'center', opacity: .75, marginBottom: 12 }}>Nguồn: Don hang · Dữ liệu mới nhất: {data.latestDay}</div>}
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 }}>{([['live', '🔴 Live'], ['7d', '📅 7 ngày'], ['30d', '📆 30 ngày'], ['month', '🗓️ Tháng này']] as const).map(([key, label]) => <button key={key} type="button" onClick={() => setPeriod(key)} style={{ padding: '10px 16px', borderRadius: 20, border: `1px solid ${period === key ? '#34d399' : '#64748b'}`, background: period === key ? '#047857' : '#1e293b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>{label}</button>)}</div>
    <section style={{ background: 'rgba(255,255,255,.1)', borderRadius: 14, padding: 22, marginBottom: 18, textAlign: 'center' }}><div style={{ opacity: .8 }}>{period === 'live' ? `DOANH THU LIVE · ${data?.latestDay || ''}` : period === '7d' ? 'DOANH THU 7 NGÀY' : period === '30d' ? 'DOANH THU 30 NGÀY' : `DOANH THU THÁNG ${data?.latestMonth || ''}`}</div><div style={{ color: '#34d399', fontSize: '2.4rem', fontWeight: 800, margin: '8px 0' }}>{fmtVND(total)}</div>{period === 'live' && latest && <div style={{ opacity: .8 }}>{latest.orders} đơn · {latest.items} món · Tiền mặt {fmtVND(latest.cash)}</div>}</section>
    {period !== 'live' && <section style={{ background: 'rgba(255,255,255,.08)', borderRadius: 14, padding: 16, marginBottom: 18 }}><h3 style={{ marginTop: 0, color: '#facc15' }}>Chi tiết doanh thu từ Don hang</h3>{period === 'month' ? <div>Tổng tháng {data?.latestMonth}: {fmtVND(total)}</div> : rows.length ? rows.map(row => <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,.12)', padding: '10px 4px' }}><span>{row.day} · {row.orders} đơn</span><strong style={{ color: '#6ee7b7' }}>{fmtVND(row.revenue)}</strong></div>) : <div>Chưa có dữ liệu.</div>}</section>}
    <section style={{ background: 'rgba(255,255,255,.08)', borderRadius: 14, padding: 16, marginBottom: 18 }}><h3 style={{ marginTop: 0, color: '#60a5fa' }}>Các tháng có dữ liệu</h3>{months.length ? months.map(([month, revenue]) => <div key={month} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,.12)', padding: '10px 4px' }}><span>Tháng {month}</span><strong style={{ color: '#93c5fd' }}>{fmtVND(revenue)}</strong></div>) : <div>Chưa có dữ liệu tháng.</div>}</section>
    <div style={{ textAlign: 'center' }}><button type="button" onClick={fetchData} style={{ padding: '9px 16px', border: 0, borderRadius: 8, background: '#2563eb', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>↻ Cập nhật ngay</button></div>
  </div></LoginGate>;
}
