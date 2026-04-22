# SensorSynth

**Compatibility-Aware Automated Sensor Architecture & Chassis Selection Engine**

EC/BE 552 · Shruthi Ashok · Rajarajan Thirunindrayur · Boston University

---

## What it does

SensorSynth takes a structured biosensor specification and outputs ranked genetic circuit architectures with compatibility scores, literature-backed capability data, and design recommendations.

**Core novelty:** Architecture–chassis compatibility modeling — formalizing which sensor architectures work in which host organisms, grounded in live PubMed search.

---

## Pipeline

```
User Sensor Specification
        ↓
  Specification Encoder
        ↓               ↓
Architecture         Chassis Feature Model
Capability Model       (+ strain sub-layer)
 [PubMed-backed]        [PubMed-backed]
        ↓               ↓
     Compatibility Index
   Score = spec_match × arch_cap × host_compat − burden_penalty
        ↓
  Multi-Objective Ranking Engine
        ↓
  Explainability Layer → Design Recommendation + Tool Links
```

---

## Features

| Tab | What it does |
|-----|-------------|
| Sensor spec | Structured input: analyte, threshold, fold-change, response time, host + strain |
| Chassis analysis | Feature vectors for 3 chassis with strain sub-layer + live PubMed search |
| Architecture DB | 5 architectures with mechanism, parts, lit examples + live PubMed search |
| Score matrix | Full chassis × architecture compatibility matrix with per-component breakdown |
| Synthesizer output | Ranked candidates, parts, predicted response curves, explainability text |
| Tools & scope | Open-source tool registry + PubMed scope expansion → future directions |
| Validation | Literature-based concordance analysis (6 published cases) |

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview build locally
```

---

## Deploy to Vercel (zero config — recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at vercel.com — auto-detects Vite.

---

## Deploy to GitHub Pages

1. `npm install --save-dev gh-pages`
2. Add to `vite.config.js`: `base: '/sensorsynth/'`
3. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
4. `npm run build && npm run deploy`

---

## Scoring formula

```
Score = (DynFit × 0.35) + (BurdenFit × 0.30) + (RespFit × 0.25) + (ChassisFit × 0.10)
```

Weights justified by Cardinale & Arkin 2012 (Nat Chem Biol) — survey of biosensor design criteria priority in synthetic biology literature.

---

## Stack

React 18 · Vite · NCBI E-utilities (live PubMed, no API key needed) · No backend
