# 🎬 Testing & Demo - Deployed Backend

## ✅ Backend URL

```
https://job-search-app-1-node.onrender.com
```

---

## 🧪 TEST 1: Browser - Visit Endpoints Directly

### Test 1.1: Check Server Status
```
https://job-search-app-1-node.onrender.com
```
**Kỳ vọng:** JSON response với API info

### Test 1.2: Get All Jobs
```
https://job-search-app-1-node.onrender.com/api/jobs
```
**Kỳ vọng:** Array của ~31 jobs từ Remotive API

### Test 1.3: Search Jobs
```
https://job-search-app-1-node.onrender.com/api/search?q=frontend
```
**Kỳ vọng:** Jobs có chứa "frontend"

### Test 1.4: Filter by Location
```
https://job-search-app-1-node.onrender.com/api/location/Remote
```
**Kỳ vọng:** Tất cả Remote jobs

### Test 1.5: Filter by Type
```
https://job-search-app-1-node.onrender.com/api/type/Remote
```
**Kỳ vọng:** Jobs với type = Remote

### Test 1.6: Get Unique Locations
```
https://job-search-app-1-node.onrender.com/api/locations
```
**Kỳ vọng:** ["Remote", "Hà Nội", "Hồ Chí Minh", ...]

---

## 🔗 TEST 2: PowerShell - API Testing

### Test All Endpoints
```powershell
# Test 1: Server status
Invoke-WebRequest -Uri "https://job-search-app-1-node.onrender.com/" -UseBasicParsing | Select-Object -ExpandProperty Content

# Test 2: Get all jobs (first 5)
(Invoke-WebRequest -Uri "https://job-search-app-1-node.onrender.com/api/jobs" -UseBasicParsing | ConvertFrom-Json)[0..4]

# Test 3: Search
Invoke-WebRequest -Uri "https://job-search-app-1-node.onrender.com/api/search?q=backend" -UseBasicParsing | ConvertFrom-Json

# Test 4: Get locations
Invoke-WebRequest -Uri "https://job-search-app-1-node.onrender.com/api/locations" -UseBasicParsing | ConvertFrom-Json
```

---

## 🎨 TEST 3: Connect Frontend locally

### Step 1: Update `.env.local` (create if not exists)

```bash
cd d:\MyProject\Job
```

Create file: `.env.local`
```
VITE_API_URL=https://job-search-app-1-node.onrender.com
```

### Step 2: Update `src/App.jsx`

Thêm dòng này ở đầu file:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Then in useEffect, replace:
// const response = await fetch('/api/jobs');
// With:
const response = await fetch(`${API_URL}/api/jobs`);
```

### Step 3: Start Frontend Dev Server

```bash
npm run dev
```

Mở: `http://localhost:5173`

✅ Frontend seharusnya ngayon tìm nạp dữ liệu từ Render backend!

---

## 📊 DEMO FLOW

### Scenario 1: Show All Jobs
1. Browser: `https://job-search-app-1-node.onrender.com/api/jobs`
2. Hiển thị 31 jobs từ Remotive

### Scenario 2: Live Search
1. Frontend (localhost:5173) → Search "React"
2. API call đến Render backend
3. Backend trả về React-related jobs

### Scenario 3: Filter
1. Frontend → Select "Remote" location
2. API: `https://job-search-app-1-node.onrender.com/api/location/Remote`
3. Hiển thị chỉ Remote jobs

### Scenario 4: Save Favorites
1. Click heart icon trên job card
2. Lưu vào localStorage
3. Switch sang "Favorites" tab

---

## ✅ CHECKLIST TEST

- [ ] **Server Status**: `https://job-search-app-1-node.onrender.com` → JSON response
- [ ] **Jobs**: `/api/jobs` → 31 jobs
- [ ] **Search**: `/api/search?q=frontend` → filtered results
- [ ] **Locations**: `/api/locations` → array của locations
- [ ] **Frontend**: `http://localhost:5173` → loads jobs
- [ ] **Search in Frontend**: Type "backend" → works
- [ ] **Filter in Frontend**: Select location → works
- [ ] **Favorites**: Save/remove favorites → works

---

## 🎯 DEMO SCRIPT (5 phút)

```
1. Mở 2 browser tabs:
   - Tab 1: https://job-search-app-1-node.onrender.com/api/jobs (31 jobs)
   - Tab 2: http://localhost:5173 (Frontend)

2. Frontend demo:
   a) Show job list loading từ Render API
   b) Search "React" → shows filtered results
   c) Filter by "Remote" → shows Remote jobs only
   d) Click heart → save favorite
   e) Switch to "Favorites" tab → shows saved jobs

3. Show data flow:
   - Frontend (localhost:5173) → 
   - API call → 
   - Render backend (onrender.com) → 
   - Remotive API (external) → 
   - Response back
```

---

## 🔍 TROUBLESHOOTING

### Problem: 503 Service Unavailable
**Solution:** Render free tier "spins down" inactive apps
- Nếu backend nằm im > 15 phút → ngủ
- Khi truy cập → "cold start" mất ~30 giây
- Fix: Upgrade to paid tier

### Problem: CORS Error in Frontend
**Solution:** Thêm vào `server.js`:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://job-search-app-1-node.onrender.com'
  ]
};
app.use(cors(corsOptions));
```

### Problem: Fallback Data instead of Remotive
**Solution:** Remotive API có thể timeout
- Data sẽ cache 1 giờ
- Fallback data sẽ hiển thị nếu API fail
- Bình thường lại sẽ lấy từ Remotive

---

## 📱 FINAL URLS

```
Backend API:  https://job-search-app-1-node.onrender.com
Frontend Dev: http://localhost:5173

Test job search:
https://job-search-app-1-node.onrender.com/api/search?q=react
```

---

## 🚀 NEXT: Deploy Frontend

Khi demo xong, deploy Frontend lên **Vercel**:
1. Vào [vercel.com](https://vercel.com)
2. Import repo
3. Env var: `VITE_API_URL=https://job-search-app-1-node.onrender.com`
4. Deploy!

**Frontend URL:** `https://job-search-app.vercel.app`

---

Ready to test? 🎯
