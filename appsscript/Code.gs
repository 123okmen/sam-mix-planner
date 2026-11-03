// ============================================================
// SAM MIX PLANNER - Apps Script OPTIMIZED (2026)
// 4 tab: Cham cong | Don hang | Bao cao doanh thu | Bao cao nghi ca
// Real-time Telegram qua @Alicewordbot (Token: 8755799868:AAHKmMYP9TAm3fAFiGO0zLDYIpcddV90oFc)
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var type = data.type;

    if (type === 'checkin' || type === 'checkout') return handleShift(data, type);
    if (type === 'report') return handleReport(data);
    if (type === 'order') return handleOrder(data);
    if (type === 'delete_order') return handleDeleteOrderSheet(data);
    if (type === 'summary') return handleSummary(data);
    if (type === 'off_request') return handleOffRequest(data);
    return jsonOk('Khong ho tro type: ' + type);
  } catch (err) {
    return jsonErr(err.toString());
  }
}

// ================= TIEN ICH =================
function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);

  var need = false;
  if (sheet.getLastRow() < 1) need = true;
  else {
    var first = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    for (var hi = 0; hi < headers.length; hi++) {
      if (String(first[hi] || '') !== headers[hi]) { need = true; break; }
    }
  }
  if (need) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    if (sheet.getLastColumn() > headers.length) sheet.deleteColumns(headers.length + 1, sheet.getLastColumn() - headers.length);
  }

  var hr = sheet.getRange(1, 1, 1, headers.length);
  hr.setFontWeight('bold').setBackground('#14663c').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 28);
  return sheet;
}

function moneyFmt(v) {
  if (v === '' || v === undefined || v === null) return '0 d';
  var n = Number(v);
  if (isNaN(n)) return String(v);
  return n.toLocaleString('vi-VN') + ' d';
}

function num(v) {
  var n = Number(v);
  return isNaN(n) ? 0 : n;
}

function normDay(v) {
  if (v instanceof Date) return Utilities.formatDate(v, 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy');
  var s = String(v).trim();
  if (s.length > 10 && s.indexOf('/') < 0) {
    var d = new Date(s);
    if (!isNaN(d.getTime())) return Utilities.formatDate(d, 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy');
  }
  return s.substring(0, 10);
}

function normHour(v) {
  if (v instanceof Date) return Utilities.formatDate(v, 'Asia/Ho_Chi_Minh', 'HH:mm');
  var s = String(v).trim();
  var m = s.match(/(\d{1,2}):(\d{2})/);
  if (m) return (m[1].length === 1 ? '0' + m[1] : m[1]) + ':' + m[2];
  if (s.length > 10 && s.indexOf(':') < 0) {
    var d = new Date(s);
    if (!isNaN(d.getTime())) return Utilities.formatDate(d, 'Asia/Ho_Chi_Minh', 'HH:mm');
  }
  return s.substring(0, 5);
}

function getShiftLabel(h) {
  if (h >= 6 && h < 13) return 'Ca Sang (7h30-12h30)';
  if (h >= 13 && h <= 22) return 'Ca Chieu Toi (13h-21h)';
  return 'Ngoai gio';
}

function nowParts() {
  var now = new Date();
  var h = Number(Utilities.formatDate(now, 'Asia/Ho_Chi_Minh', 'HH'));
  return {
    ngay: Utilities.formatDate(now, 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy'),
    gio: Utilities.formatDate(now, 'Asia/Ho_Chi_Minh', 'HH:mm:ss'),
    ca: getShiftLabel(h),
    ngayDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  };
}

function jsonOk(msg) { return ContentService.createTextOutput(JSON.stringify({ ok: true, msg: msg })).setMimeType(ContentService.MimeType.JSON); }
function jsonErr(msg) { return ContentService.createTextOutput(JSON.stringify({ ok: false, msg: msg })).setMimeType(ContentService.MimeType.JSON); }

// ================= CHAM CONG =================
function handleShift(data, type) {
  var headers = ['Ngay', 'Gio', 'Ten nhan vien', 'Thao tac', 'Ca', 'Ghi chu'];
  var sheet = getOrCreateSheet('Cham cong', headers);
  var t = nowParts();
  var label = type === 'checkin' ? 'CHECK-IN' : 'CHECK-OUT';
  var staffName = data.name || data.staff || '';
  var caTxt = data.shift || t.ca;
  sheet.appendRow([t.ngay, t.gio, staffName, label, caTxt, data.note || '']);

  var r = sheet.getLastRow();
  var cell = sheet.getRange(r, 4);
  if (type === 'checkin') {
    cell.setBackground('#d9ead3').setFontColor('#1e7b1e').setFontWeight('bold');
  } else {
    cell.setBackground('#f4cccc').setFontColor('#cc0000').setFontWeight('bold');
  }
  sheet.getRange(r, 2).setNumberFormat('@');
  sheet.autoResizeColumns(1, 5);

  var emo = (type === 'checkin') ? String.fromCodePoint(0x2705) : String.fromCodePoint(0x1F534);
  sendTelegram(emo + ' ' + label + ': ' + staffName + ' luc ' + t.gio + ' (' + caTxt + ')');
  return jsonOk('Da ghi nhan ' + label + ' cho ' + staffName + ' luc ' + t.gio);
}

// ================= DON HANG (POS) =================
function handleOrder(data) {
  var headers = ['Ma don', 'Ngay', 'Gio', 'Nhan vien', 'Ca', 'Mon hang (chi tiet)', 'So mon', 'Tong tien', 'Tien khach', 'Tien thoi', 'Ghi chu'];
  var sheet = getOrCreateSheet('Don hang', headers);
  var t = nowParts();

  var lines = [];
  var soMon = 0;
  var detail = data.detail;

  if (typeof detail === 'string') {
    try { detail = JSON.parse(detail); } catch (err2) { detail = null; }
  }
  if (Array.isArray(detail)) {
    for (var i = 0; i < detail.length; i++) {
      var it = detail[i];
      var q = num(it.qty);
      var p = num(it.price);
      soMon += q;
      lines.push((it.name || 'Mon ?') + ' x' + q + ' = ' + moneyFmt(q * p));
    }
  }
  if (lines.length === 0) {
    var raw = String(data.items || '');
    var parts = raw.split(',');
    for (var j = 0; j < parts.length; j++) {
      var pt = parts[j].trim();
      if (!pt) continue;
      var m = pt.match(/x(\d+)$/);
      var qty = m ? Number(m[1]) : 1;
      soMon += qty;
      lines.push(pt);
    }
  }
  if (lines.length === 0) {
    lines.push(data.order || data.item || 'Don hang');
    soMon = 1;
  }

  var shiftTxt = (data.shift === 'sang' || data.shift === 'Ca Sang (7h30-12h30)') ? 'Ca Sang (7h30-12h30)' : 'Ca Chieu Toi (13h-21h)';
  var orderId = String(data.orderId || data.id || ('DH' + Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'HHmmss')));
  var noteTxt = data.note || '';
  var pMethod = data.paymentMethod || data.payment_method || 'tienmat';
  if (pMethod === 'chuyenkhoan') {
    noteTxt = (noteTxt ? noteTxt + ' | ' : '') + 'Chuyen khoan';
  } else if (pMethod === 'app') {
    noteTxt = (noteTxt ? noteTxt + ' | ' : '') + 'App Online';
  }

  sheet.appendRow([
    orderId,
    t.ngay,
    t.gio,
    data.staff || data.name || '',
    shiftTxt,
    lines.join('\n'),
    soMon,
    num(data.total),
    num(data.cash),
    num(data.change),
    noteTxt
  ]);

  sendTelegram(tgOrderMsg(data, lines, soMon, shiftTxt, t, orderId));
  var r = sheet.getLastRow();
  sheet.getRange(r, 8).setNumberFormat('#,##0" d"').setFontWeight('bold');
  sheet.getRange(r, 9).setNumberFormat('#,##0" d"');
  sheet.getRange(r, 10).setNumberFormat('#,##0" d"');
  sheet.getRange(r, 6).setWrap(true).setVerticalAlignment('top');
  sheet.getRange(r, 2).setNumberFormat('@');
  sheet.getRange(r, 3).setNumberFormat('@');
  sheet.autoResizeColumns(1, 7);
  return jsonOk('Da luu don hang ' + orderId + ' (' + soMon + ' mon, ' + moneyFmt(data.total) + ')');
}

// ================= BAO CAO DOANH THU =================
function handleReport(data) {
  var headers = ['Ngay', 'Gio', 'Ten nhan vien', 'Ca', 'Doanh thu', 'Tien mat', 'Ghi chu'];
  var sheet = getOrCreateSheet('Bao cao doanh thu', headers);
  var t = nowParts();
  var noteTxt = data.note || data.ghi_chu || '';
  var ck = num(data.transfer || data.tien_chuyen_khoan);
  if (ck > 0) {
    noteTxt = (noteTxt ? noteTxt + ' | ' : '') + 'Chuyen khoan: ' + moneyFmt(ck);
  }
  var caTxt = data.shift || t.ca;

  sheet.appendRow([
    t.ngay,
    t.gio,
    data.name || data.staff || '',
    caTxt,
    num(data.revenue || data.doanh_thu),
    num(data.cash || data.tien_mat),
    noteTxt
  ]);

  sendTelegram(tgReportMsg(data, t));
  var r = sheet.getLastRow();
  sheet.getRange(r, 5).setNumberFormat('#,##0" d"').setFontWeight('bold');
  sheet.getRange(r, 6).setNumberFormat('#,##0" d"');
  sheet.getRange(r, 2).setNumberFormat('@');
  sheet.autoResizeColumns(1, 5);
  return jsonOk('Da luu bao cao doanh thu ' + moneyFmt(data.revenue || data.doanh_thu) + ' cho ' + (data.name || data.staff || ''));
}

// ================= BAO CAO NGHI CA =================
function handleOffRequest(data) {
  var headers = ['Ngay gui', 'Gio gui', 'Ten nhan vien', 'Ngay xin nghi', 'Ca xin nghi', 'Ly do'];
  var sheet = getOrCreateSheet('Bao cao nghi ca', headers);
  var t = nowParts();
  var staffName = data.staff || data.name || '';
  sheet.appendRow([
    t.ngay,
    t.gio,
    staffName,
    data.date || '',
    data.shift || '',
    data.reason || ''
  ]);

  var r = sheet.getLastRow();
  sheet.getRange(r, 3).setFontWeight('bold');
  sheet.autoResizeColumns(1, 6);

  var msg = String.fromCodePoint(0x1F3D6) + ' BAO CAO NGH\u0128 CA (OFF CA)\n'
          + String.fromCodePoint(0x1F464) + ' Nhan vien: ' + staffName + '\n'
          + String.fromCodePoint(0x1F4C5) + ' Ngay xin nghi: ' + (data.date || '') + '\n'
          + String.fromCodePoint(0x23F0) + ' Ca: ' + (data.shift || '') + '\n'
          + String.fromCodePoint(0x1F4DD) + ' Ly do: ' + (data.reason || 'Khong co');

  sendTelegram(msg);
  return jsonOk('Da luu don bao nghi ca cho ' + staffName);
}

// ================= BAO CAO TONG HOP CHI TIET (REAL-TIME) =================
function handleSummary(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var t = nowParts();
  var lines = [];
  var tongDoanhThu = 0, tongTienMat = 0, soDon = 0, soMon = 0;
  var nvMap = {};

  var dh = ss.getSheetByName('Don hang');
  if (dh && dh.getLastRow() > 1) {
    var vals = dh.getRange(2, 1, dh.getLastRow() - 1, 11).getValues();
    for (var i = 0; i < vals.length; i++) {
      if (normDay(vals[i][1]) !== t.ngay) continue;
      soDon++;
      tongDoanhThu += num(vals[i][7]);
      soMon += num(vals[i][6]);
      var nv = String(vals[i][3] || '?');
      nvMap[nv] = (nvMap[nv] || 0) + num(vals[i][7]);
    }
  }

  var bc = ss.getSheetByName('Bao cao doanh thu');
  if (bc && bc.getLastRow() > 1) {
    var bvals = bc.getRange(2, 1, bc.getLastRow() - 1, 7).getValues();
    for (var k = 0; k < bvals.length; k++) {
      if (normDay(bvals[k][0]) !== t.ngay) continue;
      tongTienMat += num(bvals[k][5]);
    }
  }

  lines.push(String.fromCodePoint(0x1F4CA) + ' TONG KET NGAY ' + t.ngay);
  lines.push(String.fromCodePoint(0x1F4C5) + ' ' + t.gio + ' | ' + t.ca);
  lines.push('--------------------------------');
  lines.push(String.fromCodePoint(0x1F6D2) + ' Tong so don: ' + soDon + ' | So mon: ' + soMon);
  lines.push(String.fromCodePoint(0x1F4B0) + ' Doanh thu: ' + moneyFmt(tongDoanhThu));
  lines.push(String.fromCodePoint(0x1F4B5) + ' Tien mat: ' + moneyFmt(tongTienMat));
  if (tongDoanhThu > tongTienMat) {
    lines.push(String.fromCodePoint(0x1F4B3) + ' Chuyen khoan/App: ' + moneyFmt(tongDoanhThu - tongTienMat));
  }
  if (Object.keys(nvMap).length > 0) {
    lines.push('--------------------------------');
    lines.push('Theo nhan vien:');
    var names = Object.keys(nvMap);
    for (var n = 0; n < names.length; n++) {
      lines.push('  - ' + names[n] + ': ' + moneyFmt(nvMap[names[n]]));
    }
  }

  sendTelegram(lines.join('\n'));
  return jsonOk('Da gui tong ket real-time');
}

// ================= TELEGRAM REAL-TIME =================
var TG_BOT_TOKEN = '8755799868:AAHKmMYP9TAm3fAFiGO0zLDYIpcddV90oFc';
var TG_CHAT_ID = '7220726428';

function sendTelegram(text) {
  try {
    var payload = {
      method: 'post',
      payload: {
        chat_id: TG_CHAT_ID,
        text: text,
        disable_web_page_preview: true
      }
    };
    UrlFetchApp.fetch('https://api.telegram.org/bot' + TG_BOT_TOKEN + '/sendMessage', payload);
    Logger.log('TG OK: ' + text.substring(0, 60));
  } catch (err) {
    Logger.log('TG FAIL: ' + err);
  }
}

function tgOrderMsg(data, lines, soMon, shiftTxt, t, orderId) {
  var pMethod = (data.paymentMethod === 'chuyenkhoan' || data.payment_method === 'chuyenkhoan') ? 'Chuyen khoan' :
                (data.paymentMethod === 'app' || data.payment_method === 'app') ? 'App Online' : 'Tien mat';

  var msg = String.fromCodePoint(0x1F6D2) + ' DON MOI #' + orderId + '\n'
          + String.fromCodePoint(0x1F464) + ' ' + (data.staff || data.name || 'Nhan vien') + ' | ' + shiftTxt + ' | ' + t.gio + '\n'
          + String.fromCodePoint(0x1F4B3) + ' Thanh toan: ' + pMethod + '\n'
          + '--------------------------------\n'
          + lines.join('\n') + '\n'
          + '--------------------------------\n'
          + String.fromCodePoint(0x1F4E6) + ' So mon: ' + soMon + '\n'
          + String.fromCodePoint(0x1F4B0) + ' TONG TIEN: ' + moneyFmt(data.total);

  if (data.cash) msg += '\n' + String.fromCodePoint(0x1F4B5) + ' Khach dua: ' + moneyFmt(data.cash);
  if (data.change) msg += '\n' + String.fromCodePoint(0x1FA99) + ' Tien thoi: ' + moneyFmt(data.change);
  var note = data.note || data.ghi_chu;
  if (note) msg += '\n' + String.fromCodePoint(0x1F4DD) + ' Ghi chu: ' + note;
  return msg;
}

function tgReportMsg(data, t) {
  var ck = num(data.transfer || data.tien_chuyen_khoan);
  var msg = String.fromCodePoint(0x1F4CA) + ' BAO CAO DOANH THU CUOI CA\n'
          + String.fromCodePoint(0x1F464) + ' ' + (data.name || data.staff || 'Nhan vien') + ' | ' + t.ca + ' | ' + t.ngay + ' ' + t.gio + '\n'
          + '--------------------------------\n'
          + String.fromCodePoint(0x1F4B0) + ' TONG DOANH THU: ' + moneyFmt(data.revenue || data.doanh_thu) + '\n'
          + String.fromCodePoint(0x1F4B5) + ' Tien mat: ' + moneyFmt(data.cash || data.tien_mat);

  if (ck > 0) msg += '\n' + String.fromCodePoint(0x1F4B3) + ' Chuyen khoan: ' + moneyFmt(ck);
  var note = data.note || data.ghi_chu;
  if (note) msg += '\n' + String.fromCodePoint(0x1F4DD) + ' Ghi chu: ' + note;
  return msg;
}

// ================= API JSON CHO TRANG WEB & BOT (?action=data) =================
function apiData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var t = nowParts();
  var tongDoanhThu = 0, tongTienMat = 0, soDon = 0, soMon = 0;
  var nvMap = {}, nvDon = {}, gioMap = {}, ngayMap = {};
  var gioKeys = [], gioVals = [], ngayKeys = [], ngayVals = [];
  var nvNames = [], nvVals = [], nvDonVals = [];
  var baoCao = [];
  var donHang = [];

  var dh = ss.getSheetByName('Don hang');
  if (dh && dh.getLastRow() > 1) {
    var vals = dh.getRange(2, 1, dh.getLastRow() - 1, 11).getValues();
    for (var i = 0; i < vals.length; i++) {
      var ngayStr = normDay(vals[i][1]);
      var gioStr = normHour(vals[i][2]).substring(0, 2) + 'h';
      var tien = num(vals[i][7]);
      var nv = String(vals[i][3] || '?');
      var soM = num(vals[i][6]);
      if (ngayStr === t.ngay) {
        soDon++; tongDoanhThu += tien; soMon += soM;
        nvMap[nv] = (nvMap[nv] || 0) + tien;
        nvDon[nv] = (nvDon[nv] || 0) + 1;
        gioMap[gioStr] = (gioMap[gioStr] || 0) + tien;
      }
      ngayMap[ngayStr] = (ngayMap[ngayStr] || 0) + tien;
    }

    // Tra ve 60 don hang gan nhat
    var startD = Math.max(0, vals.length - 60);
    for (var di = vals.length - 1; di >= startD; di--) {
      donHang.push({
        id: String(vals[di][0] || ''),
        ngay: normDay(vals[di][1]),
        gio: normHour(vals[di][2]),
        nv: String(vals[di][3] || ''),
        ca: String(vals[di][4] || ''),
        mon: String(vals[di][5] || ''),
        soMon: num(vals[di][6]),
        total: num(vals[di][7]),
        cash: num(vals[di][8]),
        change: num(vals[di][9]),
        note: String(vals[di][10] || '')
      });
    }
  }

  var bc = ss.getSheetByName('Bao cao doanh thu');
  if (bc && bc.getLastRow() > 1) {
    var bvals = bc.getRange(2, 1, bc.getLastRow() - 1, 7).getValues();
    for (var k = 0; k < bvals.length; k++) {
      if (normDay(bvals[k][0]) === t.ngay) tongTienMat += num(bvals[k][5]);
      baoCao.push({
        ngay: normDay(bvals[k][0]),
        gio: normHour(bvals[k][1]),
        nv: String(bvals[k][2] || ''),
        ca: String(bvals[k][3] || ''),
        doanhThu: num(bvals[k][4]),
        tienMat: num(bvals[k][5]),
        ghiChu: String(bvals[k][6] || '')
      });
    }
  }
  baoCao.reverse();

  var gAll = Object.keys(gioMap).sort();
  for (var g = 0; g < gAll.length; g++) { gioKeys.push(gAll[g]); gioVals.push(gioMap[gAll[g]]); }
  var nAll = Object.keys(nvMap).sort(function (a, b) { return nvMap[b] - nvMap[a]; });
  for (var n2 = 0; n2 < nAll.length; n2++) {
    nvNames.push(nAll[n2]); nvVals.push(nvMap[nAll[n2]]); nvDonVals.push(nvDon[nAll[n2]] || 0);
  }

  // Sort ngayMap theo dung timestamp thoi gian (tranh loi alphabet DD/MM/YYYY)
  var nAll2 = Object.keys(ngayMap).sort(function (a, b) {
    var pa = a.split('/'), pb = b.split('/');
    if (pa.length === 3 && pb.length === 3) {
      return new Date(pa[2], pa[1] - 1, pa[0]) - new Date(pb[2], pb[1] - 1, pb[0]);
    }
    return a.localeCompare(b);
  });
  var start7 = Math.max(0, nAll2.length - 7);
  for (var d7 = start7; d7 < nAll2.length; d7++) { ngayKeys.push(nAll2[d7]); ngayVals.push(ngayMap[nAll2[d7]]); }

  var out = {
    ok: true,
    thoiGian: t.gio,
    ngay: t.ngay,
    ca: t.ca,
    kpi: { doanhThu: tongDoanhThu, tienMat: tongTienMat, soDon: soDon, soMon: soMon },
    gio: { keys: gioKeys, vals: gioVals },
    nv: { names: nvNames, vals: nvVals, don: nvDonVals, donVals: nvDonVals },
    ngay: { keys: ngayKeys, vals: ngayVals },
    baoCao: baoCao,
    donHang: donHang
  };
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

// ================= RESET DU LIEU =================
function handleReset() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  getOrCreateSheet('Don hang', ['Ma don', 'Ngay', 'Gio', 'Nhan vien', 'Ca', 'Mon hang (chi tiet)', 'So mon', 'Tong tien', 'Tien khach', 'Tien thoi', 'Ghi chu']);
  getOrCreateSheet('Cham cong', ['Ngay', 'Gio', 'Ten nhan vien', 'Thao tac', 'Ca', 'Ghi chu']);
  getOrCreateSheet('Bao cao doanh thu', ['Ngay', 'Gio', 'Ten nhan vien', 'Ca', 'Doanh thu', 'Tien mat', 'Ghi chu']);
  getOrCreateSheet('Bao cao nghi ca', ['Ngay gui', 'Gio gui', 'Ten nhan vien', 'Ngay xin nghi', 'Ca xin nghi', 'Ly do']);
  var names = ['Don hang', 'Cham cong', 'Bao cao doanh thu', 'Bao cao nghi ca'];
  var msgs = [];
  for (var i = 0; i < names.length; i++) {
    var s = ss.getSheetByName(names[i]);
    if (s && s.getLastRow() > 1) {
      var n = s.getLastRow() - 1;
      s.getRange(2, 1, n, s.getLastColumn()).clearContent();
      msgs.push(names[i] + ': xoa ' + n + ' dong');
    }
  }
  return jsonOk('Reset xong! ' + msgs.join(', '));
}

function handleDeleteOrderSheet(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Don hang');
  var orderId = String(data.orderId || '').trim();
  if (!sheet || !orderId) return jsonErr('Khong tim thay sheet hoac Ma don');

  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return jsonOk('Sheet trong');

  var ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  var deletedCount = 0;

  for (var i = ids.length - 1; i >= 0; i--) {
    var idCell = String(ids[i][0] || '').trim();
    if (idCell === orderId) {
      sheet.deleteRow(i + 2);
      deletedCount++;
    }
  }

  if (deletedCount > 0) {
    sendTelegram(String.fromCodePoint(0x1F5D1) + ' DA XOA DON HANG #' + orderId + ' tren Google Sheets');
    return jsonOk('Da xoa don ' + orderId + ' (' + deletedCount + ' dong)');
  }

  return jsonOk('Khong tim thay don ' + orderId + ' tren Google Sheets');
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'data') return apiData();
  if (e && e.parameter && e.parameter.action === 'reset') return handleReset();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var t = nowParts();
  var L = [];

  var tongDoanhThu = 0, tongTienMat = 0, soDon = 0, soMon = 0;
  var nvMap = {}, nvDon = {}, gioMap = {}, ngayMap = {};
  var gioKeys = [], gioVals = [];
  var ngayKeys = [], ngayVals = [];
  var nvNames = [], nvVals = [], nvDonVals = [];

  var dh = ss.getSheetByName('Don hang');
  if (dh && dh.getLastRow() > 1) {
    var vals = dh.getRange(2, 1, dh.getLastRow() - 1, 11).getValues();
    for (var i = 0; i < vals.length; i++) {
      var ngayStr = normDay(vals[i][1]);
      var gioStr = normHour(vals[i][2]).substring(0, 2) + 'h';
      var tien = num(vals[i][7]);
      var nv = String(vals[i][3] || '?');
      var soM = num(vals[i][6]);

      if (ngayStr === t.ngay) {
        soDon++;
        tongDoanhThu += tien;
        soMon += soM;
        nvMap[nv] = (nvMap[nv] || 0) + tien;
        nvDon[nv] = (nvDon[nv] || 0) + 1;
        gioMap[gioStr] = (gioMap[gioStr] || 0) + tien;
      }
      ngayMap[ngayStr] = (ngayMap[ngayStr] || 0) + tien;
    }
  }

  var bc = ss.getSheetByName('Bao cao doanh thu');
  if (bc && bc.getLastRow() > 1) {
    var bvals = bc.getRange(2, 1, bc.getLastRow() - 1, 7).getValues();
    for (var k = 0; k < bvals.length; k++) {
      if (normDay(bvals[k][0]) === t.ngay) tongTienMat += num(bvals[k][5]);
    }
  }

  var gAll = Object.keys(gioMap).sort();
  for (var g = 0; g < gAll.length; g++) {
    gioKeys.push(gAll[g]);
    gioVals.push(gioMap[gAll[g]]);
  }
  var nAll = Object.keys(nvMap).sort(function (a, b) { return nvMap[b] - nvMap[a]; });
  for (var n2 = 0; n2 < nAll.length; n2++) {
    nvNames.push(nAll[n2]);
    nvVals.push(nvMap[nAll[n2]]);
    nvDonVals.push(nvDon[nAll[n2]] || 0);
  }

  var nAll2 = Object.keys(ngayMap).sort(function (a, b) {
    var pa = a.split('/'), pb = b.split('/');
    if (pa.length === 3 && pb.length === 3) {
      return new Date(pa[2], pa[1] - 1, pa[0]) - new Date(pb[2], pb[1] - 1, pb[0]);
    }
    return a.localeCompare(b);
  });
  var start7 = Math.max(0, nAll2.length - 7);
  for (var d7 = start7; d7 < nAll2.length; d7++) {
    ngayKeys.push(nAll2[d7]);
    ngayVals.push(ngayMap[nAll2[d7]]);
  }

  L.push('<!DOCTYPE html>');
  L.push('<html lang="vi"><head><meta charset="UTF-8">');
  L.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
  L.push('<meta http-equiv="refresh" content="30">');
  L.push('<title>SAM MIX - Dashboard Co Dong</title>');
  L.push('<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>');
  L.push('<style>');
  L.push('*{margin:0;padding:0;box-sizing:border-box}');
  L.push('body{font-family:Segoe UI,Arial,sans-serif;background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);min-height:100vh;color:#fff;padding:16px}');
  L.push('.wrap{max-width:960px;margin:0 auto}');
  L.push('.header{text-align:center;padding:18px;background:rgba(255,255,255,.08);border-radius:16px;margin-bottom:16px}');
  L.push('.header h1{font-size:26px;letter-spacing:1px}');
  L.push('.header .sub{font-size:13px;opacity:.8;margin-top:6px}');
  L.push('.badge{display:inline-block;background:#00c853;color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;margin-top:8px}');
  L.push('.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:16px}');
  L.push('.card{background:rgba(255,255,255,.1);border-radius:14px;padding:16px;text-align:center;backdrop-filter:blur(4px)}');
  L.push('.card .label{font-size:12px;opacity:.75;text-transform:uppercase;letter-spacing:.5px}');
  L.push('.card .val{font-size:26px;font-weight:bold;margin-top:8px}');
  L.push('.card .val.green{color:#69f0ae}.card .val.yellow{color:#ffd740}.card .val.blue{color:#40c4ff}.card .val.pink{color:#ff80ab}');
  L.push('.sec{background:rgba(255,255,255,.08);border-radius:14px;padding:16px;margin-bottom:16px}');
  L.push('.sec h2{font-size:16px;margin-bottom:12px;border-bottom:1px solid rgba(255,255,255,.15);padding-bottom:8px}');
  L.push('.chart-box{position:relative;height:280px;width:100%}');
  L.push('.footer{text-align:center;font-size:11px;opacity:.5;padding:10px}');
  L.push('@media(max-width:480px){.card .val{font-size:20px}.header h1{font-size:20px}.chart-box{height:220px}}');
  L.push('</style></head><body><div class="wrap">');

  L.push('<div class="header">');
  L.push('<h1>&#127866; SAM MIX</h1>');
  L.push('<div class="sub">Dashboard Co Dong - Bieu do real-time | ' + t.ngay + ' ' + t.gio + ' | ' + t.ca + '</div>');
  L.push('<span class="badge">&#128994; LIVE - tu dong cap nhat 30s</span>');
  L.push('</div>');

  L.push('<div class="grid">');
  L.push('<div class="card"><div class="label">Doanh thu</div><div class="val green">' + moneyFmt(tongDoanhThu) + '</div></div>');
  L.push('<div class="card"><div class="label">Tien mat</div><div class="val yellow">' + moneyFmt(tongTienMat) + '</div></div>');
  L.push('<div class="card"><div class="label">So don</div><div class="val blue">' + soDon + '</div></div>');
  L.push('<div class="card"><div class="label">So mon</div><div class="val pink">' + soMon + '</div></div>');
  L.push('</div>');

  L.push('<div class="sec"><h2>&#128200; Doanh thu theo gio - hom nay</h2><div class="chart-box"><canvas id="chGio"></canvas></div></div>');
  L.push('<div class="sec"><h2>&#128101; Quan ly nhan vien - doanh thu &amp; so don</h2><div class="chart-box"><canvas id="chNV"></canvas></div></div>');
  L.push('<div class="sec"><h2>&#128202; Doanh thu 7 ngay gan nhat</h2><div class="chart-box"><canvas id="ch7"></canvas></div></div>');

  L.push('<div class="footer">SAM MIX Dashboard | Cap nhat luc ' + t.gio + ' | Tu dong lam moi moi 30 giay</div>');
  L.push('</div>');

  L.push('<script>');
  L.push('var gioKeys = ' + JSON.stringify(gioKeys) + ';');
  L.push('var gioVals = ' + JSON.stringify(gioVals) + ';');
  L.push('var nvNames = ' + JSON.stringify(nvNames) + ';');
  L.push('var nvVals = ' + JSON.stringify(nvVals) + ';');
  L.push('var nvDonVals = ' + JSON.stringify(nvDonVals) + ';');
  L.push('var ngayKeys = ' + JSON.stringify(ngayKeys) + ';');
  L.push('var ngayVals = ' + JSON.stringify(ngayVals) + ';');
  L.push('Chart.defaults.color = "#cfd8dc";');
  L.push('Chart.defaults.borderColor = "rgba(255,255,255,.1)";');
  L.push('function fmt(v){ return v.toLocaleString("vi-VN") + " d"; }');
  L.push('new Chart(document.getElementById("chGio"), { type: "line", data: { labels: gioKeys, datasets: [{ label: "Doanh thu", data: gioVals, borderColor: "#69f0ae", backgroundColor: "rgba(105,240,174,.15)", fill: true, tension: .4, pointRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: function(c){ return " " + fmt(c.parsed.y); } } } }, scales: { y: { ticks: { callback: function(v){ return (v/1000) + "k"; } } } } } });');
  L.push('new Chart(document.getElementById("chNV"), { type: "bar", data: { labels: nvNames, datasets: [{ label: "Doanh thu", data: nvVals, backgroundColor: "#40c4ff", borderRadius: 6 }, { label: "So don", data: nvDonVals, backgroundColor: "#ffd740", borderRadius: 6 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: function(c){ return c.dataset.label + ": " + (c.dataset.label === "Doanh thu" ? fmt(c.parsed.y) : c.parsed.y + " don"); } } } }, scales: { y: { ticks: { callback: function(v){ return (v/1000) + "k"; } } } } } });');
  L.push('new Chart(document.getElementById("ch7"), { type: "bar", data: { labels: ngayKeys, datasets: [{ label: "Doanh thu", data: ngayVals, backgroundColor: "#ff80ab", borderRadius: 6 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: function(c){ return " " + fmt(c.parsed.y); } } } }, scales: { y: { ticks: { callback: function(v){ return (v/1000) + "k"; } } } } } });');
  L.push('</script>');
  L.push('</body></html>');

  return HtmlService.createHtmlOutput(L.join(String.fromCodePoint(0x0A))).setTitle('SAM MIX - Dashboard Co Dong');
}