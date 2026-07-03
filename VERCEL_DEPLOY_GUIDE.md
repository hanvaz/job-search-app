# 🔵 DEPLOY FRONTEND TRÊN VERCEL (Step-by-Step)

## ✅ Status

- ✅ Backend CORS updated (Vercel URL added)
- ✅ Code pushed to GitHub
- ✅ .env.production ready
- 🔲 Frontend needs to deploy on Vercel

---

## 📋 DEPLOY STEPS (5 phút)

### Step 1: Truy cập Vercel

1. Mở: https://vercel.com
2. Click **"Sign In"** → **"Continue with GitHub"**
3. Authorize if needed

### Step 2: Import Project

1. Click **"Add New"** → **"Project"**
2. Chọn repository: `hanvaz/job-search-app` hoặc `MyProject/Job`
3. Click **"Import"**

### Step 3: Configure Project

**Project Name:**
```
job-search-app
```

**Framework Preset:**
```
Vite (auto-detected ✅)
```

**Root Directory:**
```
./ (root - auto-detected ✅)
```

**Build Command:**
```
npm run build
```
(Should be pre-filled)

**Output Directory:**
```
dist
```
(Should be pre-filled)

**Install Command:**
```
npm install
```
(Default)

---

### Step 4: Environment Variables ⭐ IMPORTANT

1. Scroll down → **"Environment Variables"**
2. Click **"Add"** → 

**Variable 1:**
```
Name:  VITE_API_URL
Value: https://job-search-app-1-node.onrender.com
```

3. Click **"Add"**

**Screenshot:**
```
┌─────────────────────────────────────┐
│ VITE_API_URL                        │
│ https://job-search-app-1-node.o... │
│ [Delete]                            │
└─────────────────────────────────────┘
```

---

### Step 5: Deploy! 

Click **"Deploy"** button (bottom right)

⏳ **Chờ 2-3 phút** để build & deploy...

✅ Khi xong, bạn sẽ thấy:
```
🎉 Congratulations!
Your site is live.
```

**Frontend URL:**
```
https://job-search-app.vercel.app
```

---

## 🧪 TEST DEPLOYMENT

### Test 1: Open Frontend
```
https://job-search-app.vercel.app
```
Should show job list loading

### Test 2: Check Network Tab
1. Open DevTools: F12
2. Go to **Network** tab
3. Refresh page
4. Look for API calls to:
   ```
   https://job-search-app-1-node.onrender.com/api/jobs
   ```
5. Should see **200 OK** response

### Test 3: Search Function
1. Type "react" in search box
2. Check Network → see API call
3. Results should filter

### Test 4: Filter
1. Click location dropdown
2. Select "Remote"
3. Network → see API call to `/api/location/Remote`
4. Should show Remote jobs

### Test 5: Favorites
1. Click ❤️ on a job
2. Open DevTools → **Application** → **LocalStorage**
3. Should see `favorites` key with job IDs
4. Switch to "Favorites" tab
5. Job should appear

---

## 📱 FINAL URLS

```
🎨 Frontend:  https://job-search-app.vercel.app
📡 Backend:   https://job-search-app-1-node.onrender.com
📊 API:       https://job-search-app-1-node.onrender.com/api/jobs
```

---

## 🔄 AUTO-DEPLOY

✅ **Automatic** - Next time you push to main:
```bash
git add .
git commit -m "Update something"
git push origin main
```

Vercel sẽ **tự động build & deploy** (mất ~1-2 phút)

You'll get a notification!

---

## ✅ VERIFICATION CHECKLIST

```
Frontend Vercel:
☐ https://job-search-app.vercel.app loads
☐ Jobs display correctly (~31 jobs)
☐ Search works
☐ Filter by location works
☐ Filter by type works
☐ ❤️ Favorites save/remove
☐ Switch between All/Favorites tabs

Backend Render:
☐ API calls visible in Network tab
☐ All requests to Render return 200 OK
☐ CORS allows Vercel origin

Data Flow:
☐ Frontend (Vercel) → Backend (Render) → Real data
☐ Favorites in localStorage work
☐ No console errors
```

---

## 🆘 TROUBLESHOOTING

### Problem: Build Failed

**Check:**
1. Vercel Dashboard → Deployments tab
2. Click failed deployment → View logs
3. Look for error message

**Common issues:**
- Missing dependencies → run `npm install` locally
- Syntax errors → fix and re-push
- Wrong build command → check Vercel project settings

### Problem: Blank Page / 404

**Solution:**
- Refresh page (Cmd+Shift+R or Ctrl+Shift+R)
- Clear browser cache
- Check build output in Vercel logs

### Problem: CORS Error

**Error in console:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Check if CORS URL in `server.js` includes Vercel URL
2. Verify it matches exactly: `https://job-search-app.vercel.app`
3. If not matching → edit server.js → commit → push
4. Wait for Render auto-deploy (1-2 min)

### Problem: API returns fallback data

**Normal behavior** - Remotive API sometimes timeout
- Check backend console for error
- Data caches for 1 hour
- Try again later

### Problem: Environment variable not working

**Check:**
1. Vercel Dashboard → Settings → Environment Variables
2. Verify `VITE_API_URL` is set correctly
3. Click deployment → **Redeploy** (to use new env vars)

---

## 🎯 DEMO SCRIPT (2 min)

```
1. Open: https://job-search-app.vercel.app
   "Welcome to our Job Search App!"

2. Show jobs loading:
   "Real jobs from Remotive API (~31 jobs)"

3. Search functionality:
   - Type "backend"
   - "See API call to Render backend"
   - "Results filter on frontend"

4. Filter by location:
   - Click location dropdown
   - Select "Remote"
   - "Show Remote jobs only"

5. Show data flow:
   "Frontend on Vercel → API calls to Render → Real data"

6. Data persistence:
   - Click ❤️ on job
   - "Favorite saved to browser storage"
   - Switch to Favorites tab
   - "Job appears here"

7. Summary:
   "Frontend + Backend on different platforms, seamlessly working!"
```

---

## 🚀 NEXT (Optional)

After verifying everything works:

1. **Add domain:**
   - Vercel Dashboard → Settings → Domains
   - Add custom domain

2. **Set up monitoring:**
   - Enable Analytics (Vercel)
   - Enable Metrics (Render)

3. **Optimize:**
   - Add error boundaries
   - Implement error messages
   - Add loading states

---

## 📞 CONTACT INFO

- **Frontend:** https://job-search-app.vercel.app
- **Backend API:** https://job-search-app-1-node.onrender.com
- **GitHub:** https://github.com/hanvaz/job-search-app

---

**Ready to deploy? Let's go! 🚀**

**Next:** Go to vercel.com and follow the steps above!
