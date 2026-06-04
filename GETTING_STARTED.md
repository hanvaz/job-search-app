# 🚀 GETTING STARTED - Hướng Dẫn Bắt Đầu

## Welcome! Chào mừng! 👋

Bạn vừa được tặng một dự án hoàn chỉnh **Job Search for Students** - ứng dụng web tìm kiếm việc làm cho sinh viên.

---

## ⚡ 5 Phút Bắt Đầu

### Bước 1️⃣: Mở Terminal
- Nhấn `Win + R` (Windows) hoặc `Cmd + Space` (Mac)
- Gõ: `cmd` (Windows) hoặc Terminal (Mac)
- Chuyển đến thư mục: `cd d:\MyProject\Job`

### Bước 2️⃣: Cài Đặt
```bash
npm install
```
Chờ cho đến khi xong (1-2 phút)

### Bước 3️⃣: Chạy Dự Án
```bash
npm run dev:full
```

### Bước 4️⃣: Mở Trình Duyệt
Truy cập: **http://localhost:5173**

### Bước 5️⃣: Sử Dụng!
- 🔍 Tìm kiếm công việc
- 🌍 Lọc theo địa điểm
- 💼 Lọc theo loại hình
- ❤️ Lưu yêu thích

---

## 📁 Các File Quan Trọng

### Muốn chỉnh sửa...

**Giao diện (UI) / Màu sắc**
→ Sửa: `src/styles.css`

**Thêm công việc mới**
→ Sửa: `server.js` (tìm dòng `const jobs = [...]`)

**Thêm component React mới**
→ Tạo: `src/components/TenComponent.jsx`

**Thêm API route mới**
→ Sửa: `server.js` (thêm route mới)

**Lưu dữ liệu**
→ Sửa: `src/utils/storage.js`

---

## 📚 Tài Liệu

### Tôi muốn...

**Hiểu rõ toàn bộ dự án**
→ Đọc: `README.md`

**Bắt đầu nhanh**
→ Đọc: `QUICKSTART.md`

**Test API**
→ Đọc: `API_TESTING.md`

**Phát triển feature**
→ Đọc: `DEVELOPMENT.md`

**Biết file nào làm gì**
→ Đọc: `FILE_MANIFEST.md`

**Ghi nhớ lệnh**
→ Đọc: `QUICK_REFERENCE.md`

**Biết hoàn thành cái gì**
→ Đọc: `CHECKLIST.md`

---

## 🎯 Tính Năng Chính

✅ **Tìm Kiếm** - Tìm công việc theo tên hoặc công ty
✅ **Lọc** - Lọc theo địa điểm và loại hình
✅ **Yêu Thích** - Lưu công việc yêu thích
✅ **Chi Tiết** - Xem đầy đủ thông tin công việc
✅ **Responsive** - Chạy trên mọi thiết bị

---

## 🛠️ Các Lệnh Hữu Ích

```bash
# Chạy backend + frontend
npm run dev:full

# Chạy frontend
npm run dev

# Chạy backend
npm run server

# Build cho production
npm run build

# Xem production build
npm run preview
```

---

## 📊 Những Gì Được Tạo Ra

✨ **11 React Components** - Các component tái sử dụng
🖥️ **Express Backend** - Server với 8+ API routes
🎨 **600+ CSS Rules** - Giao diện đẹp và responsive
📚 **7 Documentation Files** - Hướng dẫn chi tiết
⚙️ **2 Setup Scripts** - Cài đặt dễ dàng
📦 **10 Job Listings** - Dữ liệu mẫu

---

## 🚀 Tiếp Theo

### Ngay Bây Giờ:
1. ✅ Chạy `npm install`
2. ✅ Chạy `npm run dev:full`
3. ✅ Mở http://localhost:5173
4. ✅ Thử các tính năng

### Sau Đó:
1. 📖 Đọc README.md để hiểu dự án
2. 🔧 Tùy chỉnh theo nhu cầu của bạn
3. 🎨 Thay đổi màu sắc, thiết kế
4. 📝 Thêm công việc của riêng bạn

### Phát Triển Thêm:
1. Thêm authentication (đăng nhập)
2. Kết nối database
3. Thêm tính năng ứng tuyển
4. Gửi email thông báo

---

## 🐛 Gặp Vấn Đề?

### Error: "npm: command not found"
→ Node.js chưa được cài. Tải từ https://nodejs.org

### Error: "Port already in use"
→ Port 3000 hoặc 5173 đã bị sử dụng. Thay port hoặc đóng ứng dụng khác

### Trang trắng không hiển thị
→ Mở DevTools (F12) → Console → Xem lỗi gì
→ Kiểm tra backend có chạy không

### Công việc không load
→ Kiểm tra terminal backend có error không
→ Kiểm tra API endpoints có chạy không

---

## 📱 Test Trên Mobile

Trong cùng mạng WiFi:
```
http://[your-computer-ip]:5173
```

Ví dụ: `http://192.168.1.100:5173`

---

## 💻 Các Loại Device Hỗ Trợ

✅ Desktop (1920x1080 trở lên)
✅ Tablet (768px - 1024px)
✅ Mobile (360px - 480px)
✅ Mọi trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)

---

## 🎯 Kế Hoạch Phát Triển (Optional)

### Phase 1 ✅ (Đã Xong)
- Job search application
- Filter & search
- Favorites management
- Complete documentation

### Phase 2 (Tùy Chọn)
- User authentication
- MongoDB database
- Job application tracking
- Email notifications

### Phase 3 (Tùy Chọn)
- Admin dashboard
- Analytics
- Recommendations
- Mobile app

---

## 📞 Hỗ Trợ

**Lỗi hoặc thắc mắc?**

1. Đọc tài liệu liên quan (README.md, DEVELOPMENT.md)
2. Kiểm tra console (F12 → Console)
3. Xem API_TESTING.md nếu là API issue
4. Xem QUICK_REFERENCE.md để ghi nhớ lệnh

---

## ✅ Checklist Bắt Đầu

- [ ] Node.js đã cài đặt
- [ ] `npm install` đã chạy
- [ ] `npm run dev:full` đã chạy
- [ ] Trình duyệt mở http://localhost:5173
- [ ] Có thể tìm kiếm công việc
- [ ] Có thể lọc theo địa điểm
- [ ] Có thể lưu yêu thích
- [ ] Có thể xem chi tiết công việc

---

## 🎉 Chúc Mừng!

Bạn đã có một ứng dụng web hoàn chỉnh, sẵn sàng sử dụng, phát triển hoặc triển khai!

### Bước Tiếp Theo:
1. Khám phá mã code
2. Tùy chỉnh theo ý muốn
3. Thêm tính năng mới
4. Chia sẻ với bạn bè

---

## 📚 Tài Nguyên Hữu Ích

- **React Docs:** https://react.dev
- **Express Docs:** https://expressjs.com
- **Vite Docs:** https://vitejs.dev
- **MDN Web Docs:** https://developer.mozilla.org
- **CSS Tricks:** https://css-tricks.com

---

## 🚀 Triển Khai

**Sẵn sàng để deploy?**

Frontend: Netlify, Vercel, GitHub Pages
Backend: Heroku, Railway, AWS, DigitalOcean

Xem README.md để biết chi tiết.

---

**Version:** 1.0.0
**Status:** Ready to Use ✅
**Last Updated:** 2024

---

### 🎊 Bắt Đầu ngay bây giờ!

```bash
npm install && npm run dev:full
```

Vui lòi coding! 💻✨
