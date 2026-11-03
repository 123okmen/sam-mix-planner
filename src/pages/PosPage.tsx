import React, { useState, useEffect, useMemo } from 'react';
import LoginGate from '../components/LoginGate';
import { MENU, getOrders, saveOrder, syncOrder, getShift, fmtVND, fmtTime, getItemImgUrl } from '../lib/store';
import type { Order, OrderLine, Category } from '../lib/store';

const CATEGORY_HEADERS: Record<Category, { title: string; color: string; emoji: string }> = {
  sam: { title: 'Nước Sâm Thảo Mộc', color: '#10b981', emoji: '🌿' },
  bbk: { title: 'Bánh Bao Kẹp (Tai Bao)', color: '#f59e0b', emoji: '🥟' },
  coffee: { title: 'Cà Phê Phin & Trà', color: '#8b5cf6', emoji: '☕' },
  ep: { title: 'Nước Ép Trái Cây Tươi', color: '#06b6d4', emoji: '🥤' },
  food: { title: 'Đồ Ăn Vặt & Món Nóng', color: '#ef4444', emoji: '🍢' },
  app: { title: 'Đơn App Online (Shopee / Grab)', color: '#f97316', emoji: '🛵' }
};

export default function PosPage() {
  const [staff, setStaff] = useState(() => localStorage.getItem('sammix_staff_name') || '');
  const [shift, setShift] = useState<'sang' | 'trua' | 'toi' | 'gay' | 'chieu'>(getShift());
  const [cart, setCart] = useState<OrderLine[]>([]);
  const [cash, setCash] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'tienmat' | 'chuyenkhoan' | 'app'>('tienmat');
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState('');
  const [filterCat, setFilterCat] = useState<Category | 'all'>('all');

  useEffect(() => { 
    setOrders(getOrders()); 
  }, []);

  const handleStaffChange = (val: string) => {
    setStaff(val);
    localStorage.setItem('sammix_staff_name', val);
  };

  const addItem = (id: string, name: string, price: number) => {
    setCart(prev => {
      const found = prev.find(l => l.id === id);
      if (found) return prev.map(l => l.id === id ? { ...l, qty: l.qty + 1 } : l);
      return [...prev, { id, name, price, qty: 1 }];
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart(prev => prev.map(l => l.id === id ? { ...l, qty: Math.max(0, l.qty + delta) } : l).filter(l => l.qty > 0));
  };

  const getQtyInCart = (id: string) => {
    const item = cart.find(l => l.id === id);
    return item ? item.qty : 0;
  };

  const total = useMemo(() => cart.reduce((s, l) => s + l.price * l.qty, 0), [cart]);
  const cashNum = parseInt(cash.replace(/\D/g, ''), 10) || 0;
  const change = cashNum - total;

  const checkout = async () => {
    if (!staff.trim()) { alert('Vui lòng nhập tên nhân viên bán hàng!'); return; }
    if (cart.length === 0) { alert('Chưa có món nào trong đơn!'); return; }
    
    const order: Order = {
      id: 'DH' + Date.now().toString().slice(-8),
      time: new Date().toISOString(),
      staff: staff.trim(),
      shift,
      paymentMethod,
      lines: cart,
      total,
      cash: cashNum || undefined,
      change: cashNum ? change : undefined,
      synced: false
    };

    const ok = await syncOrder(order);
    order.synced = ok;
    saveOrder(order);
    setOrders(getOrders());
    setCart([]);
    setCash('');
    setToast(ok ? '✅ Đã lưu và đồng bộ Google Sheets thành công!' : '⚠️ Đã lưu đơn cục bộ (Sẽ tự đồng bộ lại khi có mạng)');
    setTimeout(() => setToast(''), 4000);
  };

  const todayOrders = useMemo(() => {
    const today = new Date().toDateString();
    return orders.filter(o => new Date(o.time).toDateString() === today);
  }, [orders]);

  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);

  const displayCategories: Category[] = filterCat === 'all' 
    ? (['sam', 'bbk', 'coffee', 'ep', 'food', 'app'] as Category[])
    : [filterCat];

  return (
    <LoginGate expectedPassword="sammixnv" storageKey="auth_pos" title="Khu Vực Bán Hàng">
      <div style={{ padding: '1rem', maxWidth: '1240px', margin: '0 auto', color: 'var(--text-primary)' }}>
        <h1 style={{ color: '#10b981', textAlign: 'center', margin: '0.5rem 0', fontSize: '1.75rem' }}>🧾 Bán Hàng & Thu Ngân Sâm Mix</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          Đầy đủ menu Nước Sâm Thảo Mộc · Bánh Bao Kẹp Tai Bao · Nước Ép & Đồ Ăn Vặt
        </p>

        {/* Thanh trạng thái ca làm việc & nhân viên */}
        <div className="glass-panel" style={{ marginBottom: '1.25rem', padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Ca làm việc</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button 
                type="button"
                onClick={() => setShift('sang')} 
                style={{ 
                  padding: '0.4rem 0.85rem', 
                  fontSize: '0.82rem', 
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: shift === 'sang' ? '#059669' : 'rgba(255,255,255,0.06)',
                  color: '#fff'
                }}>
                🌅 Ca Sáng (7h30-12h30)
              </button>
              <button 
                type="button"
                onClick={() => setShift('chieu')} 
                style={{ 
                  padding: '0.4rem 0.85rem', 
                  fontSize: '0.82rem', 
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: shift === 'chieu' ? '#d97706' : 'rgba(255,255,255,0.06)',
                  color: '#fff'
                }}>
                🌆 Ca Chiều Tối (13h-21h)
              </button>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '180px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Tên nhân viên bán *</div>
            <input 
              className="input-field" 
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.9rem' }} 
              placeholder="VD: Thư, Vy, Linh..."
              value={staff} 
              onChange={e => handleStaffChange(e.target.value)} 
            />
          </div>

          <div style={{ textAlign: 'right', minWidth: '140px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Doanh thu hôm nay</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#10b981' }}>{fmtVND(todayRevenue)}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{todayOrders.length} đơn đã bán</div>
          </div>
        </div>

        {/* Bộ lọc danh mục nhanh */}
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.65rem', marginBottom: '1rem' }}>
          <button 
            type="button"
            onClick={() => setFilterCat('all')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '20px',
              border: '1px solid ' + (filterCat === 'all' ? '#10b981' : 'rgba(255,255,255,0.1)'),
              background: filterCat === 'all' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.05)',
              color: filterCat === 'all' ? '#34d399' : '#cbd5e1',
              fontWeight: 700,
              fontSize: '0.82rem',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}>
            ✨ Tất Cả Món
          </button>
          {(['sam', 'bbk', 'coffee', 'ep', 'food', 'app'] as Category[]).map(c => (
            <button 
              key={c}
              type="button"
              onClick={() => setFilterCat(c)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                border: '1px solid ' + (filterCat === c ? CATEGORY_HEADERS[c].color : 'rgba(255,255,255,0.1)'),
                background: filterCat === c ? `${CATEGORY_HEADERS[c].color}33` : 'rgba(255,255,255,0.05)',
                color: filterCat === c ? '#fff' : '#cbd5e1',
                fontWeight: 700,
                fontSize: '0.82rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}>
              {CATEGORY_HEADERS[c].emoji} {CATEGORY_HEADERS[c].title}
            </button>
          ))}
        </div>

        {/* Bố cục 2 cột: Danh sách món ăn (Trái) & Giỏ hàng đơn hiện tại (Phải) */}
        <div className="pos-main-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
          {/* Cột danh sách món */}
          <div>
            {displayCategories.map(cat => {
              const catItems = MENU.filter(m => m.category === cat);
              if (catItems.length === 0) return null;
              const info = CATEGORY_HEADERS[cat];

              return (
                <div key={cat} className="glass-panel" style={{ marginBottom: '1.25rem', padding: '1rem' }}>
                  <h2 style={{ margin: '0 0 0.85rem 0', color: info.color, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{info.emoji}</span>
                    <span>{info.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>({catItems.length} món)</span>
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                    {catItems.map(item => {
                      const qty = getQtyInCart(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => addItem(item.id, item.name, item.price)}
                          style={{
                            position: 'relative',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: qty > 0 ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '8px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.15s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}>
                          {/* Badge nhỏ số lượng đã chọn trên thẻ món */}
                          {qty > 0 && (
                            <span style={{
                              position: 'absolute',
                              top: '-6px',
                              right: '-6px',
                              background: '#10b981',
                              color: '#fff',
                              borderRadius: '50%',
                              width: '22px',
                              height: '22px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.72rem',
                              fontWeight: 900,
                              boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                              zIndex: 2
                            }}>
                              {qty}
                            </span>
                          )}

                          {/* Badge nhãn món (Best seller / Yêu thích) */}
                          {item.badge && (
                            <span style={{
                              position: 'absolute',
                              top: '4px',
                              left: '4px',
                              background: 'rgba(239, 68, 68, 0.9)',
                              color: '#fff',
                              borderRadius: '4px',
                              padding: '1px 5px',
                              fontSize: '0.62rem',
                              fontWeight: 800,
                              zIndex: 1
                            }}>
                              {item.badge}
                            </span>
                          )}

                          <div style={{ width: '100%', height: '80px', borderRadius: '8px', overflow: 'hidden', background: '#1e293b' }}>
                            <img 
                              src={getItemImgUrl(item.img)} 
                              alt={item.name}
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>

                          <div style={{ fontSize: '0.82rem', fontWeight: 700, margin: '6px 0 3px', color: 'var(--text-primary)', lineHeight: '1.25' }}>
                            {item.name}
                          </div>

                          <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.9rem' }}>
                            {fmtVND(item.price)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cột giỏ hàng & thanh toán */}
          <div className="glass-panel" style={{ alignSelf: 'start', position: 'sticky', top: '70px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.65rem', marginBottom: '0.85rem' }}>
              <h2 style={{ margin: 0, color: '#f59e0b', fontSize: '1.15rem' }}>🛒 Đơn hàng</h2>
              {cart.length > 0 && (
                <button 
                  type="button"
                  onClick={() => setCart([])}
                  style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700 }}>
                  Xóa tất cả
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0', fontSize: '0.88rem' }}>
                👉 Bấm vào món bên trái để thêm vào đơn
              </p>
            ) : (
              <>
                <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '10px' }}>
                  {cart.map(l => (
                    <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', padding: '6px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{fmtVND(l.price)}</div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button type="button" onClick={() => changeQty(l.id, -1)} style={qtyBtn}>−</button>
                        <span style={{ minWidth: '22px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>{l.qty}</span>
                        <button type="button" onClick={() => changeQty(l.id, 1)} style={qtyBtn}>+</button>
                      </div>

                      <div style={{ minWidth: '70px', textAlign: 'right', fontWeight: 800, color: '#10b981', fontSize: '0.88rem' }}>
                        {fmtVND(l.price * l.qty)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px dashed rgba(255,255,255,0.15)', paddingTop: '10px' }}>
                  {/* Tổng tiền */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 900, marginBottom: '10px' }}>
                    <span>Tổng tiền:</span>
                    <span style={{ color: '#10b981' }}>{fmtVND(total)}</span>
                  </div>

                  {/* Phương thức thanh toán */}
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Phương thức thanh toán:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('tienmat')}
                      style={{
                        padding: '0.45rem 0.2rem',
                        borderRadius: '6px',
                        border: '1px solid ' + (paymentMethod === 'tienmat' ? '#10b981' : 'rgba(255,255,255,0.1)'),
                        background: paymentMethod === 'tienmat' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.04)',
                        color: paymentMethod === 'tienmat' ? '#34d399' : '#cbd5e1',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}>
                      💵 Tiền mặt
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('chuyenkhoan')}
                      style={{
                        padding: '0.45rem 0.2rem',
                        borderRadius: '6px',
                        border: '1px solid ' + (paymentMethod === 'chuyenkhoan' ? '#3b82f6' : 'rgba(255,255,255,0.1)'),
                        background: paymentMethod === 'chuyenkhoan' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255,255,255,0.04)',
                        color: paymentMethod === 'chuyenkhoan' ? '#60a5fa' : '#cbd5e1',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}>
                      📱 MBBank
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('app')}
                      style={{
                        padding: '0.45rem 0.2rem',
                        borderRadius: '6px',
                        border: '1px solid ' + (paymentMethod === 'app' ? '#f97316' : 'rgba(255,255,255,0.1)'),
                        background: paymentMethod === 'app' ? 'rgba(249, 115, 22, 0.25)' : 'rgba(255,255,255,0.04)',
                        color: paymentMethod === 'app' ? '#fb923c' : '#cbd5e1',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}>
                      🛵 App
                    </button>
                  </div>

                  {/* Tiền khách đưa (nếu là tiền mặt) */}
                  {paymentMethod === 'tienmat' && (
                    <div style={{ marginBottom: '10px' }}>
                      <input 
                        className="input-field" 
                        style={{ padding: '0.55rem 0.85rem', fontSize: '0.88rem' }} 
                        placeholder="Tiền khách đưa (VD: 50.000)..."
                        value={cash} 
                        onChange={e => setCash(e.target.value)} 
                      />
                      {cashNum > 0 && (
                        <div style={{ marginTop: '6px', fontSize: '0.85rem' }}>
                          Tiền thừa trả khách:{' '}
                          <strong style={{ color: change >= 0 ? '#38bdf8' : '#f87171' }}>
                            {change >= 0 ? fmtVND(change) : 'Thiếu ' + fmtVND(-change)}
                          </strong>
                        </div>
                      )}
                    </div>
                  )}

                  <button 
                    type="button"
                    className="btn-primary" 
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      borderRadius: '10px', 
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      border: 'none',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                    onClick={checkout}>
                    💾 Xác Nhận & Lưu Đơn
                  </button>
                </div>
              </>
            )}

            {toast && (
              <div style={{ marginTop: '10px', padding: '8px', borderRadius: '8px', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', fontSize: '0.82rem', textAlign: 'center', color: '#34d399', fontWeight: 600 }}>
                {toast}
              </div>
            )}
          </div>
        </div>

        {/* Lịch sử các đơn hàng hôm nay */}
        <div className="glass-panel" style={{ marginTop: '1.5rem', padding: '1.25rem' }}>
          <h2 style={{ marginTop: 0, color: '#38bdf8', fontSize: '1.15rem' }}>📜 Đơn hàng đã bán hôm nay ({todayOrders.length})</h2>
          {todayOrders.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem 0', fontSize: '0.88rem' }}>Chưa có đơn nào hôm nay</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '8px' }}>Mã đơn</th>
                    <th style={{ padding: '8px' }}>Giờ</th>
                    <th style={{ padding: '8px' }}>Nhân viên</th>
                    <th style={{ padding: '8px' }}>Phương thức</th>
                    <th style={{ padding: '8px' }}>Món</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Tổng tiền</th>
                    <th style={{ padding: '8px', textAlign: 'center' }}>Đồng bộ</th>
                  </tr>
                </thead>
                <tbody>
                  {todayOrders.slice().reverse().map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '8px', fontWeight: 'bold' }}>{o.id}</td>
                      <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{fmtTime(o.time)}</td>
                      <td style={{ padding: '8px' }}>{o.staff}</td>
                      <td style={{ padding: '8px' }}>
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          background: o.paymentMethod === 'chuyenkhoan' ? 'rgba(59,130,246,0.2)' : o.paymentMethod === 'app' ? 'rgba(249,115,22,0.2)' : 'rgba(16,185,129,0.2)',
                          color: o.paymentMethod === 'chuyenkhoan' ? '#60a5fa' : o.paymentMethod === 'app' ? '#fb923c' : '#34d399'
                        }}>
                          {o.paymentMethod === 'chuyenkhoan' ? 'Chuyển khoản' : o.paymentMethod === 'app' ? 'App' : 'Tiền mặt'}
                        </span>
                      </td>
                      <td style={{ padding: '8px', fontSize: '0.78rem' }}>{o.lines.map(l => l.name + ' x' + l.qty).join(', ')}</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontWeight: 800, color: '#10b981' }}>{fmtVND(o.total)}</td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>{o.synced ? '✅' : '⏳'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </LoginGate>
  );
}

const qtyBtn: React.CSSProperties = {
  width: '26px', 
  height: '26px', 
  borderRadius: '6px', 
  border: '1px solid rgba(255,255,255,0.2)',
  background: 'rgba(255,255,255,0.1)', 
  color: '#fff', 
  cursor: 'pointer', 
  fontWeight: 'bold', 
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0
};
