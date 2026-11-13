// ============================================================
// Kho dữ liệu POS quán Sâm Mix - lưu local + đồng bộ Google Sheets
// ============================================================

export type Category = 'sam' | 'bbk' | 'coffee' | 'ep' | 'food' | 'app';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  img: string;
  badge?: string;
  description?: string;
}

export const MENU: MenuItem[] = [
  // --- 1. NƯỚC SÂM THẢO MỘC THANH MÁT ---
  {
    id: 'sam-mia-lau',
    name: 'Sâm Mía Lau',
    price: 15000,
    category: 'sam',
    badge: 'Thanh Nhiệt',
    img: 'sam_mia_lau_v2.jpg',
    description: 'Mía lau, râu bắp, lá dứa thanh nhiệt giải độc tự nhiên'
  },
  {
    id: 'sam-bong-cuc',
    name: 'Sâm Bông Cúc Nhãn Nhục',
    price: 15000,
    category: 'sam',
    badge: 'Mát Gan',
    img: 'sam_bong_cuc_v2.jpg',
    description: 'Hoa cúc vàng thơm ngát, nhãn nhục ngọt thanh, ngủ ngon giấc'
  },
  {
    id: 'sam-tao-do',
    name: 'Sâm Củ Năng Táo Đỏ',
    price: 15000,
    category: 'sam',
    badge: 'Bồi Bổ',
    img: 'sam_cu_nang_v2.jpg',
    description: 'Củ năng giòn ngọt, táo đỏ kỷ tử bổ khí huyết, giảm mệt mỏi'
  },

  // --- 2. BÁNH BAO KẸP (TAI BAO ĐÀI LOAN) ---
  {
    id: 'bbk-2',
    name: 'Bánh Bao Kẹp Gà Rán',
    price: 20000,
    category: 'bbk',
    badge: 'Best Seller',
    img: 'menu/bbk-2.jpg',
    description: 'Vỏ bánh bao hấp mềm xốp kẹp phi lê gà rán giòn rụm, dưa leo, xà lách & sốt tương ớt mayo'
  },
  {
    id: 'bbk-4',
    name: 'Bánh Bao Kẹp Tôm Phô Mai',
    price: 26000,
    category: 'bbk',
    badge: 'Yêu Thích',
    img: 'menu/bbk-4.jpg',
    description: 'Bánh bao kẹp chả tôm rán giòn rụm phủ lớp phô mai tan chảy béo ngậy'
  },
  {
    id: 'bbk-3',
    name: 'Bánh Bao Kẹp Tôm Rán',
    price: 24000,
    category: 'bbk',
    badge: 'Giòn Rụm',
    img: 'menu/bbk-3.jpg',
    description: 'Chả tôm tươi tẩm bột chiên vàng giòn rụm kẹp xà lách tươi & sốt thơm béo'
  },
  {
    id: 'bbk-1',
    name: 'Bánh Bao Kẹp Xúc Xích',
    price: 18000,
    category: 'bbk',
    badge: 'Ăn Vặt',
    img: 'menu/bbk-1.jpg',
    description: 'Vỏ bánh bao hấp mềm xốp kẹp xúc xích chiên khía hoa, rau xà lách & sốt'
  },
  {
    id: 'bbk-5',
    name: 'Bánh Bao Kẹp Sườn BBQ',
    price: 25000,
    category: 'bbk',
    badge: 'Đậm Vị',
    img: 'menu/bbk-5.jpg',
    description: 'Thịt sườn nướng áo đẫm sốt BBQ khói đậm đà kiểu Đài Loan'
  },
  {
    id: 'bbk-6',
    name: 'Vỏ Bánh Bao Hấp',
    price: 6000,
    category: 'bbk',
    img: 'menu/bbk-6.jpg',
    description: 'Vỏ bánh bao hấp hình vỏ sò trắng muốt mềm xốp, thơm mùi sữa nhẹ'
  },

  // --- 3. CÀ PHÊ PHIN & TRÀ ---
  {
    id: 'cf-1',
    name: 'Cà Phê Muối Kem Béo',
    price: 20000,
    category: 'coffee',
    badge: 'Hot Trend',
    img: 'menu/cf-1.jpg',
    description: 'Cà phê pha phin mộc thơm nồng kết hợp lớp kem mặn béo ngậy chuẩn vị Huế'
  },
  {
    id: 'ca-phe-den',
    name: 'Cà Phê Đen Phin',
    price: 15000,
    category: 'coffee',
    img: 'menu/cf-2.jpg',
    description: 'Đậm đà chuẩn vị phin truyền thống rang mộc'
  },
  {
    id: 'ca-phe-sua',
    name: 'Cà Phê Sữa Đá',
    price: 20000,
    category: 'coffee',
    badge: 'Phổ Biến',
    img: 'menu/cf-3.jpg',
    description: 'Vị ngọt béo hài hòa giữa sữa đặc và cà phê nguyên chất'
  },

  // --- 4. NƯỚC ÉP TRÁI CÂY TƯƠI ---
  {
    id: 'ep-cam',
    name: 'Cam Sành Miền Tây',
    price: 15000,
    category: 'ep',
    badge: 'Vitamin C',
    img: 'cam.jpg',
    description: 'Cam sành tươi mọng nước kháng khuẩn, tăng đề kháng, đẹp da'
  },
  {
    id: 'ep-dua-hau',
    name: 'Nước Ép Dưa Hấu',
    price: 15000,
    category: 'ep',
    img: 'dua_hau.jpg',
    description: 'Giải nhiệt, tốt tim mạch, giàu chất chống oxy hóa lycopene'
  },
  {
    id: 'ep-ca-rot',
    name: 'Cà Rốt Đà Lạt',
    price: 20000,
    category: 'ep',
    img: 'carot.jpg',
    description: 'Beta-caroten dồi dào, sáng mắt và đẹp da'
  },
  {
    id: 'ep-dua',
    name: 'Dứa Mật',
    price: 20000,
    category: 'ep',
    img: 'dua.jpeg',
    description: 'Hỗ trợ tiêu hóa, giàu enzyme bromelain và vitamin'
  },
  {
    id: 'ep-coc',
    name: 'Cóc Non',
    price: 20000,
    category: 'ep',
    img: 'coc.jpeg',
    description: 'Vị chua ngọt thanh dịu, giàu vitamin C và chất xơ'
  },
  {
    id: 'ep-tao',
    name: 'Táo Ép Nguyên Chất',
    price: 20000,
    category: 'ep',
    badge: 'Thanh Ngọt',
    img: 'tao.jpg',
    description: 'Táo tươi ép nguyên chất ngọt thanh tự nhiên, giàu chất chống oxy hóa & thanh lọc cơ thể'
  },
  {
    id: 'ep-oi',
    name: 'Ổi Ép Tươi',
    price: 20000,
    category: 'ep',
    badge: 'Vitamin C++',
    img: 'oi.jpg',
    description: 'Ổi tươi ép thanh mát thơm lừng, bổ sung hàm lượng vitamin C dồi dào'
  },
  {
    id: 'ep-trai-cay-mix',
    name: 'Ép Trái Cây Mix',
    price: 25000,
    category: 'ep',
    badge: 'Detox',
    img: 'cantay.JPG',
    description: 'Kết hợp cần tây và trái cây tươi theo công thức detox thanh lọc cơ thể'
  },

  // --- 5. ĐỒ ĂN VẶT & MÓN NÓNG ---
  {
    id: 'banh-trang-tron',
    name: 'Bánh Tráng Trộn',
    price: 20000,
    category: 'food',
    badge: 'Ăn Vặt Hot',
    img: 'banh_trang_tron.jpg',
    description: 'Bánh tráng dẻo thấm vị muối tôm, bò khô, trứng cút, rau răm, sốt tắc chua ngọt đậm đà'
  },
  {
    id: 'av-2',
    name: 'Khoai Tây Chiên Lắc Phô Mai',
    price: 25000,
    category: 'food',
    badge: 'Best Seller',
    img: 'menu/av-2.jpg',
    description: 'Khoai tây cắt thanh dài chiên vàng giòn rụm lắc đều lớp bột phô mai béo ngậy'
  },
  {
    id: 'nem-nuong',
    name: 'Nem Nướng Nóng Hổi',
    price: 15000,
    category: 'food',
    img: 'nem_nuong.jpg',
    description: 'Nem nướng thơm lừng, đậm đà nướng than chuẩn vị'
  },
  {
    id: 'oc-buou-nhoi-thit',
    name: 'Ốc Bươu Nhồi Thịt',
    price: 50000,
    category: 'food',
    badge: 'Đặc Sản',
    img: 'oc_buou_nhoi_thit.jpg',
    description: 'Nóng hổi thơm sả kèm nước chấm tắc gừng ớt chua ngọt'
  },
  {
    id: 'long-bo-sua-nuong',
    name: 'Lòng Bò Sữa Nướng',
    price: 60000,
    category: 'food',
    badge: 'Món Nhậu',
    img: 'long_bo_sua_nuong.jpg',
    description: 'Béo ngậy nướng sả ớt đậm đà, thơm nức mũi'
  },
  {
    id: 'vu-heo-dau-bap',
    name: 'Vú Heo Đậu Bắp Nướng',
    price: 60000,
    category: 'food',
    img: 'vu_heo_dau_bap.jpg',
    description: 'Giòn sần sật nướng chao kèm đậu bắp nướng'
  },
  {
    id: 'app-online',
    name: 'Đơn App Online (ShopeeFood / Grab)',
    price: 0,
    category: 'app',
    img: 'logo_v2.jpg'
  }
];

export interface OrderLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  paymentMethod?: 'tienmat' | 'chuyenkhoan' | 'app';
  id: string;
  time: string;
  staff: string;
  shift: 'sang' | 'trua' | 'toi' | 'gay' | 'chieu';
  lines: OrderLine[];
  total: number;
  cash?: number;
  change?: number;
  synced: boolean;
}

// URL Google Apps Script (đồng bộ check-in/check-out/báo cáo/đơn hàng)
export const APP_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyETg2znWnDrNsgq3G2eB0IJxFeb_GdLKo5N68FkFlJVMvTzdt_M_C3YFzL7fcgiyY1/exec";

const ORDERS_KEY = 'sammix_orders_v1';

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) as Order[] : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export async function syncOrder(order: Order): Promise<boolean> {
  try {
    await fetch(APP_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        type: 'order',
        orderId: order.id,
        staff: order.staff,
        shift: order.shift,
        paymentMethod: order.paymentMethod || 'tienmat',
        items: order.lines.map(l => l.name + 'x' + l.qty).join(', '),
        detail: JSON.stringify(order.lines.map(l => ({ name: l.name, qty: l.qty, price: l.price }))),
        total: order.total,
        cash: order.cash || '',
        change: order.change || '',
        time: order.time
      })
    });
    return true;
  } catch {
    return false;
  }
}

export function getShift(): 'sang' | 'trua' | 'toi' | 'gay' | 'chieu' {
  const h = new Date().getHours();
  if (h >= 7 && h < 13) return 'sang';
  if (h >= 13 && h <= 22) return 'chieu';
  return 'chieu';
}

export function shiftLabel(s: string): string {
  if (s === 'sang') return 'Ca Sáng (7h30-12h30)';
  return 'Ca Chiều Tối (13h-21h)';
}

export function fmtVND(n: number): string {
  return (n || 0).toLocaleString('vi-VN') + 'đ';
}

export function fmtTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export function deleteOrder(orderId: string) {
  const orders = getOrders().filter(o => o.id !== orderId);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export async function syncDeleteOrder(orderId: string): Promise<boolean> {
  try {
    await fetch(APP_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        type: 'delete_order',
        orderId: orderId
      })
    });
    return true;
  } catch {
    return false;
  }
}

export function getItemImgUrl(img: string): string {
  if (!img) return `${import.meta.env.BASE_URL}logo_v2.jpg`;
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  return `${import.meta.env.BASE_URL}${img}`;
}
