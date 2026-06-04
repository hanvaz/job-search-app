export default function JobCard({
  job,
  isFavorite,
  onFavoriteToggle,
  onSelectJob,
}) {
  return (
    <div className="job-card" onClick={() => onSelectJob(job)}>
      <div className="job-card-header">
        <div className="job-card-title">
          <h3>{job.title}</h3>
          <p className="company">{job.company}</p>
        </div>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(job.id);
          }}
          title={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="job-card-meta">
        <span className="meta-item">📍 {job.location}</span>
        <span className="meta-item">💼 {job.type}</span>
      </div>

      <p className="job-description">{job.description}</p>

      <div className="job-card-footer">
        <button
          className="btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            onSelectJob(job);
          }}
        >
          Xem Chi Tiết →
        </button>
      </div>
    </div>
  );
}
