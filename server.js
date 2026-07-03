import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Cache for jobs data
let jobsCache = [];
let lastFetchTime = 0;
const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 hour

// Fallback jobs data if API fails
const fallbackJobs = [
  {
    id: 1,
    title: 'Frontend Intern',
    company: 'TechStarter',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Học hỏi React, HTML/CSS và xây dựng giao diện thân thiện cho khách hàng.',
    requirements: 'Kiến thức cơ bản về React, HTML/CSS. Mong muốn học hỏi và phát triển kỹ năng.',
    benefits: 'Mức lương: 5-8 triệu VND/tháng. Học tập từ các senior developers, môi trường làm việc năng động.',
  },
  {
    id: 2,
    title: 'Backend Intern (Node.js)',
    company: 'CloudTech',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Phát triển API backend sử dụng Node.js và Express. Làm việc với cơ sở dữ liệu.',
    requirements: 'Kiến thức JavaScript, Node.js, Express. Hiểu biết về RESTful API.',
    benefits: 'Mức lương: 7-10 triệu VND/tháng. Mentorship từ các backend engineers.',
  },
];

// Fetch jobs from Remotive API
async function fetchJobsFromRemotive() {
  try {
    console.log('📡 Fetching jobs from Remotive API...');
    const response = await fetch('https://remotive.com/api/remote-jobs');
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    // Transform Remotive data to our format
    const jobs = data.jobs.map((job, index) => ({
      id: index + 1,
      title: job.title || 'Job Title',
      company: job.company_name || 'Company',
      location: 'Remote',
      type: 'Remote',
      description: job.description || job.title || 'No description available',
      requirements: job.job_type ? `Job Type: ${job.job_type}` : 'N/A',
      benefits: job.url ? `Apply: ${job.url}` : 'No benefits info',
      url: job.url,
      salary: job.salary ? job.salary : 'Not specified',
    }));

    console.log(`✅ Successfully fetched ${jobs.length} jobs from Remotive API`);
    return jobs;
  } catch (error) {
    console.error('❌ Error fetching from Remotive API:', error.message);
    console.log('📌 Using fallback jobs data');
    return fallbackJobs;
  }
}

// Get jobs with caching
async function getJobs() {
  const now = Date.now();
  
  // If cache is fresh, return cached data
  if (jobsCache.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
    console.log('📦 Returning cached jobs data');
    return jobsCache;
  }

  // Fetch fresh data
  jobsCache = await fetchJobsFromRemotive();
  lastFetchTime = now;
  return jobsCache;
}

// Initialize jobs on startup
async function initializeJobs() {
  console.log('🚀 Initializing job data...');
  await getJobs();
}


// Route: Home
app.get('/', (req, res) => {
  res.json({ 
    message: 'Job Search API for Student Intern Project',
    version: '2.0.0',
    dataSource: 'Remotive API',
    endpoints: {
      getAllJobs: 'GET /api/jobs',
      getJobById: 'GET /api/jobs/:id',
      searchJobs: 'GET /api/jobs/search?q=keyword',
    }
  });
});

// Route: Get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await getJobs();
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu công việc' });
  }
});

// Route: Get job by ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const jobs = await getJobs();
    const job = jobs.find((item) => item.id === Number(req.params.id));
    
    if (!job) {
      return res.status(404).json({ message: 'Công việc không tìm thấy' });
    }
    
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Lỗi khi lấy chi tiết công việc' });
  }
});

// Route: Search jobs
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    const jobs = await getJobs();
    
    const filtered = jobs.filter((job) => {
      const text = `${job.title} ${job.company} ${job.description}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });
    
    res.json(filtered);
  } catch (error) {
    console.error('Error searching jobs:', error);
    res.status(500).json({ error: 'Lỗi khi tìm kiếm' });
  }
});

// Route: Get jobs by location
app.get('/api/location/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const jobs = await getJobs();
    
    const filtered = jobs.filter((job) => 
      job.location.toLowerCase() === location.toLowerCase()
    );
    
    res.json(filtered);
  } catch (error) {
    console.error('Error filtering by location:', error);
    res.status(500).json({ error: 'Lỗi khi lọc theo địa điểm' });
  }
});

// Route: Get jobs by type
app.get('/api/type/:type', async (req, res) => {
  try {
    const type = req.params.type;
    const jobs = await getJobs();
    
    const filtered = jobs.filter((job) => 
      job.type.toLowerCase() === type.toLowerCase()
    );
    
    res.json(filtered);
  } catch (error) {
    console.error('Error filtering by type:', error);
    res.status(500).json({ error: 'Lỗi khi lọc theo loại hình' });
  }
});

// Route: Get unique locations
app.get('/api/locations', async (req, res) => {
  try {
    const jobs = await getJobs();
    const locations = [...new Set(jobs.map((job) => job.location))];
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách địa điểm' });
  }
});

// Route: Get unique types
app.get('/api/types', async (req, res) => {
  try {
    const jobs = await getJobs();
    const types = [...new Set(jobs.map((job) => job.type))];
    res.json(types);
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách loại hình' });
  }
});

// Serve SPA - must be after API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint không tìm thấy' });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  initializeJobs();
});

