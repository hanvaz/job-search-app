# 🎬 QUICK TEST - Deployed Backend

## 🎯 Backend URL
```
https://job-search-app-1-node.onrender.com
```

---

## 🧪 TEST 1: Browser - Direct Test (No Setup Required)

Copy-paste những URL này vào browser:

### ✅ Test 1: Server Status
```
https://job-search-app-1-node.onrender.com/
```
**Expected:** JSON với API info

### ✅ Test 2: Get All Jobs
```
https://job-search-app-1-node.onrender.com/api/jobs
```
**Expected:** 31 jobs array

### ✅ Test 3: Search Frontend Jobs
```
https://job-search-app-1-node.onrender.com/api/search?q=frontend
```
**Expected:** Filtered jobs

### ✅ Test 4: Get Remote Jobs
```
https://job-search-app-1-node.onrender.com/api/location/Remote
```
**Expected:** Remote jobs only

---

## 🎨 TEST 2: Frontend + Deployed Backend (1 minute)

### Step 1: Kiểm tra .env.local tồn tại

**File:** `d:\MyProject\Job\.env.local`
```
VITE_API_URL=https://job-search-app-1-node.onrender.com
```

✅ File đã tạo!

### Step 2: Start Frontend Dev Server

```bash
cd d:\MyProject\Job
npm run dev
```

Mở: `http://localhost:5173`

### Step 3: Demo Features

1. **Xem jobs từ Render API:**
   - Frontend tải từ `https://job-search-app-1-node.onrender.com/api/jobs`
   - Hiển thị ~31 jobs

2. **Search:**
   - Type "react" → API truy vấn Render backend
   - Kết quả hiển thị

3. **Filter:**
   - Click location filter
   - API: `/api/location/Remote`
   - Chỉ hiển thị Remote jobs

4. **Favorites:**
   - Click ❤️ icon → Save to localStorage
   - Switch to "Favorites" tab
   - Xem saved jobs

---

## ✨ DEMO FLOW (2 phút)

### Demo 1: Live API Test
```
1. Browser tab 1: https://job-search-app-1-node.onrender.com/api/jobs
   → Show 31 jobs từ Remotive API
   
2. Browser tab 2: https://job-search-app-1-node.onrender.com/api/search?q=backend
   → Show filtered results (Backend jobs)
```

### Demo 2: Frontend Integration
```
1. localhost:5173 → Shows all jobs loading from Render
2. Search "React" → Frontend queries Render backend
3. Filter "Remote" → Shows Remote-only jobs
4. Heart icon → Save favorite
5. Switch to "Favorites" tab → Shows saved jobs
```

### Demo 3: Data Flow (Show the Magic 🎯)
```
User Action (Frontend @ localhost:5173)
    ↓
API Call to Render Backend (job-search-app-1-node.onrender.com)
    ↓
Render Backend calls Remotive API
    ↓
Real jobs data returned
    ↓
Frontend displays results
```

---

## 🎤 TALKING POINTS

**"Here's what's happening:"**

1. **Frontend** chạy locally (localhost:5173)
2. **Backend API** deployed trên Render (onrender.com)
3. **Jobs Data** từ Remotive API (real, external)
4. **Favorites** saved locally (localStorage)

**"Benefits:"**
- ✅ Real job data từ Remotive
- ✅ Caching (1 giờ) cho performance
- ✅ Production-ready deployment
- ✅ Scalable architecture

---

## 📊 TEST CHECKLIST

```
Server Health:
☐ https://job-search-app-1-node.onrender.com → 200 OK

API Endpoints:
☐ /api/jobs → 31 jobs
☐ /api/search?q=test → filtered results
☐ /api/location/Remote → Remote jobs
☐ /api/locations → array of locations

Frontend @ localhost:5173:
☐ Loads jobs successfully
☐ Search works
☐ Filter works
☐ Favorites save/remove works
☐ Tab switching works
```

---

## 🆘 QUICK FIX

### Frontend stuck loading?
```bash
# Kill old process
npm run dev  # Ctrl+C then restart

# OR clear browser cache:
# DevTools → Application → Clear all
```

### API returns fallback data?
- Normal! Remotive API sometimes timeout
- Data cached for 1 hour
- Next request will work

### 503 Error?
- Render free tier spins down after 15 min of inactivity
- Cold start ~30 seconds
- Wait and retry

---

## 🚀 NEXT STEPS

1. **Test locally** with deployed backend ✅
2. **Deploy frontend to Vercel** (optional)
3. **Share demo URL**

---

**Ready to test? Open `http://localhost:5173` and see the magic! ✨**
