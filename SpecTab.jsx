import React from "react";
import { CHASSIS } from "../data/biodata.js";
import { Card, SectionHeader } from "./UI.jsx";

const inputStyle = {
  background: "var(--bg1)",
  border: "1px solid var(--border)",
  borderRadius: "var(--r)",
  padding: "9px 12px",
  color: "var(--text)",
  fontSize: 13,
  fontFamily: "JetBrains Mono, monospace",
  width: "100%",
  outline: "none",
};

const labelStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: "var(--t3)",
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: 5,
};

const ANALYTE_TYPES = [
  "Small molecule (organic)",
  "Small molecule (inorganic ion)",
  "Metabolite",
  "Quorum sensing molecule",
  "Hormone / steroid",
  "Protein ligand",
  "Nucleic acid",
  "Environmental pollutant",
];

const ENVIRONMENTS = ["Aqueous solution","Soil / sediment","Gut / GI tract","Blood / serum","Air / gas phase","Industrial effluent"];
const OUTPUT_TYPES = ["Fluorescence (GFP/mCherry)","Luminescence (luciferase)","Colorimetric (LacZ / enzyme)","Electrochemical","Growth-based","Transcriptional (reporter RNA)"];
const UNITS = ["nM","µM","mM","ppb","ppm","pg/mL","ng/mL","µg/mL"];

export function SpecTab({ spec, setSpec }) {
  const selectedChassis = CHASSIS.find((c) => c.id === spec.hostId);

  const update = (key, val) => setSpec((s) => ({ ...s, [key]: val }));

  return (
    <div>
      <SectionHeader
        step="1"
        title="Sensor Specification"
        subtitle="Define your target analyte and performance requirements. These drive the entire pipeline."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* LEFT: target */}
        <Card>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t2)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
            Target analyte
          </p>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Molecule name</label>
            <input
              style={inputStyle}
              value={spec.targetMolecule}
              onChange={(e) => update("targetMolecule", e.target.value)}
              placeholder="e.g. Arsenic, IPTG, Glucose…"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Molecule type</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={spec.targetType} onChange={(e) => update("targetType", e.target.value)}>
              {ANALYTE_TYPES.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8 }}>
            <div>
              <label style={labelStyle}>Detection threshold</label>
              <input type="number" style={inputStyle} value={spec.detectionThreshold} onChange={(e) => update("detectionThreshold", parseFloat(e.target.value))} />
            </div>
            <div>
              <label style={labelStyle}>Unit</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={spec.thresholdUnit} onChange={(e) => update("thresholdUnit", e.target.value)}>
                {UNITS.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </Card>

        {/* RIGHT: performance */}
        <Card>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t2)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
            Performance requirements
          </p>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Required fold-change</label>
            <input type="range" min={2} max={200} value={spec.foldChange}
              onChange={(e) => update("foldChange", parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "var(--teal)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 11, color: "var(--t3)" }}>2×</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "var(--teal)", fontFamily: "JetBrains Mono, monospace" }}>{spec.foldChange}×</span>
              <span style={{ fontSize: 11, color: "var(--t3)" }}>200×</span>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Max response time (hours)</label>
            <input type="range" min={0.5} max={12} step={0.5} value={spec.maxResponseTime}
              onChange={(e) => update("maxResponseTime", parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "var(--coral)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 11, color: "var(--t3)" }}>0.5h</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "var(--coral)", fontFamily: "JetBrains Mono, monospace" }}>{spec.maxResponseTime}h</span>
              <span style={{ fontSize: 11, color: "var(--t3)" }}>12h</span>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Output type</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={spec.outputType} onChange={(e) => update("outputType", e.target.value)}>
              {OUTPUT_TYPES.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Detection environment</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={spec.environment} onChange={(e) => update("environment", e.target.value)}>
              {ENVIRONMENTS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </Card>
      </div>

      {/* Host selection */}
      <Card style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--t2)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
          Host organism
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 14 }}>
          {CHASSIS.map((c) => (
            <button
              key={c.id}
              onClick={() => update("hostId", c.id)}
              style={{
                padding: "12px 14px",
                borderRadius: "var(--r)",
                border: `1.5px solid ${spec.hostId === c.id ? c.color : "var(--border)"}`,
                background: spec.hostId === c.id ? c.colorDim : "var(--bg1)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.18s",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: spec.hostId === c.id ? c.color : "var(--text)", marginBottom: 2 }}>{c.full}</div>
              <div style={{ fontSize: 11, color: "var(--t3)" }}>Doubling: {c.doublingTime}h · Burden: {c.burdenTolerance}</div>
            </button>
          ))}
        </div>

        {/* Strain selector */}
        {selectedChassis && (
          <div>
            <label style={labelStyle}>Strain</label>
            <select
              style={{ ...inputStyle, cursor: "pointer" }}
              value={spec.strainId}
              onChange={(e) => update("strainId", e.target.value)}
            >
              {selectedChassis.strains.map((s) => (
                <option key={s.id} value={s.id}>{s.name} — {s.notes}</option>
              ))}
            </select>
          </div>
        )}
      </Card>

      {/* JSON preview */}
      <Card>
        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 10 }}>
          Specification vector (JSON)
        </p>
        <pre style={{
          margin: 0, fontSize: 12, color: "var(--t2)",
          background: "var(--bg1)", padding: "14px 16px",
          borderRadius: "var(--r)", overflowX: "auto",
          fontFamily: "JetBrains Mono, monospace", lineHeight: 1.75,
        }}>
          {JSON.stringify({
            targetMolecule: spec.targetMolecule,
            targetType: spec.targetType,
            detectionThreshold: `${spec.detectionThreshold} ${spec.thresholdUnit}`,
            requiredFoldChange: `${spec.foldChange}×`,
            maxResponseTime: `${spec.maxResponseTime}h`,
            outputType: spec.outputType,
            environment: spec.environment,
            host: selectedChassis?.full,
            strain: selectedChassis?.strains.find((s) => s.id === spec.strainId)?.name,
          }, null, 2)}
        </pre>
      </Card>
    </div>
  );
}
