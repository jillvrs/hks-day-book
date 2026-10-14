// Generators matched to the official Aon practice tasks that IE links from its admissions-test page:
// scales numerical (one company, five data sheets, True/False/Cannot say), scales ix (nine objects, one breaks
// the rule), the Short-Term Memory test (objects flash, pick them in order from a grid of eight), gapChallenge
// symbols, and IE's own 15-minute Mathematics Assessment sample (BBA, BIE, PPLE).
(function () {
  const U = window.GEN.util; const rnd = U.rnd, pick = U.pick, shuffle = U.shuffle, fmt = U.fmt;
  const pct1 = (x) => (Math.round(x * 10) / 10).toLocaleString("en-GB", { maximumFractionDigits: 1 });
  const nice = (x, step) => Math.round(x / step) * step;
  const HARD = () => (window.GEN.difficulty || 1) > 1; // "25% harder": tighter margins, more two-step statements, later-level items

  // ------------------------------------------------------------ NUMERICAL: one company, five sheets
  const COMPANIES = [
    { name: "Puccia-style fashion house: Belmonte", cur: "$", costCats: ["Entertainment", "Research", "Marketing", "Software", "Energy", "Travel"], revCats: ["Jackets", "Handbags", "Accessories", "Footwear"], leadCats: ["Social media", "Newsletter", "Billboards", "Web site", "Trade fairs", "Fashion shows", "Other"], regions: ["Asia", "Europe", "North America"], lines: ["Footwear", "Accessories", "Clothing", "Handbags"], unitPieces: "pieces produced" },
    { name: "Nordic furniture maker: Hedda Living", cur: "€", costCats: ["Design", "Materials", "Marketing", "Logistics", "Energy", "Rent"], revCats: ["Sofas", "Tables", "Lighting", "Storage"], leadCats: ["Social media", "Catalogue", "Showrooms", "Web site", "Trade fairs", "Partners", "Other"], regions: ["Nordics", "Rest of Europe", "Asia"], lines: ["Sofas", "Tables", "Lighting", "Storage"], unitPieces: "units produced" },
    { name: "Sports-nutrition brand: Kinetic Labs", cur: "$", costCats: ["Research", "Ingredients", "Marketing", "Packaging", "Energy", "Distribution"], revCats: ["Protein", "Bars", "Drinks", "Supplements"], leadCats: ["Social media", "Gyms", "Newsletter", "Web site", "Events", "Athletes", "Other"], regions: ["Americas", "Europe", "Asia-Pacific"], lines: ["Protein", "Bars", "Drinks", "Supplements"], unitPieces: "units produced" },
    { name: "Regional airline: Azura Air", cur: "€", costCats: ["Fuel", "Crew", "Marketing", "Maintenance", "Airport fees", "IT"], revCats: ["Economy fares", "Business fares", "Baggage", "On-board sales"], leadCats: ["Search ads", "Newsletter", "Travel agents", "Web site", "Social media", "Partners", "Other"], regions: ["Domestic", "Europe", "North Africa"], lines: ["Short haul", "Medium haul", "Charter", "Cargo"], unitPieces: "seats offered" }
  ];
  function genCompanyPack() {
    const C = pick(COMPANIES);
    const yr = rnd(6, 12); const years = [yr, yr - 1, yr - 2]; // Year 10, Year 9, Year 8 (most recent first, as in Aon)
    // Sheet 1: costs table (thousand)
    const costs = {}; C.costCats.forEach((c, i) => { const base = i < 4 ? rnd(2000, 16000) : rnd(120, 400); let v = base; costs[c] = years.map(() => { const x = nice(v, 1); v = v * (1 - (Math.random() * 0.3 - 0.08)); return Math.round(x); }); });
    const costTotals = years.map((_, i) => C.costCats.reduce((s, c) => s + costs[c][i], 0));
    // Sheet 2: donut revenue shares (%), total in million
    let shares = [rnd(15, 40), rnd(15, 35), rnd(5, 15)]; shares.push(100 - shares[0] - shares[1] - shares[2]); shares = shuffle(shares);
    const revTotal = rnd(40, 160);
    // Sheet 3: leads table
    const leads = {}; C.leadCats.forEach((c, i) => { let v = i === 6 ? rnd(600, 1200) : rnd(1200, 20000); leads[c] = years.map(() => { const x = Math.round(v); v = v * (1 - (Math.random() * 0.3 - 0.1)); return x; }); });
    const leadTotals = years.map((_, i) => C.leadCats.reduce((s, c) => s + leads[c][i], 0));
    // Sheet 4: employees stacked bars (thousands), fiscal years ascending
    const fy = [yr - 2, yr - 1, yr]; const emp = {}; C.regions.forEach(r => { let v = rnd(1500, 5000); emp[r] = fy.map(() => { const x = nice(v, 50); v = v * (1 + Math.random() * 0.3 - 0.05); return x; }); });
    const empTotals = fy.map((_, i) => C.regions.reduce((s, r) => s + emp[r][i], 0));
    // Sheet 5: forecast horizontal grouped bars (million), FY+1..FY+3
    const fc = {}; C.lines.forEach((l, i) => { let v = i === 1 ? rnd(20, 30) : i === 0 ? rnd(1, 3) : rnd(6, 12); fc[l] = [1, 2, 3].map(() => { const x = Math.round(v * 10) / 10; v = v * (1 + Math.random() * 0.25 - 0.08); return x; }); });
    const unitWord = C.cur === "$" ? "dollars" : "euros";
    const tabs = [
      { name: "Costs", icon: "money", title: "COSTS", table: { head: ["Fiscal Year", ...years.map(y => "Year " + y)], rows: C.costCats.map(c => [c, ...costs[c].map(v => fmt(v, 0))]).concat([["Total costs", ...costTotals.map(v => fmt(v, 0))]]), boldLast: true }, note: `All data in thousand ${unitWord}` },
      { name: "Product revenue", icon: "pie", title: "PRODUCT REVENUE", chart: { type: "donut", labels: C.revCats, values: shares }, note: `The total product revenue in the current year was ${C.cur}${revTotal} million ${unitWord}.` },
      { name: "Lead generation", icon: "megaphone", title: "LEAD GENERATION", table: { head: ["Fiscal Year", ...years.map(y => "Year " + y)], rows: C.leadCats.map(c => [c, ...leads[c].map(v => fmt(v, 0))]).concat([["Total", ...leadTotals.map(v => fmt(v, 0))]]), boldLast: true } },
      { name: "Employees", icon: "people", title: "EMPLOYEES", chart: { type: "stacked", xLabels: fy.map(String), xTitle: "Fiscal year", yTitle: "Number of employees in thousands", series: C.regions.map(r => ({ name: r, values: emp[r] })) } },
      { name: "Forecast", icon: "tools", title: "FORECAST", chart: { type: "hbar", groups: ["FY+1", "FY+2", "FY+3"], xTitle: `${C.unitPieces[0].toUpperCase() + C.unitPieces.slice(1)} (in million)`, yTitle: "Fiscal year", series: C.lines.map(l => ({ name: l, values: fc[l] })) } }
    ];
    return { C, years, fy, costs, costTotals, shares, revTotal, leads, leadTotals, emp, empTotals, fc, tabs, unitWord, title: C.name.split(":")[1].trim() };
  }
  function genCompanyStatements(P, count) {
    const { C, years, fy, costs, costTotals, shares, revTotal, leads, leadTotals, emp, empTotals, fc, unitWord } = P;
    const cur = C.cur; const tf = [], cs = [];
    const mk = (tab, s, truth, e) => ({ tab, s, a: truth ? "T" : "F", e });
    const mkC = (tab, s, e) => ({ tab, s, a: "C", e });
    const yi = () => rnd(0, 2);
    // ---- Sheet 0: costs
    for (let k = 0; k < 3; k++) { const c = pick(C.costCats); const i = yi(); const v = costs[c][i]; const m = v / 1000; const want = Math.random() < 0.5; let thr = want ? Math.floor(m * 10) / 10 : Math.ceil(m * 10) / 10 + 0.1; if (Math.abs(thr - m) < 0.05) thr = want ? thr - 0.2 : thr + 0.2; thr = Math.round(thr * 10) / 10;
      tf.push(mk(0, `In Fiscal Year ${years[i]}, ${c.toLowerCase()} costs amounted to over ${cur}${thr} million ${unitWord}.`, m > thr, `Table: ${c}, Year ${years[i]} = ${fmt(v, 0)} thousand = ${cur}${pct1(m)} million. Note the unit line under the table.`)); }
    { const c = pick(C.costCats); const truth = costs[c][0] < costs[c][1] && costs[c][1] < costs[c][2]; tf.push(mk(0, `${c} costs fell every year from Year ${years[2]} to Year ${years[0]}.`, truth, `${c}: Year ${years[2]} ${fmt(costs[c][2], 0)}, Year ${years[1]} ${fmt(costs[c][1], 0)}, Year ${years[0]} ${fmt(costs[c][0], 0)}.`)); }
    { const p = (costTotals[0] - costTotals[1]) / costTotals[1] * 100; const want = Math.random() < 0.5; const d = HARD() ? rnd(1, 3) : rnd(2, 6); const k = want ? Math.max(1, Math.floor(Math.abs(p) - d)) : Math.ceil(Math.abs(p) + d); const dir = p >= 0 ? "higher" : "lower"; tf.push(mk(0, `Total costs in Year ${years[0]} were more than ${k}% ${dir} than in Year ${years[1]}.`, Math.abs(p) > k, `(${fmt(costTotals[0], 0)} − ${fmt(costTotals[1], 0)}) ÷ ${fmt(costTotals[1], 0)} = ${pct1(p)}%.`)); }
    { const c = pick(C.costCats.slice(0, 4)); const i = yi(); const sh = costs[c][i] / costTotals[i] * 100; const want = Math.random() < 0.5; const d = HARD() ? rnd(1, 3) : rnd(2, 5); const k = want ? Math.max(1, Math.floor(sh - d)) : Math.ceil(sh + d); tf.push(mk(0, `${c} accounted for more than ${k}% of total costs in Year ${years[i]}.`, sh > k, `${fmt(costs[c][i], 0)} ÷ ${fmt(costTotals[i], 0)} = ${pct1(sh)}%.`)); }
    { const [a, b] = shuffle(C.costCats.slice(0, 4)); const i = yi(); const diff = costs[a][i] - costs[b][i]; const want = Math.random() < 0.5; const stated = want ? diff : diff + pick([-1, 1]) * rnd(50, 400); tf.push(mk(0, `In Year ${years[i]}, ${a.toLowerCase()} costs were ${cur}${fmt(Math.abs(stated), 0)} thousand ${diff >= 0 ? "higher" : "lower"} than ${b.toLowerCase()} costs.`, stated === diff, `${fmt(costs[a][i], 0)} − ${fmt(costs[b][i], 0)} = ${fmt(diff, 0)}. The statement asks for an exact figure, not an approximation.`)); }
    cs.push(mkC(0, `${pick(C.costCats)} costs in Year ${years[2] - 1} were lower than in Year ${years[2]}.`, `Year ${years[2] - 1} is not in the table.`));
    cs.push(mkC(0, `${pick(C.costCats)} costs will rise again in Year ${years[0] + 1}.`, `A future year cannot be read from the table.`));
    cs.push(mkC(0, `More than half of ${pick(C.costCats).toLowerCase()} costs in Year ${years[0]} were spent in Europe.`, `The costs table has no regional breakdown.`));
    // ---- Sheet 1: donut
    { const [i, j] = shuffle([0, 1, 2, 3]); const exact = (shares[i] + shares[j]) / 100 * revTotal; const want = Math.random() < 0.5; const stated = want ? Math.round(exact * 10) / 10 : Math.round(exact * (1 + pick([-1, 1]) * (0.12 + Math.random() * 0.2))); tf.push(mk(1, `${C.revCats[i]} and ${C.revCats[j]} have a combined product revenue of ${cur}${fmt(stated, 1)} million ${unitWord}.`, Math.abs(stated - exact) < 0.06, `${shares[i]}% + ${shares[j]}% = ${shares[i] + shares[j]}% of ${cur}${revTotal} million = ${cur}${pct1(exact)} million.`)); }
    { const i = rnd(0, 3); const exact = shares[i] / 100 * revTotal; const want = Math.random() < 0.5; const thr = want ? Math.floor(exact - rnd(1, 4)) : Math.ceil(exact + rnd(1, 4)); tf.push(mk(1, `${C.revCats[i]} generated more than ${cur}${thr} million ${unitWord} in revenue.`, exact > thr, `${shares[i]}% of ${cur}${revTotal} million = ${cur}${pct1(exact)} million.`)); }
    { const [i, j] = shuffle([0, 1, 2, 3]); tf.push(mk(1, `${C.revCats[i]} revenue was more than twice that of ${C.revCats[j]}.`, shares[i] > 2 * shares[j], `${shares[i]}% versus ${shares[j]}%: the ratio is ${pct1(shares[i] / shares[j])}.`)); }
    { const i = rnd(0, 3); const max = Math.max(...shares); tf.push(mk(1, `${C.revCats[i]} is the largest product category by revenue.`, shares[i] === max, `Largest share: ${C.revCats[shares.indexOf(max)]} at ${max}%.`)); }
    { const i = rnd(0, 3); const want = Math.random() < 0.5; const k = want ? shares[i] - rnd(1, 3) : shares[i] + rnd(1, 3); tf.push(mk(1, `${C.revCats[i]} accounted for more than ${k}% of product revenue.`, shares[i] > k, `${C.revCats[i]} = ${shares[i]}%.`)); }
    cs.push(mkC(1, `${pick(C.revCats)} revenue grew compared with the previous year.`, `The chart shows the current year only.`));
    cs.push(mkC(1, `The company made a profit of more than ${cur}${rnd(5, 20)} million ${unitWord} in the current year.`, `Profit is not shown anywhere on this sheet.`));
    cs.push(mkC(1, `More than a third of ${pick(C.revCats).toLowerCase()} revenue came from online sales.`, `No split by sales channel is given.`));
    // ---- Sheet 2: leads
    for (let k = 0; k < 2; k++) { const c = pick(C.leadCats.slice(0, 6)); const i = rnd(0, 1); const j = rnd(i + 1, 2); const p = (leads[c][i] - leads[c][j]) / leads[c][j] * 100; const want = Math.random() < 0.5; const ap = Math.abs(p); const kk = want ? Math.round(ap) : Math.max(1, Math.round(ap) + pick([-1, 1]) * rnd(2, 6)); if (want && Math.abs(ap - kk) > 0.5) continue; tf.push(mk(2, `Leads from ${c.toLowerCase()} were about ${kk}% ${p >= 0 ? "higher" : "lower"} in fiscal year ${years[i]} than in fiscal year ${years[j]}.`, Math.abs(ap - kk) <= 0.5, `(${fmt(leads[c][i], 0)} − ${fmt(leads[c][j], 0)}) ÷ ${fmt(leads[c][j], 0)} = ${pct1(p)}%, which rounds to ${Math.round(ap)}%.`)); }
    { const c = pick(C.leadCats.slice(0, 6)); const i = yi(); const sh = leads[c][i] / leadTotals[i] * 100; const want = Math.random() < 0.5; const d = HARD() ? rnd(1, 3) : rnd(2, 5); const k = want ? Math.max(1, Math.floor(sh - d)) : Math.ceil(sh + d); tf.push(mk(2, `In Year ${years[i]}, ${c.toLowerCase()} generated more than ${k}% of all leads.`, sh > k, `${fmt(leads[c][i], 0)} ÷ ${fmt(leadTotals[i], 0)} = ${pct1(sh)}%.`)); }
    { const i = yi(); const best = C.leadCats.reduce((b, c) => leads[c][i] > leads[b][i] ? c : b, C.leadCats[0]); const claim = Math.random() < 0.5 ? best : pick(C.leadCats.slice(0, 6)); tf.push(mk(2, `${claim} was the largest source of leads in Year ${years[i]}.`, claim === best, `Largest in Year ${years[i]}: ${best} with ${fmt(leads[best][i], 0)}.`)); }
    { const [a, b] = shuffle(C.leadCats.slice(0, 6)); const i = yi(); const sum = leads[a][i] + leads[b][i]; const want = Math.random() < 0.5; const thr = nice(want ? sum * (HARD() ? 0.96 : 0.9) : sum * (HARD() ? 1.04 : 1.1), 100); tf.push(mk(2, `In Year ${years[i]}, ${a.toLowerCase()} and ${b.toLowerCase()} together generated more than ${fmt(thr, 0)} leads.`, sum > thr, `${fmt(leads[a][i], 0)} + ${fmt(leads[b][i], 0)} = ${fmt(sum, 0)}.`)); }
    { const truth = leadTotals[0] > leadTotals[1] && leadTotals[1] > leadTotals[2]; tf.push(mk(2, `Total leads increased in each of the years shown.`, truth, `Totals: ${years.slice().reverse().map((y, k) => "Year " + y + " " + fmt(leadTotals[2 - k], 0)).join(", ")}.`)); }
    cs.push(mkC(2, `Leads from ${pick(C.leadCats.slice(0, 6)).toLowerCase()} were ${rnd(4, 12)}% higher in fiscal year ${years[0]} than in fiscal year ${years[2] - 1}.`, `Fiscal year ${years[2] - 1} is not in the table.`));
    cs.push(mkC(2, `Most leads from ${pick(C.leadCats.slice(0, 6)).toLowerCase()} became paying customers.`, `Conversion is not shown.`));
    // ---- Sheet 3: employees (thousands)
    { const r = pick(C.regions); const i = rnd(1, 2); const diff = (emp[r][i] - emp[r][i - 1]) * 1000; const want = Math.random() < 0.5; const stated = want ? diff : diff - Math.sign(diff || 1) * 50000; tf.push(mk(3, `In fiscal year ${fy[i]} there were ${fmt(Math.abs(stated), 0)} ${diff >= 0 ? "more" : "fewer"} employees in ${r} than in fiscal year ${fy[i - 1]}.`, stated === diff, `${fmt(emp[r][i], 0)} − ${fmt(emp[r][i - 1], 0)} = ${fmt(emp[r][i] - emp[r][i - 1], 0)} thousand = ${fmt(diff, 0)}. The axis says "in thousands", and the statement asks for an exact figure.`)); }
    { const i = rnd(0, 2); const want = Math.random() < 0.5; const thr = nice(want ? empTotals[i] * (HARD() ? 0.97 : 0.92) : empTotals[i] * (HARD() ? 1.03 : 1.08), 100) * 1000; tf.push(mk(3, `In fiscal year ${fy[i]} the company had more than ${fmt(thr, 0)} employees in total.`, empTotals[i] * 1000 > thr, `${C.regions.map(r => fmt(emp[r][i], 0)).join(" + ")} = ${fmt(empTotals[i], 0)} thousand.`)); }
    { const r = pick(C.regions); const truth = fy.every((_, i) => C.regions.every(o => o === r || emp[o][i] < emp[r][i])); tf.push(mk(3, `${r} had the most employees in every fiscal year shown.`, truth, `Compare the segments in each bar.`)); }
    { const r = pick(C.regions); const i = rnd(0, 2); const sh = emp[r][i] / empTotals[i] * 100; const want = Math.random() < 0.5; const d = HARD() ? rnd(1, 3) : rnd(2, 5); const k = want ? Math.max(1, Math.floor(sh - d)) : Math.ceil(sh + d); tf.push(mk(3, `In fiscal year ${fy[i]}, ${r} accounted for more than ${k}% of all employees.`, sh > k, `${fmt(emp[r][i], 0)} ÷ ${fmt(empTotals[i], 0)} = ${pct1(sh)}%.`)); }
    { const r = pick(C.regions); const p = (emp[r][2] - emp[r][0]) / emp[r][0] * 100; const want = Math.random() < 0.5; const d = HARD() ? rnd(1, 4) : rnd(3, 8); const k = want ? Math.max(1, Math.floor(Math.abs(p) - d)) : Math.ceil(Math.abs(p) + d); tf.push(mk(3, `The number of employees in ${r} ${p >= 0 ? "grew" : "fell"} by more than ${k}% between fiscal year ${fy[0]} and fiscal year ${fy[2]}.`, Math.abs(p) > k, `(${fmt(emp[r][2], 0)} − ${fmt(emp[r][0], 0)}) ÷ ${fmt(emp[r][0], 0)} = ${pct1(p)}%.`)); }
    cs.push(mkC(3, `Most employees in ${pick(C.regions)} work part-time.`, `Contract types are not shown.`));
    cs.push(mkC(3, `In fiscal year ${fy[2] + 1} the company will employ more people in ${pick(C.regions)} than in fiscal year ${fy[2]}.`, `Fiscal year ${fy[2] + 1} is not in the chart.`));
    // ---- Sheet 4: forecast (million)
    { const l = pick(C.lines.slice(1)); const diff = Math.round((fc[l][2] - fc[l][0]) * 10) / 10; const want = Math.random() < 0.5; const stated = want ? diff : Math.round((diff + pick([-1, 1]) * (1 + rnd(0, 2))) * 10) / 10; tf.push(mk(4, `The production forecast for ${l.toLowerCase()} is ${fmt(Math.abs(stated), 1)} million ${diff >= 0 ? "more" : "fewer"} for fiscal year FY+3 compared to fiscal year FY+1.`, stated === diff, `FY+3 ${fmt(fc[l][2], 1)} − FY+1 ${fmt(fc[l][0], 1)} = ${fmt(diff, 1)} million.`)); }
    { const l = pick(C.lines); const truth = fc[l][0] < fc[l][1] && fc[l][1] < fc[l][2]; tf.push(mk(4, `The forecast for ${l.toLowerCase()} rises in every year shown.`, truth, `${l}: ${fc[l].map(v => fmt(v, 1)).join(" → ")}.`)); }
    { const [a, b] = shuffle(C.lines.slice(1)); const g = rnd(0, 2); const r = fc[a][g] / fc[b][g]; if (r > 1.2) { const want = Math.random() < 0.5; const k = want ? Math.max(1.1, Math.floor((r - 0.1) * 10) / 10) : Math.ceil((r + 0.1) * 10) / 10; tf.push(mk(4, `In FY+${g + 1}, the forecast for ${a.toLowerCase()} is more than ${k} times the forecast for ${b.toLowerCase()}.`, r > k, `${fmt(fc[a][g], 1)} ÷ ${fmt(fc[b][g], 1)} = ${pct1(r)}.`)); } }
    { const g = rnd(0, 2); const tot = C.lines.reduce((s, l) => s + fc[l][g], 0); const want = Math.random() < 0.5; const thr = Math.round(want ? tot - rnd(1, 4) : tot + rnd(1, 4)); tf.push(mk(4, `Total forecast production in FY+${g + 1} exceeds ${thr} million ${C.unitPieces.split(" ")[0]}.`, tot > thr, `${C.lines.map(l => fmt(fc[l][g], 1)).join(" + ")} = ${fmt(tot, 1)} million.`)); }
    cs.push(mkC(4, `The production forecast for ${pick(C.lines).toLowerCase()} is ${rnd(1, 4)} million ${C.unitPieces.split(" ")[0]} more for fiscal year FY+3 compared to fiscal year FY+4.`, `There is no information for FY+4.`));
    cs.push(mkC(4, `The forecast for ${pick(C.lines).toLowerCase()} assumes that a new factory opens in FY+2.`, `Assumptions behind the forecast are not shown.`));
    cs.push(mkC(4, `Actual production in FY+1 will match the forecast.`, `The chart shows forecasts only.`));
    // ---- harder, two-step statements (always generated; preferred when the difficulty is raised)
    const hard = [];
    const mkH = (tab, st, truth, e) => hard.push({ tab, s: st, a: truth ? "T" : "F", e, hard: true });
    { const [a, b] = shuffle(C.costCats.slice(0, 4)); const i = yi(); const sh = (costs[a][i] + costs[b][i]) / costTotals[i] * 100; const want = Math.random() < 0.5; const k = want ? Math.max(1, Math.floor(sh - rnd(1, 3))) : Math.ceil(sh + rnd(1, 3)); mkH(0, `${a} and ${b.toLowerCase()} costs together accounted for more than ${k}% of total costs in Year ${years[i]}.`, sh > k, `(${fmt(costs[a][i], 0)} + ${fmt(costs[b][i], 0)}) ÷ ${fmt(costTotals[i], 0)} = ${pct1(sh)}%.`); }
    { const [a, b] = shuffle(C.costCats.slice(0, 4)); const da = costs[a][0] - costs[a][1], db = costs[b][0] - costs[b][1]; if (da !== db) mkH(0, `Between Year ${years[1]} and Year ${years[0]}, ${a.toLowerCase()} costs changed by more than ${b.toLowerCase()} costs did.`, Math.abs(da) > Math.abs(db), `${a}: ${fmt(costs[a][1], 0)} → ${fmt(costs[a][0], 0)} (${da >= 0 ? "+" : ""}${fmt(da, 0)}); ${b}: ${fmt(costs[b][1], 0)} → ${fmt(costs[b][0], 0)} (${db >= 0 ? "+" : ""}${fmt(db, 0)}).`); }
    { const i = yi(); const avg = costTotals[i] / C.costCats.length; const want = Math.random() < 0.5; const thr = nice(want ? avg * 0.95 : avg * 1.05, 10); mkH(0, `The average cost per category in Year ${years[i]} was above ${cur}${fmt(thr, 0)} thousand.`, avg > thr, `${fmt(costTotals[i], 0)} ÷ ${C.costCats.length} categories = ${fmt(avg, 0)} thousand.`); }
    { const [a, b, c] = shuffle([0, 1, 2, 3]); mkH(1, `${C.revCats[a]} revenue exceeded the revenue of ${C.revCats[b]} and ${C.revCats[c]} combined.`, shares[a] > shares[b] + shares[c], `${shares[a]}% versus ${shares[b]}% + ${shares[c]}% = ${shares[b] + shares[c]}%.`); }
    { const [a, b] = shuffle([0, 1, 2, 3]); const diff = (shares[a] - shares[b]) / 100 * revTotal; if (Math.abs(diff) > 2) { const want = Math.random() < 0.5; const thr = Math.round(want ? Math.abs(diff) - 1 - rnd(0, 2) : Math.abs(diff) + 1 + rnd(0, 2)); mkH(1, `Revenue from ${C.revCats[a]} was more than ${cur}${thr} million ${diff >= 0 ? "higher" : "lower"} than revenue from ${C.revCats[b]}.`, Math.abs(diff) > thr, `(${shares[a]}% − ${shares[b]}%) of ${cur}${revTotal} million = ${cur}${pct1(Math.abs(diff))} million.`); } }
    { const [a, b] = shuffle(C.leadCats.slice(0, 6)); const ga = (leads[a][0] - leads[a][2]) / leads[a][2] * 100, gb = (leads[b][0] - leads[b][2]) / leads[b][2] * 100; if (Math.abs(ga - gb) > 1.5) mkH(2, `Between Year ${years[2]} and Year ${years[0]}, leads from ${a.toLowerCase()} grew faster in percentage terms than leads from ${b.toLowerCase()}.`, ga > gb, `${a}: ${pct1(ga)}%; ${b}: ${pct1(gb)}%.`); }
    { const [a, b] = shuffle(C.leadCats.slice(0, 6)); const i = yi(); const r = leads[a][i] / leads[b][i]; if (r > 1.3) { const want = Math.random() < 0.5; const k = want ? Math.floor((r - 0.1) * 10) / 10 : Math.ceil((r + 0.1) * 10) / 10; mkH(2, `In Year ${years[i]}, leads from ${a.toLowerCase()} were more than ${k} times the leads from ${b.toLowerCase()}.`, r > k, `${fmt(leads[a][i], 0)} ÷ ${fmt(leads[b][i], 0)} = ${pct1(r)}.`); } }
    { const [r1, r2] = shuffle(C.regions); const d1 = emp[r1][2] - emp[r1][0], d2 = emp[r2][2] - emp[r2][0]; if (d1 !== d2) mkH(3, `Between fiscal year ${fy[0]} and fiscal year ${fy[2]}, ${r1} added more employees than ${r2}.`, d1 > d2, `${r1}: ${fmt(d1, 0)} thousand; ${r2}: ${fmt(d2, 0)} thousand.`); }
    { const [r1, r2] = shuffle(C.regions); const i = rnd(0, 2); const sh = (emp[r1][i] + emp[r2][i]) / empTotals[i] * 100; const want = Math.random() < 0.5; const k = want ? Math.floor(sh - rnd(1, 3)) : Math.ceil(sh + rnd(1, 3)); mkH(3, `In fiscal year ${fy[i]}, ${r1} and ${r2} together accounted for more than ${k}% of all employees.`, sh > k, `(${fmt(emp[r1][i], 0)} + ${fmt(emp[r2][i], 0)}) ÷ ${fmt(empTotals[i], 0)} = ${pct1(sh)}%.`); }
    { const [a, b, c] = shuffle(C.lines); const diff = fc[a][2] + fc[b][2] - fc[c][2]; if (Math.abs(diff) > 1) { const want = Math.random() < 0.5; const thr = Math.round((want ? Math.abs(diff) - 0.5 - rnd(0, 1) : Math.abs(diff) + 0.5 + rnd(0, 1)) * 10) / 10; mkH(4, `In FY+3, the combined forecast for ${a.toLowerCase()} and ${b.toLowerCase()} ${diff >= 0 ? "exceeds" : "falls short of"} the forecast for ${c.toLowerCase()} by more than ${fmt(thr, 1)} million.`, Math.abs(diff) > thr, `${fmt(fc[a][2], 1)} + ${fmt(fc[b][2], 1)} = ${fmt(fc[a][2] + fc[b][2], 1)} versus ${fmt(fc[c][2], 1)}: difference ${fmt(Math.abs(diff), 1)} million.`); } }
    { const l = pick(C.lines.slice(1)); const p = (fc[l][2] - fc[l][0]) / fc[l][0] * 100; const want = Math.random() < 0.5; const k = want ? Math.max(1, Math.floor(Math.abs(p) - rnd(1, 3))) : Math.ceil(Math.abs(p) + rnd(1, 3)); mkH(4, `The forecast for ${l.toLowerCase()} ${p >= 0 ? "grows" : "falls"} by more than ${k}% between FY+1 and FY+3.`, Math.abs(p) > k, `(${fmt(fc[l][2], 1)} − ${fmt(fc[l][0], 1)}) ÷ ${fmt(fc[l][0], 1)} = ${pct1(p)}%.`); }
    const seen = new Set(); const dedupe = (arr) => arr.filter(x => { if (seen.has(x.s)) return false; seen.add(x.s); return true; });
    const hardU = dedupe(hard), tfU = dedupe(tf);
    const nC = Math.max(1, Math.round(count * 0.3));
    const nTF = count - nC; const nHard = HARD() ? Math.min(hardU.length, Math.round(nTF * 0.45)) : Math.min(hardU.length, Math.round(nTF * 0.15));
    let out = shuffle(hardU).slice(0, nHard).concat(shuffle(tfU).slice(0, nTF - nHard)).concat(shuffle(cs).slice(0, nC));
    // top up with regenerated statements if the pool is short
    let guard = 0; while (out.length < count && guard++ < 6) { const more = genCompanyStatements(P, count).filter(x => !out.some(y => y.s === x.s)); out = out.concat(more.slice(0, count - out.length)); }
    return shuffle(out);
  }
  function genNumericalSet(n) {
    const P = genCompanyPack();
    const scenario = { title: P.title, tabs: P.tabs, active: 0 };
    return genCompanyStatements(P, n).map(st => ({ type: "numerical", scenario, s: st.s, a: st.a, e: st.e, tab: st.tab, hard: !!st.hard }));
  }

  // ------------------------------------------------------------ VERBAL: full company pack when the set is long
  function genVerbalSet(n, usedIds) {
    const packs = window.VERBAL_COMPANIES || [];
    if (n >= 30 && packs.length) {
      let order = shuffle(packs); if (usedIds && usedIds.length) { const fresh = order.filter(p => !usedIds.includes(p.id)); order = fresh.concat(order.filter(p => usedIds.includes(p.id))); }
      const p = order[0];
      const scenario = { title: p.company, tabs: p.tabs.map(t => ({ name: t.name, icon: t.icon, paras: t.paras })), active: 0 };
      const hardItems = shuffle(p.items.filter(i => i.hard)), rest = shuffle(p.items.filter(i => !i.hard));
      const chosen = HARD() ? hardItems.concat(rest).slice(0, n) : rest.concat(hardItems).slice(0, n);
      return shuffle(chosen).map(it => ({ type: "verbal", scenario, s: it.s, a: it.a, e: it.e, tab: it.tab, src: p.id, hard: !!it.hard }));
    }
    return window.GEN._verbalBank(n, usedIds);
  }

  // ------------------------------------------------------------ INDUCTIVE REASONING: scales ix
  // Nine objects, eight follow a rule, one breaks it. Each object is an SVG string (viewBox 0 0 60 60).
  const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="56" height="56">${inner}</svg>`;
  const poly = (pts, fill, extra) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="var(--ink)" stroke-width="2" ${extra || ""}/>`;
  const reg = (k, r, cx, cy, rot) => [...Array(k).keys()].map(i => { const a = -Math.PI / 2 + (rot || 0) + i * 2 * Math.PI / k; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const INK = "var(--ink)", NONE = "var(--surface)";
  const quad = {
    square: () => [[14, 14], [46, 14], [46, 46], [14, 46]], rect: () => [[8, 20], [52, 20], [52, 40], [8, 40]], trapezoid: () => [[10, 44], [50, 44], [40, 16], [20, 16]], trapezoidDown: () => [[18, 44], [42, 44], [52, 16], [8, 16]],
    parallelogram: () => [[18, 44], [52, 44], [42, 16], [8, 16]], rhombus: () => [[30, 8], [50, 30], [30, 52], [10, 30]], kite: () => [[30, 6], [48, 26], [30, 54], [12, 26]]
  };
  const tri = () => [[30, 10], [50, 48], [10, 48]], pent = () => reg(5, 22, 30, 32), hexa = () => reg(6, 22, 30, 30);
  function rotatedGroup(inner, deg) { return `<g transform="rotate(${deg} 30 30)">${inner}</g>`; }
  const IX_RULES = [
    { name: "rotation", desc: (s) => `each object is rotated ${s}° ${s > 0 ? "clockwise" : "anticlockwise"} compared with the previous one`, make(level) {
      const step = HARD() ? pick([45, -45, 90, -90, 45, -45]) : pick([90, -90, 45, -45]); const base = pick(["arrow", "tri", "L", "T"]); const start = rnd(0, 3) * 90;
      const shape = { arrow: poly([[30, 8], [48, 30], [36, 30], [36, 52], [24, 52], [24, 30], [12, 30]], INK), tri: poly([[30, 10], [50, 48], [10, 48]], INK), L: poly([[18, 10], [30, 10], [30, 38], [48, 38], [48, 50], [18, 50]], INK), T: poly([[10, 10], [50, 10], [50, 22], [36, 22], [36, 50], [24, 50], [24, 22], [10, 22]], INK) }[base];
      const objs = [...Array(9).keys()].map(i => svg(rotatedGroup(shape, start + step * i)));
      const odd = rnd(1, 8); objs[odd] = svg(rotatedGroup(shape, start + step * (odd - 1) - step)); // rotated the other way
      return { objs, odd, e: `Rule: ${this.desc(step)}. Object ${odd + 1} is rotated the other way.` }; } },
    { name: "count pattern", desc: () => "the number of lines repeats a fixed pattern", make(level) {
      const pat = pick([[1, 1, 2], [1, 2], [1, 2, 3], [2, 1, 1], [3, 1]]); const counts = [...Array(9).keys()].map(i => pat[i % pat.length]);
      const odd = rnd(2, 8); const wrong = counts[odd] + pick([-1, 1]); counts[odd] = wrong < 1 ? counts[odd] + 1 : wrong;
      const draw = (n) => svg(`<rect x="6" y="6" width="48" height="48" fill="${NONE}" stroke="var(--line)"/>` + [...Array(n).keys()].map(k => { const x = 30 + (k - (n - 1) / 2) * 10; return `<line x1="${x}" y1="14" x2="${x}" y2="46" stroke="${INK}" stroke-width="3"/>`; }).join(""));
      return { objs: counts.map(draw), odd, e: `Rule: the boxes follow the pattern ${pat.join(", ")} lines, repeating. Object ${odd + 1} shows ${counts[odd]} line${counts[odd] > 1 ? "s" : ""} instead of ${pat[odd % pat.length]}.` }; } },
    { name: "alternating fill", desc: () => "the shading alternates black, white, black, white", make(level) {
      const shape = pick([() => reg(5, 20, 30, 30), () => reg(6, 20, 30, 30), () => [[30, 8], [52, 30], [30, 52], [8, 30]], () => [[30, 6], [36, 24], [54, 24], [40, 36], [46, 54], [30, 43], [14, 54], [20, 36], [6, 24], [24, 24]]])();
      const pat = pick([[1, 0], [1, 0, 0], [1, 1, 0]]); const fills = [...Array(9).keys()].map(i => pat[i % pat.length]);
      const odd = rnd(1, 8); fills[odd] = 1 - fills[odd];
      return { objs: fills.map(f => svg(poly(shape, f ? INK : NONE))), odd, e: `Rule: the shading follows the pattern ${pat.map(x => x ? "black" : "white").join(", ")}, repeating. Object ${odd + 1} breaks it.` }; } },
    { name: "side count", desc: () => "all shapes have the same number of sides", make(level) {
      const fourSided = Object.values(quad); const objs = [...Array(9).keys()].map(() => svg(poly(pick(fourSided)(), Math.random() < 0.5 ? INK : NONE)));
      const odd = rnd(0, 8); objs[odd] = svg(poly(Math.random() < 0.5 ? tri() : pent(), Math.random() < 0.5 ? INK : NONE));
      return { objs, odd, e: `Rule: every shape has four sides. Object ${odd + 1} does not.` }; } },
    { name: "containment", desc: () => "each object contains a second shape that fits entirely inside it", make(level) {
      const outers = [() => poly([[6, 10], [54, 10], [54, 50], [6, 50]], INK), () => `<ellipse cx="30" cy="30" rx="26" ry="18" fill="${INK}" stroke="${INK}" stroke-width="2"/>`, () => poly(tri(), INK), () => poly(hexa(), INK)];
      const inner = (dx, dy) => { const kind = pick(["sq", "circ", "tri"]); const x = 30 + dx, y = 30 + dy; return kind === "sq" ? `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" fill="${NONE}" stroke="${INK}" stroke-width="1.5"/>` : kind === "circ" ? `<circle cx="${x}" cy="${y}" r="6" fill="${NONE}" stroke="${INK}" stroke-width="1.5"/>` : poly([[x, y - 6], [x + 6, y + 5], [x - 6, y + 5]], NONE); };
      const objs = [...Array(9).keys()].map(() => svg(pick(outers)() + inner(rnd(-6, 6), rnd(-3, 5))));
      const odd = rnd(0, 8); objs[odd] = svg(outers[0]() + inner(pick([-27, 27]), rnd(-4, 4)));
      return { objs, odd, e: `Rule: the small shape sits entirely inside the large one. In object ${odd + 1} it sticks out.` }; } },
    { name: "element count", desc: () => "every object contains the same number of dots", make(level) {
      const k = rnd(HARD() ? 3 : 2, 4 + Math.min(2, Math.floor(level / 7))); const draw = (n) => { const pts = []; while (pts.length < n) { const p = [rnd(10, 50), rnd(10, 50)]; if (pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > 11)) pts.push(p); } return svg(`<rect x="4" y="4" width="52" height="52" fill="${NONE}" stroke="var(--line)"/>` + pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="${INK}"/>`).join("")); };
      const objs = [...Array(9).keys()].map(() => draw(k)); const odd = rnd(0, 8); objs[odd] = draw(k + pick([-1, 1]));
      return { objs, odd, e: `Rule: every box contains exactly ${k} dots. Object ${odd + 1} does not.` }; } },
    { name: "line orientation", desc: () => "every object contains only vertical lines", make(level) {
      const draw = (horiz) => { const n = rnd(1, 3); return svg(`<rect x="6" y="6" width="48" height="48" fill="${NONE}" stroke="var(--line)"/>` + [...Array(n).keys()].map(k => { const c = 30 + (k - (n - 1) / 2) * 12; return horiz ? `<line x1="12" y1="${c}" x2="48" y2="${c}" stroke="${INK}" stroke-width="3"/>` : `<line x1="${c}" y1="12" x2="${c}" y2="48" stroke="${INK}" stroke-width="3"/>`; }).join("")); };
      const objs = [...Array(9).keys()].map(() => draw(false)); const odd = rnd(0, 8); objs[odd] = draw(true);
      return { objs, odd, e: `Rule: all lines are vertical. Object ${odd + 1} has horizontal lines.` }; } },
    { name: "size progression", desc: () => "the shapes grow by the same amount from one object to the next", make(level) {
      const shape = pick([(r) => reg(4, r, 30, 30, Math.PI / 4), (r) => reg(3, r, 30, 31), (r) => reg(6, r, 30, 30)]); const sizes = [...Array(9).keys()].map(i => 8 + i * 2.2);
      const odd = rnd(1, 8); sizes[odd] = sizes[odd] + pick([-4.4, 4.4]);
      return { objs: sizes.map(r => svg(poly(shape(r), INK))), odd, e: `Rule: each shape is slightly larger than the one before. Object ${odd + 1} breaks the progression.` }; } }
  ];
  function genIx(level) { const lv = level + (HARD() ? 5 : 0); const rule = IX_RULES[lv < 3 ? rnd(1, 4) : rnd(0, IX_RULES.length - 1)]; const r = rule.make(lv); return { type: "ix", objs: r.objs, answer: r.odd, e: r.e }; }
  function genIxSet(n) { return [...Array(n).keys()].map(i => genIx(i)); }

  // ------------------------------------------------------------ SHORT-TERM MEMORY: objects flash, pick from eight
  const ICONS = {
    apple: `<path d="M30 14c4-6 10-5 12-3-3 2-4 5-4 7 6 0 10 4 10 11 0 9-6 19-11 19-2 0-4-1-7-1s-5 1-7 1c-5 0-11-10-11-19 0-7 4-11 10-11 3 0 5 1 8 1z" fill="var(--ink)"/>`,
    shield: `<path d="M30 8l18 6v14c0 12-8 20-18 24-10-4-18-12-18-24V14z" fill="none" stroke="var(--ink)" stroke-width="3"/>`,
    cross: `<path d="M14 14l32 32M46 14L14 46" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/>`,
    fish: `<path d="M8 30c8-12 20-14 30-8l12-8-4 16 4 16-12-8c-10 6-22 4-30-8z" fill="var(--ink)"/><circle cx="20" cy="28" r="2.5" fill="var(--surface)"/>`,
    globe: `<circle cx="30" cy="30" r="20" fill="none" stroke="var(--ink)" stroke-width="3"/><ellipse cx="30" cy="30" rx="9" ry="20" fill="none" stroke="var(--ink)" stroke-width="2.5"/><path d="M10 30h40M13 20h34M13 40h34" stroke="var(--ink)" stroke-width="2.5"/>`,
    lock: `<rect x="14" y="26" width="32" height="26" rx="4" fill="var(--ink)"/><path d="M20 26v-7a10 10 0 0 1 20 0v7" fill="none" stroke="var(--ink)" stroke-width="4"/>`,
    key: `<circle cx="20" cy="30" r="10" fill="none" stroke="var(--ink)" stroke-width="4"/><path d="M30 30h22M46 30v8M52 30v6" stroke="var(--ink)" stroke-width="4"/>`,
    star: `<polygon points="30,6 36,23 54,23 39,34 45,52 30,41 15,52 21,34 6,23 24,23" fill="var(--ink)"/>`,
    heart: `<path d="M30 52C14 40 6 32 6 22a10 10 0 0 1 18-6l6 6 6-6a10 10 0 0 1 18 6c0 10-8 18-24 30z" fill="var(--ink)"/>`,
    house: `<path d="M8 30L30 10l22 20h-6v20H14V30z" fill="var(--ink)"/><rect x="26" y="36" width="8" height="14" fill="var(--surface)"/>`,
    leaf: `<path d="M50 10C20 10 10 30 10 50c20 0 40-10 40-40z" fill="var(--ink)"/><path d="M12 48L44 16" stroke="var(--surface)" stroke-width="2.5"/>`,
    bell: `<path d="M30 8a14 14 0 0 1 14 14v10l6 8H10l6-8V22A14 14 0 0 1 30 8z" fill="var(--ink)"/><circle cx="30" cy="48" r="5" fill="var(--ink)"/>`,
    cup: `<path d="M12 16h30v18a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12z" fill="var(--ink)"/><path d="M42 20h6a6 6 0 0 1 0 12h-6" fill="none" stroke="var(--ink)" stroke-width="4"/>`,
    umbrella: `<path d="M6 30a24 24 0 0 1 48 0z" fill="var(--ink)"/><path d="M30 30v18a5 5 0 0 1-10 0" fill="none" stroke="var(--ink)" stroke-width="4"/>`,
    bolt: `<polygon points="34,6 14,34 28,34 24,54 46,24 32,24" fill="var(--ink)"/>`,
    moon: `<path d="M38 8a22 22 0 1 0 14 38 18 18 0 0 1-14-38z" fill="var(--ink)"/>`,
    anchor: `<circle cx="30" cy="12" r="5" fill="none" stroke="var(--ink)" stroke-width="3"/><path d="M30 17v34M14 34a16 16 0 0 0 32 0M20 28h20" fill="none" stroke="var(--ink)" stroke-width="4"/>`,
    gear: `<circle cx="30" cy="30" r="9" fill="none" stroke="var(--ink)" stroke-width="5"/>` + [...Array(8).keys()].map(i => `<rect x="27" y="4" width="6" height="10" fill="var(--ink)" transform="rotate(${i * 45} 30 30)"/>`).join("")
  };
  const ICON_NAMES = Object.keys(ICONS);
  const iconSVG = (id, size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="${size}" height="${size}" aria-label="${id}">${ICONS[id]}</svg>`;
  function genMemory(level) {
    const k = HARD() ? Math.min(7, 4 + Math.floor(level / 3)) : Math.min(6, 3 + Math.floor(level / 3));
    const all = shuffle(ICON_NAMES); const seq = all.slice(0, k); const grid = shuffle(all.slice(0, 8));
    return { type: "memory", seq, grid, k, showMs: HARD() ? 800 : 1000, answer: seq.slice(), e: `Order shown: ${seq.join(", ")}.` };
  }
  function genMemorySet(n) { return [...Array(n).keys()].map(i => genMemory(i)); }

  // ------------------------------------------------------------ MATHEMATICS ASSESSMENT (BBA, BIE, PPLE: 12 questions, 15 min)
  const sup = (s) => s.replace(/\^2/g, "²").replace(/\^3/g, "³").replace(/\^4/g, "⁴");
  const term = (c, v, first) => { if (c === 0) return ""; const sign = c < 0 ? " − " : (first ? "" : " + "); const a = Math.abs(c); return `${sign}${a === 1 && v ? "" : a}${v}`; };
  const polyStr = (coefs) => { // [a,b,c] -> ax² + bx + c
    let s = ""; let first = true; const vars = ["x^2", "x", ""]; coefs.forEach((c, i) => { if (c) { s += term(c, vars[i], first); first = false; } }); return sup(s || "0"); };
  function mcq(stem, correct, distractors, e) {
    const opts = shuffle([correct].concat(distractors.filter((d, i, a) => d !== correct && a.indexOf(d) === i).slice(0, 3)));
    while (opts.length < 4) opts.push("None of the other answers");
    return { type: "math", stem, options: opts, answer: opts.indexOf(correct), e };
  }
  const MATH = [
    () => { const a = rnd(2, 6), b = rnd(1, 6), c = rnd(2, 6), d = rnd(1, 6); const A = a * c, B = -(a * d + b * c), Cc = b * d; return mcq(`Expand and simplify: (${a}x − ${b})(${c}x − ${d})`, polyStr([A, B, Cc]), [polyStr([A, -B, Cc]), polyStr([A, B, -Cc]), polyStr([A, -(a * d - b * c), Cc]), polyStr([A, B - a * d, Cc])], `(${a}x)(${c}x) = ${A}x², outer + inner = −${a * d}x − ${b * c}x = ${B}x, (−${b})(−${d}) = +${Cc}.`); },
    () => { const k = rnd(2, 5), c = rnd(2, 6); return mcq(`Simplify, assuming t ≠ ±${c}: (${k}t − ${k * c})/(t² − ${c * c})`, `${k}/(t + ${c})`, [`${k}/(t − ${c})`, `t/(t − ${c})`, `1/(t + ${c})`, `${k}t/(t + ${c})`], `Numerator ${k}(t − ${c}); denominator (t − ${c})(t + ${c}). Cancel (t − ${c}).`); },
    () => { const b = rnd(3, 9), a = rnd(1, 15); const y = b * b - a; return mcq(`Solve the equation: √(y + ${a}) = ${b}`, `y = ${y}`, [`y = ${b - a}`, `y = ${-y}`, "No real solution", `y = ${b * b + a}`], `Square both sides: y + ${a} = ${b * b}, so y = ${y}.`); },
    () => { const q = rnd(2, 5); let p = q + rnd(1, 3); const gcd = (x, y) => y ? gcd(y, x % y) : x; while (gcd(p, q) !== 1) p++; const a = rnd(1, 6) * (p - q); const y = q * a / (p - q); return mcq(`Solve the equation: (y + ${a})/y = ${p}/${q}`, `y = ${y}`, [`y = ${-y}`, `y = ${a}`, "No real solution", `y = ${y + q}`], `${q}(y + ${a}) = ${p}y → ${q * a} = ${p - q}y → y = ${y}.`); },
    () => { const a = rnd(1, 9), b = rnd(2, 6), r = rnd(5, 20); const c = b * r - a; return mcq(`Solve the inequality: −${a} + ${b}x < ${c}`, `x < ${r}`, [`x > ${r}`, `x ≤ ${r}`, `x ≥ ${r}`, `x < ${r - 1}`], `${b}x < ${c + a} → x < ${r}.`); },
    () => { const p = rnd(1, 6), q = p + rnd(1, 5); return mcq(`Solve the inequality: (x − ${p})(x − ${q}) ≤ 0`, `${p} ≤ x ≤ ${q}`, [`x ≤ ${p} or x ≥ ${q}`, `x ≤ ${p}`, `x > ${q}`, `${p} < x < ${q}`], `A parabola opening upwards is ≤ 0 between its roots ${p} and ${q}, inclusive.`); },
    () => { const a = rnd(2, 9); return mcq(`Evaluate the limit: lim (x → ${a}) (x² − ${a * a})/(x − ${a})`, `${2 * a}`, [`${a}`, "Does not exist", `${a * a}`, `${2 * a + 1}`], `(x² − ${a * a}) = (x − ${a})(x + ${a}); cancel, then x + ${a} → ${2 * a}.`); },
    () => { const a = rnd(1, 9), b = rnd(2, 5); return mcq(`Find the derivative: f(x) = (x² + ${a})(${b}x)`, sup(`${3 * b}x^2 + ${a * b}`), [sup(`${2 * b}x^2 + ${a * b}`), sup(`${3 * b}x^2 + ${a * b}x`), sup(`${2 * b}x`), sup(`${b}x^2 + ${a * b}`)], `f(x) = ${b}x³ + ${a * b}x, so f′(x) = ${3 * b}x² + ${a * b}.`); },
    () => { const a = rnd(1, 4), u = rnd(1, 2); const val = u ** 4 / 2 + a * u * u; const fr = (v) => Number.isInteger(v) ? String(v) : (v * 2) + "/2"; return mcq(`Compute the definite integral: ∫₀${u === 1 ? "¹" : "²"} 2x(x² + ${a}) dx`, fr(val), [fr(val + 1), fr(val - 0.5), fr(2 * val), fr(val + 0.5)], `∫ 2x³ + ${2 * a}x dx = x⁴/2 + ${a}x². Evaluate from 0 to ${u}: ${fr(val)}.`); },
    () => { const a = rnd(2, 6), b = rnd(2, 9); return mcq(`Find the derivative: f(x) = ${a}x³ − ${b}x + 2`, sup(`${3 * a}x^2 − ${b}`), [sup(`${3 * a}x^2 − ${b}x`), sup(`${a}x^2 − ${b}`), sup(`${3 * a}x^2 + 2`), sup(`${3 * a}x − ${b}`)], `Power rule: ${3 * a}x² − ${b}; the constant disappears.`); },
    () => { const m = rnd(2, 5), c = rnd(1, 9), d = rnd(1, 9); const x = (c + d) / m; const ans = Number.isInteger(x) ? `x = ${x}` : `x = ${c + d}/${m}`; return mcq(`Solve the equation: ${m}x − ${c} = ${d}`, ans, [`x = ${(d - c)}/${m}`, `x = ${c + d}`, `x = ${m}/${c + d}`, `x = ${(c + d) * m}`], `${m}x = ${c + d} → x = ${c + d}/${m}.`); },
    () => { const r = rnd(2, 6); let s = rnd(1, 6); if (s === r) s = r + 1; const b = -(r + s), c = r * s; return mcq(`Factor: ${polyStr([1, b, c])}`, `(x − ${r})(x − ${s})`, [`(x + ${r})(x + ${s})`, `(x − ${r})(x + ${s})`, `(x + ${r})(x − ${s})`, `(x − ${r + s})(x − 1)`], `Roots ${r} and ${s}: sum ${r + s}, product ${c}.`); }
  ];
  const MATH_HARD = [
    () => { const a = rnd(2, 7), b = rnd(1, 7), c = rnd(2, 7), d = rnd(1, 7); const A = a * c, B = a * d - b * c, Cc = -b * d; return mcq(`Expand and simplify: (${a}x − ${b})(${c}x + ${d})`, polyStr([A, B, Cc]), [polyStr([A, -B, Cc]), polyStr([A, B, -Cc]), polyStr([A, a * d + b * c, Cc]), polyStr([A, -(a * d + b * c), Cc])], `(${a}x)(${c}x) = ${A}x²; outer + inner = ${a * d}x − ${b * c}x = ${B}x; (−${b})(${d}) = ${Cc}.`); },
    () => { const a = rnd(2, 9), b = rnd(1, 6); const lim = a - b; return mcq(`Evaluate the limit: lim (x → ${a}) (x² − ${a + b}x + ${a * b})/(x − ${a})`, `${lim}`, [`${a + b}`, "Does not exist", `${-lim}`, `${a}`], `Factor: (x − ${a})(x − ${b})/(x − ${a}) → x − ${b} → ${lim}.`); },
    () => { const b = rnd(3, 9), a = rnd(1, 9); return mcq(`Solve the equation: √(y + ${a}) = −${b}`, "No real solution", [`y = ${b * b - a}`, `y = ${-(b * b) - a}`, `y = ${b - a}`], `A square root is never negative, so no real y satisfies the equation (squaring would give a false solution).`); },
    () => { const a = rnd(1, 5), u = rnd(2, 3), k = rnd(2, 4); const val = k * (u ** 4 / 4) + a * u * u; const fr = (v) => Number.isInteger(v) ? String(v) : (Number.isInteger(v * 2) ? (v * 2) + "/2" : (v * 4) + "/4"); return mcq(`Compute the definite integral: ∫₀${u === 2 ? "²" : "³"} (${k}x³ + ${2 * a}x) dx`, fr(val), [fr(val + 2), fr(val - u), fr(val * 2), fr(val + 1)], `∫ ${k}x³ + ${2 * a}x dx = ${k}x⁴/4 + ${a}x². Evaluate from 0 to ${u}: ${fr(val)}.`); },
    () => { const p = rnd(1, 5), q = p + rnd(2, 5); return mcq(`Solve the inequality: (x − ${p})(x − ${q}) > 0`, `x < ${p} or x > ${q}`, [`${p} < x < ${q}`, `x > ${q}`, `x > ${p}`, `${p} ≤ x ≤ ${q}`], `A parabola opening upwards is positive outside its roots ${p} and ${q}.`); },
    () => { const a = rnd(2, 5), b = rnd(1, 9); return mcq(`Find the derivative: f(x) = (${a}x + ${b})²`, sup(`${2 * a * a}x + ${2 * a * b}`), [sup(`${2 * a}x + ${2 * b}`), sup(`${a * a}x + ${a * b}`), sup(`2(${a}x + ${b})`), sup(`${2 * a * a}x + ${a * b}`)], `Chain rule: 2(${a}x + ${b}) × ${a} = ${2 * a * a}x + ${2 * a * b}.`); }
  ];
  function genMathSet(n) {
    const pool = HARD() ? MATH.concat(MATH_HARD, MATH_HARD) : MATH; const order = shuffle([...Array(pool.length).keys()]); const out = [];
    for (let i = 0; i < n; i++) out.push(pool[order[i % order.length]]());
    return out;
  }

  // ------------------------------------------------------------ register
  window.GEN._verbalBank = window.GEN.verbal;
  window.GEN.numerical = genNumericalSet;
  window.GEN.verbal = genVerbalSet;
  window.GEN.ix = genIxSet;
  window.GEN.memory = genMemorySet;
  window.GEN.math = genMathSet;
  window.GEN.iconSVG = iconSVG;
  window.GEN.ICON_NAMES = ICON_NAMES;
})();
