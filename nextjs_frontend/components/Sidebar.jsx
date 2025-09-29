/* Sidebar: collection list and collapse toggle */

// PUBLIC_INTERFACE
export default function Sidebar({ collections = [], selected, onSelect, collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="brand" title="Data Explorer">
          <div className="logo" />
          {!collapsed && <div className="title">Data Explorer</div>}
        </div>
        <button className="toggle-btn" onClick={onToggle} aria-label="Toggle sidebar">☰</button>
      </div>
      <div className="collection-list">
        {collections.map((c) => {
          const isActive = c === selected;
          return (
            <button
              key={c}
              className={`collection-item ${isActive ? "active" : ""}`}
              onClick={() => onSelect(c)}
              aria-pressed={isActive}
              aria-label={`Select ${c}`}
              title={c}
            >
              <span style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: 999,
                background: isActive ? "var(--primary)" : "var(--border)"
              }} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {c}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
