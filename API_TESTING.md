# API Testing Guide

## Hướng Dẫn Kiểm Thử API

### Công cụ Cần Thiết
- **Postman** (https://www.postman.com)
- **curl** (included in most systems)
- **VS Code REST Client** extension

---

## Base URL
```
http://localhost:3000/api
```

---

## API Endpoints

### 1. Get All Jobs
**Request:**
```
GET /api/jobs
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Frontend Intern",
    "company": "TechStarter",
    "location": "Hà Nội",
    "type": "Thực tập",
    "description": "...",
    "requirements": "...",
    "benefits": "..."
  }
]
```

**cURL:**
```bash
curl http://localhost:3000/api/jobs
```

---

### 2. Get Job by ID
**Request:**
```
GET /api/jobs/:id
```

**Example:**
```
GET /api/jobs/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Frontend Intern",
  "company": "TechStarter",
  ...
}
```

**cURL:**
```bash
curl http://localhost:3000/api/jobs/1
```

---

### 3. Search Jobs
**Request:**
```
GET /api/search?q=keyword
```

**Example:**
```
GET /api/search?q=React
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Frontend Intern",
    ...
  }
]
```

**cURL:**
```bash
curl "http://localhost:3000/api/search?q=React"
```

---

### 4. Get Jobs by Location
**Request:**
```
GET /api/location/:location
```

**Example:**
```
GET /api/location/Hà%20Nội
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Frontend Intern",
    "location": "Hà Nội",
    ...
  }
]
```

**cURL:**
```bash
curl "http://localhost:3000/api/location/Hà%20Nội"
```

---

### 5. Get Jobs by Type
**Request:**
```
GET /api/type/:type
```

**Example:**
```
GET /api/type/Thực%20tập
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Frontend Intern",
    "type": "Thực tập",
    ...
  }
]
```

**cURL:**
```bash
curl "http://localhost:3000/api/type/Thực%20tập"
```

---

### 6. Get All Locations
**Request:**
```
GET /api/locations
```

**Response:**
```json
[
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Remote"
]
```

**cURL:**
```bash
curl http://localhost:3000/api/locations
```

---

### 7. Get All Types
**Request:**
```
GET /api/types
```

**Response:**
```json
[
  "Thực tập",
  "Bán thời gian",
  "Remote",
  "Toàn thời gian"
]
```

**cURL:**
```bash
curl http://localhost:3000/api/types
```

---

### 8. Filter Jobs (POST)
**Request:**
```
POST /api/filter
Content-Type: application/json

{
  "location": "Hà Nội",
  "type": "Thực tập"
}
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Frontend Intern",
    "location": "Hà Nội",
    "type": "Thực tập",
    ...
  }
]
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/filter \
  -H "Content-Type: application/json" \
  -d '{"location":"Hà Nội","type":"Thực tập"}'
```

---

## Testing Workflow

### Step 1: Start Backend
```bash
npm run server
```

### Step 2: Test Each Endpoint
Use curl or Postman to test each endpoint

### Step 3: Verify Responses
Check the response format and data

### Step 4: Test Frontend Integration
Run `npm run dev` and verify data displays correctly

---

## Postman Collection

### Import Steps:
1. Open Postman
2. Click "New" → "Collection"
3. Add requests for each endpoint

### Example Request:
```
Name: Get All Jobs
Method: GET
URL: http://localhost:3000/api/jobs
```

---

## Common Testing Scenarios

### Scenario 1: Find Frontend Jobs
```bash
curl "http://localhost:3000/api/search?q=Frontend"
```

### Scenario 2: Find Jobs in Hà Nội
```bash
curl "http://localhost:3000/api/location/Hà%20Nội"
```

### Scenario 3: Find Internship Positions
```bash
curl "http://localhost:3000/api/type/Thực%20tập"
```

### Scenario 4: Complex Filter
```bash
curl -X POST http://localhost:3000/api/filter \
  -H "Content-Type: application/json" \
  -d '{
    "location": "Hồ Chí Minh",
    "type": "Bán thời gian"
  }'
```

---

## Troubleshooting

### Error: Cannot GET /api/jobs
- Backend is not running
- Check port 3000 is available
- Run `npm run server`

### Error: Connection refused
- Backend server is down
- Network connectivity issue
- Check firewall settings

### CORS Error
- Make sure backend has CORS enabled
- Check `server.js` has `app.use(cors())`

### Empty Response
- API endpoint might not exist
- Check spelling and parameters
- Verify job data exists

---

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Server Error |

---

## Frontend Integration

### Using Fetch API
```javascript
// Get all jobs
fetch('/api/jobs')
  .then(res => res.json())
  .then(data => console.log(data))
```

### Using jobsAPI Utility
```javascript
import { jobsAPI } from './utils/api.js'

// Get all jobs
const jobs = await jobsAPI.getAllJobs()

// Search jobs
const results = await jobsAPI.searchJobs('React')
```

---

**Happy Testing!** ✅
