import React, { useState } from "react";
import { ARCHITECTURES } from "../data/biodata.js";
import { Card, SectionHeader, Badge, PubMedPanel } from "./UI.jsx";
import { usePubMed } from "../hooks/usePubMed.js";

const levelColor = { high: "#34d399", medium: "#fbbf24", low: "#60a5fa" };

export function ArchitectureTab() {
  const [selectedId, setSelectedId] = useState("crispri");
  const pubmed = usePubMed();
  const arch = ARCHITECTURES.find((a) => a.id === selectedId);

  return (
    <div>
      <SectionHeader
        step="3"
        title="Architecture capability model"
        subtitle="Five validated genetic sensor architectures. Scores are grounded in published literature — search PubMed per architecture to populate your evidence base."
      />

      {/* Architecture selector */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {ARCHITECTURES.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelectedId(a.id)}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: `1.5px solid ${selectedId === a.id ? a.color : "var(--border)"}`,
              background: selectedId === a.id ? a.colorDim : "var(--bg2)",
              color: selectedId === a.id ? a.color : "var(--t2)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "inherit",
              transition: "all 0.18s",
            }}
          >
            {a.shortName}
          </button>
        ))}
      </div>

      {arch && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Header card */}
          <Card accent={arch.color + "44"} style={{ borderLeft: `3px solid ${arch.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>{arch.name}</h3>
                <p style={{ margin: 0, fontSize: 13, color: "var(--t2)", lineHeight: 1.6 }}>{arch.description}</p>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Badge label={`Range: ${arch.dynamicRange}`} color={levelColor[arch.dynamicRange]} />
                <Badge label={`Burden: ${arch.burden}`} color={arch.burdenCost > 0.6 ? "#fb7185" : "#34d399"} />
                <Badge label={`Speed: ${arch.responseTime}`} color={arch.responseScore > 0.75 ? "#34d399" : "#fbbf24"} />
              </div>
            </div>
            <div style={{ background: "var(--bg1)", borderRadius: "var(--r)", padding: "12px 14px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Mechanism</p>
              <p style={{ fontSize: 13, color: "var(--t2)", margin: 0, lineHeight: 1.7 }}>{arch.mechanismDetail}</p>
            </div>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Scores */}
            <Card>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>Capability scores</p>
              {[
                ["Dynamic range score", arch.dynamicScore, "#00e5c8"],
                ["Burden cost",         arch.burdenCost,   "#fb7185"],
                ["Response score",      arch.responseScore, "#34d399"],
              ].map(([label, val, color]) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: "var(--t2)" }}>{label}</span>
                    <span style={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace", color }}>{(val * 100).toFixed(0)}</span>
                  </div>
                  <div style={{ height: 6, background: "var(--bg3)", borderRadius: 3 }}>
                    <div style={{ width: `${val * 100}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.4s" }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 4 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Chassis bias</p>
                <div style={{ display: "flex", gap: 8, fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}>
                  <span style={{ color: "#34d399" }}>Prokaryote +{(arch.prokaryoticBonus * 100).toFixed(0)}</span>
                  <span style={{ color: "var(--t3)" }}>|</span>
                  <span style={{ color: arch.eukaryoticAdjust < 0 ? "#fb7185" : "#34d399" }}>
                    Eukaryote {arch.eukaryoticAdjust >= 0 ? "+" : ""}{(arch.eukaryoticAdjust * 100).toFixed(0)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Parts */}
            <Card>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Suggested parts</p>
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 11, color: "var(--t3)", marginBottom: 6 }}>Promoters</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {arch.promoters.map((p) => (
                    <span key={p} style={{ padding: "3px 8px", background: "#00e5c818", color: "var(--teal)", border: "1px solid #00e5c830", borderRadius: 4, fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}>{p}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 11, color: "var(--t3)", marginBottom: 6 }}>Regulators / repressors</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {arch.repressors.map((r) => (
                    <span key={r} style={{ padding: "3px 8px", background: "#a78bfa18", color: "var(--violet)", border: "1px solid #a78bfa30", borderRadius: 4, fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}>{r}</span>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Open-source tools</p>
              {arch.openSourceTools.map((t) => (
                <div key={t.name} style={{ marginBottom: 6 }}>
                  <a href={t.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 600, color: "var(--teal)" }}>{t.name}</a>
                  <span style={{ fontSize: 12, color: "var(--t3)" }}> — {t.note}</span>
                </div>
              ))}
            </Card>
          </div>

          {/* Literature examples */}
          <Card>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Literature grounding</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {arch.litExamples.map((ex) => (
                <div key={ex.ref} style={{ padding: "10px 12px", background: "var(--bg1)", borderRadius: "var(--r)", borderLeft: `2px solid ${arch.color}` }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: arch.color, marginBottom: 4 }}>{ex.ref}</p>
                  <p style={{ fontSize: 12, color: "var(--t2)", margin: 0, lineHeight: 1.5 }}>{ex.finding}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
              PubMed search — methods
            </p>
            <PubMedPanel
              hook={pubmed}
              defaultQuery={arch.pubmedQuery}
              placeholder={`Search papers for ${arch.shortName}…`}
            />
          </Card>
        </div>
      )}
    </div>
  );
}
