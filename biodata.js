// ─────────────────────────────────────────────────────────────────────────────
// CHASSIS DATA
// ─────────────────────────────────────────────────────────────────────────────

export const CHASSIS = [
  {
    id: "ecoli",
    name: "E. coli",
    full: "Escherichia coli",
    color: "#00e5c8",
    colorDim: "#00e5c822",
    doublingTime: 0.33,
    nativeCRISPR: false,
    txMachinery: "Prokaryotic — σ70, σ32, σS, σ54",
    plasmidSystems: "High-copy pUC19, Low-copy pSC101, Chromosomal (λ att)",
    burdenTolerance: "high",
    burdenScore: 1.0,
    prokaryotic: true,
    description: "The workhorse of synthetic biology. Fastest growth, richest genetic toolkit, highest burden tolerance.",
    strains: [
      { id: "mg1655", name: "MG1655", notes: "Wild-type K-12, recA+, minimal genome modifications. Best for regulatory studies." },
      { id: "dh5a",   name: "DH5α",   notes: "recA⁻, endA⁻. Standard cloning strain; poor expression host." },
      { id: "bl21de3",name: "BL21(DE3)", notes: "T7 RNAP chromosomal insert. Optimal for high-yield T7-driven expression." },
      { id: "nissle",  name: "Nissle 1917", notes: "Probiotic strain. Used for gut-sensing biosensor applications." },
    ],
    pubmedQuery: "Escherichia coli metabolic burden synthetic biology expression system",
  },
  {
    id: "bsubtilis",
    name: "B. subtilis",
    full: "Bacillus subtilis",
    color: "#ff6b35",
    colorDim: "#ff6b3522",
    doublingTime: 0.5,
    nativeCRISPR: false,
    txMachinery: "Prokaryotic — σA, σB, σH, σF (sporulation-specific)",
    plasmidSystems: "Low-copy pHT01, Integrative amyE/thrC loci",
    burdenTolerance: "medium",
    burdenScore: 0.65,
    prokaryotic: true,
    description: "Gram-positive model organism. Natural competence, strong secretion. Good for food/soil sensing applications.",
    strains: [
      { id: "168",   name: "168",   notes: "Standard lab strain (trpC2). Most genetic tools validated here." },
      { id: "py79",  name: "PY79",  notes: "Prototroph derivative. Better for sporulation and regulatory studies." },
      { id: "wb800", name: "WB800", notes: "8 protease knockouts. Superior secretion host for biosensor output proteins." },
    ],
    pubmedQuery: "Bacillus subtilis gene expression burden tolerance biosensor",
  },
  {
    id: "scerevisiae",
    name: "S. cerevisiae",
    full: "Saccharomyces cerevisiae",
    color: "#a78bfa",
    colorDim: "#a78bfa22",
    doublingTime: 1.5,
    nativeCRISPR: false,
    txMachinery: "Eukaryotic — RNA Pol II, TBP/TFIID, TATA-box dependent",
    plasmidSystems: "2μ (high-copy, ~40 copies), CEN/ARS (low-copy, 1–3), δ-integration",
    burdenTolerance: "medium",
    burdenScore: 0.6,
    prokaryotic: false,
    description: "Eukaryotic model with post-translational machinery. Ideal for detecting eukaryotic signals, hormones, and complex metabolites.",
    strains: [
      { id: "by4741", name: "BY4741", notes: "Standard haploid S288C derivative. Best characterized for synthetic biology." },
      { id: "w303",   name: "W303",   notes: "Alternative genetic background. Higher transformation efficiency." },
      { id: "cen_pk", name: "CEN.PK", notes: "Optimized for metabolic engineering; glucose sensing applications." },
    ],
    pubmedQuery: "Saccharomyces cerevisiae biosensor synthetic biology eukaryotic gene expression",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ARCHITECTURE DATA
// ─────────────────────────────────────────────────────────────────────────────

export const ARCHITECTURES = [
  {
    id: "crispri",
    name: "CRISPRi repression",
    shortName: "CRISPRi",
    color: "#00e5c8",
    colorDim: "#00e5c822",
    dynamicRange: "high",
    dynamicScore: 0.90,
    burden: "high",
    burdenCost: 0.82,
    responseTime: "medium",
    responseScore: 0.62,
    prokaryoticBonus: 0.12,
    eukaryoticAdjust: -0.08,
    description: "dCas9 + sgRNA complex blocks transcription at targeted promoters. Highly programmable.",
    mechanismDetail: "dCas9 (catalytically dead) binds sgRNA to form a targeting complex that physically occludes RNA polymerase at the promoter or elongation complex within the gene body.",
    promoters: ["Ptrc", "PT7", "PlacUV5", "Ptet (TetO-modified)"],
    repressors: ["dCas9-KRAB (yeast)", "dCas9-SID4x", "dCas9 (bacteria)"],
    openSourceTools: [
      { name: "Cello", url: "https://cellocad.org", note: "Logic gate design using CRISPRi parts" },
      { name: "CRISPRscan", url: "https://www.crisprscan.org", note: "sgRNA design and off-target scoring" },
    ],
    pubmedQuery: "CRISPRi biosensor fold-change response time bacteria",
    litExamples: [
      { ref: "Larson et al. 2013 Nat Protoc", finding: "~100-fold repression in E. coli, response within 30 min post-induction" },
      { ref: "Gilbert et al. 2013 Cell", finding: "Functional in S. cerevisiae with codon-optimized dCas9" },
    ],
  },
  {
    id: "riboswitch",
    name: "Riboswitch regulation",
    shortName: "Riboswitch",
    color: "#ff6b35",
    colorDim: "#ff6b3522",
    dynamicRange: "medium",
    dynamicScore: 0.58,
    burden: "low",
    burdenCost: 0.10,
    responseTime: "fast",
    responseScore: 0.92,
    prokaryoticBonus: 0.22,
    eukaryoticAdjust: -0.38,
    description: "Aptamer domain in 5′-UTR undergoes conformational change upon ligand binding, controlling translation.",
    mechanismDetail: "The aptamer folds into a specific 3D structure upon ligand binding. This conformational change either sequesters the Shine-Dalgarno sequence (OFF switch) or exposes it (ON switch), directly controlling ribosome access.",
    promoters: ["Ptrc", "PT5", "Any constitutive promoter"],
    repressors: ["N/A — aptamer-mediated translational control"],
    openSourceTools: [
      { name: "Riboswitch Designer", url: "https://github.com/nickbild/riboswitch-design", note: "Aptamer sequence generation" },
      { name: "Mfold", url: "http://www.unafold.org/mfold", note: "RNA secondary structure prediction" },
    ],
    pubmedQuery: "riboswitch biosensor sensitivity response speed E. coli",
    litExamples: [
      { ref: "Wickiser et al. 2005 Mol Cell", finding: "Sub-minute response to FMN; ~10-fold dynamic range in E. coli" },
      { ref: "Berens et al. 2015 FEBS Lett", finding: "Poor performance in S. cerevisiae — eukaryotic ribosomes bypass aptamer structure" },
    ],
  },
  {
    id: "tf_loop",
    name: "TF promoter-repressor",
    shortName: "TF Loop",
    color: "#fbbf24",
    colorDim: "#fbbf2422",
    dynamicRange: "medium",
    dynamicScore: 0.72,
    burden: "medium",
    burdenCost: 0.42,
    responseTime: "medium",
    responseScore: 0.62,
    prokaryoticBonus: 0.05,
    eukaryoticAdjust: 0.02,
    description: "Ligand-responsive transcription factor (LacI, TetR family) binds operator sites to repress/activate target gene.",
    mechanismDetail: "The TF is constitutively expressed. Upon analyte binding, conformational change reduces DNA-binding affinity (derepression) or enhances it (corepression). Operator sequences are placed upstream of the reporter gene.",
    promoters: ["PlacI", "PtetA", "ParaBAD", "Pgal1 (yeast)", "PspoIIE (B. subtilis)"],
    repressors: ["LacI", "TetR", "AraC", "GalR", "TrpR"],
    openSourceTools: [
      { name: "SynBioHub", url: "https://synbiohub.org", note: "Browse characterized TF parts (BBa_C0012 LacI)" },
      { name: "iBioSim", url: "https://async.ece.utah.edu/ibiosim", note: "Model TF-promoter ODE dynamics" },
      { name: "Cello", url: "https://cellocad.org", note: "Compose TF-based logic gates" },
    ],
    pubmedQuery: "transcription factor biosensor dynamic range E. coli LacI TetR",
    litExamples: [
      { ref: "Lutz & Bujard 1997 Nucleic Acids Res", finding: "LacI-Ptrc system: ~1000-fold induction range in E. coli" },
      { ref: "Elowitz & Leibler 2000 Nature", finding: "TetR/LacI oscillator — well-characterized in E. coli MG1655" },
    ],
  },
  {
    id: "srna",
    name: "Small RNA regulation",
    shortName: "sRNA",
    color: "#fb7185",
    colorDim: "#fb718522",
    dynamicRange: "medium",
    dynamicScore: 0.60,
    burden: "low",
    burdenCost: 0.15,
    responseTime: "fast",
    responseScore: 0.88,
    prokaryoticBonus: 0.20,
    eukaryoticAdjust: -0.22,
    description: "Non-coding sRNA base-pairs with mRNA to degrade or block translation of the target transcript.",
    mechanismDetail: "The sRNA is expressed from a ligand-responsive promoter. Upon accumulation, it recruits Hfq chaperone (bacteria) and base-pairs with the target mRNA's 5′ region, blocking ribosome binding or directing RNase E cleavage.",
    promoters: ["Ptrc", "PT7", "PryhB"],
    repressors: ["Hfq-dependent sRNA (MicF, RyhB class)", "amiRNA (yeast adaptation, limited)"],
    openSourceTools: [
      { name: "IntaRNA", url: "https://cobi.informatik.uni-freiburg.de/IntaRNA", note: "sRNA-mRNA interaction prediction" },
      { name: "CopraRNA", url: "https://github.com/BackofenLab/CopraRNA", note: "Comparative sRNA target prediction" },
    ],
    pubmedQuery: "small RNA sRNA biosensor bacteria response fold change",
    litExamples: [
      { ref: "Luo et al. 2021 ACS Synth Biol", finding: "Hfq-dependent sRNA sensor: ~50-fold dynamic range, fast response in E. coli" },
      { ref: "Na et al. 2013 Nat Chem Biol", finding: "sRNA-based metabolite sensor in E. coli — outperforms TF in response speed" },
    ],
  },
  {
    id: "tcs",
    name: "Two-component system",
    shortName: "TCS",
    color: "#34d399",
    colorDim: "#34d39922",
    dynamicRange: "high",
    dynamicScore: 0.85,
    burden: "medium",
    burdenCost: 0.48,
    responseTime: "medium",
    responseScore: 0.72,
    prokaryoticBonus: 0.22,
    eukaryoticAdjust: -0.28,
    description: "Membrane histidine kinase (HK) phosphorylates cytoplasmic response regulator (RR) to activate/repress target genes.",
    mechanismDetail: "Signal detected by HK sensor domain triggers autophosphorylation on conserved His residue. Phosphate transfers to Asp residue on cognate RR, altering its DNA-binding domain conformation to activate or repress target promoters.",
    promoters: ["PompC", "PphoA", "PphoB", "PnarG"],
    repressors: ["OmpR", "PhoB", "NarL", "EnvZ/OmpR pair"],
    openSourceTools: [
      { name: "P2CS Database", url: "http://www.p2cs.org", note: "Prokaryotic 2-component system database" },
      { name: "SynBioHub", url: "https://synbiohub.org", note: "EnvZ/OmpR characterized parts" },
    ],
    pubmedQuery: "two-component system biosensor bacteria histidine kinase response regulator",
    litExamples: [
      { ref: "Miyashiro & Goulian 2008 PNAS", finding: "EnvZ/OmpR: high sensitivity to osmolarity in E. coli, linear range ~10-fold" },
      { ref: "Kotula et al. 2014 Science", finding: "Engineered TCS for gut sensing in E. coli Nissle 1917" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCORING ENGINE
// ─────────────────────────────────────────────────────────────────────────────

export function computeScore(arch, chassis, spec) {
  // Dynamic range fit (weight 0.35)
  let dynFit = arch.dynamicScore;
  if (spec.foldChange > 50 && arch.dynamicScore < 0.8) dynFit *= 0.70;
  if (spec.foldChange < 5  && arch.dynamicScore > 0.85) dynFit = Math.min(dynFit, 0.90);

  // Burden compatibility (weight 0.30)
  const burdenFit = Math.max(0, chassis.burdenScore - arch.burdenCost * (1 - chassis.burdenScore));

  // Response time fit (weight 0.25)
  let respFit = arch.responseScore;
  if (spec.maxResponseTime < 1 && arch.responseTime === "slow")   respFit *= 0.30;
  if (spec.maxResponseTime < 2 && arch.responseTime === "medium") respFit *= 0.80;
  if (spec.maxResponseTime >= 4) respFit = Math.min(respFit + 0.08, 1.0);

  // Chassis compatibility (weight 0.10)
  const chassisAdj = chassis.prokaryotic ? arch.prokaryoticBonus : arch.eukaryoticAdjust;
  const chassisFit = Math.max(0, Math.min(1, 0.5 + chassisAdj));

  const total =
    dynFit   * 0.35 +
    burdenFit * 0.30 +
    respFit  * 0.25 +
    chassisFit * 0.10;

  return {
    total:      Math.round(Math.min(total, 1.0) * 100),
    dynFit:     Math.round(dynFit * 100),
    burdenFit:  Math.round(burdenFit * 100),
    respFit:    Math.round(respFit * 100),
    chassisFit: Math.round(chassisFit * 100),
  };
}

export function getConfidence(score) {
  if (score >= 72) return { label: "High",   color: "#34d399", bg: "#34d39920" };
  if (score >= 48) return { label: "Medium", color: "#fbbf24", bg: "#fbbf2420" };
  return             { label: "Low",    color: "#fb7185", bg: "#fb718520" };
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATED RESPONSE CURVE DATA
// ─────────────────────────────────────────────────────────────────────────────

export function generateCurveData(arch, spec) {
  const points = [];
  const tMax = spec.maxResponseTime * 1.5;
  const steps = 30;
  const kMap = { fast: 3.8, medium: 2.0, slow: 0.85 };
  const k = kMap[arch.responseTime];
  for (let i = 0; i <= steps; i++) {
    const t = parseFloat(((i / steps) * tMax).toFixed(2));
    const fold = parseFloat((spec.foldChange * (1 - Math.exp(-k * t))).toFixed(2));
    points.push({ t, fold });
  }
  return points;
}

// ─────────────────────────────────────────────────────────────────────────────
// OPEN-SOURCE TOOL REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

export const TOOLS_REGISTRY = [
  { name: "Cello",         url: "https://cellocad.org",                              category: "Circuit design",   desc: "Automated genetic logic circuit design from truth tables" },
  { name: "SynBioHub",     url: "https://synbiohub.org",                             category: "Parts registry",   desc: "SBOL-based repository of characterized genetic parts" },
  { name: "iGEM Registry", url: "https://parts.igem.org",                            category: "Parts registry",   desc: "Community parts registry — promoters, RBSs, coding sequences" },
  { name: "iBioSim",       url: "https://async.ece.utah.edu/ibiosim",                category: "Modeling",         desc: "ODE/stochastic simulation of genetic regulatory networks" },
  { name: "COBRA Toolbox", url: "https://opencobra.github.io/cobratoolbox",          category: "Metabolic models", desc: "Flux balance analysis for metabolic burden prediction" },
  { name: "IntaRNA",       url: "https://cobi.informatik.uni-freiburg.de/IntaRNA",   category: "RNA tools",        desc: "sRNA–mRNA interaction energy and binding site prediction" },
  { name: "CRISPRscan",    url: "https://www.crisprscan.org",                        category: "CRISPR tools",     desc: "sgRNA efficacy scoring and off-target analysis" },
  { name: "Mfold",         url: "http://www.unafold.org/mfold",                      category: "RNA tools",        desc: "RNA and DNA secondary structure folding prediction" },
  { name: "TECAN Fluent",  url: "https://www.tecan.com",                             category: "Lab automation",   desc: "Liquid handling automation platform for high-throughput screening" },
  { name: "OpenTrons",     url: "https://opentrons.com",                             category: "Lab automation",   desc: "Open-source liquid handling robot — protocol scripting in Python" },
  { name: "P2CS DB",       url: "http://www.p2cs.org",                              category: "Databases",        desc: "Prokaryotic 2-component system database with HK/RR classification" },
  { name: "KEGG PATHWAY",  url: "https://www.genome.jp/kegg/pathway",               category: "Metabolic models", desc: "Metabolite pathway maps for analyte context analysis" },
];

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION CASES (literature-based)
// ─────────────────────────────────────────────────────────────────────────────

export const VALIDATION_CASES = [
  { arch: "crispri",   chassis: "ecoli",      litOutcome: "Works well — ~100-fold repression",     expectedHigh: true,  ref: "Larson et al. 2013 Nat Protoc" },
  { arch: "crispri",   chassis: "scerevisiae",litOutcome: "Functional with codon-optimized dCas9", expectedHigh: false, ref: "Gilbert et al. 2013 Cell" },
  { arch: "riboswitch",chassis: "ecoli",      litOutcome: "Works well — fast response, low burden", expectedHigh: true,  ref: "Wickiser et al. 2005 Mol Cell" },
  { arch: "riboswitch",chassis: "scerevisiae",litOutcome: "Poor — eukaryotic ribosomes bypass aptamer", expectedHigh: false, ref: "Berens et al. 2015 FEBS Lett" },
  { arch: "tf_loop",   chassis: "ecoli",      litOutcome: "Classic, well-characterized system",    expectedHigh: true,  ref: "Lutz & Bujard 1997 NAR" },
  { arch: "tcs",       chassis: "scerevisiae",litOutcome: "Rare, lower performance in yeast",      expectedHigh: false, ref: "Kotula et al. 2014 Science" },
];
