/* IE Admissions Sprint: app logic */
(function () {
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
  const h = (tag, attrs, ...kids) => {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === "class") el.className = attrs[k];
      else if (k === "html") el.innerHTML = attrs[k];
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) el.setAttribute(k, attrs[k]);
    }
    kids.flat().forEach(k => { if (k == null) return; el.append(k.nodeType ? k : document.createTextNode(String(k))); });
    return el;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmtTime = (s) => { s = Math.max(0, Math.round(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
  const fmtDate = (ts) => new Date(ts).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const MODULES = {
    numerical: { name: "Numerical reasoning", short: "Numerical", desc: "One company, five data sheets (tables, donut, stacked and grouped bars). 37 statements: True, False or Cannot say. Aon scales numerical, the format in IE's example.", defN: 37, defMin: 12, kind: "statement", official: true },
    verbal: { name: "Verbal reasoning", short: "Verbal", desc: "One company, six information tabs that stay on screen. 49 statements: True, False or Cannot say. Aon scales verbal, the format in IE's example.", defN: 49, defMin: 12, kind: "statement", official: true },
    deductive: { name: "Deductive logical thinking", short: "Deductive", desc: "4×4 and 5×5 grids: every symbol once per row and column, fill the ? cell. New grids keep coming for 6 minutes. Aon gapChallenge, the format in IE's example.", defN: 40, defMin: 6, official: true },
    memory: { name: "Learning efficiency (short-term memory)", short: "Memory", desc: "Objects flash one at a time; pick them from a grid of eight in the order shown. 10 tasks in 5 minutes. Aon short-term memory test, the format in IE's example.", defN: 10, defMin: 5, official: true },
    math: { name: "Mathematics assessment", short: "Maths", desc: "IE's 15-minute section for BBA, BIE and PPLE: 12 questions on expanding, simplifying, equations, inequalities, limits, derivatives and integrals, with an 'I don't know' option that costs nothing.", defN: 12, defMin: 15, official: true },
    ix: { name: "Inductive reasoning (ieGAT)", short: "Inductive ix", desc: "Nine objects in a row, eight follow a rule, pick the one that breaks it. 20 tasks in 5 minutes. Aon scales ix, the logical-reasoning example on IE's ieGAT page.", defN: 20, defMin: 5, official: true },
    inductive: { name: "Inductive sets (extra)", short: "Sets A/B", desc: "Find the rule separating set A from set B and assign four new figures. Aon scales cls. Reported by applicants, not shown on IE's pages.", defN: 12, defMin: 12 },
    eql: { name: "Equations (extra)", short: "Equations", desc: "Complete equations with digits 1 to 9. Aon scales eql / digitChallenge. Not shown on IE's pages.", defN: 30, defMin: 5 },
    abstract: { name: "Abstract series (extra)", short: "Abstract", desc: "Which figure continues the series. Old paper-ieGAT style, kept as a warm-up.", defN: 15, defMin: 10 }
  };
  const TRACKS = {
    bachelor: { name: "IE University Admissions Test (Bachelor)", sections: [["numerical", 37, 12], ["verbal", 49, 12], ["deductive", 40, 6], ["memory", 10, 5], ["math", 12, 15]] },
    master: { name: "ieGAT (Master)", sections: [["numerical", 37, 12], ["verbal", 49, 12], ["ix", 20, 5], ["deductive", 40, 6]] }
  };

  // ------------------------------------------------------------ storage
  // Three backends, tried in order: the claude.ai artifact store, a Supabase table behind a shared code
  // (the public site), and this browser's localStorage.
  const BACKEND = window.IE_BACKEND || null;
  const Store = {
    docs: {}, db: null, col: null, mode: "loading", subs: [], code: null, queue: Promise.resolve(),
    onChange(fn) { this.subs.push(fn); },
    emit() { this.subs.forEach(fn => { try { fn(); } catch (e) { console.error(e); } }); },
    async init() {
      try {
        if (window.claude && typeof window.claude.use === "function") {
          const [user, db] = await Promise.all([window.claude.use("user"), window.claude.use("db")]);
          if (user && db) {
            const id = await user.id();
            if (id) {
              this.db = db; this.col = db.collection("data/users/" + id); this.mode = "db";
              this.col.limit(1000).onSnapshot(snap => {
                const docs = {}; snap.docs.forEach(d => { docs[d.id] = d.data(); }); this.docs = docs; this.emit();
              }, err => { console.warn("db subscription ended", err); this.fallback(); });
              return;
            }
          }
        }
      } catch (e) { console.warn(e); }
      if (BACKEND) {
        this.mode = "gate";
        let code = null; try { code = localStorage.getItem("ieCode"); } catch (e) { }
        if (code) { const ok = await this.verify(code); if (ok !== false) { this.code = code; await this.loadRemote(); return; } try { localStorage.removeItem("ieCode"); } catch (e) { } }
        this.emit(); return;
      }
      this.fallback();
    },
    headers(extra) { const h = { "apikey": BACKEND.key, "Authorization": "Bearer " + BACKEND.key, [BACKEND.header]: this.code || "" }; if (extra) Object.assign(h, extra); return h; },
    async verify(code) {
      try { const r = await fetch(BACKEND.url + "/rest/v1/rpc/" + BACKEND.rpc, { method: "POST", headers: { "apikey": BACKEND.key, "Authorization": "Bearer " + BACKEND.key, "Content-Type": "application/json", [BACKEND.header]: code }, body: "{}" }); const v = await r.json(); return v === true; }
      catch (e) { return null; }
    },
    async unlock(code) {
      const ok = await this.verify(code);
      if (ok === true) { this.code = code; try { localStorage.setItem("ieCode", code); } catch (e) { } await this.loadRemote(); }
      return ok;
    },
    async loadRemote() {
      try {
        const r = await fetch(BACKEND.url + "/rest/v1/" + BACKEND.table + "?select=id,kind,data", { headers: this.headers() });
        if (!r.ok) throw new Error("load " + r.status);
        const rows = await r.json(); const docs = {}; rows.forEach(x => { docs[x.id] = Object.assign({ kind: x.kind }, x.data); }); this.docs = docs;
        this.mode = "supa"; this.emit();
        if (!this._vis) { this._vis = true; document.addEventListener("visibilitychange", () => { if (!document.hidden && this.mode === "supa") this.loadRemote(); }); }
      } catch (e) { console.warn(e); if (this.mode !== "supa") { this.mode = "gate"; this.emit(); } }
    },
    lock() { this.code = null; try { localStorage.removeItem("ieCode"); } catch (e) { } this.docs = {}; this.mode = "gate"; this.emit(); },
    fallback() { this.mode = "local"; try { this.docs = JSON.parse(localStorage.getItem("ieprep") || "{}"); } catch (e) { this.docs = {}; } this.emit(); },
    persistLocal() { try { localStorage.setItem("ieprep", JSON.stringify(this.docs)); } catch (e) { } },
    remote(fn) { this.queue = this.queue.then(fn).catch(e => { console.warn("sync failed", e); App.syncError = true; }); return this.queue; },
    async set(id, data) {
      this.docs = Object.assign({}, this.docs, { [id]: data }); this.emit();
      if (this.mode === "db") { try { await this.col.doc(id).set(data); } catch (e) { console.warn("db write failed", e); this.persistLocal(); } }
      else if (this.mode === "supa") { const body = Object.assign({}, data); const kind = body.kind; delete body.kind; return this.remote(async () => { const r = await fetch(BACKEND.url + "/rest/v1/" + BACKEND.table + "?on_conflict=id", { method: "POST", headers: this.headers({ "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates,return=minimal" }), body: JSON.stringify([{ id, kind, data: body, updated_at: new Date().toISOString() }]) }); if (!r.ok) throw new Error("save " + r.status); }); }
      else this.persistLocal();
    },
    async del(id) {
      const d = Object.assign({}, this.docs); delete d[id]; this.docs = d; this.emit();
      if (this.mode === "db") { try { await this.col.doc(id).delete(); } catch (e) { console.warn(e); } }
      else if (this.mode === "supa") { return this.remote(async () => { const r = await fetch(BACKEND.url + "/rest/v1/" + BACKEND.table + "?id=eq." + encodeURIComponent(id), { method: "DELETE", headers: this.headers() }); if (!r.ok) throw new Error("delete " + r.status); }); }
      else this.persistLocal();
    },
    list(kind) { return Object.entries(this.docs).filter(([, v]) => v && v.kind === kind).map(([id, v]) => Object.assign({ id }, v)); },
    get(id) { return this.docs[id]; }
  };

  // ------------------------------------------------------------ SVG shapes
  let clipCounter = 0;
  function shapeSVG(name, cx, cy, r, fill, extra) {
    extra = extra || "";
    const poly = (pts) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" ${extra}/>`;
    const reg = (k, rot) => [...Array(k).keys()].map(i => { const a = -Math.PI / 2 + rot + i * 2 * Math.PI / k; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    switch (name) {
      case "circle": return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`;
      case "square": return `<rect x="${cx - r * 0.85}" y="${cy - r * 0.85}" width="${r * 1.7}" height="${r * 1.7}" fill="${fill}" ${extra}/>`;
      case "triangle": return poly(reg(3, 0));
      case "diamond": return poly([[cx, cy - r], [cx + r * 0.75, cy], [cx, cy + r], [cx - r * 0.75, cy]]);
      case "pentagon": return poly(reg(5, 0));
      case "hexagon": return poly(reg(6, Math.PI / 6));
      case "star": { const pts = []; for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r; const a = -Math.PI / 2 + i * Math.PI / 5; pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); } return poly(pts); }
      case "cross": { const w = r * 0.35; return poly([[cx - w, cy - r], [cx + w, cy - r], [cx + w, cy - w], [cx + r, cy - w], [cx + r, cy + w], [cx + w, cy + w], [cx + w, cy + r], [cx - w, cy + r], [cx - w, cy + w], [cx - r, cy + w], [cx - r, cy - w], [cx - w, cy - w]]); }
      case "ring": return `<circle cx="${cx}" cy="${cy}" r="${r * 0.75}" fill="none" stroke="${fill}" stroke-width="${r * 0.45}" ${extra}/>`;
    }
    return "";
  }
  const symbolSVG = (name, size, color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="${size}" height="${size}" aria-label="${name}">${shapeSVG(name, 20, 20, 16, color || "var(--ink)")}</svg>`;

  function abstractFigureSVG(f, size) {
    const id = "c" + (clipCounter++);
    const fillColor = "var(--ink)";
    const outer = (fill, extra) => shapeSVG(f.shape, 50, 48, 28, fill, `stroke="var(--ink)" stroke-width="3" ${extra || ""}`);
    let body = `<g transform="rotate(${f.rot} 50 50)">`;
    if (f.fill === "full") body += outer(fillColor);
    else if (f.fill === "none") body += outer("none");
    else body += `<clipPath id="${id}"><rect x="0" y="0" width="50" height="100"/></clipPath>` + outer("none") + outer(fillColor, `clip-path="url(#${id})"`);
    body += "</g>";
    const dots = []; const n = f.dots; const start = 50 - (n - 1) * 7;
    for (let i = 0; i < n; i++) dots.push(`<circle cx="${start + i * 14}" cy="88" r="4.5" fill="var(--accent)"/>`);
    const corners = [[8, 8], [92, 8], [92, 92], [8, 92]]; const [mx, my] = corners[f.mark];
    const mark = `<rect x="${mx - 6}" y="${my - 6}" width="12" height="12" fill="var(--accent)"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">${body}${dots.join("")}${mark}</svg>`;
  }

  // ------------------------------------------------------------ item renderers
  // Each returns { el, getAnswer(), setAnswer(v) } ; onAnswer(v) is called when the item is answered (may auto-advance)
  const TAB_ICONS = {
    money: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="12" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">$</text>',
    pie: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 3v9h9" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    megaphone: '<path d="M4 10v4h3l7 4V6l-7 4z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M17 9a4 4 0 0 1 0 6" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    people: '<circle cx="9" cy="9" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="16" cy="10" r="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 19a6 6 0 0 1 12 0M14 19a4 4 0 0 1 7 0" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    tools: '<path d="M4 20l7-7M14 10l3-3a3 3 0 0 0 3-4l-2 2-2-2 2-2a3 3 0 0 0-4 3l-3 3" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    briefcase: '<rect x="3" y="8" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 8V5h6v3M3 13h18" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    tag: '<path d="M3 12V4h8l9 9-8 8z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="8" r="1.4" fill="currentColor"/>',
    diamond: '<path d="M7 4h10l4 5-9 11-9-11z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M9 4l3 16 3-16" fill="none" stroke="currentColor" stroke-width="1.2"/>',
    target: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
    pin: '<path d="M12 21s-6-6.5-6-11a6 6 0 0 1 12 0c0 4.5-6 11-6 11z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/>'
  };
  const tabIcon = (name) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">${TAB_ICONS[name] || TAB_ICONS.briefcase}</svg>`;
  const SERIES = ["var(--s1)", "var(--s2)", "var(--s3)", "var(--s4)"];
  function donutSVG(ch) {
    const cx = 110, cy = 100, R = 72, r = 40; let a0 = -Math.PI / 2; let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200" class="chart-svg donut" role="img" aria-label="Donut chart of ${ch.labels.join(", ")}">`;
    ch.values.forEach((v, i) => { const a1 = a0 + v / 100 * 2 * Math.PI; const big = a1 - a0 > Math.PI ? 1 : 0; const p = (a, rad) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
      const [x0, y0] = p(a0, R), [x1, y1] = p(a1, R), [x2, y2] = p(a1, r), [x3, y3] = p(a0, r);
      out += `<path d="M${x0},${y0} A${R},${R} 0 ${big} 1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 ${big} 0 ${x3},${y3} Z" fill="${SERIES[i]}" stroke="var(--surface)" stroke-width="2"/>`;
      const am = (a0 + a1) / 2; const [lx, ly] = p(am, R + 16); out += `<text x="${lx}" y="${ly + 4}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)">${v}%</text>`; a0 = a1; });
    return out + "</svg>";
  }
  function stackedSVG(ch) {
    const W = 360, H = 250, L = 56, B = 48, T = 16, Rr = 12; const n = ch.xLabels.length; const totals = ch.xLabels.map((_, i) => ch.series.reduce((s, se) => s + se.values[i], 0)); const max = Math.max(...totals); const step = max > 10000 ? 4000 : max > 5000 ? 2000 : 1000; const top = Math.ceil(max / step) * step;
    const y = (v) => T + (H - T - B) * (1 - v / top); const bw = 44; const gx = (i) => L + (i + 0.5) * (W - L - Rr) / n - bw / 2;
    let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="chart-svg" role="img" aria-label="Stacked bar chart">`;
    for (let v = 0; v <= top; v += step) out += `<line x1="${L}" x2="${W - Rr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end" font-size="10" fill="var(--muted)">${v}</text>`;
    ch.xLabels.forEach((lab, i) => { let acc = 0; ch.series.forEach((se, k) => { const v = se.values[i]; const y1 = y(acc + v), y0 = y(acc); out += `<rect x="${gx(i)}" y="${y1}" width="${bw}" height="${Math.max(0, y0 - y1 - 1)}" fill="${SERIES[k]}"/>`; if (y0 - y1 > 12) out += `<text x="${gx(i) + bw / 2}" y="${(y0 + y1) / 2 + 4}" text-anchor="middle" font-size="10" fill="#fff" font-weight="600">${v.toLocaleString("en-GB")}</text>`; acc += v; }); out += `<text x="${gx(i) + bw / 2}" y="${H - B + 14}" text-anchor="middle" font-size="11" fill="var(--ink)">${lab}</text>`; });
    out += `<text x="${(L + W) / 2}" y="${H - B + 28}" text-anchor="middle" font-size="10" fill="var(--muted)">${ch.xTitle}</text>`;
    out += `<text transform="translate(12 ${(T + H - B) / 2}) rotate(-90)" text-anchor="middle" font-size="10" fill="var(--muted)">${ch.yTitle}</text>`;
    ch.series.forEach((se, k) => { const lx = L + k * 110; out += `<rect x="${lx}" y="${H - 10}" width="9" height="9" fill="${SERIES[k]}"/><text x="${lx + 13}" y="${H - 2}" font-size="10" fill="var(--ink)">${se.name}</text>`; });
    return out + "</svg>";
  }
  function hbarSVG(ch) {
    const W = 380, L = 54, Rr = 40, T = 10, rowH = 16, gapG = 14; const G = ch.groups.length, S = ch.series.length; const H = T + G * (S * rowH + gapG) + 44;
    const max = Math.max(...ch.series.flatMap(se => se.values)); const step = max > 20 ? 10 : 5; const top = Math.ceil(max / step) * step; const x = (v) => L + (W - L - Rr) * v / top;
    let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="chart-svg" role="img" aria-label="Grouped horizontal bar chart">`;
    for (let v = 0; v <= top; v += step) out += `<line x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 40}" stroke="var(--line)"/><text x="${x(v)}" y="${H - 28}" text-anchor="middle" font-size="10" fill="var(--muted)">${v}</text>`;
    ch.groups.slice().reverse().forEach((g, gi) => { const gy = T + gi * (S * rowH + gapG); const idx = G - 1 - gi; ch.series.forEach((se, k) => { const v = se.values[idx]; const yy = gy + k * rowH; out += `<rect x="${L}" y="${yy}" width="${x(v) - L}" height="${rowH - 3}" fill="${SERIES[k]}"/><text x="${x(v) + 4}" y="${yy + rowH - 6}" font-size="10" fill="var(--ink)">${v.toLocaleString("en-GB", { maximumFractionDigits: 1 })}</text>`; }); out += `<text x="${L - 6}" y="${gy + (S * rowH) / 2 + 4}" text-anchor="end" font-size="11" fill="var(--ink)">${g}</text>`; });
    out += `<text x="${(L + W - Rr) / 2}" y="${H - 14}" text-anchor="middle" font-size="10" fill="var(--muted)">${ch.xTitle}</text>`;
    ch.series.forEach((se, k) => { const lx = L + k * 80; out += `<rect x="${lx}" y="${H - 8}" width="8" height="8" fill="${SERIES[k]}"/><text x="${lx + 11}" y="${H - 1}" font-size="9" fill="var(--ink)">${se.name}</text>`; });
    return out + "</svg>";
  }
  function renderScenario(sc) {
    const wrap = h("div", { class: "scenario" });
    const tabs = h("div", { class: "tabs" + (sc.tabs.some(t => t.icon) ? " icons" : ""), role: "tablist" });
    const body = h("div", { class: "tabbody" });
    const show = (i) => {
      sc.active = i; $$("button", tabs).forEach((b, j) => b.classList.toggle("on", j === i)); body.innerHTML = "";
      const t = sc.tabs[i];
      if (t.title) body.append(h("div", { class: "sheet-title" }, t.title));
      if (t.table) {
        const tbl = h("table", { class: "data" }); tbl.append(h("thead", null, h("tr", null, t.table.head.map(x => h("th", null, x)))));
        tbl.append(h("tbody", null, t.table.rows.map((r, ri) => h("tr", { class: t.table.boldLast && ri === t.table.rows.length - 1 ? "total" : "" }, r.map((c, ci) => h(ci ? "td" : "th", { class: ci ? "num" : "" }, c))))));
        body.append(h("div", { class: "tablewrap" }, tbl));
      }
      if (t.chart) { const ch = t.chart; const svgStr = ch.type === "donut" ? donutSVG(ch) : ch.type === "stacked" ? stackedSVG(ch) : hbarSVG(ch); body.append(h("div", { class: "chartbox", html: svgStr })); if (ch.type === "donut") body.append(h("div", { class: "legend" }, ch.labels.map((l, i) => h("span", null, h("i", { style: `background:${SERIES[i]}` }), l)))); }
      if (t.paras) t.paras.forEach(p => body.append(h("p", { class: "passage" }, h("b", null, p.label + ": "), p.text)));
      else if (t.text) body.append(h("p", { class: "passage" }, t.text));
      if (t.note) body.append(h("p", { class: "sheet-note" }, t.note));
    };
    sc.tabs.forEach((t, i) => tabs.append(h("button", { class: "tab", role: "tab", title: t.name, "aria-label": t.name, onclick: () => show(i), html: (t.icon ? tabIcon(t.icon) : "") + `<span>${esc(t.name)}</span>` })));
    wrap.append(h("div", { class: "scenario-title" }, sc.title), tabs, body); show(sc.active || 0);
    return wrap;
  }
  function renderStatement(item, onAnswer, state) {
    const el = h("div", { class: "item item-statement" });
    el.append(renderScenario(item.scenario));
    const st = h("div", { class: "statement" }, h("div", { class: "eyebrow" }, "Statement"), h("p", { class: "stmt" }, item.s));
    const btns = h("div", { class: "answers" });
    const opts = [["T", "True", "1"], ["F", "False", "2"], ["C", "Cannot say", "3"]];
    opts.forEach(([v, label, key]) => btns.append(h("button", { class: "ans" + (state.answer === v ? " picked" : ""), "data-v": v, onclick: () => { state.answer = v; $$(".ans", btns).forEach(b => b.classList.toggle("picked", b.dataset.v === v)); onAnswer(v); } }, h("kbd", null, key), label)));
    st.append(btns, h("p", { class: "hint" }, "Keys: 1 True, 2 False, 3 Cannot say. Arrow keys move between statements."));
    el.append(st);
    return { el, key: (k) => { const m = { "1": "T", "2": "F", "3": "C", t: "T", f: "F", c: "C" }[k.toLowerCase()]; if (m) $(`.ans[data-v="${m}"]`, btns).click(); } };
  }
  const DED_COLORS = { circle: "#7b1fa2", star: "#1aa3c8", cross: "#f36f21", triangle: "#8dc63f", square: "#e0157a" };
  function deductiveGridSVG(item, highlight) {
    const n = item.n, cell = 56, pad = 4; const W = n * cell + pad * 2;
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" class="grid-svg" style="max-width:${W}px">`;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const x = pad + j * cell, y = pad + i * cell; const isT = i === item.target[0] && j === item.target[1];
      s += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${isT ? "var(--accent-soft)" : "var(--surface)"}" stroke="var(--line)"/>`;
      const v = item.grid[i][j];
      if (isT) { if (highlight != null) s += shapeSVG(item.symbols[highlight], x + cell / 2, y + cell / 2, 18, DED_COLORS[item.symbols[highlight]]); else s += `<text x="${x + cell / 2}" y="${y + cell / 2 + 9}" text-anchor="middle" font-size="26" font-weight="700" fill="var(--ink)">?</text>`; }
      else if (v >= 0) s += shapeSVG(item.symbols[v], x + cell / 2, y + cell / 2, 18, DED_COLORS[item.symbols[v]]);
    }
    return s + "</svg>";
  }
  function renderDeductive(item, onAnswer, state) {
    const el = h("div", { class: "item item-visual" });
    el.append(h("div", { class: "eyebrow" }, `${item.n} × ${item.n} grid. Each symbol appears exactly once in every row and column. Which symbol belongs in the ? cell?`));
    el.append(h("div", { class: "gridwrap", html: deductiveGridSVG(item) }));
    const opts = h("div", { class: "options" });
    item.options.forEach((o, i) => opts.append(h("button", { class: "opt" + (state.answer === o.id ? " picked" : ""), "data-i": i, onclick: () => { state.answer = o.id; $$(".opt", opts).forEach(b => b.classList.toggle("picked", +b.dataset.i === i)); onAnswer(o.id); }, html: `<kbd>${"ABCDE"[i]}</kbd>${symbolSVG(o.shape, 36, DED_COLORS[o.shape])}` })));
    el.append(opts);
    return { el, key: (k) => { const i = "abcde".indexOf(k.toLowerCase()); if (i >= 0 && i < item.options.length) $$(".opt", opts)[i].click(); } };
  }
  const figHTML = (fig, cls) => `<div class="fig ${cls || ""}">${fig.map(c => `<span>${c}</span>`).join("")}</div>`;
  function renderInductive(item, onAnswer, state) {
    const el = h("div", { class: "item item-visual" });
    el.append(h("div", { class: "eyebrow" }, "Set A figures follow one rule; set B figures do not. Assign each of the four new figures to A or B, then confirm."));
    const sets = h("div", { class: "sets" });
    sets.append(h("div", { class: "set" }, h("div", { class: "setlabel" }, "Set A"), h("div", { class: "figs", html: item.A.map(f => figHTML(f)).join("") })));
    sets.append(h("div", { class: "set" }, h("div", { class: "setlabel" }, "Set B"), h("div", { class: "figs", html: item.B.map(f => figHTML(f)).join("") })));
    el.append(sets);
    state.answer = state.answer || [null, null, null, null];
    const un = h("div", { class: "unassigned" });
    item.unassigned.forEach((u, i) => {
      const box = h("div", { class: "ufig" }); box.innerHTML = figHTML(u.fig);
      const tog = h("div", { class: "toggle" });
      ["A", "B"].forEach(v => tog.append(h("button", { class: "tbtn" + (state.answer[i] === v ? " picked" : ""), onclick: () => { state.answer[i] = v; $$(".tbtn", tog).forEach(b => b.classList.toggle("picked", b.textContent === v)); } }, v)));
      box.append(tog); un.append(box);
    });
    el.append(un);
    el.append(h("button", { class: "primary", onclick: () => { if (state.answer.every(x => x)) onAnswer(state.answer.slice()); else el.querySelector(".warn").hidden = false; } }, "Confirm assignment"), h("p", { class: "warn", hidden: true }, "Assign all four figures first."));
    return { el };
  }
  function renderMemory(item, onAnswer, state) {
    const el = h("div", { class: "item item-visual" });
    const stage = h("div", { class: "memstage" });
    el.append(h("div", { class: "eyebrow" }, `${item.k} objects will appear one after another. Then pick them from the eight objects shown, in the same order.`), stage);
    stage.append(h("button", { class: "primary", onclick: play }, "Show the objects"));
    function play() {
      stage.innerHTML = ""; const box = h("div", { class: "membox" }); stage.append(box);
      let i = 0;
      const step = () => {
        if (i >= item.seq.length) { box.innerHTML = ""; setTimeout(recall, 300); return; }
        box.innerHTML = GEN.iconSVG(item.seq[i], 110); i++;
        setTimeout(() => { box.innerHTML = ""; setTimeout(step, 250); }, item.showMs);
      };
      step();
    }
    function recall() {
      stage.innerHTML = ""; const picks = []; const grid = h("div", { class: "memgrid eight" });
      item.grid.forEach(id => grid.append(h("button", { class: "memopt", "data-id": id, "aria-label": id, html: GEN.iconSVG(id, 52), onclick: (ev) => { const b = ev.currentTarget; if (b.classList.contains("done")) return; picks.push(id); b.classList.add("done"); b.append(h("span", { class: "ord" }, picks.length)); if (picks.length === item.k) { state.answer = picks.slice(); onAnswer(picks.slice()); } } })));
      stage.append(h("div", { class: "memstatus" }, `Which ${item.k} objects did you see? Tap them in order.`), grid, h("button", { class: "ghost", onclick: recall }, "Reset picks"));
    }
    return { el };
  }
  function renderIx(item, onAnswer, state) {
    const el = h("div", { class: "item item-visual" });
    el.append(h("div", { class: "eyebrow" }, "Please select the object that doesn't fit the rule."));
    const row = h("div", { class: "ixrow" });
    item.objs.forEach((o, i) => row.append(h("button", { class: "ixobj" + (state.answer === i ? " picked" : ""), "data-i": i, "aria-label": "object " + (i + 1), html: o + `<span class="ixnum">${i + 1}</span>`, onclick: () => { state.answer = i; $$(".ixobj", row).forEach(b => b.classList.toggle("picked", +b.dataset.i === i)); onAnswer(i); } })));
    el.append(row, h("p", { class: "hint" }, "Keys 1 to 9 select an object."));
    return { el, key: (k) => { if (/^[1-9]$/.test(k)) $$(".ixobj", row)[+k - 1].click(); } };
  }
  function renderMath(item, onAnswer, state) {
    const el = h("div", { class: "item item-visual" });
    el.append(h("div", { class: "eyebrow" }, "Select the correct option. 'I don't know' neither adds nor deducts points."));
    el.append(h("p", { class: "stmt mathstem" }, item.stem));
    const opts = h("div", { class: "mathopts" });
    item.options.forEach((o, i) => opts.append(h("button", { class: "ans" + (state.answer === i ? " picked" : ""), "data-i": i, onclick: () => { state.answer = i; $$(".ans", opts).forEach(b => b.classList.toggle("picked", +b.dataset.i === i)); onAnswer(i); } }, h("kbd", null, "ABCD"[i]), o)));
    opts.append(h("button", { class: "ans idk" + (state.answer === "idk" ? " picked" : ""), "data-i": "idk", onclick: () => { state.answer = "idk"; $$(".ans", opts).forEach(b => b.classList.toggle("picked", b.dataset.i === "idk")); onAnswer("idk"); } }, h("kbd", null, "E"), "I don't know the answer"));
    el.append(opts);
    return { el, key: (k) => { const i = "abcd".indexOf(k.toLowerCase()); if (i >= 0) $$(".ans", opts)[i].click(); if (k.toLowerCase() === "e") $$(".ans.idk", opts)[0].click(); } };
  }
  function renderEql(item, onAnswer, state) {
    const el = h("div", { class: "item item-visual" });
    el.append(h("div", { class: "eyebrow" }, "Fill each blank with a digit from 1 to 9 so the equation is correct. Digits may repeat."));
    state.answer = state.answer || Array(item.blanks).fill(null);
    let active = 0; const blankEls = [];
    const eq = h("div", { class: "equation" });
    item.tokens.forEach(t => { if (t === "_") { const b = h("button", { class: "blank", onclick: () => { active = blankEls.indexOf(b); paint(); } }, ""); blankEls.push(b); eq.append(b); } else eq.append(h("span", { class: "tok" }, t)); });
    const pad = h("div", { class: "numpad" });
    const paint = () => { blankEls.forEach((b, i) => { b.textContent = state.answer[i] == null ? "" : state.answer[i]; b.classList.toggle("active", i === active); }); };
    const enter = (d) => { state.answer[active] = d; if (active < item.blanks - 1) active++; paint(); if (state.answer.every(x => x != null)) onAnswer(state.answer.slice()); };
    for (let d = 1; d <= 9; d++) pad.append(h("button", { class: "key", onclick: () => enter(d) }, d));
    pad.append(h("button", { class: "key ghost", onclick: () => { state.answer[active] = null; paint(); } }, "⌫"));
    el.append(eq, pad); paint();
    return { el, key: (k) => { if (/^[1-9]$/.test(k)) enter(+k); if (k === "Backspace") { state.answer[active] = null; paint(); } } };
  }
  function renderAbstract(item, onAnswer, state) {
    const el = h("div", { class: "item item-visual" });
    el.append(h("div", { class: "eyebrow" }, "Which figure comes next in the series?"));
    const seq = h("div", { class: "series", html: item.seq.map(f => `<div class="cell">${abstractFigureSVG(f, 92)}</div>`).join("") + `<div class="cell q">?</div>` });
    const opts = h("div", { class: "options abs" });
    item.options.forEach((o, i) => opts.append(h("button", { class: "opt" + (state.answer === i ? " picked" : ""), "data-i": i, onclick: () => { state.answer = i; $$(".opt", opts).forEach(b => b.classList.toggle("picked", +b.dataset.i === i)); onAnswer(i); }, html: `<kbd>${"ABCDE"[i]}</kbd>${abstractFigureSVG(o, 84)}` })));
    el.append(seq, opts);
    return { el, key: (k) => { const i = "abcde".indexOf(k.toLowerCase()); if (i >= 0) $$(".opt", opts)[i].click(); } };
  }
  const RENDER = { numerical: renderStatement, verbal: renderStatement, deductive: renderDeductive, inductive: renderInductive, memory: renderMemory, eql: renderEql, abstract: renderAbstract, ix: renderIx, math: renderMath };

  function isCorrect(item, ans) {
    if (ans == null) return false;
    switch (item.type) {
      case "numerical": case "verbal": return ans === item.a;
      case "deductive": return ans === item.answer;
      case "inductive": return Array.isArray(ans) && ans.every((v, i) => v === item.answer[i]);
      case "memory": return Array.isArray(ans) && ans.length === item.answer.length && ans.every((v, i) => v === item.answer[i]);
      case "eql": return Array.isArray(ans) && ans.every(x => x != null) && item.check(ans);
      case "abstract": return ans === item.answer;
      case "ix": return ans === item.answer;
      case "math": return ans === item.answer;
    }
    return false;
  }
  function describeAnswer(item, ans) {
    if (ans == null) return "no answer";
    switch (item.type) {
      case "numerical": case "verbal": return { T: "True", F: "False", C: "Cannot say" }[ans];
      case "deductive": return item.symbols[ans];
      case "inductive": return ans.join(" ");
      case "memory": return ans.join(", ");
      case "eql": return ans.join(", ");
      case "abstract": return "option " + "ABCDE"[ans];
      case "ix": return "object " + (ans + 1);
      case "math": return ans === "idk" ? "I don't know" : item.options[ans];
    }
    return String(ans);
  }
  function correctAnswerText(item) {
    switch (item.type) {
      case "numerical": case "verbal": return { T: "True", F: "False", C: "Cannot say" }[item.a];
      case "deductive": return item.symbols[item.answer];
      case "inductive": return item.answer.join(" ");
      case "memory": return item.answer.join(", ");
      case "eql": return "e.g. " + item.sol.join(", ");
      case "abstract": return "option " + "ABCDE"[item.answer];
      case "ix": return "object " + (item.answer + 1);
      case "math": return item.options[item.answer];
    }
  }

  // ------------------------------------------------------------ session engine
  const App = { view: "plan", session: null, track: "bachelor", diff: 1.25 };
  const DIFFS = [[1.25, "25% harder than the official examples"], [1, "Official example level"]];
  function diffPicker() {
    return h("div", { class: "trackpick" }, h("span", null, "Difficulty: "), ...DIFFS.map(([v, label]) => h("button", { class: "chip" + (App.diff === v ? " on" : ""), onclick: () => { App.diff = v; Store.set("settings", { kind: "settings", track: App.track, diff: v }); render(); } }, label)));
  }
  const views = {};
  function navigate(v) { App.view = v; $$(".nav button").forEach(b => b.classList.toggle("on", b.dataset.v === v)); render(); window.scrollTo(0, 0); }
  function render() {
    const root = $("#view"); root.innerHTML = "";
    if (Store.mode === "gate") { App.session = null; root.append(gateView()); return; }
    if (App.session) { root.append(App.session.el); return; }
    root.append(views[App.view]());
  }
  function gateView() {
    const err = h("p", { class: "gate-err", "aria-live": "polite" }, "");
    const input = h("input", { type: "password", id: "gate-input", autocomplete: "current-password", placeholder: "Password", autocapitalize: "off" });
    const form = h("form", { class: "gate", onsubmit: async (e) => { e.preventDefault(); const code = input.value.trim(); if (!code) return; err.textContent = "Checking…"; const ok = await Store.unlock(code); if (ok === false) err.textContent = "That is not the password."; else if (ok === null) err.textContent = "Cannot reach the server. Check your connection and try again."; } },
      h("div", { class: "brand" }, h("i"), " IE Admissions Sprint"), h("h1", null, "Enter the password"), h("p", { class: "muted" }, "Your plan, mock scores and Kira ratings are saved online, so you can switch between laptop and phone."), input, h("button", { class: "primary", type: "submit" }, "Open"), err);
    setTimeout(() => input.focus(), 50);
    return h("div", { class: "page center" }, form);
  }

  function startSession(spec) {
    // spec: {module, n, limitSec, mode:'drill'|'mock', mockId, sectionIndex, onDone}
    const mod = MODULES[spec.module];
    GEN.difficulty = App.diff;
    const items = spec.items || GEN[spec.module](spec.n, spec.module === "verbal" ? recentVerbalIds() : undefined);
    const S = { spec, items, idx: 0, answers: items.map(() => null), states: items.map(() => ({})), started: Date.now(), limit: spec.limitSec, done: false, el: h("div", { class: "session" }), timer: null, perItemStart: Date.now(), times: items.map(() => 0) };
    App.session = S;
    const head = h("div", { class: "sess-head" });
    const title = h("div", { class: "sess-title" }, h("strong", null, mod.name), h("span", { class: "muted" }, spec.mode === "mock" ? ` · Mock section ${spec.sectionIndex + 1} of ${spec.sectionCount}` : " · Drill"));
    const prog = h("div", { class: "sess-prog" });
    const clock = h("div", { class: "clock" }, "0:00");
    const quit = h("button", { class: "ghost small", onclick: () => finish(true) }, "End now");
    head.append(title, prog, clock, quit);
    const body = h("div", { class: "sess-body" });
    const foot = h("div", { class: "sess-foot" });
    const prev = h("button", { class: "ghost", onclick: () => go(S.idx - 1) }, "← Previous");
    const next = h("button", { class: "ghost", onclick: () => go(S.idx + 1) }, "Skip / Next →");
    foot.append(prev, next);
    S.el.append(head, body, foot);
    let current = null;
    function go(i) {
      if (S.done) return;
      S.times[S.idx] += Date.now() - S.perItemStart;
      if (i >= items.length) { if (spec.mode === "mock" || items.every((_, k) => S.answers[k] != null)) return finish(); i = items.findIndex((_, k) => S.answers[k] == null); if (i < 0) return finish(); }
      if (i < 0) i = 0;
      S.idx = i; S.perItemStart = Date.now();
      body.innerHTML = "";
      const item = items[i];
      current = RENDER[item.type](item, (ans) => { S.answers[i] = ans; if (mod.kind === "statement" || ["deductive", "abstract", "memory", "eql", "inductive", "ix", "math"].includes(item.type)) setTimeout(() => { if (S.idx === i && !S.done) go(i + 1); }, item.type === "memory" ? 350 : 120); }, S.states[i]);
      body.append(current.el);
      prog.textContent = `${i + 1} / ${items.length}`;
      prev.disabled = i === 0 || !["numerical", "verbal", "math"].includes(item.type);
      prev.hidden = prev.disabled;
      // answered pills for statement modules
      let pills = $(".pills", S.el); if (!pills) { pills = h("div", { class: "pills" }); head.after(pills); }
      pills.innerHTML = ""; items.forEach((_, k) => pills.append(h("span", { class: "pill" + (S.answers[k] != null ? " done" : "") + (k === i ? " cur" : ""), onclick: () => ["numerical", "verbal", "math"].includes(items[k].type) && go(k) })));
    }
    function tick() {
      const elapsed = (Date.now() - S.started) / 1000;
      if (S.limit) { const left = S.limit - elapsed; clock.textContent = fmtTime(left); clock.classList.toggle("low", left < 60); if (left <= 0) finish(); }
      else clock.textContent = fmtTime(elapsed);
    }
    function finish(aborted) {
      if (S.done) return; S.done = true; clearInterval(S.timer); window.removeEventListener("keydown", onKey);
      S.times[S.idx] += Date.now() - S.perItemStart;
      const timeSec = Math.min(S.limit || 1e9, (Date.now() - S.started) / 1000);
      const res = items.map((it, k) => ({ ok: isCorrect(it, S.answers[k]), ans: S.answers[k] === "idk" ? null : S.answers[k] }));
      const answered = res.filter(r => r.ans != null).length, correct = res.filter(r => r.ok).length, wrong = answered - correct;
      const attempt = { kind: "attempt", ts: Date.now(), module: spec.module, mode: spec.mode, mockId: spec.mockId || null, diff: App.diff, n: items.length, answered, correct, wrong, net: correct - wrong, accuracy: answered ? correct / answered : 0, timeSec: Math.round(timeSec), limitSec: S.limit || 0, aborted: !!aborted,
        details: items.map((it, k) => ({ s: it.type === "numerical" || it.type === "verbal" ? it.s : it.type === "math" ? it.stem : (it.e || ""), a: correctAnswerText(it), u: S.answers[k] === "idk" ? "I don't know" : describeAnswer(it, S.answers[k]), ok: res[k].ok, e: it.e || "", t: Math.round(S.times[k] / 1000), tab: it.tab })), verbalIds: spec.module === "verbal" ? [...new Set(items.map(i => i.src))] : undefined };
      Store.set("att_" + uid(), attempt);
      App.session = null;
      if (spec.onDone) spec.onDone(attempt, items, S.answers); else showResults(attempt, items, S.answers);
    }
    function onKey(e) {
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); go(S.idx + 1); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(S.idx - 1); return; }
      if (current && current.key) current.key(e.key);
    }
    window.addEventListener("keydown", onKey);
    S.timer = setInterval(tick, 250); tick();
    render(); go(0);
    return S;
  }
  function recentVerbalIds() { const atts = Store.list("attempt").filter(a => a.module === "verbal").sort((a, b) => b.ts - a.ts).slice(0, 2); return atts.flatMap(a => a.verbalIds || []); }

  function reviewList(attempt, items, answers) {
    const list = h("div", { class: "review" });
    attempt.details.forEach((d, k) => {
      const it = items && items[k];
      const row = h("div", { class: "rev " + (d.u === "no answer" ? "skip" : d.ok ? "ok" : "bad") });
      row.append(h("div", { class: "rev-head" }, h("span", { class: "badge" }, d.u === "no answer" ? "Skipped" : d.ok ? "Correct" : "Wrong"), h("span", { class: "muted" }, `${k + 1}. ${d.t ? d.t + " s" : ""}`)));
      if (it && (it.type === "numerical" || it.type === "verbal")) row.append(h("p", { class: "stmt small" }, it.s), h("div", { class: "muted small" }, `${it.scenario.title}${it.tab != null && it.scenario.tabs[it.tab] ? " · sheet: " + it.scenario.tabs[it.tab].name : ""}`));
      else if (it && it.type === "ix") row.append(h("div", { class: "ixrow small", html: it.objs.map((o, i) => `<span class="ixobj static${i === it.answer ? " ans" : ""}">${o}<span class="ixnum">${i + 1}</span></span>`).join("") }));
      else if (it && it.type === "math") row.append(h("p", { class: "stmt small" }, it.stem));
      else if (it && it.type === "deductive") row.append(h("div", { class: "gridwrap small", html: deductiveGridSVG(it, it.answer) }));
      else if (it && it.type === "abstract") row.append(h("div", { class: "series small", html: it.seq.map(f => `<div class="cell">${abstractFigureSVG(f, 56)}</div>`).join("") + `<div class="cell ans">${abstractFigureSVG(it.options[it.answer], 56)}</div>` }));
      else if (it && it.type === "inductive") row.append(h("div", { class: "figs small", html: it.unassigned.map(u => figHTML(u.fig) + `<b>${u.a}</b>`).join("") }));
      else if (it && it.type === "memory") row.append(h("div", { class: "figs small", html: it.seq.map(s => GEN.iconSVG(s, 30)).join("") }));
      else if (it && it.type === "eql") row.append(h("div", { class: "equation small", html: it.tokens.map(t => `<span class="tok">${t}</span>`).join(" ") }));
      row.append(h("p", { class: "small" }, h("b", null, "Correct: "), d.a, "  ·  ", h("b", null, "You: "), d.u));
      if (d.e) row.append(h("p", { class: "small expl" }, d.e));
      list.append(row);
    });
    return list;
  }
  function scoreCard(a) {
    const mod = MODULES[a.module];
    return h("div", { class: "scorecard" },
      h("div", { class: "kpi" }, h("div", { class: "kpi-v" }, a.net), h("div", { class: "kpi-l" }, "Net score (correct − wrong)")),
      h("div", { class: "kpi" }, h("div", { class: "kpi-v" }, Math.round(a.accuracy * 100) + "%"), h("div", { class: "kpi-l" }, "Accuracy on answered")),
      h("div", { class: "kpi" }, h("div", { class: "kpi-v" }, `${a.answered}/${a.n}`), h("div", { class: "kpi-l" }, "Reached")),
      h("div", { class: "kpi" }, h("div", { class: "kpi-v" }, a.answered ? (a.timeSec / a.answered).toFixed(1) + " s" : "–"), h("div", { class: "kpi-l" }, "Per answered item")),
      h("div", { class: "kpi" }, h("div", { class: "kpi-v" }, fmtTime(a.timeSec)), h("div", { class: "kpi-l" }, `Time used of ${a.limitSec ? fmtTime(a.limitSec) : "no limit"} · ${mod.short}`)));
  }
  function showResults(attempt, items, answers) {
    const el = h("div", { class: "results" });
    el.append(h("h2", null, `${MODULES[attempt.module].name}: results`), scoreCard(attempt), coachNote(attempt));
    el.append(h("div", { class: "row gap" }, h("button", { class: "primary", onclick: () => startSession({ module: attempt.module, n: attempt.n, limitSec: attempt.limitSec, mode: "drill" }) }, "Run again"), h("button", { class: "ghost", onclick: () => { App.view = "drills"; render(); } }, "Back to drills"), h("button", { class: "ghost", onclick: () => navigate("progress") }, "Progress")));
    el.append(h("h3", null, "Review every item"), reviewList(attempt, items, answers));
    App.session = { el }; render(); App.session = null;
  }
  function coachNote(a) {
    const notes = [];
    const unanswered = a.n - a.answered;
    if (a.accuracy < 0.7 && a.answered >= 5) notes.push("Accuracy is below 70%. Wrong answers are penalised, so slow down slightly and skip anything you cannot verify in the tables or text.");
    if (a.accuracy >= 0.85 && unanswered > a.n * 0.35) notes.push("Accuracy is strong but you reached fewer than two thirds of the items. Push the pace: decide within 15 seconds on statements, and skip multi-step calculations on the first pass.");
    if (a.module === "verbal" || a.module === "numerical") {
      const d = a.details.filter(x => x.u !== "no answer" && x.u !== "I don't know" && !x.ok);
      const cs = d.filter(x => x.a === "Cannot say").length, wrongCS = d.filter(x => x.u === "Cannot say").length;
      if (cs >= 2) notes.push(`${cs} errors were statements whose correct answer was Cannot say: you answered True or False using information the text does not contain.`);
      if (wrongCS >= 2) notes.push(`${wrongCS} errors were Cannot say answers to statements the information actually settles. Before choosing Cannot say, re-scan the tabs for the keyword once more.`);
    }
    if (!notes.length) notes.push(a.accuracy >= 0.85 ? "Good balance of speed and accuracy. Repeat at the same timing tomorrow and try to reach two or three more items." : "Review each wrong item below and name the error type: misread, miscalculated, over-inferred, or ran out of time.");
    return h("div", { class: "coach" }, notes.map(n => h("p", null, n)));
  }

  // ------------------------------------------------------------ views
  views.plan = () => {
    const el = h("div", { class: "page" });
    const planDoc = Store.get("plan") || { kind: "plan", done: {} };
    const total = PLAN.reduce((s, d) => s + d.blocks.reduce((t, b) => t + b.tasks.length, 0), 0);
    const done = Object.values(planDoc.done || {}).filter(Boolean).length;
    el.append(h("div", { class: "hero" }, h("h1", null, "Five days to the IE admissions test"), h("p", { class: "lede" }, "Both IE tests reward speed with accuracy and penalise wrong answers. The plan below builds the formats on day 1, the techniques on days 2 and 3, a full simulation on day 4, and keeps day 5 light. Tick tasks as you go; buttons start the matching drill with the right timing."),
      h("div", { class: "progressbar", title: `${done} of ${total} tasks` }, h("div", { class: "fill", style: `width:${total ? done / total * 100 : 0}%` })), h("div", { class: "muted small" }, `${done} of ${total} tasks done · ${Store.mode === "db" ? "progress saved to your account" : Store.mode === "supa" ? "progress saved online" : Store.mode === "local" ? "progress saved in this browser only" : "loading…"}`)));
    const trackSel = h("div", { class: "trackpick" }, h("span", null, "Which test are you sitting? "), ...Object.entries(TRACKS).map(([k, t]) => h("button", { class: "chip" + (App.track === k ? " on" : ""), onclick: () => { App.track = k; Store.set("settings", { kind: "settings", track: k, diff: App.diff }); render(); } }, t.name)));
    el.append(trackSel);
    PLAN.forEach(day => {
      const dayDone = day.blocks.reduce((s, b) => s + b.tasks.filter(t => planDoc.done[t.id]).length, 0), dayTotal = day.blocks.reduce((s, b) => s + b.tasks.length, 0);
      const card = h("section", { class: "day" }, h("div", { class: "day-head" }, h("div", { class: "daynum" }, "Day " + day.day), h("div", null, h("h2", null, day.title), h("p", { class: "muted" }, day.goal)), h("div", { class: "daycount" }, `${dayDone}/${dayTotal}`)));
      day.blocks.forEach(b => {
        const blk = h("div", { class: "block" }, h("div", { class: "eyebrow" }, b.time));
        b.tasks.forEach(t => {
          const cb = h("input", { type: "checkbox", id: "t_" + t.id, onchange: (e) => { const d = Object.assign({}, planDoc.done, { [t.id]: e.target.checked }); Store.set("plan", { kind: "plan", done: d }); } });
          cb.checked = !!planDoc.done[t.id];
          const row = h("label", { class: "task" + (cb.checked ? " done" : ""), for: "t_" + t.id }, cb, h("span", { class: "task-t" }, t.t, h("span", { class: "muted" }, ` · ${t.min} min`)));
          if (t.run) row.append(h("button", { class: "chip run", onclick: (e) => { e.preventDefault(); runLink(t.run); } }, t.run.mock ? "Start mock" : t.run.kira ? "Open Kira" : `Start drill`));
          blk.append(row);
        });
        card.append(blk);
      });
      el.append(card);
    });
    return el;
  };
  function runLink(r) {
    if (r.mock) { navigate("mock"); return; }
    if (r.kira) { App.kiraTab = r.kira; navigate("kira"); return; }
    startSession({ module: r.module, n: r.n, limitSec: r.min * 60, mode: "drill" });
  }

  views.drills = () => {
    const el = h("div", { class: "page" });
    el.append(h("h1", null, "Drills"), h("p", { class: "lede" }, "Pick a module, a length and a time limit. Defaults match the real section lengths and the formats in IE's own examples. Items are generated fresh every time; full-length verbal sets rotate between company packs so you do not see the same one twice in a row. The default difficulty is a notch above the official practice tasks: tighter margins, more two-step calculations, harder inference, bigger grids and longer memory sequences, with the same time limits."), diffPicker());
    const grid = h("div", { class: "modgrid" });
    Object.entries(MODULES).forEach(([k, m]) => {
      const atts = Store.list("attempt").filter(a => a.module === k);
      const best = atts.length ? Math.max(...atts.map(a => a.net)) : null;
      const nIn = h("input", { type: "number", id: "n_" + k, min: 5, max: 80, value: m.defN });
      const tIn = h("input", { type: "number", id: "t_" + k, min: 0, max: 60, value: m.defMin });
      const card = h("div", { class: "mod" }, h("h3", null, m.name), h("p", { class: "muted small" }, m.desc),
        h("div", { class: "row gap wrap" }, h("label", { class: "field" }, "Items ", nIn), h("label", { class: "field" }, "Minutes (0 = untimed) ", tIn)),
        h("div", { class: "row gap" }, h("button", { class: "primary", onclick: () => startSession({ module: k, n: Math.max(1, +nIn.value || m.defN), limitSec: Math.max(0, +tIn.value || 0) * 60, mode: "drill" }) }, "Start"), h("span", { class: "muted small" }, atts.length ? `${atts.length} attempts · best net ${best}` : "no attempts yet")));
      grid.append(card);
    });
    el.append(grid);
    return el;
  };

  views.mock = () => {
    const el = h("div", { class: "page" });
    const t = TRACKS[App.track];
    el.append(h("h1", null, "Full mock"), h("p", { class: "lede" }, "Sections run back to back with the real time limits and no pause button. Treat it like the real thing: quiet room, no phone, notes and a basic calculator only if your test allows one."));
    el.append(h("div", { class: "trackpick" }, ...Object.entries(TRACKS).map(([k, tr]) => h("button", { class: "chip" + (App.track === k ? " on" : ""), onclick: () => { App.track = k; Store.set("settings", { kind: "settings", track: k, diff: App.diff }); render(); } }, tr.name))), diffPicker());
    const list = h("ol", { class: "sections" });
    t.sections.forEach(([m, n, min]) => list.append(h("li", null, h("b", null, MODULES[m].name), ` · ${n} items · ${min} min`)));
    const totalMin = t.sections.reduce((s, x) => s + x[2], 0);
    el.append(list, h("p", { class: "muted" }, `Total timed work: ${totalMin} minutes. ${App.track === "bachelor" ? "This is the order and timing IE publishes: numerical 12 min, verbal 12 min, deductive 6 min, learning efficiency 5 min, then the 15-minute mathematics section for BBA, BIE and PPLE (maths, science and data programmes get a harder 60-minute version instead, not simulated here). End the maths section early if your programme does not require it." : "IE's ieGAT page shows three example tests: numerical, verbal and inductive (scales ix). IE says the examples do not represent every test, so the deductive grid is included as the most commonly reported extra."}`));
    el.append(h("button", { class: "primary big", onclick: () => runMock(App.track) }, "Start mock"));
    const mocks = Store.list("mock").sort((a, b) => b.ts - a.ts);
    if (mocks.length) {
      el.append(h("h3", null, "Previous mocks"));
      mocks.forEach(mk => el.append(h("div", { class: "mockrow" }, h("b", null, fmtDate(mk.ts)), h("span", { class: "muted" }, " · " + (TRACKS[mk.track] || {}).name), h("div", { class: "row gap wrap" }, mk.sections.map(s => h("span", { class: "chip static" }, `${MODULES[s.module].short}: ${s.net} net, ${Math.round(s.accuracy * 100)}%, ${s.answered}/${s.n}`))))));
    }
    return el;
  };
  function runMock(track) {
    const t = TRACKS[track]; const mockId = "mock_" + uid(); const results = [];
    const step = (i) => {
      if (i >= t.sections.length) {
        Store.set(mockId, { kind: "mock", ts: Date.now(), track, sections: results.map(a => ({ module: a.module, net: a.net, accuracy: a.accuracy, answered: a.answered, n: a.n, correct: a.correct, wrong: a.wrong })) });
        const el = h("div", { class: "page" }, h("h1", null, "Mock complete"), h("p", { class: "lede" }, "Section by section. Open Progress to compare with earlier mocks, or review each section below."));
        results.forEach((a, k) => { const d = h("details", null, h("summary", null, h("b", null, MODULES[a.module].name), ` · net ${a.net} · ${Math.round(a.accuracy * 100)}% · ${a.answered}/${a.n}`)); d.append(scoreCard(a), coachNote(a), reviewList(a, a._items, a._answers)); el.append(d); });
        el.append(h("button", { class: "primary", onclick: () => navigate("progress") }, "See progress"));
        App.session = { el }; render(); App.session = null; return;
      }
      const [m, n, min] = t.sections[i];
      const intro = h("div", { class: "page center" }, h("div", { class: "eyebrow" }, `Section ${i + 1} of ${t.sections.length}`), h("h1", null, MODULES[m].name), h("p", { class: "lede" }, MODULES[m].desc), h("p", null, h("b", null, `${n} items · ${min} minutes`)), h("button", { class: "primary big", onclick: () => startSession({ module: m, n, limitSec: min * 60, mode: "mock", mockId, sectionIndex: i, sectionCount: t.sections.length, onDone: (a, items, answers) => { a._items = items; a._answers = answers; results.push(a); step(i + 1); } }) }, i === 0 ? "Start section" : "Start next section"));
      App.session = { el: intro }; render(); App.session = null;
    };
    step(0);
  }

  views.kira = () => {
    const el = h("div", { class: "page" });
    const tab = App.kiraTab || "video";
    el.append(h("h1", null, "Kira online assessment"), h("p", { class: "lede" }, "IE's Kira assessment is three live questions: two on video and one written, about 20 to 30 minutes in total. You get a short preparation window, one recording per official question, and unlimited practice questions beforehand. This page cannot use your camera, so record practice answers on your phone and watch them back once."));
    const tabs = h("div", { class: "subnav" }, ...[["video", "Video practice"], ["written", "Written practice"], ["stories", "Story bank"], ["history", "Ratings"]].map(([k, l]) => h("button", { class: "chip" + (tab === k ? " on" : ""), onclick: () => { App.kiraTab = k; render(); } }, l)));
    el.append(tabs);
    if (tab === "video") el.append(kiraVideo());
    if (tab === "written") el.append(kiraWritten());
    if (tab === "stories") el.append(kiraStories());
    if (tab === "history") el.append(kiraHistory());
    return el;
  };
  function beep() { try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = 880; g.gain.value = 0.08; o.start(); setTimeout(() => { o.stop(); ctx.close(); }, 180); } catch (e) { } }
  function kiraVideo() {
    const el = h("div", null);
    const cats = ["Any"].concat([...new Set(KIRA_BANK.video.map(q => q.c))]);
    const catSel = h("select", { id: "kcat" }, cats.map(c => h("option", { value: c }, c)));
    const prepSel = h("select", { id: "kprep" }, [15, 30, 45, 60].map(v => h("option", { value: v, selected: v === 30 ? "" : null }, v + " s prep")));
    const ansSel = h("select", { id: "kans" }, [60, 90, 120].map(v => h("option", { value: v, selected: v === 90 ? "" : null }, v + " s answer")));
    const stage = h("div", { class: "kstage" });
    const draw = () => {
      const pool = KIRA_BANK.video.filter(q => catSel.value === "Any" || q.c === catSel.value);
      const q = GEN.util.pick(pool);
      runKira(stage, q, +prepSel.value, +ansSel.value, "video");
    };
    el.append(h("div", { class: "row gap wrap" }, h("label", { class: "field" }, "Category ", catSel), h("label", { class: "field" }, "Prep ", prepSel), h("label", { class: "field" }, "Answer ", ansSel), h("button", { class: "primary", onclick: draw }, "Draw a question")), stage);
    el.append(h("div", { class: "coach" }, h("p", null, h("b", null, "Answer shape for 90 seconds: "), "one-sentence direct answer (10 s), one specific example or two reasons with detail (60 s), one-line takeaway that links to IE or your goals (10 s). Stop talking when you are done; silence beats filler."), h("p", null, h("b", null, "Delivery: "), "camera at eye level, look at the lens not the screen, light in front of you, phone away, smile at the start and the end.")));
    return el;
  }
  function runKira(stage, q, prep, ans, mode) {
    stage.innerHTML = "";
    const qEl = h("div", { class: "kq" }, h("div", { class: "eyebrow" }, q.c + (q.ie ? " · IE's own reflection prompt" : "")), h("h2", null, q.q));
    const phase = h("div", { class: "kphase" }, "Prepare");
    const clock = h("div", { class: "clock big" }, fmtTime(prep));
    const note = h("p", { class: "muted small" }, mode === "video" ? "Think in bullet points. When the answer timer starts, press record on your phone and speak." : "Plan your paragraph: claim, reason, example, so-what.");
    stage.append(qEl, phase, clock, note);
    let left = prep, stagePhase = "prep";
    const stop = h("button", { class: "ghost", onclick: () => { clearInterval(iv); rate(); } }, "Finish early");
    stage.append(stop);
    let ta = null;
    if (mode === "written") { ta = h("textarea", { class: "written", rows: 10, placeholder: "Write here. Aim for 120 to 200 words." }); const wc = h("div", { class: "muted small" }, "0 words"); ta.addEventListener("input", () => { wc.textContent = (ta.value.trim().split(/\s+/).filter(Boolean).length) + " words"; }); stage.append(ta, wc); }
    const iv = setInterval(() => {
      left -= 1;
      if (left <= 0) {
        if (stagePhase === "prep") { stagePhase = "answer"; left = ans; phase.textContent = mode === "video" ? "Speak now" : "Write now"; phase.classList.add("live"); beep(); }
        else { clearInterval(iv); beep(); rate(); return; }
      }
      clock.textContent = fmtTime(left); clock.classList.toggle("low", left <= 10);
    }, 1000);
    function rate() {
      stage.innerHTML = ""; stage.append(qEl, h("h3", null, "Rate your answer"));
      const ratings = {};
      KIRA_BANK.rubric.forEach(r => {
        ratings[r.k] = 3;
        const row = h("div", { class: "rub" }, h("div", null, h("b", null, r.label), h("div", { class: "muted small" }, r.hint)), h("div", { class: "stars" }, [1, 2, 3, 4, 5].map(v => h("button", { class: "star" + (v <= 3 ? " on" : ""), onclick: (e) => { ratings[r.k] = v; $$(".star", e.currentTarget.parentNode).forEach((b, i) => b.classList.toggle("on", i < v)); } }, v))));
        stage.append(row);
      });
      const notes = h("textarea", { rows: 3, placeholder: "One sentence of feedback to yourself. What would make it better next time?" });
      stage.append(notes, h("div", { class: "row gap" }, h("button", { class: "primary", onclick: () => { Store.set("kira_" + uid(), { kind: "kira", ts: Date.now(), mode, q: q.q, c: q.c, ratings, notes: notes.value, text: ta ? ta.value : "" }); stage.innerHTML = ""; stage.append(h("p", { class: "coach" }, "Saved. Draw another question or compare in Ratings.")); } }, "Save rating"), h("button", { class: "ghost", onclick: () => { stage.innerHTML = ""; } }, "Discard")));
    }
  }
  function kiraWritten() {
    const el = h("div", null);
    const stage = h("div", { class: "kstage" });
    const prepSel = h("select", { id: "wprep" }, [30, 60].map(v => h("option", { value: v }, v + " s to plan")));
    const ansSel = h("select", { id: "wans" }, [300, 420].map(v => h("option", { value: v }, (v / 60) + " min to write")));
    el.append(h("div", { class: "row gap wrap" }, h("label", { class: "field" }, "Plan ", prepSel), h("label", { class: "field" }, "Write ", ansSel), h("button", { class: "primary", onclick: () => runKira(stage, GEN.util.pick(KIRA_BANK.written), +prepSel.value, +ansSel.value, "written") }, "Draw a written prompt")), stage);
    el.append(h("div", { class: "coach" }, h("p", null, h("b", null, "Written answer shape: "), "first sentence answers the question outright. Then one reason with a concrete example, a second reason or a counterpoint you address, and a closing sentence that says what it means for you at IE. 120 to 200 words. Re-read once for grammar before time runs out.")));
    return el;
  }
  function kiraStories() {
    const el = h("div", null);
    const doc = Store.get("stories") || { kind: "stories", fields: {} };
    el.append(h("p", { class: "muted" }, "Bullet points, not scripts. These are the raw material for most Kira and interview questions. Saved automatically a moment after you stop typing."));
    let t = null;
    KIRA_BANK.stories.forEach(s => {
      const ta = h("textarea", { id: "story_" + s.k, rows: 4, placeholder: s.hint });
      ta.value = (doc.fields || {})[s.k] || "";
      ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { const cur = Store.get("stories") || { kind: "stories", fields: {} }; const fields = Object.assign({}, cur.fields || {}); $$("textarea[id^=story_]").forEach(x => { fields[x.id.slice(6)] = x.value; }); Store.set("stories", { kind: "stories", fields }); }, 800); });
      el.append(h("div", { class: "story" }, h("label", { for: "story_" + s.k }, h("b", null, s.label)), h("div", { class: "muted small" }, s.hint), ta));
    });
    return el;
  }
  function kiraHistory() {
    const el = h("div", null);
    const rows = Store.list("kira").sort((a, b) => b.ts - a.ts);
    if (!rows.length) { el.append(h("p", { class: "muted" }, "No rated answers yet. Practice a video or written question and save the rating.")); return el; }
    const avg = {}; KIRA_BANK.rubric.forEach(r => { avg[r.k] = rows.reduce((s, x) => s + (x.ratings[r.k] || 0), 0) / rows.length; });
    el.append(h("div", { class: "scorecard" }, KIRA_BANK.rubric.map(r => h("div", { class: "kpi" }, h("div", { class: "kpi-v" }, avg[r.k].toFixed(1)), h("div", { class: "kpi-l" }, r.label + " (avg of 5)")))));
    rows.forEach(x => el.append(h("div", { class: "rev" }, h("div", { class: "rev-head" }, h("span", { class: "badge" }, x.mode), h("span", { class: "muted" }, fmtDate(x.ts) + " · " + x.c)), h("p", { class: "stmt small" }, x.q), h("p", { class: "small" }, KIRA_BANK.rubric.map(r => `${r.label} ${x.ratings[r.k]}`).join(" · ")), x.notes ? h("p", { class: "small expl" }, x.notes) : null, x.text ? h("details", null, h("summary", null, "Your written answer"), h("p", { class: "small" }, x.text)) : null, h("button", { class: "ghost small", onclick: () => Store.del(x.id) }, "Delete"))));
    return el;
  }

  views.progress = () => {
    const el = h("div", { class: "page" });
    const atts = Store.list("attempt").sort((a, b) => a.ts - b.ts);
    el.append(h("h1", null, "Progress"));
    if (!atts.length) { el.append(h("p", { class: "muted" }, "No attempts yet. Finish a drill or a mock and it will appear here.")); return el; }
    const mocks = Store.list("mock");
    const planDoc = Store.get("plan") || { done: {} }; const total = PLAN.reduce((s, d) => s + d.blocks.reduce((t, b) => t + b.tasks.length, 0), 0); const done = Object.values(planDoc.done || {}).filter(Boolean).length;
    el.append(h("div", { class: "scorecard" }, h("div", { class: "kpi" }, h("div", { class: "kpi-v" }, atts.length), h("div", { class: "kpi-l" }, "Timed sessions")), h("div", { class: "kpi" }, h("div", { class: "kpi-v" }, mocks.length), h("div", { class: "kpi-l" }, "Full mocks")), h("div", { class: "kpi" }, h("div", { class: "kpi-v" }, Math.round(done / total * 100) + "%"), h("div", { class: "kpi-l" }, "Plan completed")), h("div", { class: "kpi" }, h("div", { class: "kpi-v" }, Math.round(atts.reduce((s, a) => s + a.timeSec, 0) / 60) + " min"), h("div", { class: "kpi-l" }, "Time under the clock"))));
    const charts = h("div", { class: "charts" });
    Object.keys(MODULES).forEach(m => { const rows = atts.filter(a => a.module === m); if (rows.length) charts.append(moduleChart(m, rows)); });
    el.append(h("h2", null, "By module"), h("p", { class: "muted small" }, "Accuracy is correct ÷ answered. Reached is answered ÷ items. Aim for the two lines to rise together: accuracy at 85% or more, reached climbing session by session."), charts);
    const tbl = h("table", { class: "data attempts" }); tbl.append(h("thead", null, h("tr", null, ["When", "Module", "Mode", "Reached", "Correct", "Wrong", "Net", "Accuracy", "Time", ""].map(x => h("th", null, x)))));
    const tb = h("tbody"); atts.slice().reverse().forEach(a => tb.append(h("tr", null, h("td", null, fmtDate(a.ts)), h("td", null, MODULES[a.module].short), h("td", null, a.mode + (a.diff && a.diff > 1 ? " · hard" : "")), h("td", { class: "num" }, `${a.answered}/${a.n}`), h("td", { class: "num" }, a.correct), h("td", { class: "num" }, a.wrong), h("td", { class: "num" }, a.net), h("td", { class: "num" }, Math.round(a.accuracy * 100) + "%"), h("td", { class: "num" }, fmtTime(a.timeSec)), h("td", null, h("button", { class: "ghost small", onclick: () => { const el2 = h("div", { class: "page" }, h("h2", null, `${MODULES[a.module].name} · ${fmtDate(a.ts)}`), scoreCard(a), reviewList(a), h("button", { class: "ghost", onclick: () => navigate("progress") }, "Back")); App.session = { el: el2 }; render(); App.session = null; } }, "Review"), h("button", { class: "ghost small", onclick: () => Store.del(a.id) }, "Delete"))))); tbl.append(tb);
    el.append(h("h2", null, "All sessions"), h("div", { class: "tablewrap" }, tbl));
    return el;
  };
  function moduleChart(m, rows) {
    const W = 360, H = 170, padL = 36, padR = 16, padT = 14, padB = 26;
    const n = rows.length; const x = (i) => padL + (n === 1 ? (W - padL - padR) / 2 : i * (W - padL - padR) / (n - 1));
    const y = (v) => padT + (1 - v) * (H - padT - padB);
    const acc = rows.map(r => r.accuracy), reach = rows.map(r => r.answered / r.n);
    const path = (arr) => arr.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="${MODULES[m].name} accuracy and reached over ${n} sessions">`;
    [0, 0.5, 1].forEach(v => { s += `<line x1="${padL}" x2="${W - padR}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="10" fill="var(--muted)">${v * 100}%</text>`; });
    s += `<line x1="${padL}" x2="${W - padR}" y1="${y(0.85)}" y2="${y(0.85)}" stroke="var(--good)" stroke-dasharray="3 3"/>`;
    s += `<path d="${path(acc)}" fill="none" stroke="var(--s1)" stroke-width="2"/><path d="${path(reach)}" fill="none" stroke="var(--s2)" stroke-width="2"/>`;
    acc.forEach((v, i) => { s += `<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="var(--s1)" stroke="var(--surface)" stroke-width="2"><title>Session ${i + 1}: accuracy ${Math.round(v * 100)}%</title></circle>`; });
    reach.forEach((v, i) => { s += `<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="var(--s2)" stroke="var(--surface)" stroke-width="2"><title>Session ${i + 1}: reached ${Math.round(v * 100)}%</title></circle>`; });
    s += `<text x="${x(n - 1) + 6}" y="${y(acc[n - 1]) + 4}" font-size="10" fill="var(--ink)">${Math.round(acc[n - 1] * 100)}%</text>`;
    s += `<text x="${padL}" y="${H - 8}" font-size="10" fill="var(--muted)">session 1</text><text x="${W - padR}" y="${H - 8}" font-size="10" text-anchor="end" fill="var(--muted)">session ${n}</text>`;
    s += "</svg>";
    const best = Math.max(...rows.map(r => r.net));
    return h("div", { class: "chartcard" }, h("div", { class: "row between" }, h("b", null, MODULES[m].name), h("span", { class: "muted small" }, `best net ${best}`)), h("div", { html: s }), h("div", { class: "legend" }, h("span", null, h("i", { style: "background:var(--s1)" }), "Accuracy"), h("span", null, h("i", { style: "background:var(--s2)" }), "Reached"), h("span", null, h("i", { class: "dash" }), "85% target")));
  }

  views.guide = () => {
    const el = h("div", { class: "page guide" });
    el.innerHTML = document.getElementById("guide-content").innerHTML;
    return el;
  };

  // ------------------------------------------------------------ boot
  function boot() {
    $$(".nav button").forEach(b => b.addEventListener("click", () => navigate(b.dataset.v)));
    if (BACKEND) { const lock = h("button", { class: "ghost small lock", onclick: () => Store.lock() }, "Lock"); $(".topbar .in").append(lock); }
    const hash = (location.hash || "").slice(1); if (views[hash]) App.view = hash;
    Store.onChange(() => { const st = Store.get("settings"); if (st && st.track) App.track = st.track; if (st && st.diff) App.diff = st.diff; if (!App.session) render(); });
    render();
    Store.init();
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", boot) : boot();
  window.IEApp = { startSession, Store, navigate };
})();
