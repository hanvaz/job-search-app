import JobCard from './JobCard';

export default function JobList({
  jobs,
  favorites,
  onFavoriteToggle,
  onSelectJob,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Đang tải danh sách công việc...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>❌ Lỗi: {error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <p>😔 Không tìm thấy công việc phù hợp</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      <h2>Có {jobs.length} công việc phù hợp</h2>
      <div className="jobs-container">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isFavorite={favorites.includes(job.id)}
            onFavoriteToggle={onFavoriteToggle}
            onSelectJob={onSelectJob}
          />
        ))}
      </div>
    </div>
  );
}
