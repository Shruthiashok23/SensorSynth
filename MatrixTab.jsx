import React from "react";
import { CHASSIS, ARCHITECTURES, computeScore, getConfidence } from "../data/biodata.js";
import { Card, SectionHeader, Badge, DataTable, ScoreBar } from "./UI.jsx";

export function MatrixTab({ spec }) {
  const selectedChassis = CHASSIS.find((c) => c.id === spec.hostId);

  return (
    <div>
      <SectionHeader
        step="4"
        title="Compatibility score matrix"
        subtitle={`Scores (0–100) for every architecture × chassis pair. Current spec: ${spec.foldChange}× fold-change, ${spec.maxResponseTime}h max response.`}
      />

      {/* Full matrix */}
      <Card style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>
          All chassis × all architectures
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, fontFamily: "JetBrains Mono, monospace" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px 12px", textAlign: "left", color: "var(--teal)", fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", borderBottom: "1px solid var(--border)", fontWeight: 700 }}>Architecture</th>
                {CHASSIS.map((c) => (
                  <th key={c.id} style={{ padding: "8px 12px", textAlign: "center", borderBottom: "1px solid var(--border)", color: c.color, fontSize: 10, letterSpacing: "0.05em", fontWeight: 700, textTransform: "uppercase" }}>
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ARCHITECTURES.map((arch, ri) => (
                <tr key={arch.id} style={{ background: ri % 2 === 0 ? "transparent" : "var(--bg1)" }}>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: arch.color, flexShrink: 0 }} />
                      <span style={{ color: "var(--text)", fontWeight: 600 }}>{arch.shortName}</span>
                    </div>
                  </td>
                  {CHASSIS.map((c) => {
                    const s = computeScore(arch, c, spec);
                    const conf = getConfidence(s.total);
                    return (
                      <td key={c.id} style={{ padding: "10px 12px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: conf.color, lineHeight: 1.1 }}>{s.total}</div>
                        <div style={{ fontSize: 10, color: conf.color, opacity: 0.7, marginTop: 2 }}>{conf.label}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Breakdown for selected chassis */}
      <Card style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>
          Score breakdown — {selectedChassis?.full}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[...ARCHITECTURES]
            .map((arch) => ({ arch, s: computeScore(arch, selectedChassis, spec) }))
            .sort((a, b) => b.s.total - a.s.total)
            .map(({ arch, s }, rank) => {
              const conf = getConfidence(s.total);
              return (
                <div key={arch.id} style={{
                  padding: "14px 16px",
                  borderRadius: "var(--r)",
                  background: "var(--bg1)",
                  border: `1px solid ${rank === 0 ? arch.color + "44" : "var(--border)"}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        width: 24, height: 24, borderRadius: "50%",
                        background: rank === 0 ? arch.color : "var(--bg3)",
                        color: rank === 0 ? "var(--bg)" : "var(--t3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 800, flexShrink: 0,
                      }}>{rank + 1}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{arch.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 22, fontWeight: 800, color: conf.color, fontFamily: "JetBrains Mono, monospace" }}>{s.total}</span>
                      <Badge label={conf.label} color={conf.color} bg={conf.bg} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                    {[
                      ["Dynamic range (35%)", s.dynFit,     "#00e5c8"],
                      ["Burden fit (30%)",    s.burdenFit,  "#34d399"],
                      ["Response time (25%)", s.respFit,    "#fbbf24"],
                      ["Chassis compat (10%)",s.chassisFit, "#a78bfa"],
                    ].map(([label, val, color]) => (
                      <div key={label}>
                        <ScoreBar label={label} value={val} color={color} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Formula explanation */}
        <div style={{ marginTop: 14, padding: "12px 14px", background: "var(--bg3)", borderRadius: "var(--r)", borderLeft: "3px solid var(--teal)" }}>
          <p style={{ margin: 0, fontSize: 12, color: "var(--t2)", fontFamily: "JetBrains Mono, monospace", lineHeight: 1.8 }}>
            Score = (DynFit × 0.35) + (BurdenFit × 0.30) + (RespFit × 0.25) + (ChassisFit × 0.10)<br />
            <span style={{ color: "var(--t3)" }}>Weights reflect biosensor design priorities: fold-change {">"} burden {">"} speed {">"} chassis bonus. Justified by literature frequency of each criterion.</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
