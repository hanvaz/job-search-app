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

const jobs = [
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
  {
    id: 3,
    title: 'Junior Frontend Developer',
    company: 'EduNext',
    location: 'Đà Nẵng',
    type: 'Bán thời gian',
    description: 'Tham gia phát triển giao diện website học tập trực tuyến bằng React.',
    requirements: 'Hiểu rõ về React, JavaScript ES6+. Kinh nghiệm với REST API.',
    benefits: 'Mức lương: 15-20 triệu VND/tháng. Cơ hội full-time sau thử việc.',
  },
  {
    id: 4,
    title: 'Web Developer Intern',
    company: 'StartUp VN',
    location: 'Remote',
    type: 'Remote',
    description: 'Xây dựng trang web marketing và cải thiện hiệu suất front-end.',
    requirements: 'Kiến thức React, HTML/CSS/JavaScript. Khả năng làm việc độc lập.',
    benefits: 'Mức lương: 8-12 triệu VND/tháng. Làm việc từ xa, linh hoạt giờ làm.',
  },
  {
    id: 5,
    title: 'Backend Intern (Node.js)',
    company: 'CloudTech',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Phát triển API backend sử dụng Node.js và Express. Làm việc với cơ sở dữ liệu MongoDB.',
    requirements: 'Kiến thức JavaScript, Node.js, Express. Hiểu biết về RESTful API.',
    benefits: 'Mức lương: 7-10 triệu VND/tháng. Mentorship từ các backend engineers.',
  },
  {
    id: 6,
    title: 'Fullstack Developer',
    company: 'InnovateLabs',
    location: 'Hồ Chí Minh',
    type: 'Bán thời gian',
    description: 'Phát triển các ứng dụng web fullstack sử dụng MERN stack.',
    requirements: 'React, Node.js/Express, MongoDB. Hiểu biết về deployment.',
    benefits: 'Mức lương: 20-28 triệu VND/tháng. Cơ hội nâng cao kỹ năng fullstack.',
  },
  {
    id: 7,
    title: 'Junior QA Engineer',
    company: 'TestHub',
    location: 'Remote',
    type: 'Remote',
    description: 'Thực hiện kiểm thử tự động và thủ công cho ứng dụng web.',
    requirements: 'Kiến thức về Selenium, JUnit. Kỹ năng viết test cases.',
    benefits: 'Mức lương: 10-14 triệu VND/tháng. Học tập về automation testing.',
  },
  {
    id: 8,
    title: 'Data Analyst Intern',
    company: 'Analytics Pro',
    location: 'Hà Nội',
    type: 'Thực tập',
    description: 'Phân tích dữ liệu và tạo báo cáo cho các dự án của công ty.',
    requirements: 'Python/SQL, Excel nâng cao. Kiến thức về data visualization.',
    benefits: 'Mức lương: 6-9 triệu VND/tháng. Làm việc với công cụ phân tích hiện đại.',
  },
  {
    id: 9,
    title: 'Mobile Developer (React Native)',
    company: 'MobileWorks',
    location: 'Hồ Chí Minh',
    type: 'Bán thời gian',
    description: 'Phát triển ứng dụng di động sử dụng React Native.',
    requirements: 'React Native, JavaScript. Kinh nghiệm phát triển ứng dụng di động.',
    benefits: 'Mức lương: 18-25 triệu VND/tháng. Cơ hội làm việc trên ứng dụng mobile thực tế.',
  },
  {
    id: 10,
    title: 'DevOps Intern',
    company: 'InfraTech',
    location: 'Remote',
    type: 'Remote',
    description: 'Hỗ trợ deployment, monitoring và scaling ứng dụng trên cloud.',
    requirements: 'Docker, Kubernetes cơ bản. Kiến thức về AWS hoặc GCP.',
    benefits: 'Mức lương: 12-16 triệu VND/tháng. Học DevOps từ các chuyên gia.',
  },
];

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
app.get('/api/jobs', (req, res) => {
  try {
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu công việc' });
  }
});

// Route: Lấy chi tiết một công việc theo ID
app.get('/api/jobs/:id', (req, res) => {
  try {
    const job = jobs.find((item) => item.id === Number(req.params.id));
    if (!job) {
      return res.status(404).json({ message: 'Công việc không tìm thấy' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy chi tiết công việc' });
  }
});

// Route: Tìm kiếm công việc
app.get('/api/search', (req, res) => {
  try {
    const query = req.query.q || '';
    const filtered = jobs.filter((job) => {
      const text = `${job.title} ${job.company} ${job.description}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi tìm kiếm' });
  }
});

// Route: Lấy công việc theo địa điểm
app.get('/api/location/:location', (req, res) => {
  try {
    const location = req.params.location;
    const filtered = jobs.filter((job) => 
      job.location.toLowerCase() === location.toLowerCase()
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lọc theo địa điểm' });
  }
});

// Route: Lấy công việc theo loại hình
app.get('/api/type/:type', (req, res) => {
  try {
    const type = req.params.type;
    const filtered = jobs.filter((job) => 
      job.type.toLowerCase() === type.toLowerCase()
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lọc theo loại hình' });
  }
});

// Route: Lấy danh sách các địa điểm duy nhất
app.get('/api/locations', (req, res) => {
  try {
    const locations = [...new Set(jobs.map((job) => job.location))];
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách địa điểm' });
  }
});

// Route: Lấy danh sách các loại hình duy nhất
app.get('/api/types', (req, res) => {
  try {
    const types = [...new Set(jobs.map((job) => job.type))];
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách loại hình' });
  }
});

// Route: Lọc công việc với nhiều tiêu chí
app.post('/api/filter', (req, res) => {
  try {
    const { location, type, salary } = req.body;
    let filtered = jobs;

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
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📊 Total jobs available: ${jobs.length}`);
});
