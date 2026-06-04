export default function JobDetail({ job, isFavorite, onFavoriteToggle, onClose }) {
  if (!job) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="detail-header">
          <div>
            <h1>{job.title}</h1>
            <p className="detail-company">{job.company}</p>
          </div>
          <button
            className={`favorite-btn-lg ${isFavorite ? 'active' : ''}`}
            onClick={() => onFavoriteToggle(job.id)}
          >
            {isFavorite ? '❤️ Đã yêu thích' : '🤍 Yêu thích'}
          </button>
        </div>

        <div className="detail-meta">
          <div className="meta-row">
            <span className="label">📍 Địa điểm:</span>
            <span className="value">{job.location}</span>
          </div>
          <div className="meta-row">
            <span className="label">💼 Loại hình:</span>
            <span className="value">{job.type}</span>
          </div>
          <div className="meta-row">
            <span className="label">🔖 Mã công việc:</span>
            <span className="value">{job.id}</span>
          </div>
        </div>

        <div className="detail-description">
          <h2>Mô tả công việc</h2>
          <p>{job.description}</p>
          {job.requirements && (
            <>
              <h2>Yêu cầu</h2>
              <p>{job.requirements}</p>
            </>
          )}
          {job.benefits && (
            <>
              <h2>Quyền lợi</h2>
              <p>{job.benefits}</p>
            </>
          )}
        </div>

        <div className="detail-footer">
          <button className="btn-primary-lg">Ứng tuyển ngay</button>
          <button className="btn-secondary" onClick={onClose}>Quay lại</button>
        </div>
      </div>
    </div>
  );
}
