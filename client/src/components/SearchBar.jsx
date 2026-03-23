export default function SearchBar({ fields, values, onChange, onSubmit, title, subtitle, accent, hint, stats }) {
  return (
    <section className={`glass-card search-panel search-panel-${accent || "default"}`}>
      <div className="search-panel-top">
        <div>
          <span className="eyebrow">{title}</span>
          <h2>{subtitle}</h2>
          {hint && <p className="search-hint">{hint}</p>}
        </div>
        {stats?.length ? (
          <div className="search-stat-row">
            {stats.map((stat) => (
              <div key={stat.label} className="search-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <form className="search-grid search-grid-unique" onSubmit={onSubmit}>
        {fields.map((field) => (
          <label key={field.name} className="input-group search-input-shell">
            <span className="search-input-label">{field.label}</span>
            <input
              type={field.type || "text"}
              name={field.name}
              value={values[field.name] || ""}
              onChange={onChange}
              placeholder={field.placeholder}
              min={field.min}
            />
          </label>
        ))}
        <div className="search-submit-wrap">
          <button type="submit" className="button primary">
            Search Now
          </button>
        </div>
      </form>
    </section>
  );
}
