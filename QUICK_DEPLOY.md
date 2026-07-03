# ⚡ QUICK DEPLOY (5 PHÚT)

## 🎯 Phương án nhanh nhất: Deploy fullstack trên Render

### Step 1: GitHub (2 phút)

```bash
cd d:\MyProject\Job
git add .
git commit -m "Deploy to Render"
git push origin main
```

### Step 2: Render (3 phút)

1. Vào [render.com](https://render.com) → Login GitHub
2. Click **"New +"** → **"Web Service"**
3. Chọn repository: `MyProject/Job` hoặc `Job`
4. Điền thông tin:
   ```
   Name: job-search-app
   Branch: main
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
5. Click **"Advanced"** → Add Variables:
   ```
   PORT = 3000
   NODE_ENV = production
   ```
6. Click **"Create Web Service"** ✅

### Done! 🎉

**URL:** `https://job-search-app.onrender.com`

---

## 🔵 Alternative: Tách Frontend (Vercel) + Backend (Render)

### Frontend - Vercel (2 phút)

1. Vào [vercel.com](https://vercel.com) → Login GitHub
2. Click **"Add New"** → **"Project"**
3. Chọn repo `MyProject/Job`
4. Framework: `Vite`
5. Build: `npm run build` (auto-detect)
6. Output: `dist` (auto-detect)
7. Env var:
   ```
   VITE_API_URL = https://job-search-api.onrender.com
   ```
8. Click **"Deploy"** ✅

**URL:** `https://job-search-app.vercel.app`

### Backend - Render (3 phút)

Làm theo **Step 2: Render** ở trên

**URL:** `https://job-search-api.onrender.com`

---

## ✅ TEST DEPLOYMENT

```bash
# Test Frontend
https://job-search-app.onrender.com  (hoặc .vercel.app)

# Test Backend
curl https://job-search-app.onrender.com/api/jobs

# Test Search
curl "https://job-search-app.onrender.com/api/search?q=frontend"
```

---

## 🆘 Lỗi thường gặp

| Lỗi | Giải pháp |
|-----|----------|
| Build Failed | Chạy `npm run build` locally trước |
| App Crashed | Xem logs trên Render Dashboard |
| 404 Not Found | Kiểm tra URL API environment variable |
| CORS Error | Thêm origin vào `server.js` |

---

## 📝 Notes

- **First deployment:** Render có thể mất 5-10 phút
- **Kỳ tiếp theo:** Auto-deploy khi push (auto-detect GitHub)
- **Logs:** Xem real-time trên Dashboard
- **API Response:** ~31 jobs từ Remotive API

**Ready? Let's deploy! 🚀**
