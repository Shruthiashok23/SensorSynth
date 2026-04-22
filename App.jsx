import { useState } from "react";
import { CHASSIS } from "./data/biodata.js";
import { TabBar, Badge } from "./components/UI.jsx";
import { SpecTab }         from "./components/SpecTab.jsx";
import { ChassisTab }      from "./components/ChassisTab.jsx";
import { ArchitectureTab } from "./components/ArchitectureTab.jsx";
import { MatrixTab }       from "./components/MatrixTab.jsx";
import { SynthesizerTab }  from "./components/SynthesizerTab.jsx";
import { ToolsTab }        from "./components/ToolsTab.jsx";
import { ValidationTab }   from "./components/ValidationTab.jsx";

const DEFAULT_SPEC = {
  targetMolecule:    "Arsenic",
  targetType:        "Small molecule (inorganic ion)",
  detectionThreshold: 10,
  thresholdUnit:     "ppb",
  foldChange:        20,
  maxResponseTime:   2,
  outputType:        "Fluorescence (GFP/mCherry)",
  environment:       "Aqueous solution",
  hostId:            "ecoli",
  strainId:          "mg1655",
};

const TABS = [
  { id: "spec",     label: "Sensor spec" },
  { id: "chassis",  label: "Chassis analysis" },
  { id: "arch",     label: "Architecture DB" },
  { id: "matrix",   label: "Score matrix" },
  { id: "synth",    label: "Synthesizer" },
  { id: "tools",    label: "Tools & scope" },
  { id: "validate", label: "Validation" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("spec");
  const [spec, setSpec]           = useState(DEFAULT_SPEC);

  const chassis = CHASSIS.find((c) => c.id === spec.hostId);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── Top nav ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(7,11,20,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        padding: "14px 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Brand row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="14" cy="14" r="13" stroke="#00e5c8" strokeWidth="1.2" />
                <circle cx="14" cy="14" r="6" fill="#00e5c820" stroke="#00e5c8" strokeWidth="1" />
                <circle cx="14" cy="14" r="2.5" fill="#00e5c8" />
                <path d="M14 1v5M14 22v5M1 14h5M22 14h5" stroke="#00e5c8" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              </svg>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h1 style={{ fontSize: 17, fontWeight: 900, color: "var(--text)", letterSpacing: "-0.02em", margin: 0 }}>
                    SensorSynth
                  </h1>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
                    background: "#00e5c818", color: "var(--teal)", border: "1px solid #00e5c830", letterSpacing: "0.05em" }}>
                    EC/BE 552
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: "var(--t3)", letterSpacing: "0.02em" }}>
                  Compatibility-Aware Automated Sensor Architecture &amp; Chassis Selection Engine
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: "var(--t3)" }}>Host:</span>
              <Badge label={chassis?.name ?? "—"} color={chassis?.color ?? "var(--t2)"} />
              <span style={{ fontSize: 11, color: "var(--t3)", marginLeft: 4 }}>Analyte:</span>
              <Badge label={spec.targetMolecule} color="var(--teal)" />
            </div>
          </div>

          {/* Tab bar */}
          <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={{ flex: 1, padding: "28px 24px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {activeTab === "spec"     && <SpecTab spec={spec} setSpec={setSpec} />}
          {activeTab === "chassis"  && <ChassisTab spec={spec} />}
          {activeTab === "arch"     && <ArchitectureTab />}
          {activeTab === "matrix"   && <MatrixTab spec={spec} />}
          {activeTab === "synth"    && <SynthesizerTab spec={spec} />}
          {activeTab === "tools"    && <ToolsTab />}
          {activeTab === "validate" && <ValidationTab spec={spec} />}

        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "14px 24px",
        textAlign: "center",
        fontSize: 11,
        color: "var(--t3)",
      }}>
        SensorSynth · Shruthi Ashok, Rajarajan Thirunindrayur · EC/BE 552 · BU · 2025
        <span style={{ marginLeft: 16, color: "var(--border)" }}>|</span>
        <a href="https://pubmed.ncbi.nlm.nih.gov" target="_blank" rel="noopener noreferrer"
          style={{ marginLeft: 16, color: "var(--t3)" }}>PubMed</a>
        <span style={{ marginLeft: 8, color: "var(--border)" }}>|</span>
        <a href="https://synbiohub.org" target="_blank" rel="noopener noreferrer"
          style={{ marginLeft: 8, color: "var(--t3)" }}>SynBioHub</a>
        <span style={{ marginLeft: 8, color: "var(--border)" }}>|</span>
        <a href="https://cellocad.org" target="_blank" rel="noopener noreferrer"
          style={{ marginLeft: 8, color: "var(--t3)" }}>Cello</a>
      </footer>
    </div>
  );
}
