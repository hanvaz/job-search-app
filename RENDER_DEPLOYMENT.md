# Hướng dẫn Deploy lên Render

## 📋 Yêu cầu

- GitHub account (repository của project)
- Render account (render.com)

## 🚀 Các bước Deploy

### Step 1: Chuẩn bị Repository

1. **Commit tất cả changes:**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Tạo `.gitignore` (nếu chưa có):**
   ```
   node_modules/
   dist/
   .env
   .DS_Store
   *.log
   ```

### Step 2: Tạo Account Render

1. Truy cập [render.com](https://render.com)
2. Đăng ký / Đăng nhập bằng GitHub
3. Click "New +" → "Web Service"

### Step 3: Kết nối Repository

1. Chọn GitHub repository của bạn
2. Chọn branch (thường là `main` hoặc `master`)
3. Đặt tên cho app (ví dụ: `job-search-app`)

### Step 4: Cấu hình Build & Start Command

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

### Step 5: Thiết lập Environment Variables

1. Scroll xuống phần "Environment Variables"
2. Thêm các biến sau:

| Key | Value |
|-----|-------|
| `PORT` | `3000` |
| `NODE_ENV` | `production` |

3. Click "Create Web Service"

### Step 6: Chờ Deploy

- Render sẽ tự động build & deploy app
- Quá trình này thường mất 2-5 phút
- Bạn sẽ thấy logs trong real-time
- Khi xong, bạn sẽ nhận được URL public

## ✅ Kiểm tra Deployment

1. Truy cập URL công khai (ví dụ: `https://job-search-app.onrender.com`)
2. Test các endpoint:
   - `GET /` - Kiểm tra server
   - `GET /api/jobs` - Lấy danh sách công việc
   - `GET /api/search?q=frontend` - Tìm kiếm

## 🔧 Troubleshooting

### Lỗi: Build Failed

**Kiểm tra:**
- Đã commit `.env` không? (Không nên commit .env)
- Package.json có cú pháp JSON đúng không?
- Tất cả dependencies đã được install locally không?

### Lỗi: App Crash After Deploy

**Kiểm tra logs trên Render:**
1. Dashboard → Service name → Logs
2. Tìm dòng lỗi và sửa

### Lỗi: API không trả dữ liệu

- Kiểm tra Remotive API có hoạt động không: `https://remotive.com/api/remote-jobs`
- Fallback data nên hiển thị nếu API bị lỗi

## 📝 Script Tự động Build & Deploy

Bạn có thể tạo `.github/workflows/deploy.yml` để tự động deploy khi push:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Trigger Render build
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

## 🎯 URL Deployment

Sau khi deploy thành công, bạn sẽ có URL công khai như:
- `https://job-search-app.onrender.com`
- Frontend React sẽ được serve từ `/dist`
- API endpoints sẽ ở `/api/*`

## 📚 Tài liệu Tham Khảo

- [Render Docs](https://render.com/docs)
- [Express.js](https://expressjs.com)
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
