import { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import FavoritesTab from './components/FavoritesTab';

// API Configuration - supports both local dev and deployed backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const locations = ['Tất cả', 'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Remote'];
const types = ['Tất cả', 'Thực tập', 'Bán thời gian', 'Remote'];

export default function App() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('Tất cả');
  const [type, setType] = useState('Tất cả');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('all');

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/jobs`);
        if (!response.ok) {
          throw new Error('Lỗi tải dữ liệu từ server');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const text = `${job.title} ${job.company} ${job.description}`.toLowerCase();
      const query = search.trim().toLowerCase();
      const matchSearch = query === '' || text.includes(query);
      const matchLocation = location === 'Tất cả' || job.location === location;
      const matchType = type === 'Tất cả' || job.type === type;
      return matchSearch && matchLocation && matchType;
    });
  }, [jobs, search, location, type]);

  const toggleFavorite = (jobId) => {
    setFavorites((current) =>
      current.includes(jobId) ? current.filter((id) => id !== jobId) : [...current, jobId]
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>💼 Job Search</h1>
            <p>Tìm việc làm cho sinh viên</p>
          </div>
          <nav className="tabs">
            <button
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Tất cả công việc ({jobs.length})
            </button>
            <button
              className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              Công việc yêu thích ({favorites.length}) ❤️
            </button>
          </nav>
        </div>
      </header>

      {activeTab === 'all' && (
        <main className="main">
          <section className="search-section">
            <SearchBar search={search} onSearchChange={setSearch} />
            <FilterBar
              location={location}
              onLocationChange={setLocation}
              type={type}
              onTypeChange={setType}
              locations={locations}
              types={types}
            />
          </section>

          <section className="jobs-section">
            <JobList
              jobs={filteredJobs}
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
              onSelectJob={setSelectedJob}
              loading={loading}
              error={error}
            />
          </section>
        </main>
      )}

      {activeTab === 'favorites' && (
        <main className="main">
          <FavoritesTab
            jobs={jobs}
            favorites={favorites}
            onFavoriteToggle={toggleFavorite}
            onSelectJob={setSelectedJob}
          />
        </main>
      )}

      {selectedJob && (
        <JobDetail
          job={selectedJob}
          isFavorite={favorites.includes(selectedJob.id)}
          onFavoriteToggle={toggleFavorite}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}
