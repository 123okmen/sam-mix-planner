export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // 0-based
  explanation: string;
  isCritical?: boolean;
  category: 'KhaiNiem' | 'VienThong' | 'BienBao' | 'SaHinh' | 'KyThuat';
}

export const sampleQuestions: Question[] = [
  {
    id: 1,
    question: 'Hành vi điều khiển xe cơ giới chạy quá tốc độ quy định, giành đường, vượt ẩu có bị nghiêm cấm hay không?',
    options: ['Bị nghiêm cấm', 'Không bị nghiêm cấm', 'Tùy trường hợp cụ thể'],
    answer: 0,
    isCritical: true,
    explanation: 'Mẹo: Thấy đáp án chứa cụm từ "Bị nghiêm cấm" -> Chọn ngay lập tức (100% đúng).',
    category: 'KhaiNiem'
  },
  {
    id: 2,
    question: 'Người điều khiển xe mô tô, ô tô, máy kéo trên đường mà trong máu hoặc hơi thở có nồng độ cồn có bị nghiêm cấm không?',
    options: ['Bị nghiêm cấm hoàn toàn', 'Được phép nếu ở mức nhỏ', 'Chỉ bị xử phạt hành chính không nghiêm cấm'],
    answer: 0,
    isCritical: true,
    explanation: 'Mẹo: Nghiêm cấm tuyệt đối nồng độ cồn trong máu/hơi thở khi điều khiển phương tiện.',
    category: 'KhaiNiem'
  },
  {
    id: 3,
    question: 'Khi gặp hiệu lệnh của Cảnh sát giao thông giơ 1 tay thẳng đứng thì người tham gia giao thông phải đi như thế nào?',
    options: [
      'Người tham gia giao thông ở phía trước và phía sau CSGT được đi',
      'Người tham gia giao thông ở phía bên phải và bên trái CSGT được đi',
      'Tất cả người tham gia giao thông ở các hướng đều phải dừng lại (trừ xe đã ở trong giao lộ)'
    ],
    answer: 2,
    explanation: 'Mẹo CSGT: Giơ 1 tay thẳng đứng -> Chọn Ý 3 (Tất cả dừng lại). Giơ 2 tay ngang -> Chọn Ý 4.',
    category: 'KhaiNiem'
  },
  {
    id: 4,
    question: 'Thời gian lái xe liên tục của người điều khiển xe ô tô không được vượt quá bao nhiêu giờ?',
    options: ['Không quá 3 giờ', 'Không quá 4 giờ', 'Không quá 6 giờ', 'Không quá 8 giờ'],
    answer: 1,
    explanation: 'Mẹo Thời gian: Lái liên tục tối đa 4 giờ, tổng thời gian làm việc trong ngày tối đa 10 giờ.',
    category: 'VienThong'
  },
  {
    id: 5,
    question: 'Khi xe ô tô dừng, đỗ sát theo lề đường, hè phố phía bên phải theo chiều đi của mình, bánh xe gần nhất không được cách xa lề đường quá bao nhiêu mét?',
    options: ['0.25 mét', '0.35 mét', '0.40 mét', '0.50 mét'],
    answer: 0,
    explanation: 'Mẹo khoảng cách đỗ xe: Cách mép lề đường <= 0.25m; Cách xe đối diện đỗ >= 20m; Cách đường sắt >= 5m.',
    category: 'VienThong'
  },
  {
    id: 6,
    question: 'Biển báo nào có dạng hình tròn, viền đỏ, nền trắng, hình vẽ màu đen?',
    options: ['Biển báo nguy hiểm', 'Biển báo cấm', 'Biển hiệu lệnh', 'Biển chỉ dẫn'],
    answer: 1,
    explanation: 'Mẹo Biển Báo: Tròn viền đỏ = Biển CẤM; Tam giác vàng = NGUY HIỂM; Tròn xanh = HIỆU LỆNH; Vuông xanh = CHỈ DẪN.',
    category: 'BienBao'
  },
  {
    id: 7,
    question: 'Biển nào cấm xe ô tô tải?',
    options: ['Biển cấm ô tô con', 'Biển cấm xe máy', 'Biển cấm xe xích xích'],
    answer: 0,
    explanation: 'Mẹo Cấm xe: Cấm nhỏ -> Cấm lớn. Biển cấm xe con thì cấm luôn xe tải, xe khách, rơ-moóc.',
    category: 'BienBao'
  },
  {
    id: 8,
    question: 'Thứ tự các xe đi như thế nào là đúng quy tắc giao thông trong Sa hình?',
    options: ['Xe chữa cháy đi trước -> Xe công an -> Xe con', 'Xe con đi trước -> Xe chữa cháy', 'Xe công an đi trước -> Xe chữa cháy'],
    answer: 0,
    isCritical: true,
    explanation: 'Mẹo 5 Bước Sa Hình: 1. Nhất chớm -> 2. Nhì ưu (Hỏa -> Sự -> Công -> Thương) -> 3. Tam đường -> 4. Tứ hướng -> 5. Hướng rẽ.',
    category: 'SaHinh'
  },
  {
    id: 9,
    question: 'Khi thao tác tăng số hoặc giảm số đối với xe ô tô số sàn, người lái xe cần chú ý mẹo nào?',
    options: ['Tăng số chọn Ý 1, Giảm số chọn Ý 2', 'Tăng số chọn Ý 2, Giảm số chọn Ý 1', 'Chọn cả ý 1 và ý 2'],
    answer: 0,
    explanation: 'Mẹo kỹ thuật số: Tăng 1 - Giảm 2 (Tăng số chọn Ý 1, Giảm số chọn Ý 2).',
    category: 'KyThuat'
  },
  {
    id: 10,
    question: 'Người đủ 18 tuổi được điều khiển các loại xe nào sau đây?',
    options: [
      'Xe ô tô chở người đến 9 chỗ ngồi; xe ô tô tải có trọng tải dưới 3.500 kg',
      'Xe ô tô tải trên 3.500 kg',
      'Xe ô tô chở người từ 10 đến 30 chỗ ngồi'
    ],
    answer: 0,
    explanation: 'Mẹo Độ tuổi: 18 tuổi lái B1, B2 (ô tô đến 9 chỗ, tải < 3.5t); 21 tuổi (C); 24 tuổi (D); 27 tuổi (E). Tăng +3 tuổi.',
    category: 'KhaiNiem'
  }
];
