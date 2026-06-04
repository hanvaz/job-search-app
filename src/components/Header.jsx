export default function Header({ title, subtitle }) {
  return (
    <header className="page-header">
      <div className="header-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}
