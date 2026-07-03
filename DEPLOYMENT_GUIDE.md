# Hướng dẫn Deploy trên Vercel & Render

## 📋 So sánh Vercel vs Render

| Tiêu chí | Vercel | Render |
|---------|--------|--------|
| **Frontend** | ⭐⭐⭐⭐⭐ Tuyệt vời | ⭐⭐⭐ Tốt |
| **Backend** | ⭐⭐ (Serverless Functions) | ⭐⭐⭐⭐⭐ Tuyệt vời |
| **Fullstack** | ⭐⭐⭐⭐ Tốt | ⭐⭐⭐⭐ Tốt |
| **Miễn phí** | Có (hạn chế) | Có (1 instance) |
| **Khởi động lạnh** | Nhanh | Chậm hơn |

### ✅ **Dùng Vercel cho:** Frontend React  
### ✅ **Dùng Render cho:** Backend Express + Frontend  

---

## 🚀 DEPLOY TRÊN RENDER (Khuyến nghị cho dự án này)

### Ưu điểm:
- ✅ Dễ deploy fullstack (React + Express)
- ✅ Miễn phí + performance tốt
- ✅ Auto-deploy từ GitHub
- ✅ Environment variables dễ set
- ✅ Logs real-time

### Step 1: Chuẩn bị Repository

```bash
# Đảm bảo tất cả code đã commit
git add .
git commit -m "chore: Prepare for Render deployment"
git push origin main
```

### Step 2: Tạo Web Service trên Render

1. Truy cập [render.com](https://render.com)
2. Đăng nhập bằng GitHub
3. Click **"New +"** → **"Web Service"**
4. Chọn repository `Job` hoặc `MyProject/Job`

### Step 3: Cấu hình Build & Deployment

| Trường | Giá trị |
|--------|---------|
| **Name** | `job-search-app` (hoặc tên khác) |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | Free (đủ cho demo) |

### Step 4: Thiết lập Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

| Key | Value |
|-----|-------|
| `PORT` | `3000` |
| `NODE_ENV` | `production` |

Sau đó click **"Create Web Service"**

### Step 5: Chờ Deploy

- Render tự động build & deploy
- Xem logs trong **Logs** tab
- Khi xong, bạn sẽ có URL: `https://job-search-app.onrender.com`

### Step 6: Test API

```bash
# Test endpoint
curl https://job-search-app.onrender.com/api/jobs

# Hoặc mở trong browser:
https://job-search-app.onrender.com
```

### ⚠️ Troubleshooting Render

**Lỗi: Build Failed**
- Kiểm tra logs: Dashboard → Logs
- Đảm bảo `package.json` có tất cả dependencies
- Test build locally: `npm run build`

**Lỗi: App Crashed**
- Check logs cho error messages
- Verify `server.js` exports chính xác
- Kiểm tra PORT environment variable

**Lỗi: API trả về fallback data**
- Remotive API có thể timeout
- Dữ liệu sẽ được cache 1 giờ
- Retry sau 1 giờ

---

## 🔵 DEPLOY TRÊN VERCEL (Tối ưu cho Frontend)

### Ưu điểm Vercel:
- ✅ Deploy cực nhanh
- ✅ Auto-scaling tốt
- ✅ Support React Native
- ✅ Giảm cold start time

### Nhược điểm:
- ❌ Backend Node.js kém hơn Render
- ❌ Serverless functions có timeout
- ❌ Phải split Frontend & Backend

### Option A: Deploy Frontend trên Vercel, Backend trên Render

#### A1. Deploy Frontend (Vercel)

1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. Click **"Add New..."** → **"Project"**
4. Import repository
5. Framework: **Vite**
6. Build: `npm run build`
7. Output: `dist`
8. Click **"Deploy"**

#### A2. Deploy Backend (Render)

Làm theo hướng dẫn **DEPLOY TRÊN RENDER** ở trên

#### A3: Update Frontend API URL

Trên **Vercel Dashboard:**
- Project Settings → Environment Variables
- Thêm: `VITE_API_URL=https://your-render-api.onrender.com`

Cập nhật `src/App.jsx`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Thay vì /api/jobs, dùng:
const response = await fetch(`${API_URL}/api/jobs`);
```

---

### Option B: Deploy Fullstack trên Vercel (Advanced)

> ⚠️ Khó hơn, không khuyến khích cho dự án này

Cần tạo Vercel Functions (`api/` folder) để thay thế Express.

---

## 🎯 CHIẾN LƯỢC DEPLOY TỐT NHẤT

### 1️⃣ **Deploy fullstack trên Render** (EASY ⭐⭐⭐)

```
Render: https://job-search-app.onrender.com
├── Frontend (React)
└── Backend (Express)
```

**Pros:** Một service duy nhất, dễ setup  
**Cons:** Tất cả crash thì toàn bộ down

### 2️⃣ **Tách Frontend (Vercel) + Backend (Render)** (RECOMMENDED ⭐⭐⭐⭐⭐)

```
Vercel:  https://job-search-app.vercel.app (Frontend)
Render:  https://job-search-api.onrender.com (Backend)
```

**Pros:** 
- Frontend deploy nhanh
- Backend scale độc lập
- Better performance

**Cons:** 
- CORS setup cần cẩn thận
- 2 services để maintain

---

## 📝 HƯỚNG DẪN CHI TIẾT: TÁCH FRONTEND + BACKEND

### Bước 1: Chuẩn bị Code

**Cập nhật `src/utils/api.js`:**
```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const jobsAPI = {
  getAllJobs: async () => {
    const response = await fetch(`${API_BASE}/api/jobs`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  },
  // ... rest của API calls
};
```

**Cập nhật `src/App.jsx`:**
```javascript
useEffect(() => {
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      // Dùng API_URL từ environment hoặc fallback
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/jobs`);
      // ...
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchJobs();
}, []);
```

### Bước 2: Build & Commit

```bash
npm run build
git add .
git commit -m "feat: Prepare for split deployment (Vercel + Render)"
git push origin main
```

### Bước 3: Deploy Backend trên Render

Làm theo phần **DEPLOY TRÊN RENDER** ở trên.

Lưu lại URL: `https://job-search-api.onrender.com`

### Bước 4: Deploy Frontend trên Vercel

1. Truy cập [vercel.com](https://vercel.com)
2. Import repository
3. **Project Settings** → **Environment Variables**
4. Thêm:
   ```
   VITE_API_URL=https://job-search-api.onrender.com
   ```
5. Click **"Deploy"**

### Bước 5: Update CORS trên Backend

**File `server.js`:**
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://job-search-app.vercel.app', // Frontend URL
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

Commit & push:
```bash
git add server.js
git commit -m "chore: Update CORS for Vercel deployment"
git push origin main
```

### Bước 6: Test

```bash
# Test Vercel Frontend
https://job-search-app.vercel.app

# Test Render Backend
https://job-search-api.onrender.com/api/jobs

# Check logs trên Render:
Dashboard → Logs → Filter by error
```

---

## 🔄 AUTO-DEPLOY SETUP

### Render: Auto-Deploy (Tự động)

✅ **Mặc định bật**
- Mỗi push → main sẽ tự động deploy
- Xem logs trong **Deploy** tab

### Vercel: Auto-Deploy (Tự động)

✅ **Mặc định bật**
- Mỗi push → main sẽ tự động deploy
- Xem logs trong **Deployments** tab

---

## 📊 MONITORING & LOGGING

### Trên Render:
1. Dashboard → Service name
2. **Logs** tab
3. **Metrics** tab (CPU, Memory, Network)

### Trên Vercel:
1. Dashboard → Project
2. **Deployments** tab
3. Click deployment → **Logs**

---

## 💾 PRODUCTION CHECKLIST

Trước deploy, kiểm tra:

- [ ] `.env.example` đã up-to-date
- [ ] `package.json` có tất cả dependencies
- [ ] `npm run build` chạy thành công locally
- [ ] `npm start` chạy thành công locally
- [ ] `.gitignore` bao gồm `node_modules/`, `dist/`, `.env`
- [ ] Không có hardcoded credentials trong code
- [ ] CORS đã setup đúng
- [ ] PORT = 3000 (hoặc environment variable)

---

## 🆘 QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| **Build Failed** | Check `npm run build` locally |
| **App Crashed** | Check Render/Vercel logs |
| **API 404** | Verify API URL env variable |
| **CORS Error** | Add origin to CORS config |
| **Cold Start Slow** | Normal on free tier, use paid for faster |
| **Data Not Loading** | Check network tab, verify API endpoint |

---

## 🎓 NEXT STEPS

1. **Deploy trên Render** (Dễ nhất)
2. **Test tất cả endpoints**
3. **Share URL với team**
4. Sau nếu cần, **tách Frontend lên Vercel**

---

## 📞 URLs sau deployment:

```
Render (Fullstack):
https://job-search-app.onrender.com
├── Frontend: https://job-search-app.onrender.com
└── Backend API: https://job-search-app.onrender.com/api/*

Vercel + Render (Split):
Frontend: https://job-search-app.vercel.app
Backend:  https://job-search-api.onrender.com
```

**Bạn muốn deploy ngay bây giờ không? 🚀**
