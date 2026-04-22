import React, { useState } from "react";
import { TOOLS_REGISTRY } from "../data/biodata.js";
import { Card, SectionHeader, PubMedPanel } from "./UI.jsx";
import { usePubMed } from "../hooks/usePubMed.js";

const CATEGORIES = ["All", ...Array.from(new Set(TOOLS_REGISTRY.map((t) => t.category)))];

const SCOPE_QUERIES = [
  { label: "Chassis compatibility gaps",    query: "biosensor genetic circuit chassis compatibility mismatch synthetic biology" },
  { label: "Design automation tools",       query: "automated biosensor design genetic circuit selection tool" },
  { label: "Strain-specific optimization",  query: "strain selection biosensor performance E. coli subtilis yeast" },
  { label: "Metabolic burden prediction",   query: "metabolic burden prediction genetic burden synthetic biology chassis" },
  { label: "Microfluidics integration",     query: "biosensor microfluidics genetic circuit point of care" },
];

export function ToolsTab() {
  const [catFilter, setCatFilter] = useState("All");
  const pubmed = usePubMed();
  const [selectedQuery, setSelectedQuery] = useState(SCOPE_QUERIES[0].query);

  const filtered = catFilter === "All" ? TOOLS_REGISTRY : TOOLS_REGISTRY.filter((t) => t.category === catFilter);

  const categoryColor = {
    "Circuit design":    "#00e5c8",
    "Parts registry":    "#a78bfa",
    "Modeling":          "#fbbf24",
    "Metabolic models":  "#34d399",
    "RNA tools":         "#fb7185",
    "CRISPR tools":      "#60a5fa",
    "Lab automation":    "#ff6b35",
    "Databases":         "#94a3b8",
  };

  return (
    <div>
      <SectionHeader
        step="6"
        title="Tools & scope expansion"
        subtitle="Open-source tool registry situates your project in the real tooling ecosystem. PubMed scope search defines evidence-based future directions."
      />

      {/* Tool registry */}
      <Card style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>
          Open-source tool registry
        </p>

        {/* Category filters */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              style={{
                padding: "5px 12px",
                borderRadius: 999,
                border: `1px solid ${catFilter === cat ? "var(--teal)" : "var(--border)"}`,
                background: catFilter === cat ? "#00e5c820" : "transparent",
                color: catFilter === cat ? "var(--teal)" : "var(--t2)",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {filtered.map((tool) => {
            const color = categoryColor[tool.category] ?? "var(--t2)";
            return (
              <div key={tool.name} style={{
                padding: "12px 14px",
                background: "var(--bg1)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r)",
                borderLeft: `2px solid ${color}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, fontWeight: 700, color }}>
                    {tool.name} ↗
                  </a>
                  <span style={{ fontSize: 10, padding: "2px 7px", background: color + "18", color, borderRadius: 4, fontWeight: 700, whiteSpace: "nowrap" }}>
                    {tool.category}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "var(--t2)", lineHeight: 1.5 }}>{tool.desc}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* PubMed scope expansion */}
      <Card>
        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
          PubMed search — scope expansion & future directions
        </p>
        <p style={{ fontSize: 13, color: "var(--t3)", lineHeight: 1.6, marginBottom: 14 }}>
          Use these targeted queries to survey the literature for gaps your tool addresses, and to identify extensions such as microfluidics integration, metabolic pathway modeling, and strain-level optimization.
        </p>

        {/* Preset queries */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {SCOPE_QUERIES.map((sq) => (
            <button
              key={sq.label}
              onClick={() => { setSelectedQuery(sq.query); pubmed.search(sq.query); }}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--r)",
                border: `1px solid ${selectedQuery === sq.query ? "var(--violet)" : "var(--border)"}`,
                background: selectedQuery === sq.query ? "#a78bfa18" : "transparent",
                color: selectedQuery === sq.query ? "var(--violet)" : "var(--t2)",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {sq.label}
            </button>
          ))}
        </div>

        <PubMedPanel
          hook={pubmed}
          defaultQuery={selectedQuery}
          placeholder="Search for scope expansion topics…"
        />

        {/* Future directions box */}
        <div style={{ marginTop: 16, padding: "14px 16px", background: "var(--bg3)", borderRadius: "var(--r)", borderLeft: "3px solid var(--violet)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--violet)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>
            Future directions (defined by scope search)
          </p>
          {[
            ["Microfluidics integration", "The compatibility model is extensible to microfluidic device constraints — droplet volume, surface binding kinetics, and flow-cell geometry. This would require a new 'device feature vector' layer below the chassis layer."],
            ["Metabolic pathway prediction", "Metabolite crosstalk between the sensor and host metabolism can be modeled via flux balance analysis (FBA) using COBRApy and genome-scale metabolic models (GEMs). This addresses host metabolic burden at a pathway level rather than heuristically."],
            ["Mammalian chassis support", "Extending the chassis model to HEK293T, CHO, and primary cell lines would enable therapeutic biosensor applications. Requires characterization of mammalian promoter libraries and transposon-based integration systems."],
          ].map(([title, body]) => (
            <div key={title} style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{title}</p>
              <p style={{ fontSize: 12, color: "var(--t2)", margin: 0, lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
