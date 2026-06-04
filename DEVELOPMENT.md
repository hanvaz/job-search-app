# Development Guide

## Hướng Dẫn Phát Triển Dự Án

### 📋 Giới Thiệu
Hướng dẫn này dành cho các nhà phát triển muốn đóng góp hoặc tùy chỉnh dự án.

---

## 🏗️ Kiến Trúc Dự Án

### Frontend (React)
```
src/
├── components/        # React components
│   ├── App.jsx       # Main component
│   ├── SearchBar.jsx
│   ├── FilterBar.jsx
│   ├── JobCard.jsx
│   ├── JobList.jsx
│   ├── JobDetail.jsx
│   └── ...
├── utils/            # Helper functions
│   ├── api.js        # API calls
│   └── storage.js    # localStorage
├── styles.css        # Global CSS
└── main.jsx          # Entry point
```

### Backend (Node.js/Express)
```
server.js             # Express server
  ├── Middleware (CORS, JSON)
  ├── Routes (GET, POST)
  └── Error handling
```

---

## 🔧 Project Setup

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create `.env` file (optional):
```
PORT=3000
NODE_ENV=development
```

---

## 📝 Development Workflow

### 1. Frontend Development

**Start Development Server:**
```bash
npm run dev
```

**Create New Component:**
```javascript
// src/components/NewComponent.jsx
export default function NewComponent({ prop1, prop2 }) {
  return (
    <div className="new-component">
      {/* Component JSX */}
    </div>
  )
}
```

**Use Component in App:**
```javascript
import NewComponent from './components/NewComponent'

export default function App() {
  return (
    <div>
      <NewComponent prop1="value" />
    </div>
  )
}
```

### 2. Backend Development

**Start Server:**
```bash
npm run server
```

**Add New Route:**
```javascript
// server.js
app.get('/api/new-endpoint', (req, res) => {
  try {
    // Your logic here
    res.json({ data: 'response' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
```

### 3. Styling

**Use CSS Variables:**
```css
.my-element {
  background-color: var(--primary-color);
  color: var(--text-dark);
  box-shadow: var(--shadow-md);
}
```

**Available Variables:**
- `--primary-color`: #3b82f6
- `--primary-dark`: #2563eb
- `--text-dark`: #1f2937
- `--text-light`: #6b7280
- `--bg-light`: #f9fafb
- `--bg-white`: #ffffff
- `--border-color`: #e5e7eb
- `--shadow-sm/md/lg`: Box shadows

---

## 🧪 Testing

### Manual Testing
1. Start both server and frontend
2. Test each feature manually
3. Check browser console for errors
4. Test on different screen sizes

### API Testing
See `API_TESTING.md` for detailed API testing guide

---

## 📦 Data Structure

### Job Object
```javascript
{
  id: number,           // Unique identifier
  title: string,        // Job title
  company: string,      // Company name
  location: string,     // Job location
  type: string,         // Job type
  description: string,  // Job description
  requirements: string, // Requirements
  benefits: string      // Benefits
}
```

---

## 🔄 State Management

### Frontend State (App.jsx)
```javascript
const [search, setSearch] = useState('')
const [location, setLocation] = useState('Tất cả')
const [type, setType] = useState('Tất cả')
const [jobs, setJobs] = useState([])
const [favorites, setFavorites] = useState([])
const [selectedJob, setSelectedJob] = useState(null)
```

### LocalStorage Integration
```javascript
// Save favorites
localStorage.setItem('favorites', JSON.stringify(favorites))

// Load favorites
const saved = localStorage.getItem('favorites')
const favorites = saved ? JSON.parse(saved) : []
```

---

## 🚀 Adding New Features

### Example: Add Job Posting

**Backend Route (server.js):**
```javascript
let jobId = jobs.length + 1

app.post('/api/jobs', (req, res) => {
  const { title, company, location, type, description } = req.body
  
  const newJob = {
    id: jobId++,
    title, company, location, type, description,
    requirements: '', benefits: ''
  }
  
  jobs.push(newJob)
  res.status(201).json(newJob)
})
```

**Frontend Component:**
```javascript
const [formData, setFormData] = useState({
  title: '', company: '', location: '', type: '', description: ''
})

const handleSubmit = async (e) => {
  e.preventDefault()
  
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  
  const data = await response.json()
  setJobs([...jobs, data])
  setFormData({ title: '', company: '', location: '', type: '', description: '' })
}
```

---

## 🛠️ Common Tasks

### Add Filter Option
1. Update filter data in App.jsx
2. Add filter option to FilterBar component
3. Update filter logic in useMemo hook
4. Add backend route if needed

### Add New API Route
1. Create route in server.js
2. Test with curl/Postman
3. Create utility function in utils/api.js
4. Use in frontend component

### Update Styling
1. Modify src/styles.css
2. Use CSS variables for consistency
3. Test responsive design
4. Check all browsers

---

## 🐛 Debugging Tips

### Frontend Debugging
```javascript
// Console logging
console.log('Data:', jobs)

// React DevTools
// Install React DevTools extension

// Browser DevTools (F12)
// - Console tab
// - Network tab
// - Elements tab
```

### Backend Debugging
```javascript
// Console logging
console.log('Received:', req.body)

// Check routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})
```

---

## 📚 Code Style

### Component Naming
- Use PascalCase for components: `MyComponent.jsx`
- Use camelCase for functions: `myFunction()`
- Use UPPER_SNAKE_CASE for constants: `MAX_JOBS = 100`

### File Organization
- One component per file
- Group related utilities in folders
- Keep styles close to components if possible

### Comments
```javascript
// Use meaningful comments
// Explain WHY, not WHAT

// Good
// Filter out inactive jobs before display
const activeJobs = jobs.filter(job => job.active)

// Bad
// Loop through jobs
const activeJobs = jobs.filter(job => job.active)
```

---

## 🚀 Performance Optimization

### Frontend
- Use `useMemo` for expensive calculations
- Lazy load components if needed
- Optimize images and assets
- Use debouncing for search

### Backend
- Add caching for frequent requests
- Use pagination for large datasets
- Optimize database queries (when using DB)
- Add rate limiting

---

## 🔒 Security

### Best Practices
- Never commit `.env` files
- Validate input on backend
- Use HTTPS in production
- Sanitize user input
- Keep dependencies updated

### Update Dependencies
```bash
npm outdated           # Check outdated packages
npm update            # Update packages
npm audit             # Check vulnerabilities
npm audit fix         # Fix vulnerabilities
```

---

## 📈 Deployment

### Build for Production
```bash
npm run build
```

### Frontend Deployment
- Push `dist/` to Netlify/Vercel/GitHub Pages
- Set environment variables on platform

### Backend Deployment
- Deploy to Heroku/Railway/AWS
- Set up environment variables
- Configure database if needed

---

## 📞 Contributing

### Before Making Changes
1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes
3. Test thoroughly
4. Create pull request

### Commit Message Format
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Change styling
refactor: Refactor code
test: Add tests
```

---

## 📖 Resources

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [Vite Docs](https://vitejs.dev)
- [JavaScript MDN](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)

---

## ❓ FAQ

**Q: How do I add a new job field?**
A: Update the job data structure in server.js, add to UI component, and update styles.

**Q: How do I change the API endpoint?**
A: Update `fetchJobs()` URL in App.jsx and proxy in vite.config.js

**Q: How do I deploy this?**
A: See deployment section in README.md

---

**Happy Developing!** 🎉
