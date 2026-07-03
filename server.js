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
    title: 'Frontend Developer Intern',
    company: 'TechStarter',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Học hỏi React, HTML/CSS và xây dựng giao diện thân thiện cho khách hàng. Làm việc trong môi trường startup năng động.',
    requirements: 'Kiến thức cơ bản về React, HTML/CSS. Mong muốn học hỏi và phát triển kỹ năng.',
    benefits: 'Mức lương: 5-8 triệu VND/tháng. Học tập từ các senior developers.',
  },
  {
    id: 2,
    title: 'UI/UX Designer Intern',
    company: 'DesignLab',
    location: 'Hồ Chí Minh',
    type: 'Thực tập',
    description: 'Hỗ trợ thiết kế prototype, wireframe và cải thiện trải nghiệm người dùng cho các dự án web.',
    requirements: 'Kiến thức về Figma hoặc Adobe XD. Có portfolio thiết kế là lợi thế.',
    benefits: 'Mức lương: 6-9 triệu VND/tháng. Cơ hội làm việc trên các dự án thực tế.',
  },
  {
    id: 3,
    title: 'Backend Developer (Node.js)',
    company: 'CloudTech',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Phát triển API backend sử dụng Node.js và Express. Làm việc với cơ sở dữ liệu MongoDB.',
    requirements: 'Kiến thức JavaScript, Node.js, Express. Hiểu biết về RESTful API.',
    benefits: 'Mức lương: 7-10 triệu VND/tháng. Mentorship từ các backend engineers.',
  },
  {
    id: 4,
    title: 'Fullstack Developer',
    company: 'InnovateLabs',
    location: 'Hồ Chí Minh',
    type: 'Bán thời gian',
    description: 'Phát triển các ứng dụng web fullstack sử dụng MERN stack. Làm việc trên các dự án thực tế.',
    requirements: 'React, Node.js/Express, MongoDB. Hiểu biết về deployment.',
    benefits: 'Mức lương: 20-28 triệu VND/tháng. Cơ hội nâng cao kỹ năng fullstack.',
  },
  {
    id: 5,
    title: 'QA Engineer',
    company: 'TestHub',
    location: 'Remote',
    type: 'Remote',
    description: 'Thực hiện kiểm thử tự động và thủ công cho ứng dụng web. Viết test cases chi tiết.',
    requirements: 'Kiến thức về Selenium, JUnit. Kỹ năng viết test cases.',
    benefits: 'Mức lương: 10-14 triệu VND/tháng. Học tập về automation testing.',
  },
  {
    id: 6,
    title: 'Data Analyst',
    company: 'Analytics Pro',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Phân tích dữ liệu và tạo báo cáo cho các dự án của công ty. Sử dụng SQL và Python.',
    requirements: 'Python/SQL, Excel nâng cao. Kiến thức về data visualization.',
    benefits: 'Mức lương: 6-9 triệu VND/tháng. Làm việc với công cụ phân tích hiện đại.',
  },
  {
    id: 7,
    title: 'Mobile App Developer',
    company: 'MobileWorks',
    location: 'Hồ Chí Minh',
    type: 'Bán thời gian',
    description: 'Phát triển ứng dụng di động sử dụng React Native. Hỗ trợ iOS và Android.',
    requirements: 'React Native, JavaScript. Kinh nghiệm phát triển ứng dụng di động.',
    benefits: 'Mức lương: 18-25 triệu VND/tháng. Cơ hội làm việc trên ứng dụng mobile.',
  },
  {
    id: 8,
    title: 'DevOps Engineer',
    company: 'InfraTech',
    location: 'Remote',
    type: 'Remote',
    description: 'Hỗ trợ deployment, monitoring và scaling ứng dụng trên cloud AWS/GCP.',
    requirements: 'Docker, Kubernetes cơ bản. Kiến thức về AWS hoặc GCP.',
    benefits: 'Mức lương: 12-16 triệu VND/tháng. Học DevOps từ các chuyên gia.',
  },
  {
    id: 9,
    title: 'Junior PHP Developer',
    company: 'WebSolutions',
    location: 'Đà Nẵng',
    type: 'Thực tập',
    description: 'Phát triển website sử dụng PHP và Laravel. Làm việc với MySQL database.',
    requirements: 'PHP cơ bản, HTML/CSS, MySQL. Khả năng làm việc nhóm.',
    benefits: 'Mức lương: 4-6 triệu VND/tháng. Hỗ trợ học tập từ seniors.',
  },
  {
    id: 10,
    title: 'Python Developer',
    company: 'DataScience Co',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Phát triển ứng dụng Python cho data processing và automation.',
    requirements: 'Python, Flask/Django, Basic SQL. Mong muốn học hỏi.',
    benefits: 'Mức lương: 5-8 triệu VND/tháng. Môi trường làm việc chuyên nghiệp.',
  },
  {
    id: 11,
    title: 'Blockchain Developer',
    company: 'CryptoVN',
    location: 'Hồ Chí Minh',
    type: 'Bán thời gian',
    description: 'Phát triển smart contracts sử dụng Solidity. Làm việc với Web3 technology.',
    requirements: 'Solidity, Ethereum, JavaScript. Hiểu biết blockchain.',
    benefits: 'Mức lương: 15-22 triệu VND/tháng. Cơ hội học tập Web3.',
  },
  {
    id: 12,
    title: 'Game Developer',
    company: 'GameStudio VN',
    location: 'Hồ Chí Minh',
    type: 'Bán thời gian',
    description: 'Phát triển game sử dụng Unity hoặc Unreal Engine. Làm việc trên game 2D/3D.',
    requirements: 'Unity/Unreal Engine, C#/C++. Kinh nghiệm game dev.',
    benefits: 'Mức lương: 10-15 triệu VND/tháng. Môi trường sáng tạo.',
  },
  {
    id: 13,
    title: 'DevSecOps Engineer',
    company: 'SecurityFirst',
    location: 'Remote',
    type: 'Remote',
    description: 'Đảm bảo security trong CI/CD pipeline. Quản lý secrets và vulnerability scanning.',
    requirements: 'Docker, Kubernetes, Security tools. Kiến thức DevOps.',
    benefits: 'Mức lương: 14-18 triệu VND/tháng. Học tập về security.',
  },
  {
    id: 14,
    title: 'Frontend Developer (Vue.js)',
    company: 'VueMasters',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Phát triển giao diện web sử dụng Vue.js framework. Làm việc với Vuex state management.',
    requirements: 'Vue.js, JavaScript, CSS. Kinh nghiệm frontend.',
    benefits: 'Mức lương: 6-9 triệu VND/tháng. Học tập Vue.js deep.',
  },
  {
    id: 15,
    title: 'AWS Solutions Architect',
    company: 'CloudPartner',
    location: 'Remote',
    type: 'Remote',
    description: 'Thiết kế kiến trúc AWS solutions cho các dự án enterprise. Tối ưu hóa cost.',
    requirements: 'AWS certifications. Kinh nghiệm infrastructure as code.',
    benefits: 'Mức lương: 25-35 triệu VND/tháng. Làm việc remote worldwide.',
  },
  {
    id: 16,
    title: 'Machine Learning Engineer',
    company: 'AIVietnam',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Phát triển các mô hình machine learning cho NLP, Computer Vision projects.',
    requirements: 'Python, TensorFlow/PyTorch, ML algorithms. Kinh nghiệm ML.',
    benefits: 'Mức lương: 12-18 triệu VND/tháng. Làm việc trên AI projects.',
  },
  {
    id: 17,
    title: 'Cloud Infrastructure Engineer',
    company: 'MultiCloud',
    location: 'Hồ Chí Minh',
    type: 'Bán thời gian',
    description: 'Quản lý infrastructure trên AWS, GCP, Azure. Monitoring và optimization.',
    requirements: 'Cloud platforms, IaC (Terraform). DevOps experience.',
    benefits: 'Mức lương: 16-22 triệu VND/tháng. Làm việc multi-cloud.',
  },
  {
    id: 18,
    title: 'Product Manager',
    company: 'StartUpXYZ',
    location: 'Remote',
    type: 'Remote',
    description: 'Quản lý product roadmap và features. Làm việc với engineering team.',
    requirements: 'Product management experience, Analytics skills.',
    benefits: 'Mức lương: 20-30 triệu VND/tháng. Tham gia từ sớm.',
  },
  {
    id: 19,
    title: 'Technical Writer',
    company: 'DocsPro',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Viết documentation cho API, SDK. Hỗ trợ developer communities.',
    requirements: 'Viết kỹ, hiểu về technical concepts. English fluent.',
    benefits: 'Mức lương: 5-7 triệu VND/tháng. Học tập technical writing.',
  },
  {
    id: 20,
    title: 'Solutions Engineer',
    company: 'EnterpriseSoft',
    location: 'Hồ Chí Minh',
    type: 'Bán thời gian',
    description: 'Hỗ trợ pre-sales engineer cho enterprise clients. Tư vấn technical solutions.',
    requirements: 'Technical background, Communication skills.',
    benefits: 'Mức lương: 18-25 triệu VND/tháng. Làm việc client facing.',
  },
  {
    id: 21,
    title: 'Database Administrator',
    company: 'DataStore',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Quản lý databases MySQL, PostgreSQL. Backup, recovery, optimization.',
    requirements: 'SQL, Database administration. Linux basics.',
    benefits: 'Mức lương: 7-10 triệu VND/tháng. Học tập DBA skills.',
  },
  {
    id: 22,
    title: 'API Developer',
    company: 'APIHub',
    location: 'Remote',
    type: 'Remote',
    description: 'Phát triển RESTful API hoặc GraphQL API. Documentation và versioning.',
    requirements: 'Node.js/Python/Go, API design. REST/GraphQL knowledge.',
    benefits: 'Mức lương: 12-16 triệu VND/tháng. Làm việc remote.',
  },
  {
    id: 23,
    title: 'Performance Engineer',
    company: 'SpeedOptimize',
    location: 'Đà Nẵng',
    type: 'Thực tập',
    description: 'Tối ưu hóa performance website, API. Profiling và benchmarking.',
    requirements: 'Performance tuning, Profiling tools. Low-level optimization.',
    benefits: 'Mức lương: 8-12 triệu VND/tháng. Học tập optimization.',
  },
  {
    id: 24,
    title: 'Security Engineer',
    company: 'SecureNow',
    location: 'Hồ Chí Minh',
    type: 'Bán thời gian',
    description: 'Đánh giá security, penetration testing. Implement security measures.',
    requirements: 'Security knowledge, Networking. Ethical hacking basics.',
    benefits: 'Mức lương: 16-20 triệu VND/tháng. Học tập cybersecurity.',
  },
  {
    id: 25,
    title: 'Automation Tester',
    company: 'TestAutomation',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Viết automation test scripts sử dụng Selenium, Cypress. CI/CD integration.',
    requirements: 'Selenium, JavaScript/Python. Testing knowledge.',
    benefits: 'Mức lương: 5-8 triệu VND/tháng. Học tập automation testing.',
  },
  {
    id: 26,
    title: 'Community Manager',
    company: 'TechCommunity',
    location: 'Remote',
    type: 'Remote',
    description: 'Quản lý developer community, events, workshops. Social media management.',
    requirements: 'Communication skills, Community management. Technical knowledge.',
    benefits: 'Mức lương: 8-12 triệu VND/tháng. Xây dựng community.',
  },
  {
    id: 27,
    title: 'Content Developer',
    company: 'EdTechVN',
    location: 'Hồ Chí Minh',
    type: 'Thực tập',
    description: 'Tạo nội dung khóa học, tutorials, video. Giáo dục developer community.',
    requirements: 'Technical writing, Video creation. Teaching skills.',
    benefits: 'Mức lương: 6-10 triệu VND/tháng. Tạo content educational.',
  },
  {
    id: 28,
    title: 'Network Engineer',
    company: 'NetworkPlus',
    location: 'Đà Nẵng',
    type: 'Bán thời gian',
    description: 'Quản lý network infrastructure. Setup, monitoring, troubleshooting.',
    requirements: 'Networking basics, Linux. CCNA knowledge helpful.',
    benefits: 'Mức lương: 12-15 triệu VND/tháng. Học tập networking.',
  },
  {
    id: 29,
    title: 'Systems Administrator',
    company: 'SysAdminPro',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Quản lý servers, user access, system updates. Infrastructure monitoring.',
    requirements: 'Linux, Windows Server. System administration basics.',
    benefits: 'Mức lương: 6-9 triệu VND/tháng. Học tập system admin.',
  },
  {
    id: 30,
    title: 'Embedded Systems Engineer',
    company: 'IoTVietnam',
    location: 'Hồ Chí Minh',
    type: 'Bán thời gian',
    description: 'Phát triển firmware cho IoT devices. Arduino, Raspberry Pi projects.',
    requirements: 'C/C++, Embedded systems. Microcontroller experience.',
    benefits: 'Mức lương: 10-14 triệu VND/tháng. Làm việc IoT projects.',
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
    
    // Helper function to strip HTML tags
    const stripHTML = (html) => {
      if (!html) return 'No description available';
      return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim()
        .substring(0, 500);
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
    
    return transformedJobs.length > 0 ? transformedJobs : null;
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
  
  // Fetch fresh data from Remotive API
  const freshJobs = await fetchJobsFromRemotive();
  
  if (freshJobs && freshJobs.length > 0) {
    jobsCache = freshJobs;
    cacheTime = now;
    return freshJobs;
  }
  
  // Fall back to Vietnamese mock data if API fails
  if (jobsCache) {
    console.log('⚠️  Using previously cached data (API failed)');
    return jobsCache;
  }
  
  // Use fallback data if nothing else available
  console.log('✅ Using 30 Vietnamese mock jobs data');
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
