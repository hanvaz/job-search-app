import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://job-search-app.vercel.app',
    'https://job-search-app-murex-three.vercel.app',
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Fallback jobs data (used when API fails)
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
    title: 'UI/UX Intern',
    company: 'DesignLab',
    location: 'Hồ Chí Minh',
    type: 'Thực tập',
    description: 'Hỗ trợ thiết kế prototype, wireframe và cải thiện trải nghiệm người dùng.',
    requirements: 'Kiến thức về Figma hoặc Adobe XD. Có portfolio thiết kế là lợi thế.',
    benefits: 'Mức lương: 6-9 triệu VND/tháng. Cơ hội làm việc trên các dự án thực tế.',
  },
];

// Cache for job data
let jobsCache = null;
let cacheTime = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

// Fetch jobs from Remotive API
async function fetchJobsFromRemotive() {
  try {
    console.log('📡 Fetching jobs from Remotive API...');
    const response = await fetch('https://remotive.com/api/remote-jobs');
    
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }
    
    const data = await response.json();
    const jobs = data.jobs || [];
    
    console.log(`✅ Successfully fetched ${jobs.length} jobs from Remotive API`);
    
    // Helper function to strip HTML tags and decode entities
    const stripHTML = (html) => {
      if (!html) return 'No description available';
      return html
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim()
        .substring(0, 500); // Limit to 500 chars
    };
    
    // Transform Remotive jobs to our format
    const transformedJobs = jobs.slice(0, 30).map((job, index) => ({
      id: index + 1,
      title: job.title || 'Unknown Position',
      company: job.company_name || 'Unknown Company',
      location: 'Remote',
      type: 'Remote',
      description: stripHTML(job.description),
      requirements: 'See job description for details',
      benefits: job.salary || 'Salary not specified',
    }));
    
    return transformedJobs;
  } catch (error) {
    console.error('❌ Error fetching from Remotive API:', error.message);
    return null;
  }
}

// Get jobs with caching
async function getJobs() {
  const now = Date.now();
  
  // Return cached data if still valid
  if (jobsCache && cacheTime && (now - cacheTime) < CACHE_DURATION) {
    console.log('📦 Using cached jobs data');
    return jobsCache;
  }
  
  // Fetch fresh data
  const freshJobs = await fetchJobsFromRemotive();
  
  if (freshJobs && freshJobs.length > 0) {
    jobsCache = freshJobs;
    cacheTime = now;
    return freshJobs;
  }
  
  // Fall back to cached data if available
  if (jobsCache) {
    console.log('⚠️  Using previously cached data (API failed)');
    return jobsCache;
  }
  
  // Use fallback data if nothing else available
  console.log('⚠️  Using fallback mock data');
  return fallbackJobs;
}

// Initialize jobs on startup
let jobs = fallbackJobs;
(async () => {
  jobs = await getJobs();
})();

// Route: Trang chủ
app.get('/', (req, res) => {
  res.json({ 
    message: 'Job Search API for Student Intern Project',
    version: '1.0.0',
    endpoints: {
      getAllJobs: 'GET /api/jobs',
      getJobById: 'GET /api/jobs/:id',
      searchJobs: 'GET /api/jobs/search?q=keyword',
      getJobsByLocation: 'GET /api/jobs/location/:location',
      getJobsByType: 'GET /api/jobs/type/:type',
    }
  });
});

// Route: Lấy tất cả công việc
app.get('/api/jobs', async (req, res) => {
  try {
    const currentJobs = await getJobs();
    res.json(currentJobs);
  } catch (error) {
    console.error('Error in /api/jobs:', error);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu công việc' });
  }
});

// Route: Lấy chi tiết một công việc theo ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const currentJobs = await getJobs();
    const job = currentJobs.find((item) => item.id === Number(req.params.id));
    if (!job) {
      return res.status(404).json({ message: 'Công việc không tìm thấy' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy chi tiết công việc' });
  }
});

// Route: Tìm kiếm công việc
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    const currentJobs = await getJobs();
    const filtered = currentJobs.filter((job) => {
      const text = `${job.title} ${job.company} ${job.description}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi tìm kiếm' });
  }
});

// Route: Lấy công việc theo địa điểm
app.get('/api/location/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const currentJobs = await getJobs();
    const filtered = currentJobs.filter((job) => 
      job.location.toLowerCase() === location.toLowerCase()
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lọc theo địa điểm' });
  }
});

// Route: Lấy công việc theo loại hình
app.get('/api/type/:type', async (req, res) => {
  try {
    const type = req.params.type;
    const currentJobs = await getJobs();
    const filtered = currentJobs.filter((job) => 
      job.type.toLowerCase() === type.toLowerCase()
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lọc theo loại hình' });
  }
});

// Route: Lấy danh sách các địa điểm duy nhất
app.get('/api/locations', async (req, res) => {
  try {
    const currentJobs = await getJobs();
    const locations = [...new Set(currentJobs.map((job) => job.location))];
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách địa điểm' });
  }
});

// Route: Lấy danh sách các loại hình duy nhất
app.get('/api/types', async (req, res) => {
  try {
    const currentJobs = await getJobs();
    const types = [...new Set(currentJobs.map((job) => job.type))];
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách loại hình' });
  }
});

// Route: Lọc công việc với nhiều tiêu chí
app.post('/api/filter', async (req, res) => {
  try {
    const { location, type, salary } = req.body;
    const currentJobs = await getJobs();
    let filtered = currentJobs;

    if (location) {
      filtered = filtered.filter((job) => 
        job.location.toLowerCase() === location.toLowerCase()
      );
    }

    if (type) {
      filtered = filtered.filter((job) => 
        job.type.toLowerCase() === type.toLowerCase()
      );
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lọc dữ liệu' });
  }
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint không tìm thấy' });
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  const currentJobs = await getJobs();
  console.log(`📊 Total jobs available: ${currentJobs.length}`);
});
