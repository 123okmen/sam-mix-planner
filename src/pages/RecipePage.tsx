import LoginGate from '../components/LoginGate';

export default function RecipePage() {
  return (
    <LoginGate expectedPassword="sammixnv" storageKey="auth_recipes" title="Khu Vực Nhân Viên">
      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', color: 'var(--text-primary)' }}>
        <h1 style={{ color: '#10b981', textAlign: 'center', marginBottom: '1rem' }}>Bảng Định Lượng Pha Chế (SOP)</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Tài liệu nội bộ dành cho nhân viên Sâm Mix</p>

        <div className="glass-panel" style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#d35400', borderBottom: '2px solid #e67e22', paddingBottom: '0.5rem', marginBottom: '1rem' }}>1. Nhóm Sâm Mix (Nấu theo mẻ)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'rgba(255,255,255,0.8)' }}>
            <thead>
              <tr style={{ background: '#1e7145', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tên Món</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Công thức nấu (Mẻ 2 Lít)</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Định lượng ra ly (500ml)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', color: '#27ae60' }}>Sâm Bông Cúc Nhãn Nhục</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>2L nước + 50g cúc khô + 100g nhãn nhục + 150g đường phèn (Nấu 15p)</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>350ml cốt sâm + 30g topping + Đá đầy ly</td>
              </tr>
              <tr style={{ background: '#f9f9f9' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', color: '#27ae60' }}>Sâm Củ Năng Táo Đỏ</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>2L nước + 300g củ năng thái hạt lựu + 100g táo đỏ cắt lát + 150g đường phèn</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>350ml cốt sâm + 40g topping + Đá đầy ly</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', color: '#27ae60' }}>Sâm Mía Lau</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>2L nước + 300g mía lau chẻ nhỏ + 1 bó rễ tranh + 50g râu bắp + 100g đường phèn</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>400ml cốt sâm + Đá đầy ly (không topping)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="glass-panel">
          <h2 style={{ color: '#d35400', borderBottom: '2px solid #e67e22', paddingBottom: '0.5rem', marginBottom: '1rem' }}>2. Nhóm Nước Ép (Ép tươi từng ly)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'rgba(255,255,255,0.8)' }}>
            <thead>
              <tr style={{ background: '#1e7145', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tên Món</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Công thức ép chuẩn (Ly 500ml)</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Lưu ý kích vị</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', color: '#27ae60' }}>Cam Sành</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>150ml cốt cam (2-3 quả) + 30ml nước đường + Đá</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Thêm 1 xíu muối tinh để vị đậm đà</td>
              </tr>
              <tr style={{ background: '#f9f9f9' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', color: '#27ae60' }}>Cà Rốt</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>200ml cốt cà rốt (2-3 củ) + 20ml đường + Đá</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Thêm 10ml nước cốt chanh để không bị ngái</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', color: '#27ae60' }}>Dứa Mật</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>200ml cốt dứa (1/2 quả lớn) + 20ml đường + Đá</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Thêm 5ml cốt tắc để tăng độ thơm</td>
              </tr>
              <tr style={{ background: '#f9f9f9' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', color: '#27ae60' }}>Cóc Non</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>200ml cốt cóc (3-4 quả) + 35ml đường + Đá</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Bắt buộc có muối tinh liều lượng nhỏ xíu</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', color: '#27ae60' }}>Cần Tây Mix Táo</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>150ml cốt cần tây + 50ml cốt táo + 10ml đường (hoặc mật ong) + Đá</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Ép cùng 1 lát gừng mỏng để khử mùi hăng</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LoginGate>
  );
}
