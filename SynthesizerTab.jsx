import React, { useMemo } from "react";
import { CHASSIS, ARCHITECTURES, computeScore, getConfidence, generateCurveData } from "../data/biodata.js";
import { Card, SectionHeader, Badge, ScoreBar, Sparkline } from "./UI.jsx";

export function SynthesizerTab({ spec }) {
  const chassis = CHASSIS.find((c) => c.id === spec.hostId);
  const strain  = chassis?.strains.find((s) => s.id === spec.strainId) ?? chassis?.strains[0];

  const ranked = useMemo(() => {
    if (!chassis) return [];
    return ARCHITECTURES.map((arch) => ({
      arch,
      score: computeScore(arch, chassis, spec),
      curve: generateCurveData(arch, spec),
    })).sort((a, b) => b.score.total - a.score.total);
  }, [spec, chassis]);

  if (!chassis) return null;

  return (
    <div>
      <SectionHeader
        step="5"
        title="Synthesizer output"
        subtitle={`Ranked design candidates for ${spec.targetMolecule} detection in ${chassis.full} ${strain?.name ?? ""}. Live update on spec changes.`}
      />

      {/* Example walk-through banner */}
      <div style={{
        padding: "14px 18px", borderRadius: "var(--r2)", marginBottom: 20,
        background: "var(--bg3)", border: "1px solid var(--b2)",
        borderLeft: "3px solid var(--teal)",
      }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--teal)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
          Concrete example pipeline
        </p>
        <p style={{ fontSize: 13, color: "var(--t2)", margin: 0, lineHeight: 1.7 }}>
          Spec: detect <strong style={{ color: "var(--text)" }}>{spec.targetMolecule}</strong> ({spec.detectionThreshold} {spec.thresholdUnit}) in {chassis.full} ({strain?.name}),
          requiring <strong style={{ color: "var(--text)" }}>{spec.foldChange}×</strong> fold-change within <strong style={{ color: "var(--text)" }}>{spec.maxResponseTime}h</strong>.
          {" "}Formula: <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--teal)" }}>
            Score = SpecMatch × ArchCapability × HostCompatibility − BurdenPenalty
          </span>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ranked.map(({ arch, score, curve }, rank) => {
          const conf = getConfidence(score.total);
          const isTop = rank === 0;
          return (
            <Card
              key={arch.id}
              accent={isTop ? arch.color + "66" : "var(--border)"}
              style={{ background: isTop ? "var(--bg2)" : "var(--bg1)" }}
            >
              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: isTop ? arch.color : "var(--bg3)",
                    color: isTop ? "var(--bg)" : "var(--t3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize: 15,
                  }}>#{rank + 1}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>{arch.name}</div>
                    <div style={{ fontSize: 12, color: "var(--t3)", fontStyle: "italic" }}>{arch.description}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 30, fontWeight: 900, color: conf.color, fontFamily: "JetBrains Mono, monospace", lineHeight: 1 }}>{score.total}</div>
                    <div style={{ fontSize: 10, color: "var(--t3)" }}>/ 100</div>
                  </div>
                  <Badge label={`${conf.label} confidence`} color={conf.color} bg={conf.bg} />
                </div>
              </div>

              {/* Score bars */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 14 }}>
                {[
                  ["Dynamic range",  score.dynFit,     "#00e5c8"],
                  ["Burden fit",     score.burdenFit,  "#34d399"],
                  ["Response time",  score.respFit,    "#fbbf24"],
                  ["Chassis compat", score.chassisFit, "#a78bfa"],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "10px 12px" }}>
                    <ScoreBar label={label} value={val} color={color} />
                  </div>
                ))}
              </div>

              {/* Parts + curve */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "12px 14px" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>Suggested parts</p>
                  <p style={{ fontSize: 10, color: "var(--t3)", marginBottom: 4 }}>Promoters</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                    {arch.promoters.map((p) => (
                      <span key={p} style={{ padding: "2px 7px", background: "#00e5c811", color: "var(--teal)", border: "1px solid #00e5c828", borderRadius: 4, fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}>{p}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 10, color: "var(--t3)", marginBottom: 4 }}>Regulators</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {arch.repressors.map((r) => (
                      <span key={r} style={{ padding: "2px 7px", background: "#a78bfa11", color: "var(--violet)", border: "1px solid #a78bfa28", borderRadius: 4, fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}>{r}</span>
                    ))}
                  </div>
                </div>

                <div style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "12px 14px" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>
                    Predicted response — {spec.targetMolecule}
                  </p>
                  <Sparkline points={curve} color={arch.color} width={180} height={56} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                    <span style={{ fontSize: 10, color: "var(--t3)" }}>0h → {(spec.maxResponseTime * 1.5).toFixed(1)}h</span>
                    <span style={{ fontSize: 10, color: arch.color }}>≈{spec.foldChange}× max</span>
                  </div>
                </div>
              </div>

              {/* Open-source tools */}
              <div style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "12px 14px" }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>
                  Recommended tools
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {arch.openSourceTools.map((t) => (
                    <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 12, color: "var(--blue)", fontWeight: 600 }}>
                      {t.name} ↗
                    </a>
                  ))}
                </div>
              </div>

              {/* Explainability text */}
              {isTop && (
                <div style={{ marginTop: 12, padding: "12px 14px", background: "#00e5c811", borderRadius: "var(--r)", border: "1px solid #00e5c830" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "var(--teal)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                    Explainability — why this design ranks #1
                  </p>
                  <p style={{ fontSize: 13, color: "var(--t2)", margin: 0, lineHeight: 1.7 }}>
                    <strong style={{ color: "var(--text)" }}>{arch.name}</strong> in <strong style={{ color: "var(--text)" }}>{chassis.full} {strain?.name}</strong> scores highest
                    because: {arch.dynamicScore > 0.75 ? "high dynamic range capability" : "adequate dynamic range"};
                    {chassis.burdenScore - arch.burdenCost > 0.3 ? " burden is well within host tolerance;" : " burden is manageable but monitored;"}
                    {arch.responseTime === "fast" ? " sub-hour response matches spec;" : " response time aligns with requirements;"}
                    {chassis.prokaryotic && arch.prokaryoticBonus > 0.1 ? " and strong prokaryotic chassis compatibility. " : " "}
                    Suggested next step: retrieve {arch.promoters[0]} + {arch.repressors[0]} from SynBioHub and model in iBioSim.
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
