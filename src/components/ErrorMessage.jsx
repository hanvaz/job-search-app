export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <div className="error-icon">❌</div>
      <p>{message}</p>
      {onRetry && (
        <button className="btn-primary" onClick={onRetry}>
          Thử lại
        </button>
      )}
    </div>
  );
}
