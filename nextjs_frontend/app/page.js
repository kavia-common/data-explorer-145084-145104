"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { fetchCollection, getApiBaseUrl } from "../lib/api";

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Selected collection name */
  const [selected, setSelected] = useState("collection1");
  /** Resulting data for the selected collection */
  const [data, setData] = useState([]);
  /** Loading and error states */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /** Sidebar collapsed state for responsive behavior */
  const [collapsed, setCollapsed] = useState(false);

  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);
  const backendMissing = !apiBaseUrl;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetchCollection(selected)
      .then((rows) => {
        if (!cancelled) {
          setData(Array.isArray(rows) ? rows : []);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e?.message || "Failed to fetch data.");
          setData([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selected]);

  return (
    <div className="layout">
      <Sidebar
        collections={["collection1", "collection2"]}
        selected={selected}
        onSelect={setSelected}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      <main className="content">
        <div className="topbar">
          <div>
            <div className="page-title">Data Explorer</div>
            <div className="helper">View and explore your collections with a clean, classic layout.</div>
          </div>
          {loading ? <div className="spinner" aria-label="loading" /> : null}
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              {selected === "collection1" ? "Collection 1" : "Collection 2"}
            </div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>
              Source: {apiBaseUrl ? `${apiBaseUrl}/api/${selected}` : `/api/${selected}`}
            </div>
          </div>
          <div className="card-body">
            <div className="table-wrap">
              <DataTable data={data} loading={loading} error={error} />
            </div>
          </div>
        </div>

        {backendMissing ? (
          <div className="notice warn" role="alert" aria-live="polite" style={{ marginTop: 16 }}>
            NEXT_PUBLIC_BACKEND_URL is not set. Configure it in a .env file to point this frontend at your backend
            (e.g., NEXT_PUBLIC_BACKEND_URL=https://your-backend-host:3001).
          </div>
        ) : null}
      </main>
    </div>
  );
}
