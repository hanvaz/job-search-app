import JobCard from './JobCard';

export default function FavoritesTab({
  jobs,
  favorites,
  onFavoriteToggle,
  onSelectJob,
}) {
  const favoriteJobs = jobs.filter((job) => favorites.includes(job.id));

  return (
    <div className="favorites-tab">
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>💔 Chưa có công việc yêu thích nào</p>
        </div>
      ) : (
        <div>
          <h2>Công việc yêu thích ({favorites.length})</h2>
          <div className="jobs-container">
            {favoriteJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isFavorite={true}
                onFavoriteToggle={onFavoriteToggle}
                onSelectJob={onSelectJob}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
