/* DataTable: renders a table for an array of objects with minimal formatting */

function toTitleCase(key) {
  return String(key)
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1));
}

function isIsoDateString(value) {
  if (typeof value !== "string") return false;
  const d = new Date(value);
  return !isNaN(d.getTime()) && /^\d{4}-\d{2}-\d{2}T/.test(value);
}

function formatValue(value) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") {
    return isIsoDateString(value) ? new Date(value).toLocaleString() : value;
  }
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return JSON.stringify(value);
  }
  if (typeof value === "object") {
    // Attempt to show concise representation
    const keys = Object.keys(value);
    if (keys.length <= 3) {
      return JSON.stringify(value);
    }
    return `{ ${keys.slice(0, 3).join(", ")}, … }`;
  }
  return String(value);
}

// PUBLIC_INTERFACE
export default function DataTable({ data = [], loading = false, error = "" }) {
  if (error) {
    return (
      <div className="notice error" role="alert">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: "16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div className="spinner" />
        <div>Loading data…</div>
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div style={{ padding: "16px" }}>
        <div className="notice">No data to display.</div>
      </div>
    );
  }

  // Build column list from union of keys
  const columnSet = new Set();
  for (const row of data) {
    Object.keys(row || {}).forEach((k) => columnSet.add(k));
  }
  const columns = Array.from(columnSet);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{toTitleCase(col)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={row?.id || row?._id || idx}>
            {columns.map((col) => (
              <td key={col}>{formatValue(row?.[col])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
