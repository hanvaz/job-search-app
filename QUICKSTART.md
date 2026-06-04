# Quick Start Guide

## 🚀 Bắt Đầu Nhanh

### Prerequisites
- Node.js 14+ 
- npm 6+
- Trình duyệt web hiện đại

### Installation (Cài Đặt)

1. **Mở Terminal/Command Prompt** tại thư mục `d:\MyProject\Job`

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Chạy dự án:**

**Cách 1: Chạy cả backend và frontend (Khuyến nghị)**
```bash
npm run dev:full
```

**Cách 2: Chạy tách biệt**
- Terminal 1 - Backend:
```bash
npm run server
```

- Terminal 2 - Frontend:
```bash
npm run dev
```

4. **Mở trình duyệt:**
```
http://localhost:5173
```

---

## 📱 Sử Dụng Ứng Dụng

### Tìm Kiếm Công Việc
1. Nhập từ khóa trong ô tìm kiếm
2. Chọn địa điểm (nếu cần)
3. Chọn loại hình công việc (nếu cần)
4. Danh sách sẽ cập nhật tự động

### Lưu Công Việc Yêu Thích
- Click nút ❤️ trên mỗi thẻ công việc
- Hoặc click nút "Yêu thích" trong chi tiết công việc
- Công việc sẽ được lưu vào localStorage

### Xem Chi Tiết Công Việc
- Click nút "Xem Chi Tiết →" trên thẻ công việc
- Hoặc click vào tiêu đề công việc
- Xem đầy đủ mô tả, yêu cầu, quyền lợi

### Xem Công Việc Yêu Thích
- Click tab "Công việc yêu thích" ở header
- Chỉ hiển thị các công việc đã lưu

---

## 🛠️ Các Lệnh Hữu Ích

```bash
# Development - chạy cả frontend + backend
npm run dev:full

# Development - frontend only
npm run dev

# Backend - Node.js server
npm run server

# Production - build frontend
npm run build

# Preview - xem build production trên local
npm run preview
```

---

## 🐛 Sự Cố Thường Gặp

### Error: Cannot find module
**Giải pháp:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 hoặc 5173 đã bị sử dụng
**Giải pháp:** 
- Đóng ứng dụng khác đang dùng port này
- Hoặc thay đổi port trong code

### CORS Error
**Giải pháp:**
- Đảm bảo backend đang chạy
- Kiểm tra URL API trong App.jsx

### Localhost không load
**Giải pháp:**
1. Kiểm tra console (F12) có lỗi gì không
2. Reload trang (Ctrl+R)
3. Xóa cache trình duyệt

---

## 📚 Cấu Trúc Dự Án

```
Job/
├── public/              # Static files
├── src/
│   ├── components/     # React components
│   ├── utils/          # Utility functions
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── server.js           # Backend
├── vite.config.js      # Vite config
├── package.json        # Dependencies
└── README.md           # Documentation
```

---

## 🔗 API Endpoints

```
GET  /api/jobs              # Tất cả công việc
GET  /api/jobs/:id          # Chi tiết công việc
GET  /api/search?q=keyword  # Tìm kiếm
GET  /api/location/:loc     # Lọc theo địa điểm
GET  /api/type/:type        # Lọc theo loại hình
POST /api/filter            # Lọc nâng cao
```

---

## 💾 Local Storage

Ứng dụng sử dụng browser's localStorage để lưu:
- **Favorites**: Danh sách công việc yêu thích (sẽ lưu tự động)

---

## ⚙️ Cấu Hình

### Thay đổi Port Backend
File `server.js`, tìm dòng:
```javascript
const port = process.env.PORT || 3000;
```
Thay `3000` thành port bạn muốn

### Thay đổi Port Frontend
File `vite.config.js`, thêm:
```javascript
server: {
  port: 5174
}
```

---

## 📝 Ghi Chú Phát Triển

- Frontend sử dụng **React 18** + **Vite**
- Backend sử dụng **Express.js**
- CSS sử dụng **CSS Grid** và **Flexbox**
- Data được lưu trên frontend (localStorage)
- Có thể mở rộng với database sau

---

## 📧 Hỗ Trợ

Nếu có vấn đề:
1. Kiểm tra console browser (F12)
2. Kiểm tra terminal có lỗi gì
3. Xem README.md để có thêm thông tin chi tiết

---

**Happy coding!** 🎉
