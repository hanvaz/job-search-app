export default function FilterBar({
  location,
  onLocationChange,
  type,
  onTypeChange,
  locations,
  types,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="location">Địa điểm:</label>
        <select
          id="location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="filter-select"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="type">Loại hình:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="filter-select"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
