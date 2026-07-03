# Job Search API - Version 2.0

## ✨ Cập nhật v2.0

- ✅ **Remotive API Integration** - Lấy dữ liệu công việc thực tế từ Remotive
- ✅ **Caching System** - Cache dữ liệu trong 1 giờ để tối ưu hiệu suất
- ✅ **Production Ready** - Ready để deploy lên Render
- ✅ **Fallback Data** - Dữ liệu dự phòng khi API bị lỗi
- ✅ **Static Files Serving** - Serve React build tự động

## 🏗️ Kiến trúc

```
Job Search App
├── Frontend (React + Vite)
│   └── /dist → Serve tĩnh trên Render
├── Backend (Express)
│   ├── API Routes (/api/*)
│   └── Remotive API Integration
└── .env → Configuration
```

## 🔧 Chạy Locally

### Development Mode

```bash
# Terminal 1: Frontend (Vite dev server)
npm run dev

# Terminal 2: Backend
npm run server

# Hoặc chạy cả hai cùng lúc
npm run dev:full
```

### Production Mode

```bash
# Build React
npm run build

# Start server (serve từ /dist)
npm start

# Hoặc sử dụng script
npm run prod
```

## 📡 API Endpoints

### Lấy tất cả công việc
```
GET /api/jobs
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Senior Software Engineer",
    "company": "Google",
    "location": "Remote",
    "type": "Remote",
    "description": "...",
    "requirements": "...",
    "benefits": "...",
    "url": "..."
  }
]
```

### Lấy công việc theo ID
```
GET /api/jobs/:id
```

### Tìm kiếm công việc
```
GET /api/search?q=react
```

### Lọc theo địa điểm
```
GET /api/location/Remote
```

### Lọc theo loại hình
```
GET /api/type/Remote
```

### Lấy danh sách địa điểm
```
GET /api/locations
```

### Lấy danh sách loại hình
```
GET /api/types
```

## 🌐 Data Source

- **Primary:** Remotive API (https://remotive.com/api/remote-jobs)
- **Fallback:** Local jobs data (trong `server.js`)
- **Cache:** 1 giờ

## ⚙️ Configuration

File `.env`:
```
PORT=3000
NODE_ENV=production
REMOTIVE_API_URL=https://remotive.com/api/remote-jobs
CACHE_DURATION=3600000
```

## 🚀 Deploy lên Render

Xem chi tiết: [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

Tóm tắt:
1. Push code lên GitHub
2. Kết nối Render với GitHub repo
3. Thiết lập Build/Start commands
4. Deploy!

## 📊 Features

### Frontend
- Search bar với real-time filtering
- Filter theo location & job type
- Favorites management (localStorage)
- Responsive design
- Tab view (All / Favorites)

### Backend
- Fetch từ external API (Remotive)
- Caching để tối ưu hiệu suất
- Error handling & fallback
- Production-ready logging
- CORS enabled
- Static file serving

## 🐛 Troubleshooting

### API trả về fallback data?
- Check: Remotive API có hoạt động không
- Fix: Thực hiện retry sau 1 giờ (cache duration)

### Lỗi khi build?
```bash
# Clear cache & reinstall
rm -rf node_modules
npm install
npm run build
```

### Port bị dùng?
```bash
# Change PORT
PORT=3001 npm start
```

## 📚 Stack

- **Frontend:** React 18, Vite, CSS
- **Backend:** Express.js, Node.js
- **Data Source:** Remotive API
- **Deployment:** Render
- **Package Manager:** npm

## 📝 Commits

```bash
git add .
git commit -m "Feat: Add Remotive API integration and Render deployment support"
git push origin main
```
