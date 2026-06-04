# Job Search for Students

Ứng dụng fullstack tìm việc làm cho sinh viên frontend intern. Ứng dụng giúp sinh viên tìm kiếm các cơ hội việc làm phù hợp, lọc theo địa điểm, loại hình công việc, và lưu các công việc yêu thích.

## 📋 Tính năng

- ✅ Tìm kiếm công việc theo tên, công ty
- ✅ Lọc theo địa điểm (Hà Nội, Hồ Chí Minh, Đà Nẵng, Remote)
- ✅ Lọc theo loại hình (Thực tập, Bán thời gian, Remote)
- ✅ Lưu công việc yêu thích (lưu vào localStorage)
- ✅ Xem chi tiết công việc (mô tả, yêu cầu, quyền lợi)
- ✅ Giao diện responsive (mobile, tablet, desktop)
- ✅ Backend Node.js/Express cung cấp API công việc
- ✅ Caching và API filtering
- ✅ Dark mode ready

## 🛠️ Công nghệ sử dụng

### Frontend
- React 18.3.1
- Vite 5.4.1
- CSS3 (Grid, Flexbox, CSS Variables)
- localStorage API

### Backend
- Node.js
- Express 4.18.4
- CORS
- RESTful API

## 📁 Cấu trúc thư mục

```
Job/
├── public/                  # Static files
├── src/
│   ├── components/         # React components
│   │   ├── SearchBar.jsx
│   │   ├── FilterBar.jsx
│   │   ├── JobCard.jsx
│   │   ├── JobList.jsx
│   │   ├── JobDetail.jsx
│   │   ├── FavoritesTab.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Statistics.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   ├── utils/
│   │   ├── api.js          # API calls
│   │   └── storage.js      # localStorage utilities
│   ├── App.jsx             # Main component
│   ├── main.jsx            # Entry point
│   └── styles.css          # Global styles
├── index.html              # HTML entry
├── server.js               # Node.js/Express server
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
├── .gitignore              # Git ignore rules
└── README.md               # Documentation

```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu
- Node.js 14+ (https://nodejs.org)
- npm 6+ hoặc yarn

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Chạy ứng dụng

#### Chạy chỉ backend
```bash
npm run server
```
Server sẽ chạy trên http://localhost:3000

#### Chạy chỉ frontend (dev mode)
```bash
npm run dev
```
Frontend sẽ chạy trên http://localhost:5173

#### Chạy cả frontend và backend cùng lúc (Khuyến nghị)
```bash
npm run dev:full
```

Mở trình duyệt và truy cập: **http://localhost:5173**

### Bước 3: Build cho production

```bash
npm run build
```

### Bước 4: Preview build

```bash
npm run preview
```

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Lấy tất cả công việc
```
GET /api/jobs
Response: Array<Job>
```

#### 2. Lấy công việc theo ID
```
GET /api/jobs/:id
Response: Job object
Example: GET /api/jobs/1
```

#### 3. Tìm kiếm công việc
```
GET /api/search?q=keyword
Response: Array<Job>
Example: GET /api/search?q=Frontend
```

#### 4. Lấy công việc theo địa điểm
```
GET /api/location/:location
Response: Array<Job>
Example: GET /api/location/Hà%20Nội
```

#### 5. Lấy công việc theo loại hình
```
GET /api/type/:type
Response: Array<Job>
Example: GET /api/type/Thực%20tập
```

#### 6. Lấy danh sách địa điểm
```
GET /api/locations
Response: Array<string>
```

#### 7. Lấy danh sách loại hình
```
GET /api/types
Response: Array<string>
```

#### 8. Lọc công việc (POST)
```
POST /api/filter
Body: { location?: string, type?: string }
Response: Array<Job>
```

## 📊 Cấu trúc dữ liệu Job

```javascript
{
  id: number,
  title: string,           // Tên công việc
  company: string,         // Tên công ty
  location: string,        // Địa điểm
  type: string,           // Loại hình (Thực tập, Bán thời gian, Remote)
  description: string,    // Mô tả công việc
  requirements: string,   // Yêu cầu
  benefits: string        // Quyền lợi
}
```

## 💾 localStorage

### Favorites
```javascript
Key: 'favorites'
Value: Array<number> (job IDs)
```

Ví dụ:
```javascript
// Save
localStorage.setItem('favorites', JSON.stringify([1, 2, 3]))

// Load
const favorites = JSON.parse(localStorage.getItem('favorites')) || []
```

## 🎨 Màu sắc và Theme

```css
--primary-color: #3b82f6          /* Xanh dương */
--primary-dark: #2563eb           /* Xanh dương đậm */
--secondary-color: #f59e0b        /* Cam */
--success-color: #10b981          /* Xanh lá */
--danger-color: #ef4444           /* Đỏ */
--text-dark: #1f2937              /* Chữ đen */
--text-light: #6b7280             /* Chữ xám */
--bg-light: #f9fafb               /* Nền nhạt */
--bg-white: #ffffff               /* Nền trắng */
```

## 📱 Responsive Design

Ứng dụng được thiết kế responsive cho tất cả kích thước màn hình:
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🔄 Workflow Phát triển

1. **Backend Development**
   ```bash
   npm run server
   ```
   - Modify server.js
   - Test APIs với Postman hoặc curl

2. **Frontend Development**
   ```bash
   npm run dev
   ```
   - Modify components trong src/
   - Hot reload tự động

3. **Full Stack Development**
   ```bash
   npm run dev:full
   ```
   - Frontend + Backend chạy cùng lúc
   - Frontend proxy requests đến backend

## 🐛 Troubleshooting

### Port đã được sử dụng
```bash
# Thay đổi port backend trong server.js
const port = 3001;

# Hoặc sử dụng environment variable
PORT=3001 npm run server
```

### CORS Error
Đảm bảo backend đã enable CORS:
```javascript
app.use(cors());
```

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📝 Các file quan trọng

| File | Mô tả |
|------|-------|
| `src/App.jsx` | Main component |
| `server.js` | Backend server |
| `vite.config.js` | Vite configuration |
| `src/styles.css` | Global styles |
| `package.json` | Dependencies & scripts |

## 🚀 Deployment

### Deploy Frontend (Netlify/Vercel)
1. Build: `npm run build`
2. Deploy `dist/` folder

### Deploy Backend (Heroku/Railway)
1. Add Procfile
2. Push to git
3. Deploy

## 📚 Tài liệu tham khảo

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express Documentation](https://expressjs.com)
- [MDN Web Docs](https://developer.mozilla.org)

## 👨‍💻 Các bước tiếp theo

- [ ] Thêm database (MongoDB/PostgreSQL)
- [ ] Authentication (Login/Register)
- [ ] User profile & CV upload
- [ ] Job application tracking
- [ ] Email notifications
- [ ] Advanced filtering
- [ ] Admin dashboard

## 📄 Giấy phép

MIT License

## 📧 Liên hệ

Nếu có câu hỏi hoặc đề xuất, vui lòng liên hệ qua email.

---

Happy coding! 🎉

- `GET /api/jobs` - lấy danh sách việc làm
- `GET /api/jobs/:id` - lấy chi tiết một công việc
