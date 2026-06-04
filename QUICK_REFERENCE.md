# Developer Quick Reference Guide

## 🎯 Find What You Need to Edit

### I want to...

#### CHANGE THE LOOK & FEEL

**Add/modify colors**
→ Edit: `src/styles.css` (lines 1-30, :root variables)
```css
--primary-color: #3b82f6
--text-dark: #1f2937
```

**Change layout**
→ Edit: `src/styles.css` (Grid, Flexbox sections)

**Add new component styling**
→ Edit: `src/styles.css` (add new CSS classes)

**Modify header appearance**
→ Edit: `src/components/Header.jsx` + `src/styles.css` (.header styles)

#### ADD NEW FUNCTIONALITY

**Add a new React component**
→ Create: `src/components/MyComponent.jsx`
→ Import in: `src/App.jsx`

**Add a new API route**
→ Edit: `server.js` (add new `app.get()` or `app.post()`)

**Add utility functions**
→ Create: `src/utils/myUtil.js`
→ Import where needed

**Store data in browser**
→ Use: `src/utils/storage.js`
→ Example: `storageUtils.saveFavorites(favorites)`

#### MODIFY DATA

**Add more job listings**
→ Edit: `server.js` (jobs array, add to list)

**Change job fields**
→ Edit: `server.js` (job object structure)
→ Edit: `src/components/JobCard.jsx` (display)
→ Edit: `src/components/JobDetail.jsx` (details modal)

**Change filter options**
→ Edit: `src/App.jsx` (locations, types arrays)
→ Edit: `server.js` (job data)

#### CUSTOMIZE BEHAVIOR

**Modify search logic**
→ Edit: `src/App.jsx` (filteredJobs useMemo hook)

**Change API endpoints**
→ Edit: `server.js` (routes)
→ Edit: `src/App.jsx` (fetch calls)
→ Edit: `src/utils/api.js` (API functions)

**Customize localStorage**
→ Edit: `src/utils/storage.js`

---

## 📍 File Location Guide

### React Components
`src/components/`
- SearchBar.jsx - Search input
- FilterBar.jsx - Filters
- JobCard.jsx - Job card
- JobList.jsx - Job list
- JobDetail.jsx - Job modal
- FavoritesTab.jsx - Favorites
- Header.jsx - Header
- Footer.jsx - Footer
- Others...

### Backend
- `server.js` - Express server & data

### Styling
- `src/styles.css` - All CSS

### Utilities
`src/utils/`
- `api.js` - API calls
- `storage.js` - localStorage

### Entry Points
- `index.html` - HTML entry
- `src/main.jsx` - React entry
- `src/App.jsx` - Main component

### Configuration
- `vite.config.js` - Build config
- `package.json` - Dependencies
- `.env.example` - Env template

---

## 🔄 Common Tasks

### Add a new job field

1. Update job structure in `server.js`:
```javascript
{
  id: 1,
  title: '...',
  newField: 'value'  // Add here
}
```

2. Display in `JobCard.jsx`:
```javascript
<p className="new-field">{job.newField}</p>
```

3. Show in `JobDetail.jsx`:
```javascript
<div className="detail-row">
  <label>New Field:</label>
  <p>{job.newField}</p>
</div>
```

4. Add styling in `styles.css`:
```css
.new-field {
  color: var(--text-light);
}
```

### Add a new filter option

1. Update in `src/App.jsx`:
```javascript
const [newFilter, setNewFilter] = useState('All')
const [newFilters] = useState(['All', 'Option1', 'Option2'])
```

2. Add to `FilterBar.jsx`:
```javascript
<select value={newFilter} onChange={(e) => onNewFilterChange(e.target.value)}>
  {newFilters.map(item => <option key={item}>{item}</option>)}
</select>
```

3. Update filtering logic in `App.jsx`:
```javascript
const filteredJobs = useMemo(() => {
  return jobs.filter(job => {
    const matchNewFilter = newFilter === 'All' || job.field === newFilter
    return matchNewFilter && otherFilters
  })
}, [jobs, newFilter, otherFilters])
```

### Add a new API endpoint

1. In `server.js`:
```javascript
app.get('/api/new-endpoint', (req, res) => {
  try {
    const result = doSomething()
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
```

2. In `src/utils/api.js`:
```javascript
newEndpoint: async () => {
  const response = await fetch('/api/new-endpoint')
  if (!response.ok) throw new Error('Failed')
  return response.json()
}
```

3. Use in component:
```javascript
import { jobsAPI } from './utils/api'

const data = await jobsAPI.newEndpoint()
```

---

## 🐛 Debugging Quick Tips

### Frontend Issues
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls
- Check Elements tab for DOM

### Backend Issues
- Check terminal for error messages
- Add console.log to routes
- Test endpoints with curl/Postman
- Check data structure

### Styling Issues
- Inspect element (F12)
- Check CSS cascade
- Verify CSS variables
- Test on different screen sizes

---

## 📱 Responsive Design Breakpoints

```css
/* Mobile: < 480px */
@media (max-width: 480px) { }

/* Tablet: 480px - 768px */
@media (max-width: 768px) { }

/* Desktop: > 768px */
/* Default styles */
```

---

## 🎨 CSS Variable Reference

### Colors
```css
--primary-color: #3b82f6        /* Main blue */
--primary-dark: #2563eb         /* Dark blue */
--text-dark: #1f2937            /* Dark text */
--text-light: #6b7280           /* Light text */
--bg-light: #f9fafb             /* Light bg */
--bg-white: #ffffff             /* White */
--border-color: #e5e7eb         /* Borders */
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(...)
--shadow-md: 0 4px 6px rgba(...)
--shadow-lg: 0 10px 15px rgba(...)
```

---

## 🚀 Build & Deploy Commands

```bash
# Development
npm install              # Install dependencies
npm run dev:full         # Run frontend + backend
npm run dev              # Frontend only
npm run server           # Backend only

# Production
npm run build            # Build for production
npm run preview          # Preview build
```

---

## 📚 Key React Hooks Used

### useState
Store component state
```javascript
const [jobs, setJobs] = useState([])
```

### useEffect
Side effects, API calls
```javascript
useEffect(() => { fetchData() }, [])
```

### useMemo
Optimize filtering/calculations
```javascript
const filtered = useMemo(() => { return filter() }, [deps])
```

---

## 🔗 API Endpoint Quick Reference

```
GET  /api/jobs              All jobs
GET  /api/jobs/:id          Job by ID
GET  /api/search?q=        Search
GET  /api/location/:loc    By location
GET  /api/type/:type       By type
GET  /api/locations        All locations
GET  /api/types            All types
POST /api/filter           Advanced filter
```

---

## 💾 LocalStorage Usage

```javascript
import { storageUtils } from './utils/storage'

// Save
storageUtils.saveFavorites([1, 2, 3])

// Load
const fav = storageUtils.loadFavorites()

// Add
storageUtils.addFavorite(1)

// Remove
storageUtils.removeFavorite(1)

// Check
if (storageUtils.isFavorite(1)) { }
```

---

## 🎯 Import Paths Reference

```javascript
// Components
import JobCard from './components/JobCard'

// Utilities
import { jobsAPI } from './utils/api'
import { storageUtils } from './utils/storage'

// Styles
import './styles.css'
```

---

## 📝 Component Props Pattern

```javascript
// Define props clearly
export default function Component({ 
  prop1, 
  prop2, 
  onCallback 
}) {
  return (
    <div>
      {prop1}
      <button onClick={() => onCallback()}>
        {prop2}
      </button>
    </div>
  )
}
```

---

## 🔐 .gitignore Files

Already configured to ignore:
- node_modules/
- dist/
- build/
- .env.local
- .vscode/
- .idea/

---

## 📋 Commit Message Guide

```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: CSS/formatting changes
refactor: Code refactoring
test: Add/update tests
chore: Maintenance tasks
```

---

## 🆘 Common Issues

**Issue: Port already in use**
→ Solution: Change port in server.js or kill process

**Issue: Module not found**
→ Solution: npm install && clear node_modules

**Issue: CORS error**
→ Solution: Check CORS is enabled in server.js

**Issue: Blank page**
→ Solution: Check browser console, check API calls

**Issue: Favorites not persisting**
→ Solution: Check localStorage permissions, check storage.js

---

## ✅ Before Pushing Code

- [ ] Code works locally
- [ ] No console errors
- [ ] Tested on mobile
- [ ] Commit message is clear
- [ ] Documentation updated if needed

---

**Keep this guide handy while developing!** 📖

Version: 1.0.0
Last Updated: 2024
