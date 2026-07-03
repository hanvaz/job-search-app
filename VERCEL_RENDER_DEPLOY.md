# 🚀 Deploy Frontend trên Vercel + Backend trên Render

## ✅ Hiện tại bạn có:

- ✅ **Backend:** `https://job-search-app-1-node.onrender.com` (Render)
- 🔲 **Frontend:** Cần deploy lên Vercel

---

## 📋 PLAN

```
Vercel:  https://job-search-app.vercel.app (Frontend React)
  ↓ (API calls)
Render:  https://job-search-app-1-node.onrender.com (Backend)
  ↓ (fetches data)
Remotive: Real job listings
```

---

## 🔧 STEP 1: Update Backend CORS (Render)

### File: `server.js` - Update CORS

Thêm Vercel URL vào CORS whitelist:

```javascript
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ... other imports ...

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://job-search-app.vercel.app',  // ← Thêm dòng này
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

### Commit & Push

```bash
git add server.js
git commit -m "chore: Add Vercel URL to CORS whitelist"
git push origin main
```

Render sẽ **tự động deploy** (mất ~1-2 phút)

---

## 🎨 STEP 2: Frontend - Add Environment Variables

### File: `.env.production`

Create new file: `d:\MyProject\Job\.env.production`

```
VITE_API_URL=https://job-search-app-1-node.onrender.com
```

### Keep `.env.local` cho development

```
VITE_API_URL=https://job-search-app-1-node.onrender.com
```

(Nếu muốn test locally với deployed backend)

### Verify `src/App.jsx` đã update

Check file có dòng này không:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

✅ Đã update!

---

## 📤 STEP 3: Commit & Push to GitHub

```bash
cd d:\MyProject\Job

# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "feat: Configure for split deployment - Vercel + Render"

# Push
git push origin main
```

**Output mong đợi:**
```
To github.com:YourUsername/MyProject.git
   xxxxx..yyyyy main -> main
```

---

## 🔵 STEP 4: Deploy Frontend trên Vercel

### 4.1: Truy cập Vercel

1. Vào [vercel.com](https://vercel.com)
2. Login bằng GitHub
3. Click **"Add New..."** → **"Project"**

### 4.2: Import Repository

1. Tìm repository: `MyProject` hoặc `Job`
2. Click **"Import"**

### 4.3: Configure Project

**Project Name:** 
```
job-search-app
```

**Framework:** 
```
Vite (auto-detected)
```

**Root Directory:** 
```
./ (root)
```

**Build Command:** 
```
npm run build
```
(Should auto-detect)

**Output Directory:** 
```
dist
```
(Should auto-detect)

### 4.4: Environment Variables

Click **"Environment Variables"** hoặc scroll down

**Add Variable:**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://job-search-app-1-node.onrender.com` |

Click **"Add"**

### 4.5: Deploy

Click **"Deploy"**

⏳ **Chờ 2-3 phút** cho build & deployment hoàn tất

✅ Khi xong: **"Congratulations! Your site is live"**

**Frontend URL:** `https://job-search-app.vercel.app`

---

## 🧪 STEP 5: Test Deployment

### Test 1: Frontend Status
```
https://job-search-app.vercel.app
```
**Kỳ vọng:** React app loads, shows jobs list

### Test 2: API Connection
```
Open DevTools (F12) → Network tab
→ Watch for API calls to https://job-search-app-1-node.onrender.com/api/jobs
```
**Kỳ vọng:** 200 OK response

### Test 3: Search Function
1. Type "React" in search
2. Check Network → see API call
3. Results should filter

### Test 4: Filter
1. Select "Remote" in location
2. Check API call
3. Should show Remote jobs only

### Test 5: Favorites
1. Click ❤️ on a job
2. Switch to "Favorites" tab
3. Job should appear (localStorage)

---

## ✅ DEPLOYMENT CHECKLIST

```
Backend (Render):
☐ https://job-search-app-1-node.onrender.com/ → responds
☐ /api/jobs → returns 31 jobs
☐ CORS allows vercel.app origin

Frontend (Vercel):
☐ https://job-search-app.vercel.app → loads
☐ Jobs display correctly
☐ Search works
☐ Filter works
☐ Favorites work
☐ Network calls go to Render

Environment Variables:
☐ Vercel: VITE_API_URL set correctly
☐ .env.production exists locally
☐ .env.local exists for dev testing
```

---

## 📊 FINAL URLS

```
Frontend:  https://job-search-app.vercel.app
Backend:   https://job-search-app-1-node.onrender.com

API Endpoints:
- https://job-search-app-1-node.onrender.com/api/jobs
- https://job-search-app-1-node.onrender.com/api/search?q=...
- https://job-search-app-1-node.onrender.com/api/location/Remote
```

---

## 🔄 AUTO-DEPLOY SETTINGS

### Vercel (Automatic)
✅ Mặc định tự động deploy khi push to main

**Để disable:**
- Project Settings → Git → uncheck "Auto-deploy"

### Render (Automatic)
✅ Mặc định tự động deploy khi push to main

**Để disable:**
- Dashboard → Settings → uncheck "Auto-deploy"

---

## 🎯 TROUBLESHOOTING

### Problem: 404 Not Found on Vercel
**Solution:** 
- Check if build succeeded (Logs tab)
- Verify environment variables set
- Rebuild: Vercel Dashboard → Deployments → Redeploy

### Problem: CORS Error
**Solution:**
- Update CORS in `server.js` với Vercel URL
- Commit & push
- Wait for Render auto-deploy (1-2 min)

### Problem: Frontend shows fallback data
**Solution:**
- Check `/api/jobs` endpoint manually
- If slow, Remotive API might be timing out
- Data caches 1 hour
- Try again later

### Problem: Search not working
**Solution:**
- Open DevTools Network tab
- Check if API call returns results
- Verify VITE_API_URL environment variable

---

## 🚀 NEXT STEPS

After deployment:

1. **Share URLs with team:**
   ```
   Live App: https://job-search-app.vercel.app
   API Docs: https://job-search-app-1-node.onrender.com
   ```

2. **Monitor performance:**
   - Vercel Analytics (auto-enabled)
   - Render metrics

3. **Optional improvements:**
   - Add error boundaries
   - Implement loading states
   - Add toast notifications
   - Database for favorites (instead of localStorage)

---

## 📝 COMMANDS SUMMARY

```bash
# 1. Update backend CORS
# Edit server.js → add Vercel URL to corsOptions.origin

# 2. Create .env.production
echo "VITE_API_URL=https://job-search-app-1-node.onrender.com" > .env.production

# 3. Commit & push
git add .
git commit -m "Deploy: Frontend on Vercel, Backend on Render"
git push origin main

# 4. Deploy Frontend
# → Vercel Dashboard → Import project → Add env var → Deploy

# 5. Test
# → https://job-search-app.vercel.app
```

---

**Ready? Let's deploy! 🎉**
