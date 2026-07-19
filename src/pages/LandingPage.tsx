import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-body">
      <div className="menu-board">
          <div className="landing-header">
              <h1>Quán Nước Sâm Mix</h1>
              <h2>Trạm Sâm Mix Topping Thảo Mộc & Nước Ép Trái Cây Tươi</h2>
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
                      🌿 Sâm Mix & Topping
                  </div>
                  
                  <div className="menu-item">
                      <img className="item-thumb" src="/thumb_sam_1784435219193.png" alt="Sâm Nguyên Bản" />
                      <div className="item-info">
                          <h3 className="item-name">1. Sâm Nguyên Bản</h3>
                          <div className="item-desc">Gốc nước sâm nguyên chất thanh mát.</div>
                      </div>
                      <div className="item-price">15K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src="/thumb_cuc_1784435229714.png" alt="Sâm Bông Cúc" />
                      <div className="item-info">
                          <h3 className="item-name">2. Sâm Bông Cúc</h3>
                          <div className="item-desc">Kết hợp bông cúc khô thơm nhẹ.</div>
                      </div>
                      <div className="item-price">20K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src="/thumb_tao_1784435241702.png" alt="Sâm Táo Đỏ" />
                      <div className="item-info">
                          <h3 className="item-name">3. Sâm Táo Đỏ Long Nhãn</h3>
                          <div className="item-desc">Táo đỏ cắt lát & nhãn nhục lịm.</div>
                      </div>
                      <div className="item-price">25K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src="/thumb_sam_1784435219193.png" alt="Sâm Rong Biển" />
                      <div className="item-info">
                          <h3 className="item-name">4. Sâm Rong Biển Hạt Chia</h3>
                          <div className="item-desc">Rong biển sợi giòn & hạt chia organic.</div>
                      </div>
                      <div className="item-price">25K</div>
                  </div>

                  <div className="toppings">
                      <div className="toppings-title">Danh Sách Topping Thảo Mộc (+5K)</div>
                      <div className="toppings-list">
                          <span className="topping-tag">🌿 Rong biển sợi</span>
                          <span className="topping-tag">🌼 Bông cúc sấy</span>
                          <span className="topping-tag">🍎 Táo đỏ</span>
                          <span className="topping-tag">🌰 Nhãn nhục</span>
                          <span className="topping-tag">⚫ Hạt chia</span>
                      </div>
                  </div>
              </div>

              {/* Nước Ép Column */}
              <div className="column">
                  <div className="col-title">
                      🍊 Nước Ép Nguyên Chất
                  </div>
                  
                  <div className="menu-item">
                      <img className="item-thumb" src="/cam.jpg" alt="Cam Sành" />
                      <div className="item-info">
                          <h3 className="item-name">1. Cam Sành Miền Tây</h3>
                          <div className="item-desc">Nước ép cam sành tươi mọng.</div>
                      </div>
                      <div className="item-price">25K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src="/carot.jpg" alt="Cà Rốt" />
                      <div className="item-info">
                          <h3 className="item-name">2. Cà Rốt Đà Lạt</h3>
                          <div className="item-desc">Nước ép cà rốt ngọt dịu.</div>
                      </div>
                      <div className="item-price">20K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src="/dua.jpeg" alt="Dứa" />
                      <div className="item-info">
                          <h3 className="item-name">3. Dứa Mật</h3>
                          <div className="item-desc">Nước ép dứa mật đậm đặc.</div>
                      </div>
                      <div className="item-price">20K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src="/coc.jpeg" alt="Cóc" />
                      <div className="item-info">
                          <h3 className="item-name">4. Cóc Non</h3>
                          <div className="item-desc">Nước ép cóc non chua thanh.</div>
                      </div>
                      <div className="item-price">20K</div>
                  </div>

                  <div className="menu-item">
                      <img className="item-thumb" src="/cantay.JPG" alt="Cần Tây" />
                      <div className="item-info">
                          <h3 className="item-name">5. Cần Tây Mix Táo</h3>
                          <div className="item-desc">Detox cần tây, kale, táo mix.</div>
                      </div>
                      <div className="item-price">30K</div>
                  </div>
              </div>
          </div>

          <div className="landing-footer">
              📍 Địa chỉ: Khu dân cư Conic Bình Chánh &nbsp;|&nbsp; ⏰ Giờ mở cửa: 06:00 - 22:30 &nbsp;|&nbsp; 🍃 Healthy & Fresh
          </div>
      </div>
    </div>
  );
}
