// Item generators. Every generated item carries its own answer and an explanation,
// so numerical, deductive, inductive, memory, equation and abstract drills are unlimited.
(function () {
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = (n, d) => Number(n).toLocaleString("en-GB", { maximumFractionDigits: d == null ? 1 : d, minimumFractionDigits: 0 });
  const pct = (x) => (Math.round(x * 10) / 10).toLocaleString("en-GB", { maximumFractionDigits: 1 });
  const roundNice = (x) => {
    if (x === 0) return 0;
    const mag = Math.pow(10, Math.floor(Math.log10(Math.abs(x))) - 1);
    return Math.round(x / mag) * mag;
  };

  // ---------------------------------------------------------------- NUMERICAL
  const NUM_THEMES = [
    { name: "Regional sales", entity: "region", plural: "regions", entities: ["North", "South", "East", "West", "Central"], measure: "sales", unit: "€ thousand", periods: ["2022", "2023", "2024"], range: [800, 6000], step: 10,
      tab2: { title: "Staff and outlets by region", attrs: [{ k: "employees", label: "Employees", range: [40, 400] }, { k: "outlets", label: "Outlets", range: [3, 40] }] },
      missing: ["profit", "market share", "number of customers"], nextPeriod: "2025", prevPeriod: "2021", segment: "online orders" },
    { name: "Airline passengers", entity: "airline", plural: "airlines", entities: ["Kestrel Air", "Nordwind", "Azura", "Pelican Jet"], measure: "passengers", unit: "thousands", periods: ["Q1", "Q2", "Q3", "Q4"], range: [300, 2500], step: 5,
      tab2: { title: "Fleet and network", attrs: [{ k: "aircraft", label: "Aircraft", range: [8, 120] }, { k: "routes", label: "Routes", range: [10, 200] }] },
      missing: ["revenue", "on-time performance", "load factor"], nextPeriod: "Q1 of the following year", prevPeriod: "Q4 of the previous year", segment: "business travellers" },
    { name: "Supermarket chains", entity: "chain", plural: "chains", entities: ["FreshMart", "Valuta", "Greengate", "Corner & Co", "Primo"], measure: "revenue", unit: "€ million", periods: ["2021", "2022", "2023"], range: [120, 980], step: 1,
      tab2: { title: "Stores and staff", attrs: [{ k: "stores", label: "Stores", range: [20, 300] }, { k: "staff", label: "Staff", range: [500, 9000] }] },
      missing: ["profit", "customer footfall", "average basket size"], nextPeriod: "2024", prevPeriod: "2020", segment: "own-brand products" },
    { name: "Electricity generation", entity: "country", plural: "countries", entities: ["Lenora", "Baskia", "Tarn", "Vellmar", "Oria"], measure: "electricity generated", unit: "TWh", periods: ["2022", "2023", "2024"], range: [20, 400], step: 1,
      tab2: { title: "Installed capacity", attrs: [{ k: "solar", label: "Solar capacity (GW)", range: [1, 60] }, { k: "wind", label: "Wind capacity (GW)", range: [1, 60] }] },
      missing: ["electricity consumption", "carbon emissions", "energy imports"], nextPeriod: "2025", prevPeriod: "2021", segment: "renewable sources" },
    { name: "University applications", entity: "faculty", plural: "faculties", entities: ["Business", "Law", "Engineering", "Design", "Humanities"], measure: "applications", unit: "", periods: ["2022", "2023", "2024"], range: [400, 5000], step: 10,
      tab2: { title: "Places and staff", attrs: [{ k: "places", label: "Places offered", range: [60, 600] }, { k: "academics", label: "Academic staff", range: [20, 200] }] },
      missing: ["acceptance rate", "average applicant grade", "graduate salary"], nextPeriod: "2025", prevPeriod: "2021", segment: "international applicants" },
    { name: "Streaming platforms", entity: "platform", plural: "platforms", entities: ["Vuzo", "Streamline", "Kanal Plus", "Orbit TV"], measure: "subscribers", unit: "thousands", periods: ["Q1", "Q2", "Q3", "Q4"], range: [150, 3000], step: 5,
      tab2: { title: "Catalogue and pricing", attrs: [{ k: "titles", label: "Titles in catalogue", range: [800, 9000] }, { k: "price", label: "Monthly price (€)", range: [5, 18] }] },
      missing: ["revenue", "churn rate", "viewing hours"], nextPeriod: "Q1 of the following year", prevPeriod: "Q4 of the previous year", segment: "mobile-only subscribers" }
  ];

  function genDataset() {
    const th = pick(NUM_THEMES);
    const ents = shuffle(th.entities).slice(0, rnd(4, th.entities.length));
    const P = th.periods;
    const data = {};
    ents.forEach(e => {
      let v = rnd(th.range[0], th.range[1]);
      const row = [];
      P.forEach(() => {
        row.push(Math.round(v / th.step) * th.step);
        const change = (Math.random() - 0.42) * 0.35; // mostly growth, sometimes decline
        v = Math.max(th.range[0] * 0.6, v * (1 + change));
      });
      data[e] = row;
    });
    const attrs = {};
    ents.forEach(e => { attrs[e] = th.tab2.attrs.map(a => rnd(a.range[0], a.range[1])); });
    const unitLabel = th.unit ? ` (${th.unit})` : "";
    const tabs = [
      { name: `${th.measure[0].toUpperCase() + th.measure.slice(1)} by ${th.entity}`, table: { head: [th.entity[0].toUpperCase() + th.entity.slice(1), ...P.map(p => p + unitLabel)], rows: ents.map(e => [e, ...data[e].map(v => fmt(v, 0))]) } },
      { name: th.tab2.title, table: { head: [th.entity[0].toUpperCase() + th.entity.slice(1), ...th.tab2.attrs.map(a => a.label)], rows: ents.map(e => [e, ...attrs[e].map(v => fmt(v, 0))]) } }
    ];
    return { th, ents, P, data, attrs, tabs, title: th.name };
  }

  function genNumStatements(ds, count) {
    const { th, ents, P, data, attrs } = ds;
    const M = th.measure, U = th.unit ? " " + th.unit : "";
    const total = (pi) => ents.reduce((s, e) => s + data[e][pi], 0);
    const tf = []; // candidate true/false statements
    const cs = []; // candidate cannot-say statements
    const two = () => { const a = shuffle(ents); return [a[0], a[1]]; };
    const mk = (s, truth, e) => ({ s, a: truth ? "T" : "F", e });

    // a) period comparison
    for (let k = 0; k < 2; k++) {
      const e = pick(ents); const i = rnd(0, P.length - 2); const j = rnd(i + 1, P.length - 1);
      const truth = data[e][j] > data[e][i];
      tf.push(mk(`${e}'s ${M} in ${P[j]} was higher than in ${P[i]}.`, truth, `${e}: ${P[j]} = ${fmt(data[e][j], 0)}${U}, ${P[i]} = ${fmt(data[e][i], 0)}${U}.`));
    }
    // b) total threshold
    { const pi = rnd(0, P.length - 1); const t = total(pi); const want = Math.random() < 0.5; const m = 0.04 + Math.random() * 0.12;
      let thr = roundNice(want ? t * (1 - m) : t * (1 + m)); if ((t > thr) !== want) thr = want ? thr - th.step : thr + th.step;
      tf.push(mk(`Total ${M} across all ${th.plural} in ${P[pi]} exceeded ${fmt(thr, 0)}${U}.`, t > thr, `Sum for ${P[pi]} = ${ents.map(e => fmt(data[e][pi], 0)).join(" + ")} = ${fmt(t, 0)}${U}.`)); }
    // c) percentage change
    for (let k = 0; k < 2; k++) {
      const e = pick(ents); const i = rnd(0, P.length - 2); const j = rnd(i + 1, P.length - 1);
      const p = (data[e][j] - data[e][i]) / data[e][i] * 100;
      if (Math.abs(p) < 3) continue;
      const want = Math.random() < 0.5; const d = rnd(2, 9);
      const ap = Math.abs(p); const thr = want ? Math.max(1, Math.floor(ap - d)) : Math.ceil(ap + d);
      const dir = p > 0 ? "increased" : "fell";
      tf.push(mk(`${e}'s ${M} ${dir} by more than ${thr}% between ${P[i]} and ${P[j]}.`, ap > thr, `(${fmt(data[e][j], 0)} − ${fmt(data[e][i], 0)}) ÷ ${fmt(data[e][i], 0)} = ${pct(p)}%.`));
    }
    // d) share of total
    { const e = pick(ents); const pi = rnd(0, P.length - 1); const sh = data[e][pi] / total(pi) * 100; const want = Math.random() < 0.5; const d = rnd(2, 6);
      const thr = want ? Math.max(1, Math.floor(sh - d)) : Math.ceil(sh + d);
      tf.push(mk(`${e} accounted for more than ${thr}% of total ${M} in ${P[pi]}.`, sh > thr, `${fmt(data[e][pi], 0)} ÷ ${fmt(total(pi), 0)} = ${pct(sh)}%.`)); }
    // e) average
    { const pi = rnd(0, P.length - 1); const avg = total(pi) / ents.length; const want = Math.random() < 0.5; const m = 0.04 + Math.random() * 0.12;
      let thr = roundNice(want ? avg * (1 + m) : avg * (1 - m)); if ((avg < thr) !== want) thr = want ? thr + th.step : thr - th.step;
      tf.push(mk(`The average ${M} per ${th.entity} in ${P[pi]} was below ${fmt(thr, 0)}${U}.`, avg < thr, `${fmt(total(pi), 0)} ÷ ${ents.length} = ${fmt(avg, 1)}${U}.`)); }
    // f) highest in every period
    { const e = pick(ents); const truth = P.every((_, pi) => ents.every(o => o === e || data[o][pi] < data[e][pi]));
      tf.push(mk(`${e} had the highest ${M} in every ${P[0].startsWith("Q") ? "quarter" : "year"} shown.`, truth, truth ? `${e} leads in each column.` : `Check each column: ${P.map((p, pi) => p + ": " + ents.reduce((b, o) => data[o][pi] > data[b][pi] ? o : b, ents[0])).join(", ")}.`)); }
    // g) ratio between entities
    { const [a, b] = two(); const pi = rnd(0, P.length - 1); const r = data[a][pi] / data[b][pi];
      if (r >= 1.3) { const want = Math.random() < 0.5; const k = want ? Math.max(1.1, Math.floor((r - 0.15) * 10) / 10) : Math.ceil((r + 0.15) * 10) / 10;
        tf.push(mk(`${a}'s ${M} in ${P[pi]} was more than ${k} times that of ${b}.`, r > k, `${fmt(data[a][pi], 0)} ÷ ${fmt(data[b][pi], 0)} = ${fmt(r, 2)}.`)); } }
    // h) difference threshold
    { const [a, b] = two(); const pi = rnd(0, P.length - 1); const diff = Math.abs(data[a][pi] - data[b][pi]); if (diff > 0) { const want = Math.random() < 0.5; const m = 0.08 + Math.random() * 0.2;
      let thr = roundNice(want ? diff * (1 - m) : diff * (1 + m)); if ((diff > thr) !== want) thr = want ? thr - th.step : thr + th.step;
      tf.push(mk(`The difference between ${a}'s and ${b}'s ${M} in ${P[pi]} was greater than ${fmt(thr, 0)}${U}.`, diff > thr, `|${fmt(data[a][pi], 0)} − ${fmt(data[b][pi], 0)}| = ${fmt(diff, 0)}${U}.`)); } }
    // i) tab-2 comparison
    { const [a, b] = two(); const ai = rnd(0, 1); const lab = th.tab2.attrs[ai].label.toLowerCase();
      tf.push(mk(`${a} had more ${lab.replace(/ \(.*\)/, "")} than ${b}.`, attrs[a][ai] > attrs[b][ai], `${a}: ${fmt(attrs[a][ai], 0)}, ${b}: ${fmt(attrs[b][ai], 0)} (second tab).`)); }
    // j) cross-tab ratio
    { const [a, b] = two(); const ai = rnd(0, 1); const pi = P.length - 1; const lab = th.tab2.attrs[ai].label.toLowerCase().replace(/ \(.*\)/, "").replace(/s$/, "");
      const ra = data[a][pi] / attrs[a][ai], rb = data[b][pi] / attrs[b][ai];
      tf.push(mk(`In ${P[pi]}, ${a}'s ${M} per ${lab} was higher than ${b}'s.`, ra > rb, `${a}: ${fmt(data[a][pi], 0)} ÷ ${fmt(attrs[a][ai], 0)} = ${fmt(ra, 2)}; ${b}: ${fmt(data[b][pi], 0)} ÷ ${fmt(attrs[b][ai], 0)} = ${fmt(rb, 2)}.`)); }
    // k) fell in every period after first
    { const e = pick(ents); const truth = P.slice(1).every((_, i) => data[e][i + 1] < data[e][i]);
      tf.push(mk(`${e}'s ${M} fell in every period after ${P[0]}.`, truth, `${e}: ${data[e].map(v => fmt(v, 0)).join(" → ")}.`)); }
    // l) growth comparison between entities
    { const [a, b] = two(); const ga = (data[a][P.length - 1] - data[a][0]) / data[a][0] * 100, gb = (data[b][P.length - 1] - data[b][0]) / data[b][0] * 100;
      if (Math.abs(ga - gb) > 2) tf.push(mk(`Between ${P[0]} and ${P[P.length - 1]}, ${a}'s ${M} grew faster in percentage terms than ${b}'s.`, ga > gb, `${a}: ${pct(ga)}%, ${b}: ${pct(gb)}%.`)); }

    // cannot say
    { const [a, b] = two(); const miss = pick(th.missing); cs.push({ s: `${a}'s ${miss} was higher than ${b}'s.`, a: "C", e: `${miss[0].toUpperCase() + miss.slice(1)} does not appear in either tab.` }); }
    { const e = pick(ents); cs.push({ s: `${e}'s ${M} in ${th.nextPeriod} will be higher than in ${P[P.length - 1]}.`, a: "C", e: "The tables stop at " + P[P.length - 1] + ". A future value cannot be read from past data." }); }
    { const e = pick(ents); cs.push({ s: `${e} had the highest ${M} of all ${th.plural} in ${th.prevPeriod}.`, a: "C", e: `${th.prevPeriod} is not in the table.` }); }
    { const e = pick(ents); const pi = rnd(0, P.length - 1); cs.push({ s: `More than half of ${e}'s ${M} in ${P[pi]} came from ${th.segment}.`, a: "C", e: `No breakdown by ${th.segment} is given.` }); }
    { const e = pick(ents); const ai = rnd(0, 1); const lab = th.tab2.attrs[ai].label.toLowerCase().replace(/ \(.*\)/, ""); cs.push({ s: `${e} had more ${lab} in ${P[P.length - 1]} than in ${P[0]}.`, a: "C", e: `The second tab gives a single figure for ${lab}, not one per period.` }); }

    const nC = Math.max(1, Math.round(count * 0.3));
    const seenS = new Set();
    const tfU = tf.filter(x => { if (seenS.has(x.s)) return false; seenS.add(x.s); return true; });
    const tfPick = shuffle(tfU).slice(0, count - nC);
    const csPick = shuffle(cs).slice(0, nC);
    return shuffle(tfPick.concat(csPick));
  }

  // Build a numerical set of n statements across several datasets (each dataset ~9-10 statements)
  function genNumericalSet(n) {
    const items = [];
    while (items.length < n) {
      const ds = genDataset();
      const per = Math.min(10, n - items.length);
      const stmts = genNumStatements(ds, per);
      stmts.forEach(st => items.push({ type: "numerical", scenario: { title: ds.title, tabs: ds.tabs }, s: st.s, a: st.a, e: st.e }));
    }
    return items.slice(0, n);
  }

  // ---------------------------------------------------------------- VERBAL (from bank)
  function genVerbalSet(n, usedIds) {
    const bank = window.VERBAL_BANK || [];
    let order = shuffle(bank);
    if (usedIds && usedIds.length) { const fresh = order.filter(s => !usedIds.includes(s.id)); const used = order.filter(s => usedIds.includes(s.id)); order = fresh.concat(used); }
    const items = [];
    for (const sc of order) {
      if (items.length >= n) break;
      const scen = { title: sc.title, tabs: sc.tabs.map(t => ({ name: t.name, text: t.text })) };
      sc.items.forEach(it => { if (items.length < n) items.push({ type: "verbal", scenario: scen, s: it.s, a: it.a, e: it.e, src: sc.id }); });
    }
    return items;
  }

  // ---------------------------------------------------------------- DEDUCTIVE (scales lst style)
  const SHAPES = ["circle", "star", "cross", "triangle", "square"];
  function latinSquare(n) {
    const rows = shuffle([...Array(n).keys()]), cols = shuffle([...Array(n).keys()]), syms = shuffle([...Array(n).keys()]);
    const g = [];
    for (let i = 0; i < n; i++) { g.push([]); for (let j = 0; j < n; j++) g[i].push(syms[(rows[i] + cols[j]) % n]); }
    return g;
  }
  function feasible(grid, n) {
    // grid: n×n of value or -1; returns true if a Latin-square completion exists
    const rowsUsed = Array.from({ length: n }, () => new Set()), colsUsed = Array.from({ length: n }, () => new Set());
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const v = grid[i][j]; if (v >= 0) { if (rowsUsed[i].has(v) || colsUsed[j].has(v)) return false; rowsUsed[i].add(v); colsUsed[j].add(v); } }
    function solve() {
      let best = null, bestC = null;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (grid[i][j] < 0) {
        const c = []; for (let v = 0; v < n; v++) if (!rowsUsed[i].has(v) && !colsUsed[j].has(v)) c.push(v);
        if (c.length === 0) return false;
        if (!best || c.length < bestC.length) { best = [i, j]; bestC = c; }
      }
      if (!best) return true;
      const [i, j] = best;
      for (const v of bestC) { grid[i][j] = v; rowsUsed[i].add(v); colsUsed[j].add(v); if (solve()) { grid[i][j] = -1; rowsUsed[i].delete(v); colsUsed[j].delete(v); return true; } grid[i][j] = -1; rowsUsed[i].delete(v); colsUsed[j].delete(v); }
      return false;
    }
    return solve();
  }
  function possibleValues(visible, n, ti, tj) {
    const out = [];
    for (let v = 0; v < n; v++) { const g = visible.map(r => r.slice()); g[ti][tj] = v; if (feasible(g, n)) out.push(v); }
    return out;
  }
  function genDeductive(level) {
    // level 0..: grid grows from 4 to 5, fewer visible cells
    const n = level < 6 ? 4 : 5;
    const full = latinSquare(n);
    const ti = rnd(0, n - 1), tj = rnd(0, n - 1);
    const visible = full.map(r => r.slice());
    visible[ti][tj] = -1;
    const cells = shuffle([...Array(n * n).keys()].filter(k => !(Math.floor(k / n) === ti && k % n === tj)));
    const targetHidden = n === 4 ? Math.min(cells.length, 7 + Math.min(level, 5)) : Math.min(cells.length, 10 + Math.min(level - 6, 8));
    let hidden = 0;
    for (const k of cells) {
      if (hidden >= targetHidden) break;
      const i = Math.floor(k / n), j = k % n; const keep = visible[i][j]; visible[i][j] = -1;
      if (possibleValues(visible, n, ti, tj).length === 1) hidden++; else visible[i][j] = keep;
    }
    const symbols = shuffle(SHAPES).slice(0, n); // Aon shows exactly the n symbols of the grid as options
    const options = symbols.map((s, idx) => ({ id: idx, shape: s }));
    const answer = full[ti][tj];
    const rowSeen = visible[ti].filter(v => v >= 0).map(v => symbols[v]);
    const colSeen = visible.map(r => r[tj]).filter(v => v >= 0).map(v => symbols[v]);
    const seen = new Set(rowSeen.concat(colSeen));
    const cands = symbols.slice(0, n).filter(s => !seen.has(s));
    const e = cands.length === 1
      ? `Row ${ti + 1} shows ${rowSeen.join(", ") || "nothing"} and column ${tj + 1} shows ${colSeen.join(", ") || "nothing"}, so the only symbol missing from both is the ${symbols[answer]}.`
      : `Row ${ti + 1} and column ${tj + 1} rule out ${[...seen].join(", ") || "nothing"}, leaving ${cands.join(" or ")}. Each other row and column must also hold every symbol once; only the ${symbols[answer]} in this cell allows the rest of the grid to be completed.`;
    return { type: "deductive", n, grid: visible, target: [ti, tj], symbols, options, answer, e };
  }
  function genDeductiveSet(n) { const off = (window.GEN && window.GEN.difficulty || 1) > 1 ? 3 : 0; return [...Array(n).keys()].map(i => genDeductive(i + off)); }

  // ---------------------------------------------------------------- INDUCTIVE (scales cls style)
  const LETTERS = "ABCDEFGHKLMNPRSTUVWXYZ".split(""), VOW = "AEIOU".split(""), DIG = "123456789".split("");
  const isDigit = (c) => DIG.includes(c), isVowel = (c) => VOW.includes(c);
  const randChar = () => Math.random() < 0.5 ? pick(LETTERS.concat(VOW)) : pick(DIG);
  const randFig = () => [...Array(9)].map(randChar);
  const count = (f, c) => f.filter(x => x === c).length;
  const RULES = [
    () => { const x = Math.random() < 0.5 ? pick(DIG) : pick(LETTERS); return { desc: `the figure contains exactly three ${x}s`, pred: f => count(f, x) === 3, seed: () => { const f = randFig().map(c => c === x ? randChar() : c); shuffle([...Array(9).keys()]).slice(0, 3).forEach(i => f[i] = x); return f.map(c => (c === x) ? x : c); } }; },
    () => ({ desc: "the figure contains only digits", pred: f => f.every(isDigit), seed: () => [...Array(9)].map(() => pick(DIG)) }),
    () => ({ desc: "all digits in the figure are even", pred: f => f.every(c => !isDigit(c) || "2468".includes(c)), seed: () => [...Array(9)].map(() => Math.random() < 0.6 ? pick("2468".split("")) : pick(LETTERS)) }),
    () => ({ desc: "the figure contains exactly two vowels", pred: f => f.filter(isVowel).length === 2, seed: () => { const f = [...Array(9)].map(() => Math.random() < 0.5 ? pick(LETTERS) : pick(DIG)); shuffle([...Array(9).keys()]).slice(0, 2).forEach(i => f[i] = pick(VOW)); return f; } }),
    () => ({ desc: "the centre character is a vowel", pred: f => isVowel(f[4]), seed: () => { const f = randFig(); f[4] = pick(VOW); return f; } }),
    () => ({ desc: "one row consists of three identical characters", pred: f => [0, 3, 6].some(r => f[r] === f[r + 1] && f[r] === f[r + 2]), seed: () => { const f = randFig(); const r = pick([0, 3, 6]); const c = randChar(); f[r] = f[r + 1] = f[r + 2] = c; return f; } }),
    () => ({ desc: "the figure contains exactly four letters", pred: f => f.filter(c => !isDigit(c)).length === 4, seed: () => { const f = [...Array(9)].map(() => pick(DIG)); shuffle([...Array(9).keys()]).slice(0, 4).forEach(i => f[i] = pick(LETTERS.concat(VOW))); return f; } }),
    () => ({ desc: "all four corners are digits", pred: f => [0, 2, 6, 8].every(i => isDigit(f[i])), seed: () => { const f = randFig(); [0, 2, 6, 8].forEach(i => f[i] = pick(DIG)); return f; } }),
    () => ({ desc: "no character appears more than once", pred: f => new Set(f).size === 9, seed: () => shuffle(LETTERS.concat(VOW, DIG)).slice(0, 9) }),
    () => ({ desc: "the top-left and bottom-right characters are the same", pred: f => f[0] === f[8], seed: () => { const f = randFig(); f[8] = f[0]; return f; } }),
    () => ({ desc: "the digits in the figure add up to more than 20", pred: f => f.filter(isDigit).reduce((s, c) => s + Number(c), 0) > 20, seed: () => { const f = [...Array(9)].map(() => Math.random() < 0.6 ? pick("56789".split("")) : pick(LETTERS)); return f; } }),
    () => ({ desc: "the middle column contains no digits", pred: f => [1, 4, 7].every(i => !isDigit(f[i])), seed: () => { const f = randFig(); [1, 4, 7].forEach(i => f[i] = pick(LETTERS.concat(VOW))); return f; } })
  ];
  function genInductive() {
    const rule = pick(RULES)();
    const mkA = () => { let f; for (let t = 0; t < 200; t++) { f = rule.seed(); if (rule.pred(f)) return f; } return f; };
    const mkB = () => { for (let t = 0; t < 200; t++) { const f = mkA().slice(); const k = rnd(1, 2); for (let m = 0; m < k; m++) f[rnd(0, 8)] = randChar(); if (!rule.pred(f)) return f; } let f; do { f = randFig(); } while (rule.pred(f)); return f; };
    const A = [mkA(), mkA(), mkA()], B = [mkB(), mkB(), mkB()];
    const nA = rnd(1, 3); const un = [];
    for (let i = 0; i < 4; i++) { const isA = i < nA; un.push({ fig: isA ? mkA() : mkB(), a: isA ? "A" : "B" }); }
    const unassigned = shuffle(un);
    return { type: "inductive", A, B, unassigned, answer: unassigned.map(u => u.a), e: `Rule for set A: ${rule.desc}. Set B figures break it.` };
  }
  function genInductiveSet(n) { return [...Array(n).keys()].map(() => genInductive()); }

  // ---------------------------------------------------------------- MEMORY (learning efficiency)
  const MEM_ICONS = [
    { id: "circle", name: "blue circle", color: "#2a78d6" }, { id: "square", name: "orange square", color: "#eb6834" },
    { id: "triangle", name: "green triangle", color: "#1baf7a" }, { id: "star", name: "yellow star", color: "#eda100" },
    { id: "diamond", name: "pink diamond", color: "#e87ba4" }, { id: "hexagon", name: "violet hexagon", color: "#6250d6" },
    { id: "cross", name: "teal cross", color: "#0f8b8d" }, { id: "ring", name: "red ring", color: "#c23b3b" }
  ];
  function genMemory(level) {
    const k = Math.min(8, 4 + Math.floor(level / 3));
    const seq = shuffle(MEM_ICONS).slice(0, k);
    return { type: "memory", seq, k, showMs: Math.max(450, 800 - level * 25), answer: seq.map(s => s.id), e: `Order shown: ${seq.map(s => s.name).join(", ")}.` };
  }
  function genMemorySet(n) { return [...Array(n).keys()].map(i => genMemory(i)); }

  // ---------------------------------------------------------------- EQUATIONS (scales eql style)
  function genEql() {
    const forms = [
      () => { const a = rnd(1, 9), b = rnd(1, 9); return { tokens: ["_", "+", "_", "=", a + b], blanks: 2, check: (x) => x[0] + x[1] === a + b, sol: [a, b] }; },
      () => { const a = rnd(2, 9), b = rnd(2, 9); return { tokens: ["_", "×", "_", "=", a * b], blanks: 2, check: (x) => x[0] * x[1] === a * b, sol: [a, b] }; },
      () => { const a = rnd(2, 9), b = rnd(1, a - 1); return { tokens: ["_", "−", "_", "=", a - b], blanks: 2, check: (x) => x[0] - x[1] === a - b, sol: [a, b] }; },
      () => { const a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, 9); const r = a + b - c; if (r < 1) return null; return { tokens: ["_", "+", "_", "−", "_", "=", r], blanks: 3, check: (x) => x[0] + x[1] - x[2] === r, sol: [a, b, c] }; },
      () => { const a = rnd(2, 9), b = rnd(2, 9), c = rnd(1, 9); const r = a * b + c; return { tokens: ["_", "×", "_", "+", "_", "=", r], blanks: 3, check: (x) => x[0] * x[1] + x[2] === r, sol: [a, b, c] }; },
      () => { const a = rnd(2, 9), b = rnd(2, 9), c = rnd(1, 9); const r = a * b - c; if (r < 1) return null; return { tokens: ["_", "×", "_", "−", "_", "=", r], blanks: 3, check: (x) => x[0] * x[1] - x[2] === r, sol: [a, b, c] }; },
    ];
    let it = null; while (!it) it = pick(forms)();
    return Object.assign({ type: "eql", e: `One solution: ${it.sol.join(", ")}.` }, it);
  }
  function genEqlSet(n) { return [...Array(n).keys()].map(() => genEql()); }

  // ---------------------------------------------------------------- ABSTRACT SERIES (paper ieGAT style)
  const ASHAPES = ["circle", "square", "triangle", "pentagon"];
  const FILLS = ["none", "half", "full"];
  function genAbstract() {
    const base = { shape: pick(ASHAPES), rot: pick([0, 45, 90, 135]), dots: rnd(0, 2), fill: pick(FILLS), mark: rnd(0, 3) };
    const attrs = shuffle(["rot", "dots", "fill", "mark"]).slice(0, rnd(1, 2));
    const steps = { rot: pick([45, 90, -45, -90]), dots: pick([1, 1, -1]), fill: 1, mark: pick([1, 1, 3]) };
    if (attrs.includes("dots")) { if (steps.dots === 1) base.dots = rnd(0, 1); else base.dots = rnd(4, 5); }
    const seq = [];
    for (let i = 0; i < 5; i++) {
      const f = Object.assign({}, base);
      attrs.forEach(a => {
        if (a === "rot") f.rot = (base.rot + steps.rot * i + 360) % 360;
        if (a === "dots") f.dots = base.dots + steps.dots * i;
        if (a === "fill") f.fill = FILLS[(FILLS.indexOf(base.fill) + i) % 3];
        if (a === "mark") f.mark = (base.mark + steps.mark * i) % 4;
      });
      seq.push(f);
    }
    const correct = seq[4];
    const key = (f) => `${f.shape}|${f.rot}|${f.dots}|${f.fill}|${f.mark}`;
    const seen = new Set([key(correct)]);
    const distract = [];
    let guard = 0;
    while (distract.length < 4 && guard++ < 200) {
      const d = Object.assign({}, correct);
      const which = pick(["rot", "dots", "fill", "mark", "shape"]);
      if (which === "rot") d.rot = (d.rot + pick([45, 90, 180, 270])) % 360;
      if (which === "dots") d.dots = Math.max(0, d.dots + pick([-1, 1, 2]));
      if (which === "fill") d.fill = pick(FILLS.filter(x => x !== d.fill));
      if (which === "mark") d.mark = (d.mark + rnd(1, 3)) % 4;
      if (which === "shape") d.shape = pick(ASHAPES.filter(x => x !== d.shape));
      if (d.shape === "circle" && which === "rot" && !attrs.includes("mark")) continue; // rotation of a circle is invisible
      if (!seen.has(key(d))) { seen.add(key(d)); distract.push(d); }
    }
    const options = shuffle(distract.concat([correct]));
    const names = { rot: `rotates by ${steps.rot}° each step`, dots: `dot count changes by ${steps.dots > 0 ? "+1" : "−1"} each step`, fill: "shading cycles empty → half → full", mark: `the small marker moves ${steps.mark === 1 ? "one corner clockwise" : steps.mark === 3 ? "one corner anticlockwise" : "two corners"} each step` };
    return { type: "abstract", seq: seq.slice(0, 4), options, answer: options.indexOf(correct), e: "Rule: " + attrs.map(a => names[a]).join("; ") + ". Everything else stays constant." };
  }
  function genAbstractSet(n) { return [...Array(n).keys()].map(() => genAbstract()); }

  window.GEN = { numerical: genNumericalSet, verbal: genVerbalSet, deductive: genDeductiveSet, inductive: genInductiveSet, memory: genMemorySet, eql: genEqlSet, abstract: genAbstractSet, MEM_ICONS, util: { rnd, pick, shuffle, fmt } };
})();
