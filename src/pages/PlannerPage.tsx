import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import LoginGate from '../components/LoginGate';

const API_URL = 'https://script.google.com/macros/s/AKfycbyETg2znWnDrNsgq3G2eB0IJxFeb_GdLKo5N68FkFlJVMvTzdt_M_C3YFzL7fcgiyY1/exec?action=data';

const fmt = (v: number) => (v || 0).toLocaleString('vi-VN') + ' d';

export default function PlannerPage() {
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const chGio = useRef<HTMLCanvasElement>(null);
  const chNV = useRef<HTMLCanvasElement>(null);
  const ch7 = useRef<HTMLCanvasElement>(null);
  const chartsRef = useRef<Chart[]>([]);

  const load = async () => {
    try {
      const r = await fetch(API_URL);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      if (!j.ok) throw new Error(j.msg || 'Loi API');
      setData(j);
      setErr(null);
      setLastUpdate(new Date().toLocaleTimeString('vi-VN'));
    } catch (e: any) {
      setErr(e.message || 'Khong tai duoc du lieu');
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!data) return;
    chartsRef.current.forEach(c => c.destroy());
    chartsRef.current = [];

    const gio = data.gio || { keys: [], vals: [] };
    const nv = data.nv || { names: [], vals: [], don: [] };
    const ngay = data.ngay || { keys: [], vals: [] };

    const mk = (el: HTMLCanvasElement | null, cfg: any) => {
      if (!el) return;
      chartsRef.current.push(new Chart(el, cfg));
    };

    mk(chGio.current, {
      type: 'line',
      data: { labels: gio.keys, datasets: [{ label: 'Doanh thu', data: gio.vals, borderColor: '#69f0ae', backgroundColor: 'rgba(105,240,174,.15)', fill: true, tension: .4, pointRadius: 4 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#cfd8dc' } }, tooltip: { callbacks: { label: (c: any) => ' ' + fmt(c.parsed.y) } } }, scales: { x: { ticks: { color: '#cfd8dc' } }, y: { ticks: { color: '#cfd8dc', callback: (v: any) => (v / 1000) + 'k' } } } }
    });

    mk(chNV.current, {
      type: 'bar',
      data: { labels: nv.names, datasets: [
        { label: 'Doanh thu', data: nv.vals, backgroundColor: '#40c4ff', borderRadius: 6 },
        { label: 'So don', data: nv.don, backgroundColor: '#ffd740', borderRadius: 6 }
      ] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#cfd8dc' } }, tooltip: { callbacks: { label: (c: any) => c.dataset.label + ': ' + (c.dataset.label === 'Doanh thu' ? fmt(c.parsed.y) : c.parsed.y + ' don') } } }, scales: { x: { ticks: { color: '#cfd8dc' } }, y: { ticks: { color: '#cfd8dc', callback: (v: any) => (v / 1000) + 'k' } } } }
    });

    mk(ch7.current, {
      type: 'bar',
      data: { labels: ngay.keys, datasets: [{ label: 'Doanh thu', data: ngay.vals, backgroundColor: '#ff80ab', borderRadius: 6 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#cfd8dc' } }, tooltip: { callbacks: { label: (c: any) => ' ' + fmt(c.parsed.y) } } }, scales: { x: { ticks: { color: '#cfd8dc' } }, y: { ticks: { color: '#cfd8dc', callback: (v: any) => (v / 1000) + 'k' } } } }
    });
  }, [data]);

  return (
    <LoginGate expectedPassword="sammixgymer" storageKey="auth_planner" title="Khu Vực Cổ Đông">
      <div style={{ padding: '1.5rem', maxWidth: 960, margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative' }}>
          <h1 style={{ fontSize: '2rem', margin: '0 0 0.3rem 0', color: '#10b981' }}>🧃 Sâm Mix — Báo Cáo Cổ Đông</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.8rem' }}>
            Doanh thu real-time · Quản lý nhân viên {lastUpdate ? '· Cập nhật lúc ' + lastUpdate : ''}
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ background: '#00c853', color: '#fff', padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 'bold' }}>🟢 LIVE — tự động cập nhật 30s</span>
          </div>
        </header>

        {err ? <div style={{ background: 'rgba(239,68,68,.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px 14px', borderRadius: 10, marginBottom: '1rem', fontSize: '0.9rem' }}>⚠️ {err}</div> : null}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: '1.2rem' }}>
          {[
            { label: 'Doanh thu', val: fmt(data?.kpi?.doanhThu), color: '#69f0ae' },
            { label: 'Tiền mặt', val: fmt(data?.kpi?.tienMat), color: '#ffd740' },
            { label: 'Số đơn', val: String(data?.kpi?.soDon ?? 0), color: '#40c4ff' },
            { label: 'Số món', val: String(data?.kpi?.soMon ?? 0), color: '#ff80ab' },
          ].map(k => (
            <div key={k.label} style={{ background: 'rgba(255,255,255,.08)', borderRadius: 14, padding: '14px 10px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: 11, opacity: .75, textTransform: 'uppercase', letterSpacing: .5 }}>{k.label}</div>
              <div style={{ fontSize: 22, fontWeight: 'bold', marginTop: 6, color: k.color }}>{k.val}</div>
            </div>
          ))}
        </div>

        {[
          { title: '📈 Doanh thu theo giờ — hôm nay', ref: chGio },
          { title: '👥 Quản lý nhân viên — doanh thu & số đơn', ref: chNV },
          { title: '📅 Doanh thu 7 ngày gần nhất', ref: ch7 },
        ].map(s => (
          <div key={s.title} style={{ background: 'rgba(255,255,255,.06)', borderRadius: 14, padding: '14px 16px', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: 15, margin: '0 0 10px 0', borderBottom: '1px solid rgba(255,255,255,.15)', paddingBottom: 8 }}>{s.title}</h3>
            <div style={{ position: 'relative', height: 260, width: '100%' }}>
              <canvas ref={s.ref} />
            </div>
          </div>
        ))}

        {/* Bao cao doanh thu cuoi moi ca */}
        <div style={{ background: 'rgba(255,255,255,.06)', borderRadius: 14, padding: '14px 16px', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize: 15, margin: '0 0 10px 0', borderBottom: '1px solid rgba(255,255,255,.15)', paddingBottom: 8 }}>📋 Báo cáo doanh thu cuối ca</h3>
          {!data || !data.baoCao || data.baoCao.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Chưa có báo cáo nào — nhân viên gửi báo cáo cuối ca sẽ hiện tại đây.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: 560 }}>
                <thead>
                  <tr style={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,.2)' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Ca</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Nhân viên</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Doanh thu</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Tiền mặt</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {data.baoCao.map((b: any, i: number) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                      <td style={{ padding: '8px' }}>{b.ca || '-'}<div style={{ fontSize: 11, opacity: .6 }}>{b.ngay} {b.gio}</div></td>
                      <td style={{ padding: '8px', fontWeight: 600 }}>{b.nv || '-'}</td>
                      <td style={{ padding: '8px', textAlign: 'right', color: '#69f0ae', fontWeight: 'bold' }}>{fmt(b.doanhThu)}</td>
                      <td style={{ padding: '8px', textAlign: 'right', color: '#ffd740' }}>{fmt(b.tienMat)}</td>
                      <td style={{ padding: '8px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{b.ghiChu || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, opacity: .5, padding: 8 }}>Sâm Mix Dashboard · Tự động làm mới mỗi 30 giây</p>
      </div>
    </LoginGate>
  );
}
