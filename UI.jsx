import React from "react";

// ── Badge ──────────────────────────────────────────────────────────────────

export function Badge({ label, color, bg }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      background: bg ?? (color + "20"),
      color: color,
      border: `1px solid ${color}44`,
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

// ── Card ────────────────────────────────────────────────────────────────────

export function Card({ children, style = {}, accent }) {
  return (
    <div style={{
      background: "var(--bg2)",
      border: `1px solid ${accent ?? "var(--border)"}`,
      borderRadius: "var(--r2)",
      padding: "18px 20px",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── ScoreBar ────────────────────────────────────────────────────────────────

export function ScoreBar({ value, color, label }) {
  return (
    <div>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: "var(--t2)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</span>
          <span style={{ fontSize: 11, color: color, fontFamily: "JetBrains Mono, monospace" }}>{value}</span>
        </div>
      )}
      <div style={{ height: 6, background: "var(--bg3)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          width: `${value}%`,
          height: "100%",
          background: color,
          borderRadius: 3,
          transition: "width 0.5s ease",
        }} />
      </div>
    </div>
  );
}

// ── SectionHeader ───────────────────────────────────────────────────────────

export function SectionHeader({ step, title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: "var(--teal)", color: "var(--bg)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800, flexShrink: 0,
        }}>
          {step}
        </div>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p style={{ margin: "0 0 0 42px", fontSize: 13, color: "var(--t2)", lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── DataTable ────────────────────────────────────────────────────────────────

export function DataTable({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 12.5,
        fontFamily: "JetBrains Mono, monospace",
      }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: "8px 12px",
                textAlign: "left",
                color: "var(--teal)",
                fontWeight: 700,
                fontSize: 10.5,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                borderBottom: "1px solid var(--border)",
                whiteSpace: "nowrap",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? "transparent" : "var(--bg1)" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: "8px 12px",
                  color: ci === 0 ? "var(--text)" : "var(--t2)",
                  borderBottom: "1px solid var(--border)",
                  fontWeight: ci === 0 ? 600 : 400,
                  verticalAlign: "middle",
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Sparkline ────────────────────────────────────────────────────────────────

export function Sparkline({ points, color, width = 140, height = 48 }) {
  if (!points || points.length < 2) return null;
  const pad = 4;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const maxT = points[points.length - 1].t;
  const maxF = Math.max(...points.map((p) => p.fold));
  const d = points.map((p, i) => {
    const x = pad + (p.t / maxT) * w;
    const y = pad + h - (p.fold / maxF) * h;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── PubMed Search Panel ─────────────────────────────────────────────────────

export function PubMedPanel({ hook, defaultQuery = "", placeholder = "Search PubMed…", title = "PubMed Literature Search" }) {
  const [q, setQ] = React.useState(defaultQuery);

  const handleSearch = () => { if (q.trim()) hook.search(q); };
  const handleKey = (e) => { if (e.key === "Enter") handleSearch(); };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: "var(--bg1)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            padding: "8px 12px",
            color: "var(--text)",
            fontSize: 13,
            fontFamily: "JetBrains Mono, monospace",
            outline: "none",
          }}
        />
        <button
          onClick={handleSearch}
          disabled={hook.loading}
          style={{
            padding: "8px 16px",
            background: hook.loading ? "var(--bg3)" : "var(--teal)",
            color: hook.loading ? "var(--t2)" : "var(--bg)",
            border: "none",
            borderRadius: "var(--r)",
            fontSize: 13,
            fontWeight: 700,
            cursor: hook.loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {hook.loading ? "Searching…" : "Search"}
        </button>
        {hook.results.length > 0 && (
          <button
            onClick={hook.clear}
            style={{
              padding: "8px 12px",
              background: "transparent",
              color: "var(--t2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r)",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {hook.error && (
        <div style={{ padding: "10px 14px", background: "#fb718520", border: "1px solid #fb718544", borderRadius: "var(--r)", fontSize: 13, color: "#fb7185", marginBottom: 10 }}>
          ⚠ {hook.error}
        </div>
      )}

      {hook.results.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontSize: 11, color: "var(--t3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {hook.results.length} results for "{hook.lastQuery}"
          </p>
          {hook.results.map((art) => (
            <div key={art.pmid} style={{
              background: "var(--bg1)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r)",
              padding: "12px 14px",
            }}>
              <a href={art.url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", display: "block", marginBottom: 4, lineHeight: 1.4 }}>
                {art.title}
              </a>
              <div style={{ fontSize: 12, color: "var(--t2)" }}>
                {art.authors && <span>{art.authors} · </span>}
                <span style={{ fontStyle: "italic" }}>{art.journal}</span>
                {art.year && <span> ({art.year})</span>}
                <span style={{ marginLeft: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--t3)" }}>
                  PMID {art.pmid}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!hook.loading && hook.results.length === 0 && hook.lastQuery && (
        <p style={{ fontSize: 13, color: "var(--t3)", textAlign: "center", padding: "20px 0" }}>
          No results found.
        </p>
      )}
    </div>
  );
}

// ── Tab Bar ──────────────────────────────────────────────────────────────────

export function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{
      display: "flex",
      gap: 4,
      flexWrap: "wrap",
      padding: "0 0 2px",
    }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: "7px 16px",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "inherit",
            letterSpacing: "0.03em",
            background: active === t.id ? "var(--teal)" : "var(--bg3)",
            color: active === t.id ? "var(--bg)" : "var(--t2)",
            transition: "all 0.18s",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
