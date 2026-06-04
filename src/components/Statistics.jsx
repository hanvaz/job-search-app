export default function Statistics({ total, favorites }) {
  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-number">{total}</div>
        <div className="stat-label">Tổng công việc</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{favorites}</div>
        <div className="stat-label">Công việc yêu thích</div>
      </div>
    </div>
  );
}
