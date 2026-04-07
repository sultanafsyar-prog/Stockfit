import React, { useState, useEffect, useCallback } from 'react';
import PocketBase from 'pocketbase';
import * as XLSX from 'xlsx';

const pb = new PocketBase('https://upperbank-production-c0b5.up.railway.app');

// ======================
// TRANSLATIONS
// ======================
const translations = {
  en: {
    LOGIN: 'LOGIN',
    THIRD_AXIS: 'THIRD AXIS CENTER',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    LOGIN_FAILED: 'LOGIN FAILED!',
    PROCESSING: 'PROCESSING...',
    SPK_NUMBER: 'SPK Number',
    STYLE_ARTICLE: 'Style / Article',
    ORDER_QTY: 'Order Qty',
    STOCK: 'Stock',
    RACK_LOCATION: 'Rack Location',
    FROM_STOCKFIT: 'FROM (Stockfit/Supplier)',
    TO_DESTINATION: 'TO (Destination)',
    INPUT_TIME: 'Input/Output Time',
    SAVE_DATA: 'SAVE DATA',
    FAILED: 'Failed!',
    MODE_ADMIN: 'ADMIN MODE',
    MODE_TV: 'TV MODE',
    SWITCH_MODE: 'SWITCH',
    DATA_EXPORT: 'EXPORT',
    LOGOUT: 'LOGOUT',
    INPUT_TRANSACTION: 'Input Transaction',
    IN_ENTRY: 'IN / ENTRY',
    OUT_EXIT: 'OUT / EXIT',
    SEARCH_SPK: 'Search SPK...',
    SEARCH_DISPLAY: 'Search SPK / Style / XFD',
    BUILDING: 'Building',
    ENTRY_TODAY: 'ENTRY TODAY',
    EXIT_TODAY: 'EXIT TODAY',
    GLOBAL_STOCK: 'GLOBAL STOCK',
    PIECE: 'Piece',
    ACTIVITY_LOG: 'ACTIVITY LOG',
    DOWNLOAD_DATA: 'DOWNLOAD DATA',
    EXPORT_SUMMARY: 'Export Summary',
    EXPORT_LOG: 'Export Log',
    CANCEL: 'Cancel',
    BALANCE_ZERO: 'Balance is 0, cannot add more.',
    QTY_EXCEED: 'Qty cannot exceed remaining balance',
    QTY_EXCEED_ORDER: 'QTY INPUT cannot exceed ORDER QTY',
    TOTAL_EXCEED_ORDER: 'TOTAL INPUT cannot exceed ORDER QTY',
    INSUFFICIENT_STOCK: 'INSUFFICIENT STOCK!',
    AVAILABLE_STACK: 'Available at rack',
    YOUR_INPUT: 'Your input',
    XFD_PASSED: 'XFD has passed!',
    XFD_DAYS_LEFT: 'XFD expires in',
    DAYS: 'days',
    SUPERMARKET_SYSTEM: 'SUPERMARKET DIGITAL SYSTEM',
    PT_DIAMOND: 'PT DIAMOND INTERNATIONAL INDONESIA',
    CHOOSE_STOCKFIT: 'Choose Stockfit Line/Supplier',
    LANGUAGE: 'Language',
    THEME: 'Theme',
    DARK: 'Dark',
    LIGHT: 'Light',
    TOTAL: 'TOTAL',
    SPK: 'SPK',
    STYLE: 'Style',
    RAK: 'Rack',
    ORDER: 'Order Qty',
    TOTAL_IN: 'Input Total',
    TOTAL_OUT: 'Output Total',
    BALANCE: 'Balance',
    XFD: 'XFD',
    SOURCE: 'Source',
    DESTINATION: 'Destination',
    OPERATOR: 'Operator',
    FROM: 'From',
    TO: 'To',
    PIECES: 'Pieces',
    OP: 'Op',
    RACK_OVERVIEW: 'Rack Overview',
    RACKS_FILLED: 'racks filled',
    EMPTY: 'EMPTY',
    DIST_STOCK_BUILDING: 'Stock Distribution / Building',
    TREND_IN_OUT: 'IN vs OUT Trend (7 Days)',
    BLDG: 'Bldg',
    SPK_ACTIVE: 'active SPK',
    TOTAL_RACKS: 'total racks',
  },
  id: {
    LOGIN: 'LOGIN',
    THIRD_AXIS: 'THIRD AXIS CENTER',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    LOGIN_FAILED: 'LOGIN GAGAL!',
    PROCESSING: 'PROSES...',
    SPK_NUMBER: 'Nomor SPK',
    STYLE_ARTICLE: 'Style / Artikel',
    ORDER_QTY: 'Qty Order',
    STOCK: 'Stock',
    RACK_LOCATION: 'Lokasi RAK',
    FROM_STOCKFIT: 'DARI (Stockfit/Supplayer)',
    TO_DESTINATION: 'KE (Tujuan)',
    INPUT_TIME: 'Waktu Input/Output',
    SAVE_DATA: 'SIMPAN DATA',
    FAILED: 'Gagal!',
    MODE_ADMIN: 'MODE ADMIN',
    MODE_TV: 'MODE TV',
    SWITCH_MODE: 'UBAH',
    DATA_EXPORT: 'DATA',
    LOGOUT: 'LOGOUT',
    INPUT_TRANSACTION: 'Input Transaksi',
    IN_ENTRY: 'IN / MASUK',
    OUT_EXIT: 'OUT / KELUAR',
    SEARCH_SPK: 'Cari SPK...',
    SEARCH_DISPLAY: 'Cari SPK / Style / XFD',
    BUILDING: 'Building',
    ENTRY_TODAY: 'MASUK HARI INI',
    EXIT_TODAY: 'KELUAR HARI INI',
    GLOBAL_STOCK: 'GLOBAL STOCK',
    PIECE: 'Pasang',
    ACTIVITY_LOG: 'LOG AKTIVITAS',
    DOWNLOAD_DATA: 'DOWNLOAD DATA',
    EXPORT_SUMMARY: 'Export Summary',
    EXPORT_LOG: 'Export Log',
    CANCEL: 'Batal',
    BALANCE_ZERO: 'Balance sudah 0, tidak bisa ditambah.',
    QTY_EXCEED: 'Qty tidak boleh melebihi sisa balance',
    QTY_EXCEED_ORDER: 'QTY INPUT tidak boleh lebih dari ORDER QTY',
    TOTAL_EXCEED_ORDER: 'TOTAL INPUT tidak boleh lebih dari ORDER QTY',
    INSUFFICIENT_STOCK: 'STOK TIDAK CUKUP!',
    AVAILABLE_STACK: 'Sisa di rak',
    YOUR_INPUT: 'Input Anda',
    XFD_PASSED: 'XFD sudah lewat!',
    XFD_DAYS_LEFT: 'XFD tinggal',
    DAYS: 'hari',
    SUPERMARKET_SYSTEM: 'SUPERMARKET DIGITAL SYSTEM',
    PT_DIAMOND: 'PT DIAMOND INTERNATIONAL INDONESIA',
    CHOOSE_STOCKFIT: 'Pilih Stockfit Line/Supplayer',
    LANGUAGE: 'Bahasa',
    THEME: 'Tema',
    DARK: 'Gelap',
    LIGHT: 'Terang',
    TOTAL: 'TOTAL',
    SPK: 'SPK',
    STYLE: 'Style',
    RAK: 'Rak',
    ORDER: 'Order Qty',
    TOTAL_IN: 'Total Masuk',
    TOTAL_OUT: 'Total Keluar',
    BALANCE: 'Balance',
    XFD: 'XFD',
    SOURCE: 'Source',
    DESTINATION: 'Destination',
    OPERATOR: 'Operator',
    FROM: 'Dari',
    TO: 'Ke',
    PIECES: 'Pasang',
    OP: 'Op',
  },
  'zh-TW': {
    LOGIN: '登入',
    THIRD_AXIS: '第三軸心中心',
    EMAIL: '電子郵件',
    PASSWORD: '密碼',
    LOGIN_FAILED: '登入失敗!',
    PROCESSING: '處理中...',
    SPK_NUMBER: 'SPK編號',
    STYLE_ARTICLE: '樣式 / 條目',
    ORDER_QTY: '訂單數量',
    STOCK: '庫存',
    RACK_LOCATION: '架位位置',
    FROM_STOCKFIT: '來自 (庫存/供應商)',
    TO_DESTINATION: '至 (目的地)',
    INPUT_TIME: '輸入/輸出時間',
    SAVE_DATA: '保存資料',
    FAILED: '失敗!',
    MODE_ADMIN: '管理員模式',
    MODE_TV: 'TV模式',
    SWITCH_MODE: '切換',
    DATA_EXPORT: '資料',
    LOGOUT: '登出',
    INPUT_TRANSACTION: '輸入交易',
    IN_ENTRY: '進 / 入庫',
    OUT_EXIT: '出 / 出庫',
    SEARCH_SPK: '搜尋 SPK...',
    SEARCH_DISPLAY: '搜尋 SPK / 樣式 / XFD',
    BUILDING: '棟',
    ENTRY_TODAY: '今日進貨',
    EXIT_TODAY: '今日出貨',
    GLOBAL_STOCK: '全球庫存',
    PIECE: '件',
    ACTIVITY_LOG: '活動日誌',
    DOWNLOAD_DATA: '下載資料',
    EXPORT_SUMMARY: '匯出摘要',
    EXPORT_LOG: '匯出日誌',
    CANCEL: '取消',
    BALANCE_ZERO: '餘額已為0，無法新增。',
    QTY_EXCEED: '數量不能超過剩餘餘額',
    QTY_EXCEED_ORDER: '輸入數量不能超過訂單數量',
    TOTAL_EXCEED_ORDER: '總輸入量不能超過訂單數量',
    INSUFFICIENT_STOCK: '庫存不足!',
    AVAILABLE_STACK: '架上剩餘',
    YOUR_INPUT: '您的輸入',
    XFD_PASSED: 'XFD已過期!',
    XFD_DAYS_LEFT: 'XFD剩餘',
    DAYS: '天',
    SUPERMARKET_SYSTEM: '超市數位系統',
    PT_DIAMOND: 'PT 鑽石國際印尼公司',
    CHOOSE_STOCKFIT: '選擇庫存線/供應商',
    LANGUAGE: '語言',
    THEME: '主題',
    DARK: '深色',
    LIGHT: '淺色',
    TOTAL: '總計',
    SPK: 'SPK',
    STYLE: '樣式',
    RAK: '架',
    ORDER: '訂單數量',
    TOTAL_IN: '總進貨',
    TOTAL_OUT: '總出貨',
    BALANCE: '餘額',
    XFD: 'XFD',
    SOURCE: '來源',
    DESTINATION: '目的地',
    OPERATOR: '操作員',
    FROM: '來自',
    TO: '至',
    PIECES: '件',
    OP: '操作',
    RACK_OVERVIEW: 'Ikhtisar Rak',
    RACKS_FILLED: 'rak terisi',
    EMPTY: 'KOSONG',
    DIST_STOCK_BUILDING: 'Distribusi Stock / Building',
    TREND_IN_OUT: 'Tren IN vs OUT (7 Hari)',
    BLDG: 'Bldg',
    SPK_ACTIVE: 'SPK aktif',
    TOTAL_RACKS: 'total rak',
  },
  vi: {
    LOGIN: 'ĐĂNG NHẬP',
    THIRD_AXIS: 'TRUNG TÂM TRỤC THỨ BA',
    EMAIL: 'Email',
    PASSWORD: 'Mật khẩu',
    LOGIN_FAILED: 'ĐĂNG NHẬP THẤT BẠI!',
    PROCESSING: 'ĐANG XỬ LÝ...',
    SPK_NUMBER: 'Số SPK',
    STYLE_ARTICLE: 'Kiểu dáng / Bài viết',
    ORDER_QTY: 'Số lượng đặt hàng',
    STOCK: 'Kho',
    RACK_LOCATION: 'Vị trí kệ',
    FROM_STOCKFIT: 'TỪ (Stockfit/Nhà cung cấp)',
    TO_DESTINATION: 'ĐẾN (Đích đến)',
    INPUT_TIME: 'Thời gian nhập/xuất',
    SAVE_DATA: 'LƯU DỮ LIỆU',
    FAILED: 'Thất bại!',
    MODE_ADMIN: 'CHẾ ĐỘ QUẢN TRỊ',
    MODE_TV: 'CHẾ ĐỘ TV',
    SWITCH_MODE: 'CHUYỂN',
    DATA_EXPORT: 'DỮ LIỆU',
    LOGOUT: 'ĐĂNG XUẤT',
    INPUT_TRANSACTION: 'Ghi nhập giao dịch',
    IN_ENTRY: 'VÀO / NHẬP KHO',
    OUT_EXIT: 'RA / XUẤT KHO',
    SEARCH_SPK: 'Tìm kiếm SPK...',
    SEARCH_DISPLAY: 'Tìm kiếm SPK / Kiểu / XFD',
    BUILDING: 'Tòa nhà',
    ENTRY_TODAY: 'NHẬP KHO HÔM NAY',
    EXIT_TODAY: 'XUẤT KHO HÔM NAY',
    GLOBAL_STOCK: 'KHO TOÀN CẦU',
    PIECE: 'Chiếc',
    ACTIVITY_LOG: 'NHẬT KÝ HOẠT ĐỘNG',
    DOWNLOAD_DATA: 'TẢI DỮ LIỆU',
    EXPORT_SUMMARY: 'Xuất bản tóm tắt',
    EXPORT_LOG: 'Xuất bản nhật ký',
    CANCEL: 'Hủy bỏ',
    BALANCE_ZERO: 'Số dư là 0, không thể thêm.',
    QTY_EXCEED: 'Số lượng không được vượt quá số dư còn lại',
    QTY_EXCEED_ORDER: 'SỐ LƯỢNG NHẬP không được vượt quá SỐ LƯỢNG ĐẶT HÀNG',
    TOTAL_EXCEED_ORDER: 'TỔNG SỐ NHẬP không được vượt quá SỐ LƯỢNG ĐẶT HÀNG',
    INSUFFICIENT_STOCK: 'KHO KHÔNG ĐỦ!',
    AVAILABLE_STACK: 'Còn lại tại kệ',
    YOUR_INPUT: 'Đầu vào của bạn',
    XFD_PASSED: 'XFD đã qua!',
    XFD_DAYS_LEFT: 'XFD còn lại',
    DAYS: 'ngày',
    SUPERMARKET_SYSTEM: 'HỆ THỐNG SIÊU THỊ KỸ THUẬT SỐ',
    PT_DIAMOND: 'CÔNG TY CỔ PHẦN KIM CƯƠNG QUỐC TẾ INDONESIA',
    CHOOSE_STOCKFIT: 'Chọn Dòng Stockfit / Nhà cung cấp',
    LANGUAGE: 'Ngôn ngữ',
    THEME: 'Chủ đề',
    DARK: 'Tối',
    LIGHT: 'Sáng',
    TOTAL: 'TỔNG CỘNG',
    SPK: 'SPK',
    STYLE: 'Kiểu dáng',
    RAK: 'Kệ',
    ORDER: 'Số lượng đặt hàng',
    TOTAL_IN: 'Tổng nhập',
    TOTAL_OUT: 'Tổng xuất',
    BALANCE: 'Số dư',
    XFD: 'XFD',
    SOURCE: 'Nguồn',
    DESTINATION: 'Đích đến',
    OPERATOR: 'Nhà điều hành',
    FROM: 'Từ',
    TO: 'Đến',
    PIECES: 'Chiếc',
    OP: 'NV',
  },
  km: {
    LOGIN: 'ចូល',
    THIRD_AXIS: 'មជ្ឈមណ្ឌលអ័ក្សទីបី',
    EMAIL: 'អ៊ីមែល',
    PASSWORD: 'ពាក្យសម្ងាត់',
    LOGIN_FAILED: 'ការចូលបរាជ័យ!',
    PROCESSING: 'កំពុងដំណើរការ...',
    SPK_NUMBER: 'លេខ SPK',
    STYLE_ARTICLE: 'រចនាប័ទ្ម / អត្ថបទ',
    ORDER_QTY: 'បរិមាណលម្អិតផ្ទាល់ខ្លួន',
    STOCK: 'ស្តុក',
    RACK_LOCATION: 'ទីតាំងលាម',
    FROM_STOCKFIT: 'ពី (Stockfit/អ្នកផ្គត់ផ្គង់)',
    TO_DESTINATION: 'ឆ្ពោះទៅ (គោលដៅ)',
    INPUT_TIME: 'ពេលវេលាបញ្ចូល/ទិន្នផល',
    SAVE_DATA: 'រក្សាទុកលម្អិត',
    FAILED: 'បរាជ័យ!',
    MODE_ADMIN: 'របៀបរដ្ឋបាល',
    MODE_TV: 'របៀប TV',
    SWITCH_MODE: 'បង្វិល',
    DATA_EXPORT: 'ឯកសារ',
    LOGOUT: 'ចាកចេញ',
    INPUT_TRANSACTION: 'ដាក់បញ្ចូលប្រតិបត្តិការ',
    IN_ENTRY: 'ចូល / ដាក់ចូល',
    OUT_EXIT: 'ចេញ / ក្រឡេក',
    SEARCH_SPK: 'ស្វាងរក SPK...',
    SEARCH_DISPLAY: 'ស្វាងរក SPK / រចនាប័ទ្ម / XFD',
    BUILDING: 'អគារ',
    ENTRY_TODAY: 'ដាក់ចូលថ្ងៃនេះ',
    EXIT_TODAY: 'ក្រឡេកថ្ងៃនេះ',
    GLOBAL_STOCK: 'ស្តុកពិភពលោក',
    PIECE: 'ធាតុ',
    ACTIVITY_LOG: 'កំណត់ហេតុសកម្មភាព',
    DOWNLOAD_DATA: 'ទាញយកឯកសារ',
    EXPORT_SUMMARY: 'នាំចេញលម្អិត',
    EXPORT_LOG: 'នាំចេញកំណត់ហេតុ',
    CANCEL: 'បោះបង់ចោល',
    BALANCE_ZERO: 'សមតុល្យ 0 ហើយ មិនអាចបន្ថែម។',
    QTY_EXCEED: 'បរិមាណមិនអាចលើសពីសមតុល្យដែលនៅសល់',
    QTY_EXCEED_ORDER: 'បរិមាណបញ្ចូលមិនអាចលើសពីបរិមាណលម្អិត',
    TOTAL_EXCEED_ORDER: 'ចំនួនបញ្ចូលសរុបមិនអាចលើសពីបរិមាណលម្អិត',
    INSUFFICIENT_STOCK: 'ស្តុកមិនគ្រប់គ្រាន់!',
    AVAILABLE_STACK: 'នៅសល់នៅលាម',
    YOUR_INPUT: 'ការបញ្ចូលរបស់អ្នក',
    XFD_PASSED: 'XFD បានឆ្លងកាត់!',
    XFD_DAYS_LEFT: 'XFD នៅសល់',
    DAYS: 'ថ្ងៃ',
    SUPERMARKET_SYSTEM: 'ប្រព័ន្ធលើកទីលាផតឌីជីថល',
    PT_DIAMOND: 'ក្រុមហ៊ុនដ្ឋាន័ក មូលនិធិអន្តរជាតិឥណ្ឌូនេស៊ី',
    CHOOSE_STOCKFIT: 'ជ្រើសរើស Stockfit Line / អ្នកផ្គត់ផ្គង់',
    LANGUAGE: 'ភាសា',
    THEME: 'ប្រធានបទ',
    DARK: 'ងងឹត',
    LIGHT: 'ភ្លឺ',
    TOTAL: 'សរុប',
    SPK: 'SPK',
    STYLE: 'រចនាប័ទ្ម',
    RAK: 'លាម',
    ORDER: 'បរិមាណលម្អិត',
    TOTAL_IN: 'សរុបបញ្ចូល',
    TOTAL_OUT: 'សរុបលទ្ធផល',
    BALANCE: 'សមតុល្យ',
    XFD: 'XFD',
    SOURCE: 'ប្រភព',
    DESTINATION: 'គោលដៅ',
    OPERATOR: 'ប្រតិបត្តិការ',
    FROM: 'ពី',
    TO: 'ឆ្ពោះទៅ',
    PIECES: 'ធាតុ',
    OP: 'NV',
    RACK_OVERVIEW: '貨架總覽',
    RACKS_FILLED: '架已使用',
    EMPTY: '空架',
    DIST_STOCK_BUILDING: '庫存分佈 / 棟別',
    TREND_IN_OUT: '進出貨趨勢（7天）',
    BLDG: '棟',
    SPK_ACTIVE: '個有效SPK',
    TOTAL_RACKS: '個架位',
  },
  th: {
    LOGIN: 'เข้าสู่ระบบ',
    THIRD_AXIS: 'ศูนย์แกนที่สาม',
    EMAIL: 'อีเมล',
    PASSWORD: 'รหัสผ่าน',
    LOGIN_FAILED: 'เข้าสู่ระบบล้มเหลว!',
    PROCESSING: 'กำลังดำเนินการ...',
    SPK_NUMBER: 'หมายเลข SPK',
    STYLE_ARTICLE: 'สไตล์ / สินค้า',
    ORDER_QTY: 'ปริมาณสั่งซื้อ',
    STOCK: 'สินค้าคงคลัง',
    RACK_LOCATION: 'ตำแหน่งชั้น',
    FROM_STOCKFIT: 'จาก (Stockfit/ผู้จัดส่ง)',
    TO_DESTINATION: 'ไป (ปลายทาง)',
    INPUT_TIME: 'เวลาป้อนข้อมูล/ผลลัพธ์',
    SAVE_DATA: 'บันทึกข้อมูล',
    FAILED: 'ล้มเหลว!',
    MODE_ADMIN: 'โหมดผู้ดูแลระบบ',
    MODE_TV: 'โหมด TV',
    SWITCH_MODE: 'สลับ',
    DATA_EXPORT: 'ข้อมูล',
    LOGOUT: 'ออกจากระบบ',
    INPUT_TRANSACTION: 'บันทึกธุรกรรม',
    IN_ENTRY: 'เข้า / นำเข้า',
    OUT_EXIT: 'ออก / ส่งออก',
    SEARCH_SPK: 'ค้นหา SPK...',
    SEARCH_DISPLAY: 'ค้นหา SPK / สไตล์ / XFD',
    BUILDING: 'อาคาร',
    ENTRY_TODAY: 'นำเข้าวันนี้',
    EXIT_TODAY: 'ส่งออกวันนี้',
    GLOBAL_STOCK: 'สินค้าคงคลังทั่วโลก',
    PIECE: 'ชิ้น',
    ACTIVITY_LOG: 'บันทึกกิจกรรม',
    DOWNLOAD_DATA: 'ดาวน์โหลดข้อมูล',
    EXPORT_SUMMARY: 'ส่งออกสรุป',
    EXPORT_LOG: 'ส่งออกบันทึก',
    CANCEL: 'ยกเลิก',
    BALANCE_ZERO: 'ยอดคงเหลือเป็น 0 ไม่สามารถเพิ่มได้',
    QTY_EXCEED: 'ปริมาณไม่สามารถเกินยอดคงเหลือ',
    QTY_EXCEED_ORDER: 'ปริมาณป้อนไม่สามารถเกินปริมาณสั่งซื้อ',
    TOTAL_EXCEED_ORDER: 'ปริมาณรวมไม่สามารถเกินปริมาณสั่งซื้อ',
    INSUFFICIENT_STOCK: 'สินค้าคงคลังไม่เพียงพอ!',
    AVAILABLE_STACK: 'คงเหลือที่ชั้น',
    YOUR_INPUT: 'ปริมาณที่ป้อน',
    XFD_PASSED: 'XFD หมดอายุแล้ว!',
    XFD_DAYS_LEFT: 'XFD เหลือ',
    DAYS: 'วัน',
    SUPERMARKET_SYSTEM: 'ระบบสีเปอร์มาร์เก็ตดิจิทัล',
    PT_DIAMOND: 'บริษัท เพชรนานาชาติ อินโดนีเซีย',
    CHOOSE_STOCKFIT: 'เลือก Stockfit Line / ผู้จัดส่ง',
    LANGUAGE: 'ภาษา',
    THEME: 'ธีม',
    DARK: 'มืด',
    LIGHT: 'สว่าง',
    TOTAL: 'รวมทั้งสิ้น',
    SPK: 'SPK',
    STYLE: 'สไตล์',
    RAK: 'ชั้น',
    ORDER: 'ปริมาณสั่งซื้อ',
    TOTAL_IN: 'รวมนำเข้า',
    TOTAL_OUT: 'รวมส่งออก',
    BALANCE: 'ยอดคงเหลือ',
    XFD: 'XFD',
    SOURCE: 'แหล่งที่มา',
    DESTINATION: 'ปลายทาง',
    OPERATOR: 'ผู้ดำเนินการ',
    FROM: 'จาก',
    TO: 'ไป',
    PIECES: 'ชิ้น',
    OP: 'ผู้ป้อน',
  }
};

// ======================
// THEMES
// ======================
const themes = {
  dark: {
    bg: '#0a0e1a',
    bgSecondary: '#111827',
    bgTertiary: '#1a2235',
    border: '#1e2d45',
    borderAccent: '#2a3f5f',
    text: '#e2e8f0',
    textMuted: '#64748b',
    textSoft: '#94a3b8',
    primary: '#38bdf8',
    primaryGlow: 'rgba(56,189,248,0.15)',
    success: '#34d399',
    successGlow: 'rgba(52,211,153,0.15)',
    danger: '#f87171',
    dangerGlow: 'rgba(248,113,113,0.15)',
    warning: '#fbbf24',
    warningGlow: 'rgba(251,191,36,0.15)',
    blue: '#3b82f6',
    blueGlow: 'rgba(59,130,246,0.2)',
    purple: '#8b5cf6',
    purpleGlow: 'rgba(139,92,246,0.2)',
    navBg: 'rgba(17,24,39,0.95)',
  },
  light: {
    bg: '#f0f4f8',
    bgSecondary: '#ffffff',
    bgTertiary: '#f8fafc',
    border: '#e2e8f0',
    borderAccent: '#cbd5e1',
    text: '#0f172a',
    textMuted: '#64748b',
    textSoft: '#94a3b8',
    primary: '#0284c7',
    primaryGlow: 'rgba(2,132,199,0.1)',
    success: '#059669',
    successGlow: 'rgba(5,150,105,0.1)',
    danger: '#dc2626',
    dangerGlow: 'rgba(220,38,38,0.1)',
    warning: '#d97706',
    warningGlow: 'rgba(217,119,6,0.1)',
    blue: '#2563eb',
    blueGlow: 'rgba(37,99,235,0.15)',
    purple: '#7c3aed',
    purpleGlow: 'rgba(124,58,237,0.15)',
    navBg: 'rgba(255,255,255,0.95)',
  }
};

const RAK_CONFIG = {
  "C": ["01"],
  "D": ["01", "02", "03", "04", "05", "06"],
  "E": ["01", "02", "03", "04", "05", "06"],
  "F": ["01", "02", "03", "04", "05"],
  "H": ["01", "02", "03", "04", "05"],
  "I": ["01", "02", "03", "04", "05"]
};
const HURUF_RAK = Object.keys(RAK_CONFIG);
const DAFTAR_RAK_FULL = HURUF_RAK.flatMap(h => RAK_CONFIG[h].map(n => `${h}-${n}`));
const formatRakDisplay = (rak) => {
  const [huruf, nomor] = rak.split('-');
  return `Rak ${huruf}${parseInt(nomor)}`;
};
const DAFTAR_STOCKFIT = ["BUFFING", "PT WENCHUANG", "PT GLOBAL", "STOCKFIT 1", "STOCKFIT 2", "STOCKFIT 3", "STOCKFIT 4", "STOCKFIT 5", "STOCKFIT 6", "STOCKFIT 7"];

// =========================================
// GLOBAL STYLES injected once
// =========================================
const GlobalStyles = () => {
  useEffect(() => {
    const id = 'sds-global-styles';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Hanuman:wght@400;700&family=Noto+Sans+Khmer:wght@400;700&family=Noto+Sans+Thai:wght@400;700&family=Noto+Sans+TC:wght@400;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; }

      ::-webkit-scrollbar { width: 5px; height: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(100,116,139,0.4); border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(100,116,139,0.7); }

      @keyframes fadeSlideIn {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulseGlow {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.6; transform: scale(1.05); }
      }
      @keyframes xfdBlink {
        0%, 100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
        50%       { opacity: 0.7; box-shadow: none; }
      }
      @keyframes spinDot {
        to { transform: rotate(360deg); }
      }

      .sds-btn {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 7px 14px; border: none; border-radius: 8px;
        font-family: inherit; font-size: 12px; font-weight: 600;
        letter-spacing: 0.3px; cursor: pointer; white-space: nowrap;
        transition: all 0.18s ease; color: #fff;
      }
      .sds-btn:hover { transform: translateY(-1px); filter: brightness(1.12); }
      .sds-btn:active { transform: translateY(0); filter: brightness(0.95); }

      .sds-input {
        padding: 10px 13px; border-radius: 8px;
        font-family: inherit; font-size: 13px;
        outline: none; width: 100%; transition: border-color 0.2s, box-shadow 0.2s;
      }
      .sds-input:focus { outline: none; }

      .sds-card {
        border-radius: 14px; border: 1px solid;
        animation: fadeSlideIn 0.3s ease;
      }

      .rack-item:hover {
        transform: translateY(-1px);
        transition: transform 0.15s ease;
      }

      .spk-row:hover { opacity: 0.85; }

      input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6) brightness(1.5); cursor: pointer; }
      input[type="date"] { color-scheme: dark; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('ADMIN');
  const [inventory, setInventory] = useState([]);
  const [rawRecords, setRawRecords] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tvSearch, setTvSearch] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const getDefaultDateRange = () => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 6);
    const fmt = d => d.toISOString().split('T')[0];
    return { from: fmt(from), to: fmt(to) };
  };
  const [exportDateRange, setExportDateRange] = useState(getDefaultDateRange);
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'id');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [currentTime, setCurrentTime] = useState(new Date());

  const t = (key) => translations[language]?.[key] || key;
  const colors = themes[theme];

  // Font per bahasa agar aksara render benar
  const langFont = {
    'km': "'Noto Sans Khmer', 'Hanuman', sans-serif",
    'th': "'Noto Sans Thai', sans-serif",
    'zh-TW': "'Noto Sans TC', sans-serif",
  };
  const fontFamily = langFont[language] || "'DM Sans', sans-serif";

  useEffect(() => { localStorage.setItem('language', language); }, [language]);
  useEffect(() => { localStorage.setItem('theme', theme); }, [theme]);

  const [formData, setFormData] = useState({
    spk_number: '', style_name: '', qty: 0, target_qty: 0,
    xfd_date: '', type: 'IN', source_from: '', destination: '', rack: ''
  });

  const todayStr = new Date().toLocaleDateString('id-ID').replace(/\//g, '-');

  const fetchData = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const res = await pb.collection('upper_stock').getList(1, 500, { sort: '-created', requestKey: null });
      setRawRecords(res.items);
      const allRecords = await pb.collection('upper_stock').getFullList({ sort: 'created', requestKey: null });
      setAllTransactions(allRecords);
      const summary = allRecords.reduce((acc, curr) => {
        const key = `${curr.spk_number}-${curr.rack_location}`;
        if (!acc[key]) {
          acc[key] = {
            spk: curr.spk_number,
            style: curr.style_name || '-',
            rack: curr.rack_location,
            total_input: 0,
            total_output: 0,
            stock: 0,
            target: 0,
            xfd: curr.xfd_date,
            source: curr.source_from,
            destination: curr.destination
          };
        }
        acc[key].total_input += Number(curr.qty_in || 0);
        acc[key].total_output += Number(curr.qty_out || 0);
        acc[key].stock = acc[key].total_input - acc[key].total_output;
        if (Number(curr.target_qty) > 0) acc[key].target = Number(curr.target_qty);
        return acc;
      }, {});
      const inventoryWithBalance = Object.values(summary).map(item => ({
        ...item,
        balance: Math.max(0, (Number(item.target) || 0) - (Number(item.total_input) || 0))
      })).filter(i => i.stock > 0);
      setInventory(inventoryWithBalance);
    } catch (error) { console.error("Sync Error"); }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
      const unsub = pb.collection('upper_stock').subscribe('*', () => fetchData());
      return () => { if (typeof unsub === 'function') unsub(); };
    }
  }, [fetchData, isLoggedIn]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleItemClick = (item) => {
    if (viewMode !== 'ADMIN') return;
    setFormData({ ...formData, type: 'OUT', spk_number: item.spk, style_name: item.style, target_qty: item.target, xfd_date: item.xfd, source_from: item.source, destination: item.destination, rack: item.rack, qty: item.stock });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (formData.type === 'IN') {
      const existing = inventory.find(i => i.spk === formData.spk_number && i.rack === formData.rack);
      const qtyWanted = Number(formData.qty) || 0;
      const newTarget = Number(formData.target_qty) > 0 ? Number(formData.target_qty) : (existing ? existing.target : 0);
      if (existing) {
        const projectedTotalInput = (existing.total_input || 0) + qtyWanted;
        const projectedBalance = newTarget - projectedTotalInput;
        if (existing.balance <= 0 && newTarget === existing.target) { alert(t('BALANCE_ZERO')); return; }
        if (projectedBalance < 0) { alert(`${t('QTY_EXCEED')} (${existing.balance}).`); return; }
      }
    }
    if (formData.target_qty && Number(formData.qty) > Number(formData.target_qty)) {
      alert(`${t('QTY_EXCEED_ORDER')} (${formData.target_qty})`); return;
    }
    if (formData.type === 'IN' && formData.target_qty) {
      const prevInput = rawRecords.filter(r => r.spk_number === formData.spk_number && r.rack_location === formData.rack).reduce((sum, r) => sum + (Number(r.qty_in) || 0), 0);
      if (prevInput + Number(formData.qty) > Number(formData.target_qty)) {
        alert(`${t('TOTAL_EXCEED_ORDER')} (${prevInput + Number(formData.qty)}) ${t('ORDER').toLowerCase()} (${formData.target_qty})`); return;
      }
    }
    if (formData.type === 'OUT') {
      const currentItem = inventory.find(i => i.spk === formData.spk_number && i.rack === formData.rack);
      const stockTersedia = currentItem ? currentItem.stock : 0;
      if (Number(formData.qty) > stockTersedia) {
        alert(`${t('INSUFFICIENT_STOCK')}\n${t('AVAILABLE_STACK')}: ${stockTersedia} ${t('PIECES')}.\n${t('YOUR_INPUT')}: ${formData.qty} ${t('PIECES')}.`); return;
      }
    }
    setIsSubmitting(true);
    const waktu = `${todayStr} ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
    try {
      await pb.collection('upper_stock').create({
        ...formData,
        spk_number: formData.spk_number.toUpperCase(),
        style_name: formData.style_name.toUpperCase(),
        qty_in: formData.type === 'IN' ? Number(formData.qty) : 0,
        qty_out: formData.type === 'OUT' ? Number(formData.qty) : 0,
        target_qty: Number(formData.target_qty),
        source_from: formData.source_from,
        destination: formData.destination,
        rack_location: formData.rack,
        waktu_input: waktu,
        operator: pb.authStore.model.username
      });
      await fetchData();
      setFormData({ ...formData, spk_number: '', style_name: '', qty: 0, target_qty: 0, xfd_date: '', source_from: '', destination: '' });
    } catch (err) { alert(t('FAILED')); } finally { setIsSubmitting(false); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pb.collection('users').authWithPassword(loginEmail, loginPassword);
      setIsLoggedIn(true);
    } catch (err) { alert(t('LOGIN_FAILED')); } finally { setLoading(false); }
  };

  const handleLogout = () => { pb.authStore.clear(); setIsLoggedIn(false); };

  const exportToXlsx = (rows, fileName) => {
    if (fileName === 'Summary_Stok') {
      // filter by date range using waktu_input from rawRecords cross-reference
      const fromDate = exportDateRange.from ? new Date(exportDateRange.from) : null;
      const toDate = exportDateRange.to ? new Date(exportDateRange.to + 'T23:59:59') : null;

      // Get set of SPKs that had activity in date range
      const activeSpks = new Set(
        rawRecords.filter(r => {
          if (!fromDate && !toDate) return true;
          if (!r.waktu_input) return false;
          // waktu_input format: "DD-M-YYYY HH:MM"
          const parts = r.waktu_input.split(' ')[0].split('-');
          if (parts.length < 3) return false;
          const recDate = new Date(`${parts[2]}-${String(parts[1]).padStart(2,'0')}-${String(parts[0]).padStart(2,'0')}`);
          if (fromDate && recDate < fromDate) return false;
          if (toDate && recDate > toDate) return false;
          return true;
        }).map(r => r.spk_number)
      );

      const filtered = rows.filter(r => !fromDate && !toDate ? true : activeSpks.has(r.spk));

      // Get latest operator for each SPK from rawRecords
      const spkOperatorMap = {};
      rawRecords.forEach(r => { spkOperatorMap[r.spk_number] = r.operator || pb.authStore.model.username; });

      // Helper: parse "DD-M-YYYY HH:MM" → Date
      const parseWaktuDate = (w) => {
        if (!w) return null;
        const parts = w.split(' ')[0].split('-');
        if (parts.length < 3) return null;
        return new Date(`${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`);
      };

      // Hitung tanggal balance=0 dan stock=0 per SPK+rack
      // Replay semua transaksi secara kronologis per key
      const zeroDateMap = {}; // key → { tglBalance0, tglStock0 }
      const spkKeys = filtered.map(r => `${r.spk}-${r.rack}`);
      spkKeys.forEach(key => {
        const [spk, rack] = key.split(/-(.+)/); // split on first dash only... 
        // ambil semua transaksi untuk SPK+rack ini, sudah sorted by created (asc)
        const txs = allTransactions.filter(r => r.spk_number === spk && r.rack_location === rack);
        let runningInput = 0, runningOutput = 0, runningTarget = 0;
        let tglBalance0 = null, tglStock0 = null;
        txs.forEach(tx => {
          runningInput  += Number(tx.qty_in  || 0);
          runningOutput += Number(tx.qty_out || 0);
          if (Number(tx.target_qty) > 0) runningTarget = Number(tx.target_qty);
          const runningStock   = runningInput - runningOutput;
          const runningBalance = Math.max(0, runningTarget - runningInput);
          const tgl = parseWaktuDate(tx.waktu_input);
          if (runningBalance === 0 && !tglBalance0 && tgl) tglBalance0 = tgl.toISOString().split('T')[0];
          if (runningStock   === 0 && !tglStock0   && tgl) tglStock0   = tgl.toISOString().split('T')[0];
        });
        zeroDateMap[key] = { tglBalance0, tglStock0 };
      });

      const mapped = filtered.map(r => {
        const key = `${r.spk}-${r.rack}`;
        const { tglBalance0, tglStock0 } = zeroDateMap[key] || {};
        return {
          [t('SPK')]: r.spk || '',
          [t('STYLE')]: r.style || '',
          [t('RAK')]: r.rack || '',
          [t('ORDER')]: r.target || r.order_qty || 0,
          [t('TOTAL_IN')]: r.total_input || 0,
          [t('TOTAL_OUT')]: r.total_output || 0,
          [t('STOCK')]: r.stock || 0,
          [t('BALANCE')]: r.balance !== undefined ? Math.max(0, r.balance) : Math.max(0, ((r.target || 0) - (r.total_input || 0))),
          'Tgl Balance 0': tglBalance0 || '-',
          'Tgl Stock 0':   tglStock0   || '-',
          [t('XFD')]: r.xfd || '',
          [t('SOURCE')]: r.source || '',
          [t('DESTINATION')]: r.destination || '',
          [t('OPERATOR')]: spkOperatorMap[r.spk] || pb.authStore.model.username,
        };
      });
      const ws = XLSX.utils.json_to_sheet(mapped);
      // Auto column width
      const colWidths = Object.keys(mapped[0] || {}).map(k => ({ wch: Math.max(k.length, 12) }));
      ws['!cols'] = colWidths;
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Summary');
      const label = exportDateRange.from && exportDateRange.to ? `_${exportDateRange.from}_sd_${exportDateRange.to}` : '';
      XLSX.writeFile(wb, `${fileName}${label}.xlsx`);
      return;
    }
    // Export Log — filter by date range
    const fromDate = exportDateRange.from ? new Date(exportDateRange.from) : null;
    const toDate = exportDateRange.to ? new Date(exportDateRange.to + 'T23:59:59') : null;

    const filteredRows = rows.filter(r => {
      if (!fromDate && !toDate) return true;
      if (!r.waktu_input) return false;
      const parts = r.waktu_input.split(' ')[0].split('-');
      if (parts.length < 3) return false;
      const recDate = new Date(`${parts[2]}-${String(parts[1]).padStart(2,'0')}-${String(parts[0]).padStart(2,'0')}`);
      if (fromDate && recDate < fromDate) return false;
      if (toDate && recDate > toDate) return false;
      return true;
    });

    const processedRows = filteredRows.map(row => ({
      Tanggal: row.waktu_input ? row.waktu_input.split(' ')[0] : '',
      Waktu: row.waktu_input ? row.waktu_input.split(' ')[1] : '',
      ...row,
      operator: row.operator || pb.authStore.model.username
    }));
    const cleanRows = processedRows.map(row => {
      const { collectionId, collectionName, waktu_input, ...rest } = row;
      if (rest.target_qty !== undefined) { rest.order_qty = rest.target_qty; delete rest.target_qty; }
      return rest;
    });
    const ws = XLSX.utils.json_to_sheet(cleanRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    const label = exportDateRange.from && exportDateRange.to ? `_${exportDateRange.from}_sd_${exportDateRange.to}` : '';
    XLSX.writeFile(wb, `${fileName}${label}.xlsx`);
  };

  // ========================
  // INPUT STYLE HELPERS
  // ========================
  const inputStyle = {
    padding: '10px 13px', borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    background: colors.bgTertiary,
    color: colors.text, fontSize: '13px',
    outline: 'none', width: '100%',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };
  const inputFocusProps = {
    onFocus: e => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 3px ${colors.primaryGlow}`; },
    onBlur:  e => { e.target.style.borderColor = colors.border;  e.target.style.boxShadow = 'none'; }
  };

  // ========================
  // LOGIN PAGE
  // ========================
  if (!isLoggedIn) return (
    <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fontFamily, position: 'relative', overflow: 'hidden' }}>
      <GlobalStyles />
      {/* Background decoration */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${colors.primaryGlow} 0%, transparent 70%)`, top: '-100px', right: '-100px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${colors.purpleGlow} 0%, transparent 70%)`, bottom: '-80px', left: '-80px', pointerEvents: 'none' }} />

      <div style={{ background: colors.bgSecondary, border: `1px solid ${colors.border}`, borderRadius: '20px', padding: '40px', width: '380px', position: 'relative', boxShadow: theme === 'dark' ? '0 25px 60px rgba(0,0,0,0.5)' : '0 25px 60px rgba(0,0,0,0.12)', animation: 'fadeSlideIn 0.4s ease' }}>
        {/* Logo area */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '16px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.blue})`, marginBottom: '16px', boxShadow: `0 8px 24px ${colors.blueGlow}` }}>
            <img src="/logo.png" alt="Logo" style={{ width: 32, height: 32, filter: 'brightness(0) invert(1)' }} onError={e => { e.target.style.display='none'; }} />
          </div>
          <h2 style={{ margin: 0, color: colors.text, fontSize: '22px', fontWeight: 700, letterSpacing: '-0.3px' }}>{t('SUPERMARKET_SYSTEM')}</h2>
          <p style={{ margin: '6px 0 0', color: colors.textMuted, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{t('PT_DIAMOND')}</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{t('EMAIL')}</label>
            <input className="sds-input" style={{ ...inputStyle }} type="email" placeholder="you@example.com" onChange={e => setLoginEmail(e.target.value)} {...inputFocusProps} required />
          </div>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{t('PASSWORD')}</label>
            <input className="sds-input" style={{ ...inputStyle }} type="password" placeholder="••••••••" onChange={e => setLoginPassword(e.target.value)} {...inputFocusProps} required />
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: 8, padding: '12px', border: 'none', borderRadius: '10px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.blue})`, color: '#fff', fontWeight: 700, fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.5px', boxShadow: `0 4px 20px ${colors.blueGlow}`, opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}>
            {loading ? t('PROCESSING') : t('LOGIN')}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '10px', color: colors.textMuted, letterSpacing: '1px' }}>{t('THIRD_AXIS')}</div>
      </div>
    </div>
  );

  // ========================
  // MAIN APP
  // ========================
  const entryToday = rawRecords.filter(r => r.qty_in > 0 && r.waktu_input.includes(todayStr)).reduce((a, b) => a + Number(b.qty_in), 0);
  const exitToday = rawRecords.filter(r => r.qty_out > 0 && r.waktu_input.includes(todayStr)).reduce((a, b) => a + Number(b.qty_out), 0);
  const globalStock = inventory.reduce((a, b) => a + b.stock, 0);

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', padding: '16px 20px 20px', color: colors.text, fontFamily: fontFamily, position: 'relative' }}>
      <GlobalStyles />

      {/* Watermark */}
      <div style={{ position: 'fixed', bottom: '16px', left: '16px', fontSize: '9px', fontWeight: 700, color: colors.primary, letterSpacing: '2px', pointerEvents: 'none', zIndex: 9999, textTransform: 'uppercase', textShadow: `0 0 8px ${colors.primary}`, opacity: 0.6 }}>
        Third Axis Center
      </div>

      {/* ====== NAVBAR ====== */}
      <nav style={{
        background: colors.navBg,
        backdropFilter: 'blur(12px)',
        border: `1px solid ${colors.border}`,
        padding: '10px 16px',
        borderRadius: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        boxShadow: theme === 'dark' ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(0,0,0,0.06)',
        position: 'sticky', top: 12, zIndex: 100,
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 20, height: 20, filter: 'brightness(0) invert(1)' }} onError={e => { e.target.style.display='none'; }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: colors.text, letterSpacing: '-0.2px' }}>{t('SUPERMARKET_SYSTEM')}</div>
            <div style={{ fontSize: '9px', color: colors.textMuted, letterSpacing: '1px', textTransform: 'uppercase' }}>{t('PT_DIAMOND')}</div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select value={language} onChange={e => setLanguage(e.target.value)} style={{ ...inputStyle, width: 'auto', padding: '6px 10px', fontSize: '12px', cursor: 'pointer' }}>
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇬🇧 EN</option>
            <option value="zh-TW">🇹🇼 繁中</option>
            <option value="vi">🇻🇳 VI</option>
            <option value="km">🇰🇭 KM</option>
            <option value="th">🇹🇭 TH</option>
          </select>

          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="sds-btn" style={{ background: colors.bgTertiary, color: colors.textSoft, border: `1px solid ${colors.border}` }}>
            {theme === 'dark' ? '☀️' : '🌙'} {t('THEME')}
          </button>

          {/* Mode badge */}
          <div style={{ display: 'flex', background: colors.bgTertiary, border: `1px solid ${colors.border}`, borderRadius: 9, padding: 3, gap: 3 }}>
            <button onClick={() => setViewMode('ADMIN')} style={{ padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", background: viewMode === 'ADMIN' ? colors.blue : 'transparent', color: viewMode === 'ADMIN' ? '#fff' : colors.textMuted, transition: 'all 0.2s' }}>ADMIN</button>
            <button onClick={() => setViewMode('TV')} style={{ padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", background: viewMode === 'TV' ? colors.purple : 'transparent', color: viewMode === 'TV' ? '#fff' : colors.textMuted, transition: 'all 0.2s' }}>TV</button>
          </div>

          <button onClick={() => setShowExportModal(true)} className="sds-btn" style={{ background: colors.success, boxShadow: `0 2px 10px ${colors.successGlow}` }}>
            📊 {t('DATA_EXPORT')}
          </button>
          <button onClick={handleLogout} className="sds-btn" style={{ background: colors.danger, boxShadow: `0 2px 10px ${colors.dangerGlow}` }}>
            {t('LOGOUT')}
          </button>
        </div>
      </nav>

      {/* ====== ADMIN MODE ====== */}
      {viewMode === 'ADMIN' ? (
        <div style={{ position: 'relative' }}>

          {/* ── FAB Button: buka form drawer ── */}
          <button
            onClick={() => setDrawerOpen(true)}
            style={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 500,
              width: 56, height: 56, borderRadius: '50%', border: 'none',
              background: `linear-gradient(135deg, ${colors.blue}, ${colors.primary})`,
              color: '#fff', fontSize: 24, cursor: 'pointer',
              boxShadow: `0 6px 24px ${colors.blueGlow}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
          >✏️</button>

          {/* ── DRAWER OVERLAY ── */}
          {drawerOpen && (
            <div
              onClick={() => setDrawerOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)', zIndex: 600 }}
            />
          )}

          {/* ── DRAWER PANEL ── */}
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 700,
            width: 'min(360px, 92vw)',
            background: colors.bgSecondary,
            borderLeft: `1px solid ${colors.border}`,
            boxShadow: '-8px 0 40px rgba(0,0,0,0.4)',
            transform: drawerOpen ? 'translateX(0)' : 'translateX(105%)',
            transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
          }}>
            {/* Drawer header */}
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: colors.bgTertiary }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 20, borderRadius: 2, background: `linear-gradient(to bottom, ${colors.primary}, ${colors.blue})` }} />
                <span style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{t('INPUT_TRANSACTION')}</span>
              </div>
              <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', color: colors.textMuted, fontSize: 22, cursor: 'pointer', padding: '4px 8px', borderRadius: 8, lineHeight: 1 }}>✕</button>
            </div>

            {/* Form */}
            <form onSubmit={e => { handleSubmit(e); setDrawerOpen(false); }} style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>

              {/* IN / OUT Toggle — big touch target */}
              <div style={{ display: 'flex', background: colors.bgTertiary, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 4, gap: 4 }}>
                <button type="button" onClick={() => setFormData({...formData, type:'IN'})}
                  style={{ flex:1, padding:'12px', border:'none', borderRadius:9, cursor:'pointer', fontWeight:700, fontSize:14, transition:'all 0.2s',
                    background: formData.type==='IN' ? colors.success : 'transparent',
                    color: formData.type==='IN' ? '#fff' : colors.textMuted,
                    boxShadow: formData.type==='IN' ? `0 2px 10px ${colors.successGlow}` : 'none' }}>
                  ↓ {t('IN_ENTRY')}
                </button>
                <button type="button" onClick={() => setFormData({...formData, type:'OUT'})}
                  style={{ flex:1, padding:'12px', border:'none', borderRadius:9, cursor:'pointer', fontWeight:700, fontSize:14, transition:'all 0.2s',
                    background: formData.type==='OUT' ? colors.danger : 'transparent',
                    color: formData.type==='OUT' ? '#fff' : colors.textMuted,
                    boxShadow: formData.type==='OUT' ? `0 2px 10px ${colors.dangerGlow}` : 'none' }}>
                  ↑ {t('OUT_EXIT')}
                </button>
              </div>

              {/* SPK */}
              <div>
                <label style={{ fontSize:11, fontWeight:600, color:colors.textMuted, letterSpacing:'0.8px', textTransform:'uppercase', display:'block', marginBottom:6 }}>{t('SPK_NUMBER')}</label>
                <input style={{ ...inputStyle, fontSize:15, padding:'13px' }} placeholder="SPK-XXXX"
                  value={formData.spk_number}
                  onChange={e => setFormData({...formData, spk_number: e.target.value.toUpperCase()})}
                  onKeyDown={e => e.key==='Enter' && document.getElementById('style-input')?.focus()}
                  {...inputFocusProps} required />
              </div>

              {/* Style */}
              <div>
                <label style={{ fontSize:11, fontWeight:600, color:colors.textMuted, letterSpacing:'0.8px', textTransform:'uppercase', display:'block', marginBottom:6 }}>{t('STYLE_ARTICLE')}</label>
                <input id="style-input" style={{ ...inputStyle, fontSize:15, padding:'13px' }} placeholder="Style name..."
                  value={formData.style_name}
                  onChange={e => setFormData({...formData, style_name: e.target.value.toUpperCase()})}
                  onKeyDown={e => e.key==='Enter' && document.getElementById('orderqty-input')?.focus()}
                  {...inputFocusProps} />
              </div>

              {/* Order Qty + XFD */}
              <div style={{ display:'flex', gap:10 }}>
                <div style={{ flex:1 }}>
                  <label style={{ fontSize:11, fontWeight:600, color:colors.textMuted, letterSpacing:'0.8px', textTransform:'uppercase', display:'block', marginBottom:6 }}>{t('ORDER_QTY')}</label>
                  <input id="orderqty-input" style={{ ...inputStyle, fontSize:15, padding:'13px' }} placeholder="0" type="number" inputMode="numeric"
                    value={formData.target_qty||''}
                    onChange={e => setFormData({...formData, target_qty:e.target.value})}
                    onKeyDown={e => e.key==='Enter' && document.getElementById('xfd-input')?.focus()}
                    {...inputFocusProps} />
                </div>
                <div style={{ flex:1, position:'relative' }}>
                  <label style={{ fontSize:11, fontWeight:600, color:colors.textMuted, letterSpacing:'0.8px', textTransform:'uppercase', display:'block', marginBottom:6 }}>XFD</label>
                  <input id="xfd-input" style={{ ...inputStyle, fontSize:14, padding:'13px', colorScheme: theme==='dark'?'dark':'light' }} type="date"
                    value={formData.xfd_date}
                    onChange={e => setFormData({...formData, xfd_date:e.target.value})}
                    {...inputFocusProps} />
                  {formData.xfd_date && (() => {
                    const diff = Math.ceil((new Date(formData.xfd_date)-new Date())/(1000*60*60*24));
                    if(diff<0) return <div style={{ fontSize:10, color:colors.danger, marginTop:3, fontWeight:600 }}>⚠ {t('XFD_PASSED')}</div>;
                    if(diff<=3) return <div style={{ fontSize:10, color:colors.warning, marginTop:3, fontWeight:600 }}>⚠ {diff}d left</div>;
                    return null;
                  })()}
                </div>
              </div>

              {/* Stock qty — big */}
              <div>
                <label style={{ fontSize:11, fontWeight:600, color:colors.textMuted, letterSpacing:'0.8px', textTransform:'uppercase', display:'block', marginBottom:6 }}>{t('STOCK')}</label>
                <input id="qty-input" style={{ ...inputStyle, fontSize:22, padding:'14px', fontWeight:700, fontFamily:"'JetBrains Mono',monospace", textAlign:'center',
                  borderColor: formData.type==='OUT' ? colors.danger : colors.border,
                  boxShadow: formData.type==='OUT' ? `0 0 0 2px ${colors.dangerGlow}` : 'none' }}
                  placeholder="0" type="number" inputMode="numeric"
                  value={formData.qty||''}
                  onChange={e => setFormData({...formData, qty:e.target.value})}
                  onKeyDown={e => e.key==='Enter' && document.getElementById('rack-select')?.focus()}
                  {...inputFocusProps} required />
              </div>

              {/* Rack */}
              <div>
                <label style={{ fontSize:11, fontWeight:600, color:colors.textMuted, letterSpacing:'0.8px', textTransform:'uppercase', display:'block', marginBottom:6 }}>{t('RACK_LOCATION')}</label>
                <select id="rack-select" style={{ ...inputStyle, fontSize:15, padding:'13px', cursor:'pointer' }}
                  value={formData.rack}
                  onChange={e => { setFormData({...formData, rack:e.target.value}); document.getElementById('stockfit-select')?.focus(); }}
                  {...inputFocusProps} required>
                  <option value="">-- Pilih Rak --</option>
                  {DAFTAR_RAK_FULL.map(r=><option key={r} value={r}>{formatRakDisplay(r)}</option>)}
                </select>
              </div>

              {/* Routing */}
              <div style={{ background:colors.bgTertiary, borderRadius:10, padding:'14px', border:`1px solid ${colors.border}` }}>
                <div style={{ fontSize:10, fontWeight:700, color:colors.textMuted, letterSpacing:'1px', textTransform:'uppercase', marginBottom:10 }}>ROUTING</div>
                <label style={{ fontSize:11, fontWeight:600, color:colors.textMuted, letterSpacing:'0.8px', textTransform:'uppercase', display:'block', marginBottom:6 }}>{t('FROM_STOCKFIT')}</label>
                <select id="stockfit-select" style={{ ...inputStyle, fontSize:14, padding:'13px', marginBottom:12, cursor:'pointer' }}
                  value={formData.source_from}
                  onChange={e => setFormData({...formData, source_from:e.target.value})}
                  {...inputFocusProps}>
                  <option value="">-- {t('CHOOSE_STOCKFIT')} --</option>
                  {DAFTAR_STOCKFIT.map(sf=><option key={sf} value={sf}>{sf}</option>)}
                </select>
                <label style={{ fontSize:11, fontWeight:600, color:colors.textMuted, letterSpacing:'0.8px', textTransform:'uppercase', display:'block', marginBottom:6 }}>{t('TO_DESTINATION')}</label>
                <input style={{ ...inputStyle, fontSize:14, padding:'13px' }}
                  value={formData.destination}
                  onChange={e => setFormData({...formData, destination:e.target.value})}
                  {...inputFocusProps} />
              </div>

              {/* Timestamp */}
              <div style={{ padding:'10px 14px', background:colors.bgTertiary, borderRadius:8, border:`1px solid ${colors.border}`, textAlign:'center' }}>
                <div style={{ fontSize:9, color:colors.textMuted, letterSpacing:'1px', textTransform:'uppercase', marginBottom:3 }}>{t('INPUT_TIME')}</div>
                <div style={{ fontSize:13, fontFamily:"'JetBrains Mono',monospace", fontWeight:600, color:colors.primary }}>
                  {currentTime.toLocaleString('id-ID', {year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'})}
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={isSubmitting} style={{
                padding:'16px', border:'none', borderRadius:12,
                background: isSubmitting ? colors.border : `linear-gradient(135deg,${colors.blue},${colors.primary})`,
                color:'#fff', fontWeight:700, fontSize:15, cursor: isSubmitting?'not-allowed':'pointer',
                letterSpacing:'0.5px',
                boxShadow: isSubmitting?'none':`0 4px 20px ${colors.blueGlow}`,
                transition:'all 0.2s', opacity: isSubmitting?0.6:1,
              }}>
                {isSubmitting ? `⟳ ${t('PROCESSING')}` : `✓ ${t('SAVE_DATA')}`}
              </button>
            </form>
          </div>

          {/* ── RACK GRID full width ── */}
          <div style={{ background:colors.bgSecondary, border:`1px solid ${colors.border}`, borderRadius:'16px', padding:'20px', boxShadow: theme==='dark'?'0 4px 20px rgba(0,0,0,0.2)':'0 4px 20px rgba(0,0,0,0.05)' }}>

            {/* Search bar */}
            <div style={{ position:'relative', marginBottom:16 }}>
              <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:14, color:colors.textMuted, pointerEvents:'none' }}>🔍</span>
              <input style={{ ...inputStyle, paddingLeft:36 }} className="sds-input" placeholder={t('SEARCH_SPK')} onChange={e => setSearchTerm(e.target.value.toUpperCase())} {...inputFocusProps} />
            </div>

            {/* ALL buildings in one flat grid — semua sejajar */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(170px, 1fr))', gap:'10px', maxHeight:'calc(100vh - 220px)', overflowY:'auto', paddingRight:4 }}>
              {HURUF_RAK.flatMap(h =>
                RAK_CONFIG[h].map(n => {
                  const r = `${h}-${n}`;
                  const items = inventory.filter(i => i.rack===r && i.spk.includes(searchTerm));
                  const total = items.reduce((a,b) => a+b.stock, 0);
                  const isEmpty = total === 0;
                  return (
                    <div key={r} style={{
                      background: isEmpty ? 'transparent' : colors.bgTertiary,
                      border: isEmpty ? `1px dashed ${colors.border}` : `1px solid ${colors.border}`,
                      borderRadius:10, padding:'10px', opacity: isEmpty?0.4:1,
                      minHeight: 70,
                    }}>
                      {/* Rack header */}
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: isEmpty?0:8, paddingBottom: isEmpty?0:6, borderBottom: isEmpty?'none':`1px solid ${colors.border}` }}>
                        <span style={{ fontSize:11, fontWeight:800, color: isEmpty?colors.textMuted:colors.primary }}>{formatRakDisplay(r)}</span>
                        {isEmpty
                          ? <span style={{ fontSize:8, color:colors.textMuted, background:colors.border, padding:'1px 6px', borderRadius:20 }}>KOSONG</span>
                          : <span style={{ fontSize:10, fontWeight:700, background:colors.primaryGlow, color:colors.primary, padding:'1px 7px', borderRadius:20 }}>{total}</span>
                        }
                      </div>
                      {isEmpty
                        ? <div style={{ textAlign:'center', fontSize:16, opacity:0.25, paddingTop:4 }}>📦</div>
                        : items.map((it,idx) => {
                            let bp = it.target>0?Math.round(((it.target-it.balance)/it.target)*100):0;
                            bp = Math.max(0,Math.min(bp,100));
                            const bColor = bp>=100?colors.success:bp<30?colors.danger:colors.primary;
                            return (
                              <div key={idx} className="spk-row" onClick={() => { handleItemClick(it); setDrawerOpen(true); }}
                                style={{ fontSize:10, marginTop:idx>0?6:0, paddingTop:idx>0?6:0, borderTop:idx>0?`1px dashed ${colors.border}`:'none', cursor:'pointer', minHeight:44 }}>
                                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                                  <b style={{ color:colors.text, fontSize:11 }}>{it.spk}</b>
                                  <span style={{ fontSize:10, color:bColor, fontWeight:700 }}>{bp}%</span>
                                </div>
                                <div style={{ fontSize:'9px', color:colors.textMuted, fontStyle:'italic', marginBottom:3 }}>{it.style}</div>
                                <div style={{ width:'100%', height:3, background:colors.border, borderRadius:2, marginBottom:3 }}>
                                  <div style={{ width:`${bp}%`, height:'100%', background:bColor, borderRadius:2, transition:'width 0.3s' }} />
                                </div>
                                <div style={{ display:'flex', justifyContent:'space-between', fontSize:9 }}>
                                  <span style={{ color:colors.textMuted }}>XFD:{it.xfd}</span>
                                  <span style={{ color:colors.primary, fontWeight:600 }}>{it.stock} | Bal:{it.balance}</span>
                                </div>
                              </div>
                            );
                          })
                      }
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      ) : (
        /* ====== TV MODE ====== */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* ── SINGLE INDONESIA CLOCK ── */}
          <div style={{ background: colors.bgSecondary, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', boxShadow: `0 4px 20px ${colors.primaryGlow}` }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${colors.primaryGlow} 0%, transparent 65%)`, pointerEvents: 'none' }} />
            <div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: colors.primary, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 4, opacity: 0.9 }}>🇮🇩 &nbsp;INDONESIA — WIB</div>
              <div style={{ fontSize: '14px', color: colors.textMuted, letterSpacing: '1px' }}>
                {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' })}
              </div>
            </div>
            <div style={{ fontSize: '44px', fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: colors.primary, letterSpacing: '3px', lineHeight: 1, textShadow: `0 0 20px ${colors.primaryGlow}` }}>
              {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Jakarta' })}
            </div>
          </div>

          {/* ── STATS ROW ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {/* ENTRY */}
            <div style={{ background: colors.bgSecondary, borderRadius: '16px', padding: '20px 24px', border: `1px solid ${colors.border}`, position: 'relative', overflow: 'hidden', boxShadow: `0 4px 20px ${colors.successGlow}` }}>
              <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 80, fontWeight: 900, color: colors.success, opacity: 0.04, lineHeight: 1, pointerEvents: 'none' }}>IN</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: colors.success, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>{t('ENTRY_TODAY')}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: colors.success, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>{entryToday.toLocaleString()}</span>
                <span style={{ fontSize: 13, color: colors.textMuted }}>{t('PIECE')}</span>
              </div>
            </div>
            {/* EXIT */}
            <div style={{ background: colors.bgSecondary, borderRadius: '16px', padding: '20px 24px', border: `1px solid ${colors.border}`, position: 'relative', overflow: 'hidden', boxShadow: `0 4px 20px ${colors.dangerGlow}` }}>
              <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 80, fontWeight: 900, color: colors.danger, opacity: 0.04, lineHeight: 1, pointerEvents: 'none' }}>OUT</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: colors.danger, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>{t('EXIT_TODAY')}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: colors.danger, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>{exitToday.toLocaleString()}</span>
                <span style={{ fontSize: 13, color: colors.textMuted }}>{t('PIECE')}</span>
              </div>
            </div>
            {/* GLOBAL STOCK */}
            <div style={{ background: `linear-gradient(135deg, ${colors.blue}18, ${colors.primary}0a)`, borderRadius: '16px', padding: '20px 24px', border: `1px solid ${colors.primary}44`, position: 'relative', overflow: 'hidden', boxShadow: `0 4px 20px ${colors.blueGlow}` }}>
              <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 60, fontWeight: 900, color: colors.primary, opacity: 0.04, lineHeight: 1, pointerEvents: 'none' }}>STK</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: colors.primary, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>{t('GLOBAL_STOCK')}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: colors.primary, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>{globalStock.toLocaleString()}</span>
                <span style={{ fontSize: 13, color: colors.textMuted }}>{t('PIECE')}</span>
              </div>
            </div>
          </div>

          {/* ── CHARTS ROW: Donut (bigger) + Line Chart ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '12px' }}>

            {/* DONUT CHART — lebih besar */}
            {(() => {
              const buildingData = HURUF_RAK.map(h => ({
                label: `${t('BLDG')} ${h}`,
                value: inventory.filter(i => i.rack.startsWith(h)).reduce((a, b) => a + b.stock, 0),
                color: [colors.primary, colors.success, colors.warning, colors.danger, colors.purple, colors.blue][HURUF_RAK.indexOf(h) % 6]
              })).filter(d => d.value > 0);
              const total = buildingData.reduce((a, b) => a + b.value, 0);
              let startAngle = -Math.PI / 2;
              const cx = 120, cy = 120, r = 95, rInner = 50;
              const slices = buildingData.map(d => {
                const angle = (d.value / total) * 2 * Math.PI;
                const x1 = cx + r * Math.cos(startAngle), y1 = cy + r * Math.sin(startAngle);
                startAngle += angle;
                const x2 = cx + r * Math.cos(startAngle), y2 = cy + r * Math.sin(startAngle);
                const large = angle > Math.PI ? 1 : 0;
                return { ...d, path: `M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r},0,${large},1,${x2.toFixed(2)},${y2.toFixed(2)} Z` };
              });
              return (
                <div style={{ background: colors.bgSecondary, borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${colors.border}` }}>
                    <div style={{ width: 3, height: 16, borderRadius: 2, background: `linear-gradient(to bottom,${colors.purple},${colors.primary})` }} />
                    <span style={{ fontSize: '12px', fontWeight: 800, color: colors.text, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{t('DIST_STOCK_BUILDING')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <svg width="240" height="240" style={{ flexShrink: 0 }}>
                      {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} stroke={colors.bgSecondary} strokeWidth="2.5" opacity="0.92" />)}
                      <circle cx={cx} cy={cy} r={rInner} fill={colors.bgSecondary} />
                      <text x={cx} y={cy - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill={colors.textMuted}>{t('TOTAL')}</text>
                      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="18" fontWeight="900" fill={colors.primary}>{total.toLocaleString()}</text>
                    </svg>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {buildingData.map((d, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8, background: colors.bgTertiary, border: `1px solid ${colors.border}` }}>
                          <div style={{ width: 12, height: 12, borderRadius: 3, background: d.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: colors.text, fontWeight: 700, flex: 1 }}>{d.label}</span>
                          <span style={{ fontSize: 13, color: colors.textMuted, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>{d.value.toLocaleString()}</span>
                          <span style={{ fontSize: 13, color: d.color, fontWeight: 800, minWidth: 38, textAlign: 'right' }}>{Math.round(d.value / total * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* LINE CHART + ACTIVITY LOG — dalam 1 panel */}
            {(() => {
              // ── Key fix: normalisasi waktu_input "DD-M-YYYY HH:MM" → key "YYYY-MM-DD"
              // supaya bisa dibandingkan apapun format bulannya (1 digit atau 2 digit)
              const toDateKey = (w) => {
                if (!w) return null;
                const parts = w.split(' ')[0].split('-'); // ["07","4","2026"]
                if (parts.length < 3) return null;
                const dd = parts[0].padStart(2, '0');
                const mm = parts[1].padStart(2, '0');
                const yyyy = parts[2];
                return `${yyyy}-${mm}-${dd}`; // "2026-04-07"
              };
              const days = [];
              const dayLabels = [];
              for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                days.push(d.toISOString().split('T')[0]); // "2026-04-07"
                dayLabels.push(`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`);
              }
              const inData  = days.map(day => rawRecords.filter(r => r.qty_in  > 0 && toDateKey(r.waktu_input) === day).reduce((a,b) => a + Number(b.qty_in),  0));
              const outData = days.map(day => rawRecords.filter(r => r.qty_out > 0 && toDateKey(r.waktu_input) === day).reduce((a,b) => a + Number(b.qty_out), 0));
              const maxVal = Math.max(...inData, ...outData, 1);
              const W = 460, H = 180, padL = 42, padB = 26, padT = 16, chartW = W - padL - 12, chartH = H - padB - padT;
              const xStep = chartW / (days.length - 1);
              const toY = v => padT + chartH - (v / maxVal) * chartH;
              const toX = i => padL + i * xStep;
              const inPath   = days.map((_,i) => `${i===0?'M':'L'}${toX(i).toFixed(1)},${toY(inData[i]).toFixed(1)}`).join(' ');
              const outPath  = days.map((_,i) => `${i===0?'M':'L'}${toX(i).toFixed(1)},${toY(outData[i]).toFixed(1)}`).join(' ');
              const inArea   = inPath  + ` L${toX(6).toFixed(1)},${(padT+chartH).toFixed(1)} L${padL},${(padT+chartH).toFixed(1)} Z`;
              const outArea  = outPath + ` L${toX(6).toFixed(1)},${(padT+chartH).toFixed(1)} L${padL},${(padT+chartH).toFixed(1)} Z`;
              return (
                <div style={{ background: colors.bgSecondary, borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Header */}
                  <div style={{ display:'flex', alignItems:'center', gap:7, paddingBottom:10, borderBottom:`1px solid ${colors.border}` }}>
                    <div style={{ width:3, height:16, borderRadius:2, background:`linear-gradient(to bottom,${colors.success},${colors.warning})` }} />
                    <span style={{ fontSize:'12px', fontWeight:800, color:colors.text, letterSpacing:'0.5px', textTransform:'uppercase' }}>{t('TREND_IN_OUT')}</span>
                    <div style={{ marginLeft:'auto', display:'flex', gap:12 }}>
                      <span style={{ fontSize:10, color:colors.success, fontWeight:700 }}>● IN</span>
                      <span style={{ fontSize:10, color:colors.danger,  fontWeight:700 }}>● OUT</span>
                    </div>
                  </div>

                  {/* Chart */}
                  <svg width={W} height={H} style={{ width:'100%', height:'auto' }}>
                    <defs>
                      <linearGradient id="inGrad2"  x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor={colors.success} stopOpacity="0.3"/>
                        <stop offset="100%" stopColor={colors.success} stopOpacity="0.02"/>
                      </linearGradient>
                      <linearGradient id="outGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor={colors.danger}  stopOpacity="0.25"/>
                        <stop offset="100%" stopColor={colors.danger}   stopOpacity="0.02"/>
                      </linearGradient>
                    </defs>
                    {[0, 0.25, 0.5, 0.75, 1].map(f => (
                      <g key={f}>
                        <line x1={padL} y1={toY(maxVal*f)} x2={padL+chartW} y2={toY(maxVal*f)} stroke={colors.border} strokeWidth="0.6" strokeDasharray="4 3"/>
                        <text x={padL-4} y={toY(maxVal*f)+3} textAnchor="end" fontSize="9" fill={colors.textMuted}>{Math.round(maxVal*f).toLocaleString()}</text>
                      </g>
                    ))}
                    <path d={inArea}  fill="url(#inGrad2)"/>
                    <path d={outArea} fill="url(#outGrad2)"/>
                    <path d={inPath}  fill="none" stroke={colors.success} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
                    <path d={outPath} fill="none" stroke={colors.danger}  strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
                    {days.map((_,i) => (
                      <g key={i}>
                        {inData[i]>0 && <>
                          <circle cx={toX(i)} cy={toY(inData[i])} r="4" fill={colors.success}/>
                          <text x={toX(i)} y={toY(inData[i])-8} textAnchor="middle" fontSize="9" fontWeight="700" fill={colors.success}>{inData[i].toLocaleString()}</text>
                        </>}
                        {outData[i]>0 && <>
                          <circle cx={toX(i)} cy={toY(outData[i])} r="4" fill={colors.danger}/>
                          <text x={toX(i)} y={toY(outData[i])+15} textAnchor="middle" fontSize="9" fontWeight="700" fill={colors.danger}>{outData[i].toLocaleString()}</text>
                        </>}
                        <text x={toX(i)} y={H-4} textAnchor="middle" fontSize="9" fill={colors.textMuted}>{dayLabels[i]}</text>
                      </g>
                    ))}
                  </svg>

                  {/* ── ACTIVITY LOG di bawah chart, sama panel ── */}
                  <div style={{ borderTop:`1px solid ${colors.border}`, paddingTop:10 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                      <div style={{ width:3, height:13, borderRadius:2, background:`linear-gradient(to bottom,${colors.primary},${colors.blue})` }}/>
                      <span style={{ fontSize:'11px', fontWeight:800, color:colors.text, letterSpacing:'0.5px', textTransform:'uppercase' }}>{t('ACTIVITY_LOG')}</span>
                      <span style={{ fontSize:9, color:colors.textMuted, background:colors.bgTertiary, padding:'1px 8px', borderRadius:20, border:`1px solid ${colors.border}` }}>{rawRecords.length} transaksi</span>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:6, maxHeight:'180px', overflowY:'auto' }}>
                      {rawRecords.slice(0, 20).map((log, i) => {
                        const isIn = log.qty_in > 0;
                        return (
                          <div key={i} style={{ padding:'8px 10px', background:colors.bgTertiary, borderRadius:'9px', border:`1px solid ${isIn?colors.success+'44':colors.danger+'44'}`, display:'flex', flexDirection:'column', gap:3, position:'relative' }}>
                            <div style={{ position:'absolute', top:6, right:6, fontSize:8, padding:'2px 7px', borderRadius:20, background:isIn?colors.success:colors.danger, color:'#fff', fontWeight:800 }}>{isIn?'↓ IN':'↑ OUT'}</div>
                            <div style={{ fontSize:11, fontWeight:800, color:colors.primary, paddingRight:44 }}>{log.spk_number}</div>
                            <div style={{ display:'flex', alignItems:'center', gap:3, fontSize:9 }}>
                              <span style={{ color:isIn?colors.success:colors.textMuted, fontWeight:600 }}>{log.source_from||'—'}</span>
                              <span style={{ color:colors.textMuted }}>→</span>
                              <span style={{ color:colors.warning, fontWeight:700 }}>{log.destination||'—'}</span>
                            </div>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                              <span style={{ fontSize:12, fontWeight:800, color:isIn?colors.success:colors.danger, fontFamily:"'JetBrains Mono',monospace" }}>{(log.qty_in||log.qty_out||0).toLocaleString()} <span style={{ fontSize:8, fontWeight:400, color:colors.textMuted }}>{t('PIECES')}</span></span>
                              <span style={{ fontSize:8, color:colors.textMuted }}>{log.waktu_input}</span>
                            </div>
                            <div style={{ fontSize:8, color:colors.textMuted }}>👤 {log.operator}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* ── SEARCH ── */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
            <div style={{ position: 'relative', width: '40%' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: colors.textMuted, pointerEvents: 'none' }}>🔍</span>
              <input style={{ ...inputStyle, paddingLeft: 36, textAlign: 'center' }} placeholder={t('SEARCH_DISPLAY')} value={tvSearch} onChange={e => setTvSearch(e.target.value)} {...inputFocusProps} />
            </div>
          </div>

          {/* ── RACK GRID FULL WIDTH ── */}
          <div style={{ background: colors.bgSecondary, borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 4, height: 18, borderRadius: 2, background: `linear-gradient(to bottom, ${colors.primary}, ${colors.blue})` }} />
              <span style={{ fontSize: 13, fontWeight: 800, color: colors.text, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{t('RACK_OVERVIEW')}</span>
              <div style={{ flex: 1, height: 1, background: colors.border }} />
              <span style={{ fontSize: 10, color: colors.textMuted }}>{inventory.length} {t('SPK_ACTIVE')} · {DAFTAR_RAK_FULL.length} {t('TOTAL_RACKS')}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {HURUF_RAK.map(h => {
                const totalHuruf = inventory.filter(i => i.rack.startsWith(h)).reduce((a,b)=>a+b.stock,0);
                const allRacks = RAK_CONFIG[h].map(n => {
                  const r = `${h}-${n}`;
                  const itms = inventory.filter(i => {
                    if (i.rack !== r) return false;
                    if (!tvSearch) return true;
                    const q = tvSearch.toString().toUpperCase();
                    return (i.spk||'').toUpperCase().includes(q)||(i.style||'').toUpperCase().includes(q)||(i.xfd||'').includes(tvSearch);
                  });
                  return { r, itms, ttl: itms.reduce((a,b)=>a+b.stock,0) };
                });
                const filledCount = allRacks.filter(x=>x.ttl>0).length;
                return (
                  <div key={h}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                      <div style={{ background:`linear-gradient(135deg,${colors.primary},${colors.blue})`, borderRadius:'7px', padding:'3px 12px', fontSize:11, fontWeight:800, color:'#fff', letterSpacing:'1px' }}>
                        {t('BUILDING')} {h}
                      </div>
                      <div style={{ flex:1, height:1, background:`linear-gradient(to right,${colors.primary}33,transparent)` }} />
                      <span style={{ fontSize:9, color:colors.textMuted }}>{filledCount}/{allRacks.length} {t('RACKS_FILLED')}</span>
                      <span style={{ fontSize:10, fontWeight:700, color:colors.primary, background:colors.primaryGlow, padding:'1px 9px', borderRadius:20 }}>{totalHuruf.toLocaleString()}</span>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:`repeat(${allRacks.length},1fr)`, gap:8 }}>
                      {allRacks.map(({r,itms,ttl})=>{
                        const isEmpty = ttl===0;
                        return (
                          <div key={r} style={{ background:isEmpty?'transparent':colors.bgTertiary, borderRadius:10, border:isEmpty?`1px dashed ${colors.border}`:`1px solid ${colors.borderAccent}`, padding:'9px 10px', opacity:isEmpty?0.38:1, minHeight:70 }}>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:isEmpty?4:7, paddingBottom:isEmpty?0:5, borderBottom:isEmpty?'none':`1px solid ${colors.border}` }}>
                              <span style={{ fontSize:11, fontWeight:800, color:isEmpty?colors.textMuted:colors.primary }}>{formatRakDisplay(r)}</span>
                              {isEmpty
                                ? <span style={{ fontSize:8, color:colors.textMuted, background:colors.border, padding:'1px 6px', borderRadius:20 }}>{t('EMPTY')}</span>
                                : <span style={{ fontSize:10, fontWeight:700, color:colors.primary, background:colors.primaryGlow, padding:'1px 7px', borderRadius:20 }}>{ttl.toLocaleString()}</span>
                              }
                            </div>
                            {isEmpty
                              ? <div style={{ textAlign:'center', fontSize:18, opacity:0.25, paddingTop:4 }}>📦</div>
                              : itms.map((it,idx)=>{
                                  let bp = it.target>0?Math.round(((it.target-it.balance)/it.target)*100):0;
                                  bp = Math.max(0,Math.min(bp,100));
                                  const bColor = bp>=100?colors.success:bp<30?colors.danger:colors.primary;
                                  let xfdUrgent=false,xfdExpired=false,xfdDays=null;
                                  if(it.xfd){xfdDays=Math.ceil((new Date(it.xfd)-new Date())/86400000);if(xfdDays<0){xfdExpired=true;xfdUrgent=true;}else if(xfdDays<=3)xfdUrgent=true;}
                                  const xfdColor = xfdExpired?colors.danger:xfdUrgent?colors.warning:colors.success;
                                  return (
                                    <div key={idx} style={{ position:'relative', marginTop:idx>0?7:0, paddingTop:idx>0?7:0, borderTop:idx>0?`1px dashed ${colors.border}`:'none', background:xfdUrgent?`${xfdColor}0a`:'transparent', borderRadius:xfdUrgent?6:0, padding:xfdUrgent?'4px 5px':'0' }}>
                                      {xfdUrgent&&<span style={{ position:'absolute',top:-1,right:-1,fontSize:7,fontWeight:800,background:xfdExpired?colors.danger:colors.warning,color:'#fff',padding:'1px 5px',borderRadius:'0 5px 0 5px',animation:'pulseGlow 1.2s ease-in-out infinite' }}>{xfdExpired?'✕ EXP':`⚠ ${xfdDays}d`}</span>}
                                      <div style={{ display:'flex',justifyContent:'space-between',marginBottom:2 }}>
                                        <span style={{ fontSize:10,fontWeight:700,color:colors.text }}>{it.spk}</span>
                                        <span style={{ fontSize:10,fontWeight:700,color:bColor }}>{bp}%</span>
                                      </div>
                                      <div style={{ fontSize:8,color:colors.textMuted,fontStyle:'italic',marginBottom:3 }}>{it.style}</div>
                                      <div style={{ width:'100%',height:4,background:colors.border,borderRadius:2,marginBottom:3,overflow:'hidden' }}>
                                        <div style={{ width:`${bp}%`,height:'100%',background:`linear-gradient(90deg,${bColor}88,${bColor})`,borderRadius:2 }} />
                                      </div>
                                      <div style={{ display:'flex',justifyContent:'space-between',fontSize:8 }}>
                                        <span style={{ color:colors.textMuted }}>{it.stock}/{it.target}</span>
                                        <span style={{ color:it.balance>=0?colors.success:colors.danger,fontWeight:600 }}>Bal:{it.balance}</span>
                                      </div>
                                      <div style={{ display:'flex',justifyContent:'space-between',fontSize:8,marginTop:2 }}>
                                        <span style={{ color:xfdColor,fontWeight:xfdUrgent?700:400 }}>XFD:{it.xfd}</span>
                                        {it.destination&&<span style={{ color:colors.warning }}>→{it.destination}</span>}
                                      </div>
                                    </div>
                                  );
                                })
                            }
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ====== EXPORT MODAL ====== */}
      {showExportModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 }}>
          <div style={{ background: colors.bgSecondary, padding: '32px', borderRadius: '20px', border: `1px solid ${colors.border}`, minWidth: 320, boxShadow: '0 25px 60px rgba(0,0,0,0.4)', animation: 'fadeSlideIn 0.25s ease' }}>
            <div style={{ width: 48, height: 48, borderRadius: '14px', background: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>📊</div>
            <h3 style={{ color: colors.text, margin: '0 0 6px', fontSize: '16px', fontWeight: 700 }}>{t('DOWNLOAD_DATA')}</h3>

            {/* Date Range Filter */}
            <div style={{ background: colors.bgTertiary, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '14px', marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: colors.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>📅 Filter Tanggal (maks. 7 hari)</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 10, color: colors.textMuted, display: 'block', marginBottom: 4 }}>Dari</label>
                  <input type="date" style={{ ...inputStyle, fontSize: 12, padding: '8px 10px', colorScheme: theme === 'dark' ? 'dark' : 'light' }}
                    value={exportDateRange.from}
                    onChange={e => {
                      const from = e.target.value;
                      // auto-set "to" max 7 days after from
                      const fromD = new Date(from);
                      const toD = new Date(exportDateRange.to);
                      const diff = Math.round((toD - fromD) / 86400000);
                      const newTo = diff > 6 ? new Date(fromD.getTime() + 6 * 86400000).toISOString().split('T')[0] : exportDateRange.to;
                      setExportDateRange({ from, to: newTo });
                    }} />
                </div>
                <span style={{ color: colors.textMuted, marginTop: 16 }}>—</span>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 10, color: colors.textMuted, display: 'block', marginBottom: 4 }}>Sampai</label>
                  <input type="date" style={{ ...inputStyle, fontSize: 12, padding: '8px 10px', colorScheme: theme === 'dark' ? 'dark' : 'light' }}
                    value={exportDateRange.to}
                    min={exportDateRange.from}
                    max={(() => { const d = new Date(exportDateRange.from); d.setDate(d.getDate() + 6); return d.toISOString().split('T')[0]; })()}
                    onChange={e => setExportDateRange({ ...exportDateRange, to: e.target.value })} />
                </div>
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: colors.primary, textAlign: 'center' }}>
                {exportDateRange.from && exportDateRange.to && `${exportDateRange.from} s/d ${exportDateRange.to}`}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => exportToXlsx(inventory, 'Summary_Stok')} className="sds-btn" style={{ justifyContent: 'center', background: colors.blue, boxShadow: `0 2px 12px ${colors.blueGlow}` }}>📋 {t('EXPORT_SUMMARY')}</button>
              <button onClick={() => exportToXlsx(rawRecords, 'Log_Transaksi')} className="sds-btn" style={{ justifyContent: 'center', background: colors.purple, boxShadow: `0 2px 12px ${colors.purpleGlow}` }}>📜 {t('EXPORT_LOG')}</button>
              <button onClick={() => setShowExportModal(false)} className="sds-btn" style={{ justifyContent: 'center', background: colors.bgTertiary, color: colors.textMuted, border: `1px solid ${colors.border}` }}>{t('CANCEL')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;