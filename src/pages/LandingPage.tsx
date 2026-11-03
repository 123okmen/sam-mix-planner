import { useState } from 'react';
import { getItemImgUrl } from '../lib/store';
import './LandingPage.css';

export default function LandingPage() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="landing-body">
      <div className="menu-board">
        {/* Header Thương Hiệu Sâm Mix */}
        <div className="landing-header">
          <img 
            src={`${import.meta.env.BASE_URL}logo_v2.jpg`} 
            alt="Sâm Mix Logo" 
            className="landing-logo" 
          />
          <h1 className="landing-title">SÂM MIX HEALTHY</h1>
          <h2 className="landing-subtitle">"Thanh Mát Tự Nhiên, Trọn Vị Bình Yên"</h2>
          <div className="store-subinfo">
            <span>🌿 Nước Sâm Thảo Mộc</span> • 
            <span>🥟 Bánh Bao Kẹp Tai Bao</span> • 
            <span>☕ Cà Phê Muối & Trà</span> • 
            <span>🍊 Nước Ép Tươi</span> • 
            <span>🍢 Đồ Ăn Vặt</span>
          </div>
        </div>

        {/* Nút Chuyển Nhanh Sang Đặt Món / POS */}
        <div className="quick-action-banner">
          <a href="#/pos" className="btn-order-now">
            🛒 BẤM ĐÂY ĐỂ ĐẶT MÓN & TÍNH TIỀN (POS)
          </a>
        </div>

        {/* Khối Câu chuyện thương hiệu */}
        <div className="about-section">
          <h3 
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0 }}
          >
            <span>🏕️ Câu Chuyện & Giá Trị Cốt Lõi Sâm Mix</span>
            <span>{isAboutOpen ? '▲ Thu gọn' : '▼ Xem chi tiết'}</span>
          </h3>
          
          {isAboutOpen && (
            <div style={{ marginTop: '15px', lineHeight: '1.6' }}>
              <p>
                <strong>Ý tưởng hình thành:</strong> Khởi nguồn từ một góc nhỏ bình yên giữa lòng KDC Conic nhộn nhịp, 
                "Sâm Mix Healthy" mang trong mình khao khát tạo ra một trạm dừng chân thư giãn mang phong cách cắm trại (Camping) mộc mạc, gần gũi thiên nhiên.
              </p>
              <p>
                <strong>Giá trị cộng đồng:</strong> Quán là nơi gắn kết cư dân, mang đến những ly nước sâm thanh mát mát gan, những chiếc bánh bao kẹp Tai Bao nóng hổi, thơm ngon, đậm đà. 
                Chúng mình cam kết sử dụng <strong>100% nguyên liệu sạch tự nhiên</strong>, không đường hóa học, không chất bảo quản.
              </p>
            </div>
          )}
        </div>

        {/* BẢNG THỰC ĐƠN 5 CỘT CHUYÊN NGHIỆP */}
        <div className="columns-grid">
          
          {/* CỘT 1: NƯỚC SÂM THẢO MỘC */}
          <div className="column col-sam">
            <div className="col-title">
              <span className="col-icon">🌿</span>
              <span>NƯỚC SÂM THẢO MỘC</span>
            </div>
            
            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('sam_mia_lau_v2.jpg')} alt="Sâm Mía Lau" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Sâm Mía Lau</h3>
                  <span className="item-badge badge-green">Thanh Nhiệt</span>
                </div>
                <div className="item-note">Mía lau, râu bắp, lá dứa thanh nhiệt giải khát</div>
              </div>
              <div className="item-price">15K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('sam_bong_cuc_v2.jpg')} alt="Sâm Bông Cúc" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Sâm Bông Cúc Nhãn Nhục</h3>
                  <span className="item-badge badge-green">Mát Gan</span>
                </div>
                <div className="item-note">Hoa cúc vàng thơm ngát, nhãn nhục ngọt thanh</div>
              </div>
              <div className="item-price">15K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('sam_cu_nang_v2.jpg')} alt="Sâm Củ Năng Táo Đỏ" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Sâm Củ Năng Táo Đỏ</h3>
                  <span className="item-badge badge-amber">Bồi Bổ</span>
                </div>
                <div className="item-note">Củ năng giòn ngọt, táo đỏ kỷ tử bổ huyết</div>
              </div>
              <div className="item-price">15K</div>
            </div>
          </div>

          {/* CỘT 2: BÁNH BAO KẸP (TAI BAO ĐÀI LOAN) */}
          <div className="column col-bbk">
            <div className="col-title">
              <span className="col-icon">🥟</span>
              <span>BÁNH BAO KẸP (TAI BAO)</span>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('menu/bbk-2.jpg')} alt="BBK Gà Rán" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">BBK Gà Rán</h3>
                  <span className="item-badge badge-red">Best Seller</span>
                </div>
                <div className="item-note">Phi lê gà rán giòn rụm, dưa leo, sốt mayo</div>
              </div>
              <div className="item-price">20K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('menu/bbk-4.jpg')} alt="BBK Tôm Phô Mai" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">BBK Tôm Phô Mai</h3>
                  <span className="item-badge badge-red">Yêu Thích</span>
                </div>
                <div className="item-note">Chả tôm rán giòn, sốt phô mai béo ngậy tan chảy</div>
              </div>
              <div className="item-price">26K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('menu/bbk-3.jpg')} alt="BBK Tôm Rán" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">BBK Tôm Rán</h3>
                  <span className="item-badge badge-blue">Giòn Rụm</span>
                </div>
                <div className="item-note">Chả tôm tẩm bột giòn rụm kẹp xà lách tươi sốt béo</div>
              </div>
              <div className="item-price">24K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('menu/bbk-1.jpg')} alt="BBK Xúc Xích" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">BBK Xúc Xích</h3>
                  <span className="item-badge badge-amber">Ăn Vặt</span>
                </div>
                <div className="item-note">Bánh bao kẹp xúc xích chiên khía hoa & tương sốt</div>
              </div>
              <div className="item-price">18K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('menu/bbk-5.jpg')} alt="BBK Sườn BBQ" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">BBK Sườn BBQ</h3>
                  <span className="item-badge badge-red">Đậm Vị</span>
                </div>
                <div className="item-note">Thịt sườn nướng áo đẫm sốt BBQ khói đậm đà</div>
              </div>
              <div className="item-price">25K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('menu/bbk-6.jpg')} alt="Vỏ Bánh Bao" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Vỏ Bánh Bao Hấp</h3>
                </div>
                <div className="item-note">Vỏ sò trắng xốp mềm thơm mùi sữa nhẹ</div>
              </div>
              <div className="item-price">6K</div>
            </div>
          </div>

          {/* CỘT 3: CÀ PHÊ PHIN & TRÀ */}
          <div className="column col-coffee">
            <div className="col-title">
              <span className="col-icon">☕</span>
              <span>CÀ PHÊ PHIN & TRÀ</span>
            </div>
            
            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('menu/cf-1.jpg')} alt="Cà Phê Muối" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Cà Phê Muối Kem Béo</h3>
                  <span className="item-badge badge-red">Hot Trend</span>
                </div>
                <div className="item-note">Cà phê phin mộc thơm nồng kết hợp lớp kem mặn béo ngậy</div>
              </div>
              <div className="item-price">20K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('menu/cf-3.jpg')} alt="Cà Phê Sữa Đá" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Cà Phê Sữa Đá</h3>
                  <span className="item-badge badge-amber">Phổ Biến</span>
                </div>
                <div className="item-note">Thơm béo, đậm đà chuẩn vị phin truyền thống</div>
              </div>
              <div className="item-price">20K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('menu/cf-2.jpg')} alt="Cà Phê Đen" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Cà Phê Đen Phin</h3>
                </div>
                <div className="item-note">Rang mộc đắng dịu, hậu vị ngọt thanh khiết</div>
              </div>
              <div className="item-price">15K</div>
            </div>
          </div>

          {/* CỘT 4: NƯỚC ÉP TRÁI CÂY TƯƠI */}
          <div className="column col-ep">
            <div className="col-title">
              <span className="col-icon">🍊</span>
              <span>NƯỚC ÉP TRÁI CÂY TƯƠI</span>
            </div>
            
            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('cam.jpg')} alt="Cam Sành" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Cam Sành Miền Tây</h3>
                  <span className="item-badge badge-green">Vitamin C</span>
                </div>
                <div className="item-note">Cam tươi vắt nguyên chất tăng đề kháng</div>
              </div>
              <div className="item-price">15K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('dua_hau.jpg')} alt="Nước Ép Dưa Hấu" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Nước Ép Dưa Hấu</h3>
                </div>
                <div className="item-note">Giải nhiệt, tốt tim mạch, ngọt dịu tự nhiên</div>
              </div>
              <div className="item-price">15K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('carot.jpg')} alt="Cà Rốt" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Cà Rốt Đà Lạt</h3>
                </div>
                <div className="item-note">Beta-caroten sáng mắt, đẹp da</div>
              </div>
              <div className="item-price">20K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('dua.jpeg')} alt="Dứa Mật" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Dứa Mật</h3>
                </div>
                <div className="item-note">Hỗ trợ tiêu hóa, giàu enzyme & vitamin</div>
              </div>
              <div className="item-price">20K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('coc.jpeg')} alt="Cóc Non" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Cóc Non</h3>
                </div>
                <div className="item-note">Chua ngọt dịu, giàu chất xơ & vitamin C</div>
              </div>
              <div className="item-price">20K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('cantay.JPG')} alt="Ép Trái Cây Mix" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Ép Trái Cây Mix Detox</h3>
                  <span className="item-badge badge-green">Detox</span>
                </div>
                <div className="item-note">Cần tây kết hợp trái cây tươi thanh lọc</div>
              </div>
              <div className="item-price">25K</div>
            </div>
          </div>

          {/* CỘT 5: ĐỒ ĂN VẶT & MÓN NÓNG */}
          <div className="column col-food">
            <div className="col-title">
              <span className="col-icon">🍢</span>
              <span>ĐỒ ĂN VẶT & MÓN NÓNG</span>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('menu/av-2.jpg')} alt="Khoai Tây Chiên Lắc Phô Mai" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Khoai Tây Lắc Phô Mai</h3>
                  <span className="item-badge badge-red">Best Seller</span>
                </div>
                <div className="item-note">Thanh khoai giòn rụm lắc đẫm bột phô mai béo ngậy</div>
              </div>
              <div className="item-price">25K</div>
            </div>
            
            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('nem_nuong.jpg')} alt="Nem Nướng" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Nem Nướng Nóng Hổi</h3>
                </div>
                <div className="item-note">Thơm lừng đậm đà nướng than chuẩn vị</div>
              </div>
              <div className="item-price">15K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('oc_buou_nhoi_thit.jpg')} alt="Ốc Bươu Nhồi Thịt" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Ốc Bươu Nhồi Thịt</h3>
                  <span className="item-badge badge-amber">Đặc Sản</span>
                </div>
                <div className="item-note">Nóng hổi thơm sả kèm nước chấm tắc gừng ớt</div>
              </div>
              <div className="item-price">50K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('long_bo_sua_nuong.jpg')} alt="Lòng Bò Sữa Nướng" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Lòng Bò Sữa Nướng</h3>
                  <span className="item-badge badge-red">Món Nhậu</span>
                </div>
                <div className="item-note">Béo ngậy nướng sả ớt đậm đà thơm nức</div>
              </div>
              <div className="item-price">60K</div>
            </div>

            <div className="menu-item">
              <img className="item-thumb" src={getItemImgUrl('vu_heo_dau_bap.jpg')} alt="Vú Heo Đậu Bắp" loading="lazy" />
              <div className="item-info">
                <div className="item-name-row">
                  <h3 className="item-name">Vú Heo Đậu Bắp Nướng</h3>
                </div>
                <div className="item-note">Giòn sần sật nướng chao kèm đậu bắp nướng</div>
              </div>
              <div className="item-price">60K</div>
            </div>
          </div>

        </div>

        {/* Khối Thông tin địa chỉ & Bản đồ Google Maps */}
        <div className="location-section">
          <h3 className="location-title">📍 Bản Đồ & Chỉ Đường Đến Quán</h3>
          <p style={{ marginBottom: '15px' }}>
            <a 
              href="https://www.google.com/maps/place/Conic+Garden+A,+B%C3%ACnh+H%C6%B0ng,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7178461,106.63765,17z" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-maps-link"
            >
              🗺️ Mở Vị Trí: Chung cư Conic Garden A, Khu dân cư Conic, Bình Hưng, Bình Chánh
            </a>
          </p>
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent("https://www.google.com/maps/place/Conic+Garden+A,+B%C3%ACnh+H%C6%B0ng,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7178461,106.63765,17z")}`} 
            alt="QR Code Google Maps" 
            className="qr-maps-img" 
          />
          <p className="qr-hint">(Quét mã để mở ứng dụng Google Maps chỉ đường trên điện thoại)</p>
        </div>

        {/* Footer */}
        <div className="landing-footer">
          📍 Địa chỉ: Chung cư Conic Garden, Khu dân cư Conic, Bình Hưng, Bình Chánh &nbsp;|&nbsp; 
          ⏰ Giờ mở cửa: Ca Sáng 07:30 - 12:30 • Ca Chiều Tối 13:00 - 21:00 &nbsp;|&nbsp; 
          🍃 100% Nguyên liệu tươi sạch tự nhiên
        </div>
      </div>
    </div>
  );
}
