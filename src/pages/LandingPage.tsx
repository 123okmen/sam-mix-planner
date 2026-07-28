import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-body">
      <div className="menu-board">
          <div className="landing-header">
              <h1>Quán Nước Sâm Mix</h1>
              <h2>Trạm Sâm Mix & Nước Ép Trái Cây Tươi</h2>
          </div>

          <div className="about-section">
              <h3>🏕️ Câu Chuyện & Giá Trị Cốt Lõi</h3>
              <p><strong>Ý tưởng hình thành:</strong> Khởi nguồn từ một góc nhỏ bình yên giữa lòng KDC Conic nhộn nhịp, "Sâm Mix Healthy" mang trong mình khao khát tạo ra một trạm dừng chân thư giãn mang phong cách cắm trại (Camping) mộc mạc. Chúng mình muốn mang đến những ly nước thanh mát, giải nhiệt và cực kỳ tốt cho sức khỏe để bạn có thể "sạc" lại năng lượng sau những giờ học tập và làm việc căng thẳng.</p>
              <p><strong>Giá trị cộng đồng:</strong> Không chỉ dừng lại ở một quán nước, Sâm Mix hướng tới việc xây dựng một phong cách sống Xanh - Sạch - Khoẻ. Quán là nơi gắn kết cư dân, tạo không gian giao lưu an toàn, thân thiện với mức giá vô cùng "sinh viên". Chúng mình cam kết sử dụng 100% nguyên liệu tự nhiên, không hoá chất, vì sức khoẻ của chính bạn và những người thân yêu.</p>
          </div>

          <div className="columns">
              {/* Sâm Mix Column */}
              <div className="column">
                  <div className="col-title">
                      🌿 Sâm Mix Thảo Mộc
                  </div>
                  
                  <div className="menu-item">
                      <img className="item-thumb" src={`${import.meta.env.BASE_URL}sam_bong_cuc_v2.jpg`} alt="Sâm Bông Cúc Nhãn Lục" />
                      <div className="item-info">
                          <h3 className="item-name">1. Sâm Bông Cúc Nhãn Nhục</h3>
                          <div className="item-desc">Giải nhiệt, an thần, thanh lọc cơ thể.</div>
                      </div>
                      <div className="item-price">20K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src={`${import.meta.env.BASE_URL}sam_cu_nang_v2.jpg`} alt="Sâm Củ Năng Táo Đỏ" />
                      <div className="item-info">
                          <h3 className="item-name">2. Sâm Củ Năng Táo Đỏ</h3>
                          <div className="item-desc">Giòn mát củ năng, thơm ngọt táo đỏ.</div>
                      </div>
                      <div className="item-price">20K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src={`${import.meta.env.BASE_URL}sam_mia_lau_v2.jpg`} alt="Sâm Mía Lau" />
                      <div className="item-info">
                          <h3 className="item-name">3. Sâm Mía Lau</h3>
                          <div className="item-desc">Ngọt thanh rễ tranh & mía lau tươi.</div>
                      </div>
                      <div className="item-price">20K</div>
                  </div>

              </div>

              {/* Nước Ép Column */}
              <div className="column">
                  <div className="col-title">
                      🍊 Nước Ép Nguyên Chất
                  </div>
                  
                  <div className="menu-item">
                      <img className="item-thumb" src={`${import.meta.env.BASE_URL}cam.jpg`} alt="Cam Sành" />
                      <div className="item-info">
                          <h3 className="item-name">1. Cam Sành Miền Tây</h3>
                          <div className="item-desc">Nước ép cam sành tươi mọng.</div>
                      </div>
                      <div className="item-price">25K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src={`${import.meta.env.BASE_URL}carot.jpg`} alt="Cà Rốt" />
                      <div className="item-info">
                          <h3 className="item-name">2. Cà Rốt Đà Lạt</h3>
                          <div className="item-desc">Nước ép cà rốt ngọt dịu.</div>
                      </div>
                      <div className="item-price">20K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src={`${import.meta.env.BASE_URL}dua.jpeg`} alt="Dứa" />
                      <div className="item-info">
                          <h3 className="item-name">3. Dứa Mật</h3>
                          <div className="item-desc">Nước ép dứa mật đậm đặc.</div>
                      </div>
                      <div className="item-price">20K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src={`${import.meta.env.BASE_URL}coc.jpeg`} alt="Cóc" />
                      <div className="item-info">
                          <h3 className="item-name">4. Cóc Non</h3>
                          <div className="item-desc">Nước ép cóc non chua thanh.</div>
                      </div>
                      <div className="item-price">20K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src={`${import.meta.env.BASE_URL}cantay.JPG`} alt="Cần Tây" />
                      <div className="item-info">
                          <h3 className="item-name">5. Cần Tây Mix Táo</h3>
                          <div className="item-desc">Detox cần tây, kale, táo mix.</div>
                      </div>
                      <div className="item-price">30K</div>
                  </div>
              </div>
          </div>

          <div className="location-section" style={{ textAlign: 'center', padding: '30px 15px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '15px', margin: '20px 0' }}>
              <h3 style={{ marginBottom: '15px', color: '#f1c40f' }}>📍 Bản Đồ & Chỉ Đường</h3>
              <p style={{ marginBottom: '15px' }}>
                 <a href="https://www.google.com/maps/place/Conic+Garden+A,+B%C3%ACnh+H%C6%B0ng,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7178461,106.63765,17z/data=!4m6!3m5!1s0x31752e0f0b58e75b:0xf97af1f03aa15943!8m2!3d10.7178461!4d106.63765!16s%2Fg%2F12hqyml_q?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ color: '#27ae60', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1em', display: 'inline-block', padding: '10px 15px', backgroundColor: '#fff', borderRadius: '8px' }}>
                     🗺️ Xem vị trí: Chung cư Conic Garden A, Bình Hưng, Bình Chánh
                 </a>
              </p>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent("https://www.google.com/maps/place/Conic+Garden+A,+B%C3%ACnh+H%C6%B0ng,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7178461,106.63765,17z/data=!4m6!3m5!1s0x31752e0f0b58e75b:0xf97af1f03aa15943!8m2!3d10.7178461!4d106.63765!16s%2Fg%2F12hqyml_q?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D")}`} alt="QR Code Google Maps" style={{ marginTop: '10px', borderRadius: '10px', border: '3px solid #fff' }} />
              <p style={{ fontSize: '0.9em', color: '#bdc3c7', marginTop: '10px' }}>(Quét mã để mở Bản đồ chỉ đường trên điện thoại)</p>
          </div>

          <div className="landing-footer">
              📍 Địa chỉ: Chung cư Conic Garden, Khu dân cư Conic, Bình Chánh &nbsp;|&nbsp; ⏰ Giờ mở cửa: 06:00 - 22:30 &nbsp;|&nbsp; 🍃 Healthy & Fresh
          </div>
      </div>
    </div>
  );
}
