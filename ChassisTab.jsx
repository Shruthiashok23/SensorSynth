import React, { useState } from "react";
import { CHASSIS } from "../data/biodata.js";
import { Card, SectionHeader, Badge, PubMedPanel } from "./UI.jsx";
import { usePubMed } from "../hooks/usePubMed.js";

export function ChassisTab({ spec }) {
  const [selectedId, setSelectedId] = useState(spec.hostId);
  const pubmed = usePubMed();
  const selected = CHASSIS.find((c) => c.id === selectedId) ?? CHASSIS[0];
  const selectedStrain = selected.strains.find((s) => s.id === spec.strainId) ?? selected.strains[0];

  return (
    <div>
      <SectionHeader
        step="2"
        title="Chassis prediction analysis"
        subtitle="Literature-backed host feature vectors. Select a chassis to explore properties, strains, and search supporting papers."
      />

      {/* Chassis selector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {CHASSIS.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            style={{
              padding: "14px 16px",
              borderRadius: "var(--r2)",
              border: `1.5px solid ${selectedId === c.id ? c.color : "var(--border)"}`,
              background: selectedId === c.id ? c.colorDim : "var(--bg2)",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.18s",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, marginBottom: 6 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: selectedId === c.id ? c.color : "var(--text)", marginBottom: 2 }}>{c.full}</div>
            <div style={{ fontSize: 11, color: "var(--t3)" }}>Burden: {c.burdenTolerance} · Growth: {c.doublingTime}h/doubling</div>
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Feature vector */}
        <Card accent={selected.color + "44"}>
          <p style={{ fontSize: 12, fontWeight: 700, color: selected.color, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
            Feature vector — {selected.full}
          </p>
          <p style={{ fontSize: 13, color: "var(--t2)", marginBottom: 14, lineHeight: 1.6 }}>{selected.description}</p>
          {[
            ["Doubling time",     `${selected.doublingTime}h`],
            ["Native CRISPR",     selected.nativeCRISPR ? "Yes" : "No"],
            ["Transcription",     selected.txMachinery],
            ["Plasmid systems",   selected.plasmidSystems],
            ["Burden tolerance",  selected.burdenTolerance.toUpperCase()],
            ["Burden score",      selected.burdenScore.toFixed(2)],
            ["Domain",            selected.prokaryotic ? "Prokaryote" : "Eukaryote"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 12, color: "var(--t3)", letterSpacing: "0.04em", textTransform: "uppercase", flexShrink: 0, marginRight: 12 }}>{k}</span>
              <span style={{ fontSize: 12, color: "var(--text)", fontFamily: "JetBrains Mono, monospace", textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </Card>

        {/* Strain sub-layer */}
        <Card>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t2)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
            Strain sub-layer
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {selected.strains.map((s) => (
              <div
                key={s.id}
                style={{
                  padding: "10px 12px",
                  borderRadius: "var(--r)",
                  background: "var(--bg1)",
                  border: `1px solid ${(spec.strainId === s.id && spec.hostId === selected.id) ? selected.color + "66" : "var(--border)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", fontFamily: "JetBrains Mono, monospace" }}>{s.name}</span>
                  {spec.strainId === s.id && spec.hostId === selected.id && (
                    <Badge label="Selected" color={selected.color} />
                  )}
                </div>
                <p style={{ fontSize: 12, color: "var(--t2)", margin: 0, lineHeight: 1.5 }}>{s.notes}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* PubMed search */}
      <Card>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t2)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
          PubMed search — chassis properties
        </p>
        <p style={{ fontSize: 13, color: "var(--t3)", marginBottom: 12, lineHeight: 1.6 }}>
          Search PubMed for papers characterizing {selected.full} expression systems, metabolic burden, and biosensor compatibility. Results populate your chassis feature database with literature-backed evidence.
        </p>
        <PubMedPanel
          hook={pubmed}
          defaultQuery={selected.pubmedQuery}
          placeholder={`Search chassis papers for ${selected.name}…`}
        />
      </Card>
    </div>
  );
}
