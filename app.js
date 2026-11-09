// English for Mechatronics: lógica de la app (sin servidor, todo se guarda en el teléfono).

const KEY = "english-mecatronica-v1";
const app = document.getElementById("app");

// ======================= Almacenamiento =======================
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s) return Object.assign({ units: {}, cards: {}, days: {}, started: null, opened: {}, rate: 0.85 }, s);
  } catch (e) {}
  return { units: {}, cards: {}, days: {}, started: null, opened: {}, rate: 0.85 };
}
function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
function update(fn) { const s = load(); fn(s); save(s); return s; }

function todayStr(d = new Date()) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return todayStr(new Date(y, m - 1, d + n));
}

const TASKS = [
  { id: "lesson", label: "Lección y práctica", min: 15 },
  { id: "cards", label: "Tarjetas de repaso", min: 15 },
  { id: "listen", label: "Escuchar", min: 10 },
  { id: "speak", label: "Hablar y pronunciar", min: 10 },
  { id: "tech", label: "Vocabulario técnico", min: 5 },
  { id: "talk", label: "Conversación en casa", min: 15 }
];
const DAY_GOAL = 4; // tareas para contar el día como cumplido

function markTask(id) {
  update(s => {
    const t = todayStr();
    if (!s.started) s.started = t;
    const d = s.days[t] || { tasks: [] };
    if (!d.tasks.includes(id)) d.tasks.push(id);
    s.days[t] = d;
  });
}

function streak() {
  const s = load();
  let day = todayStr();
  const done = d => s.days[d] && s.days[d].tasks.length >= DAY_GOAL;
  let n = 0;
  if (!done(day)) day = addDays(day, -1); // hoy todavía puede completarse
  while (done(day)) { n++; day = addDays(day, -1); }
  return n;
}

// ======================= Voz =======================
let voiceEN = null;
function pickVoice() {
  if (!("speechSynthesis" in window)) return;
  const vs = speechSynthesis.getVoices().filter(v => /^en[-_]US/i.test(v.lang));
  voiceEN = vs.find(v => /google/i.test(v.name)) || vs.find(v => /natural|enhanced/i.test(v.name)) || vs[0] ||
    speechSynthesis.getVoices().find(v => /^en/i.test(v.lang)) || null;
}
if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

function say(text, slow) {
  if (!("speechSynthesis" in window)) return false;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  if (voiceEN) u.voice = voiceEN;
  u.rate = slow ? 0.55 : load().rate;
  speechSynthesis.speak(u);
  return true;
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-say]");
  if (!b) return;
  e.preventDefault();
  e.stopPropagation();
  say(decodeURIComponent(b.dataset.say), b.dataset.slow === "1");
});

function audioBtns(text) {
  const t = encodeURIComponent(text);
  return `<button class="audio" data-say="${t}" aria-label="Escuchar">🔊</button><button class="audio slow" data-say="${t}" data-slow="1" aria-label="Escuchar despacio">🐢</button>`;
}

// ======================= Utilidades =======================
function shuffle(a) { return [...a].sort(() => Math.random() - 0.5); }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

const NUMWORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
function norm(s) {
  return s.toLowerCase().replace(/[’‘]/g, "'").replace(/\b(\d{1,2})\b/g, (m, n) => NUMWORDS[Number(n)] || m)
    .replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
}
function sameText(a, b) { return norm(a) === norm(b); }

function getUnit(id) { return id === 10 ? REVIEW : UNITS.find(u => u.id === id); }
const REVIEW = { id: 10, phase: "A1", title: "Repaso A1 y simulacro estilo Cambridge", goal: "Cierra la fase A1: repasa todo con preguntas mezcladas de las unidades 1 a 9 y avisos cortos como los del examen.", review: true };
const ALL_UNITS = () => [...UNITS, REVIEW];

function unitState(id) { return load().units[id] || { status: "none", best: 0, attempts: [] }; }
function currentUnitId() {
  const s = load();
  for (const u of ALL_UNITS()) if ((s.units[u.id] || {}).status !== "approved") return u.id;
  return 10;
}
function allVocab(upTo) {
  return UNITS.filter(u => u.id <= upTo).flatMap(u => u.vocab.map(v => Object.assign({ unit: u.id }, v)));
}

// ======================= Generadores de preguntas =======================
function distractors(v, pool, field, n = 3) {
  const seen = new Set([v[field]]);
  const out = [];
  for (const w of shuffle(pool)) {
    if (!seen.has(w[field])) { seen.add(w[field]); out.push(w[field]); }
    if (out.length === n) break;
  }
  return out;
}
function mcq(prompt, correct, wrongs, explain, extra) {
  const opts = shuffle([correct, ...wrongs]);
  return Object.assign({ type: "mcq", prompt, options: opts, answer: opts.indexOf(correct), explain }, extra || {});
}
function qEnEs(v, pool) { return mcq(`¿Qué significa <strong>${esc(v.en)}</strong>?`, v.es, distractors(v, pool, "es"), `${v.en} = ${v.es}. Ejemplo: ${v.ex}`, { say: v.en }); }
function qEsEn(v, pool) { return mcq(`¿Cómo se dice <strong>${esc(v.es)}</strong> en inglés?`, v.en, distractors(v, pool, "en"), `${v.es} = ${v.en}. Ejemplo: ${v.ex}`); }
function qListenWord(v, pool) { return mcq("Escucha y elige la palabra o frase que oyes.", v.en, distractors(v, pool, "en"), `Dijo: ${v.en} (${v.es}).`, { listen: v.en }); }
function qListenType(text, es) { return { type: "type", prompt: "Escucha y escribe lo que oyes.", listen: text, correct: text, explain: `Decía: ${text}` + (es ? ` (${es})` : "") }; }
function qOrder(v) {
  const words = v.ex.replace(/[.!?]$/, "").split(" ");
  if (words.length < 3 || words.length > 9) return null;
  return { type: "order", prompt: `Ordena la frase: <em>${esc(v.exEs)}</em>`, words: shuffle(words), correct: words.join(" "), full: v.ex, explain: `Correcto: ${v.ex}` };
}
function genMix(vs, pool, kinds) {
  const out = [];
  let i = 0;
  for (const v of vs) {
    const kind = kinds[i++ % kinds.length];
    let q = null;
    if (kind === "enes") q = qEnEs(v, pool);
    else if (kind === "esen") q = qEsEn(v, pool);
    else if (kind === "listen") q = qListenWord(v, pool);
    else if (kind === "type") q = qListenType(v.ex, v.exEs);
    else if (kind === "order") q = qOrder(v) || qEnEs(v, pool);
    out.push(q);
  }
  return out;
}

// ======================= Motor de ejercicios =======================
function runSession(opts) {
  // opts: {title, questions, back, onDone(score,total), passPct}
  const qs = opts.questions;
  let i = 0, score = 0, mistakes = [];

  function head() {
    return `<button class="link" id="exit">← Salir</button>
      <div class="bar"><span style="width:${(i / qs.length) * 100}%"></span></div>
      <p class="muted">${esc(opts.title)} · ${i + 1} de ${qs.length}</p>`;
  }
  function wireExit() { document.getElementById("exit").onclick = () => { speechSynthesis && speechSynthesis.cancel(); opts.back(); }; }

  function next(ok, q) {
    if (ok) score++; else mistakes.push(q);
    i++;
    if (i < qs.length) draw(); else finish();
  }

  function feedback(ok, q) {
    document.getElementById("exp").innerHTML =
      `<p class="explain ${ok ? "good" : "bad"}">${ok ? "✔ Correcto. " : "✘ Incorrecto. "}${esc(q.explain || "")}</p>
       <button class="primary" id="next">${i < qs.length - 1 ? "Siguiente" : "Ver resultado"}</button>`;
    document.getElementById("next").onclick = () => next(ok, q);
  }

  function draw() {
    const q = qs[i];
    if (q.type === "mcq") {
      app.innerHTML = head() + `<h2>${q.prompt}</h2>` +
        (q.listen ? `<div class="audiorow">${audioBtns(q.listen)}</div>` : q.say ? `<div class="audiorow">${audioBtns(q.say)}</div>` : "") +
        q.options.map((o, k) => `<button class="option" data-k="${k}">${esc(o)}</button>`).join("") + `<div id="exp"></div>`;
      wireExit();
      if (q.listen) setTimeout(() => say(q.listen, false), 250);
      app.querySelectorAll(".option").forEach(b => b.onclick = () => {
        const k = Number(b.dataset.k), ok = k === q.answer;
        app.querySelectorAll(".option").forEach((x, j) => { x.disabled = true; if (j === q.answer) x.classList.add("ok"); else if (j === k) x.classList.add("bad"); });
        feedback(ok, q);
      });
    } else if (q.type === "type") {
      app.innerHTML = head() + `<h2>${q.prompt}</h2><div class="audiorow">${audioBtns(q.listen)}</div>
        <input id="ans" class="textin" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribe en inglés">
        <button class="primary" id="chk">Comprobar</button><div id="exp"></div>`;
      wireExit();
      setTimeout(() => say(q.listen, false), 250);
      document.getElementById("chk").onclick = () => {
        const val = document.getElementById("ans").value;
        const ok = sameText(val, q.correct);
        document.getElementById("ans").disabled = true;
        document.getElementById("chk").remove();
        feedback(ok, q);
      };
    } else if (q.type === "order") {
      let chosen = [];
      const render = () => {
        app.innerHTML = head() + `<h2>${q.prompt}</h2>
          <div class="answerbox">${chosen.length ? chosen.map((w, k) => `<button class="chip used" data-r="${k}">${esc(w)}</button>`).join("") : '<span class="muted">Toca las palabras en orden</span>'}</div>
          <div class="chips">${q.words.map((w, k) => chosen.includes(k + ":" + w) ? "" : `<button class="chip" data-w="${k}">${esc(w)}</button>`).join("")}</div>
          <button class="primary" id="chk" ${chosen.length ? "" : "disabled"}>Comprobar</button><div id="exp"></div>`;
        wireExit();
      };
      // para el tablero guardamos "k:palabra" y mostramos solo la palabra
      const wordOf = c => c.slice(c.indexOf(":") + 1);
      const draw2 = () => {
        app.innerHTML = head() + `<h2>${q.prompt}</h2>
          <div class="answerbox">${chosen.length ? chosen.map((c, k) => `<button class="chip used" data-r="${k}">${esc(wordOf(c))}</button>`).join("") : '<span class="muted">Toca las palabras en orden</span>'}</div>
          <div class="chips">${q.words.map((w, k) => chosen.includes(k + ":" + w) ? "" : `<button class="chip" data-w="${k}">${esc(w)}</button>`).join("")}</div>
          <button class="primary" id="chk" ${chosen.length ? "" : "disabled"}>Comprobar</button><div id="exp"></div>`;
        wireExit();
        app.querySelectorAll("[data-w]").forEach(b => b.onclick = () => { const k = Number(b.dataset.w); chosen.push(k + ":" + q.words[k]); draw2(); });
        app.querySelectorAll("[data-r]").forEach(b => b.onclick = () => { chosen.splice(Number(b.dataset.r), 1); draw2(); });
        document.getElementById("chk").onclick = () => {
          const ok = sameText(chosen.map(wordOf).join(" "), q.correct);
          app.querySelectorAll(".chip").forEach(c => c.disabled = true);
          document.getElementById("chk").remove();
          say(q.full, false);
          feedback(ok, q);
        };
      };
      draw2();
    }
  }

  function finish() {
    const pct = Math.round((score / qs.length) * 100);
    const need = Math.ceil(qs.length * (opts.passPct || 0));
    const passed = opts.passPct ? score >= need : true;
    if (opts.onDone) opts.onDone(score, qs.length, passed);
    app.innerHTML = `<h2>Resultado</h2><p class="big">${score} de ${qs.length}</p>
      <p>${opts.passPct ? (passed ? "✔ ¡Aprobaste!" : `Necesitas al menos ${need} aciertos para aprobar. Repasa la lección y vuelve a intentarlo.`) : (pct >= 70 ? "¡Muy bien! Sigue así." : "Buen intento. Repite la práctica para reforzar.")}</p>
      ${mistakes.length ? `<h3>Para repasar</h3>${mistakes.slice(0, 6).map(m => `<p class="explain">${esc((m.explain || "").replace(/^Dijo: /, ""))}</p>`).join("")}` : ""}
      <button class="primary" id="again">Repetir</button>
      <button class="primary" id="back">Volver</button>`;
    document.getElementById("again").onclick = opts.again || opts.back;
    document.getElementById("back").onclick = opts.back;
  }

  draw();
}

// ======================= Pantalla de inicio =======================
function greetingDay() {
  const s = load();
  if (!s.started) return "Día 1";
  const [y, m, d] = s.started.split("-").map(Number);
  const [y2, m2, d2] = todayStr().split("-").map(Number);
  const n = Math.round((new Date(y2, m2 - 1, d2) - new Date(y, m - 1, d)) / 86400000) + 1;
  return `Día ${n} · Semana ${Math.ceil(n / 7)}`;
}

function dueCount() {
  const s = load(), t = todayStr();
  return Object.values(s.cards).filter(c => c.due <= t).length;
}

function renderHome() {
  const s = load();
  const t = todayStr();
  const done = (s.days[t] || { tasks: [] }).tasks;
  const cur = getUnit(currentUnitId());
  const approved = ALL_UNITS().filter(u => (s.units[u.id] || {}).status === "approved").length;
  const sk = streak();
  const dueN = dueCount();
  const goBtn = {
    lesson: `go('unit', ${cur.id})`,
    cards: `go('cards')`,
    listen: `go('session', 'listen', ${cur.id})`,
    speak: `go('session', 'speak', ${cur.id})`,
    tech: `go('session', 'tech', ${cur.id})`,
    talk: `go('talk', ${cur.id})`
  };
  const total = TASKS.reduce((a, x) => a + x.min, 0);

  app.innerHTML = `
    <div class="card hero">
      <small>${greetingDay()}</small>
      <h2>Hoy · ${done.length} de ${TASKS.length} tareas</h2>
      <div class="bar"><span style="width:${(done.length / TASKS.length) * 100}%"></span></div>
      <p class="muted">${done.length >= DAY_GOAL ? "✔ Día cumplido. ¡Buen trabajo!" : `Completa ${DAY_GOAL} tareas para cumplir el día (unos ${total} min en total).`}</p>
      <p>🔥 Racha: <strong>${sk}</strong> ${sk === 1 ? "día" : "días"}</p>
    </div>
    <div class="card">
      <small>Unidad actual</small>
      <strong>${cur.id === 10 ? "" : cur.id + ". "}${esc(cur.title)}</strong>
      <p class="muted">${esc(cur.goal)}</p>
    </div>
    ${TASKS.map(x => `<button class="task ${done.includes(x.id) ? "done" : ""}" onclick="${goBtn[x.id]}">
      <span class="tick">${done.includes(x.id) ? "✔" : "○"}</span>
      <span class="tlabel">${x.label}<small>${x.min} min${x.id === "cards" ? ` · ${dueN} pendientes` : ""}</small></span>
    </button>`).join("")}
    <p class="muted">Unidades aprobadas: ${approved} de ${ALL_UNITS().length}</p>`;
}

// ======================= Unidades =======================
function renderUnits() {
  const s = load();
  app.innerHTML = `<h2>Fase A1 · Unidades</h2>
    <p class="muted">Se recomienda seguir el orden. Cada unidad se aprueba con 70 % o más en su prueba.</p>
    ${ALL_UNITS().map(u => {
      const st = (s.units[u.id] || { status: "none", best: 0 });
      return `<button class="card module" onclick="go('unit', ${u.id})">
        <div><strong>${u.id === 10 ? "" : u.id + ". "}${esc(u.title)}</strong>
        <small>${st.best ? "Mejor resultado: " + st.best + " %" : "Sin prueba"}</small></div>
        <span class="badge ${st.status}">${st.status === "approved" ? "✔ Aprobada" : st.status === "progress" ? "En curso" : "Pendiente"}</span>
      </button>`;
    }).join("")}
    <div class="card"><strong>Fases siguientes</strong>
      <p class="muted">A2, B1 y B2 se agregarán conforme se avance. Mira el calendario completo en «Plan».</p></div>`;
}

function exCell(en, es) {
  return `<div class="ex"><div class="exen">${esc(en)}</div><div class="exes">${esc(es)}</div>${audioBtns(en)}</div>`;
}

function addToDeck(u) {
  update(s => {
    const t = todayStr();
    u.vocab.forEach(v => { const k = u.id + ":" + v.en; if (!s.cards[k]) s.cards[k] = { box: 0, due: t }; });
    s.opened[u.id] = true;
  });
}

function renderUnit(id) {
  const u = getUnit(id);
  const st = unitState(id);
  if (u.review) return renderReview();
  addToDeck(u);
  app.innerHTML = `<button class="link" onclick="go('units')">← Unidades</button>
    <h2>${u.id}. ${esc(u.title)}</h2>
    <p class="muted">${esc(u.goal)}</p>
    <h3>Gramática</h3>
    ${u.grammar.map(g => `<div class="card"><strong>${esc(g.title)}</strong><p>${esc(g.text)}</p>${g.examples.map(e => exCell(e[0], e[1])).join("")}</div>`).join("")}
    <h3>Vocabulario (${u.vocab.length})</h3>
    <p class="muted">Toca 🔊 para escuchar y 🐢 para escuchar despacio. Las palabras con <span class="techtag">TEC</span> son de mecatrónica y sistemas embebidos.</p>
    <div class="vlist">${u.vocab.map(v => `<div class="vrow ${v.tech ? "tech" : ""}">
      ${art(v.en) ? `<div class="vthumb">${art(v.en)}</div>` : ""}<div class="vmain"><span class="ven">${esc(v.en)}</span>${v.tech ? '<span class="techtag">TEC</span>' : ""}<span class="ves">${esc(v.es)}</span>
      <span class="vex">${esc(v.ex)}</span></div>${audioBtns(v.en)}</div>`).join("")}</div>
    <h3>Diálogo</h3>
    <div class="card">${u.dialogue.map(d => `<div class="dline"><strong>${esc(d[0])}:</strong> ${esc(d[1])}<br><span class="exes">${esc(d[2])}</span>${audioBtns(d[1])}</div>`).join("")}</div>
    <h3>Practica</h3>
    <button class="primary" onclick="go('session','practice',${u.id})">Práctica de la unidad (12 ejercicios)</button>
    <button class="primary" onclick="go('session','listen',${u.id})">Escuchar</button>
    <button class="primary" onclick="go('session','speak',${u.id})">Hablar y pronunciar</button>
    <button class="primary" onclick="go('talk',${u.id})">Conversación en casa</button>
    <button class="primary strong" onclick="go('session','quiz',${u.id})">Prueba de la unidad (10 preguntas)</button>
    ${st.attempts.length ? `<p class="muted">Intentos: ${st.attempts.length}. Mejor resultado: ${st.best} %.</p>` : ""}`;
}

function renderReview() {
  const st = unitState(10);
  app.innerHTML = `<button class="link" onclick="go('units')">← Unidades</button>
    <h2>${esc(REVIEW.title)}</h2>
    <p>${esc(REVIEW.goal)}</p>
    <div class="card"><strong>Qué incluye</strong>
      <p class="muted">15 preguntas: gramática de las unidades 1 a 9, vocabulario mezclado y 3 avisos cortos como los del examen. Se aprueba con 70 % o más.</p></div>
    <button class="primary strong" onclick="go('session','quiz',10)">Hacer el simulacro (15 preguntas)</button>
    <button class="primary" onclick="go('session','listen',10)">Escuchar (mezcla de todas las unidades)</button>
    <button class="primary" onclick="go('session','tech',10)">Vocabulario técnico</button>
    ${st.attempts.length ? `<p class="muted">Intentos: ${st.attempts.length}. Mejor resultado: ${st.best} %.</p>` : ""}`;
}

// ======================= Sesiones =======================
function saveAttempt(id, score, total, passed) {
  update(s => {
    const st = s.units[id] || { status: "none", best: 0, attempts: [] };
    const pct = Math.round((score / total) * 100);
    st.attempts.push({ date: new Date().toISOString(), score, total, pct });
    st.best = Math.max(st.best, pct);
    if (st.status !== "approved") st.status = passed ? "approved" : "progress";
    s.units[id] = st;
  });
}

function vocabFor(id) { return id === 10 ? allVocab(9) : UNITS.find(u => u.id === id).vocab; }

function buildSession(kind, id) {
  const u = getUnit(id);
  const pool = id === 10 ? allVocab(9) : allVocab(Math.max(id, 1));
  const own = vocabFor(id);
  const back = () => go(id === 10 ? "unit" : "unit", id);
  const again = () => go("session", kind, id);

  if (kind === "practice") {
    const vs = shuffle(own).slice(0, 12);
    return { title: "Práctica", back, again, questions: genMix(vs, pool, ["enes", "esen", "order", "listen", "enes", "esen", "type", "order"]).filter(Boolean), onDone: () => markTask("lesson") };
  }
  if (kind === "listen") {
    const vs = shuffle(own);
    const qs = [...genMix(vs.slice(0, 4), pool, ["listen"]), ...vs.slice(4, 7).map(v => qListenType(v.ex, v.exEs))];
    if (u.dialogue) {
      const lines = shuffle(u.dialogue.filter(d => d[1].split(" ").length <= 7)).slice(0, 2);
      lines.forEach(d => qs.push(qListenType(d[1], d[2])));
    } else {
      shuffle(vs.slice(7)).slice(0, 2).forEach(v => qs.push(qListenType(v.ex, v.exEs)));
    }
    return { title: "Escuchar", back, again, questions: qs, onDone: () => markTask("listen") };
  }
  if (kind === "tech") {
    const s = load();
    const maxUnit = id === 10 ? 9 : id;
    let tv = allVocab(maxUnit).filter(v => v.tech && (s.opened[v.unit] || v.unit <= id));
    if (tv.length < 4) tv = allVocab(maxUnit).filter(v => v.tech);
    const poolTech = tv.length >= 6 ? tv : allVocab(maxUnit);
    const vs = shuffle(tv).slice(0, 8);
    return { title: "Vocabulario técnico", back, again, questions: genMix(vs, poolTech, ["enes", "listen", "esen"]), onDone: () => markTask("tech") };
  }
  if (kind === "quiz") {
    if (id === 10) {
      const custom = shuffle(UNITS.flatMap(x => x.quiz)).slice(0, 7).map(q => Object.assign({ type: "mcq", prompt: esc(q.q) }, shuffleOpts(q)));
      const vs = shuffle(allVocab(9)).slice(0, 5);
      const gen = genMix(vs, allVocab(9), ["enes", "esen", "enes", "esen", "enes"]);
      const notes = shuffle(NOTICES).slice(0, 3).map(n => mcq(`Aviso: <em>«${esc(n.text)}»</em><br>¿Qué significa?`, n.options[n.answer], n.options.filter((_, k) => k !== n.answer), n.explain));
      return { title: "Simulacro A1", back, again, passPct: 0.7, questions: shuffle([...custom, ...gen, ...notes]), onDone: (sc, t, p) => { saveAttempt(10, sc, t, p); markTask("lesson"); } };
    }
    const custom = shuffle(u.quiz).slice(0, 5).map(q => Object.assign({ type: "mcq", prompt: esc(q.q) }, shuffleOpts(q)));
    const gen = genMix(shuffle(u.vocab).slice(0, 5), pool, ["enes", "esen", "order", "enes", "esen"]).filter(Boolean);
    return { title: "Prueba de la unidad", back, again, passPct: 0.7, questions: shuffle([...custom, ...gen]), onDone: (sc, t, p) => { saveAttempt(id, sc, t, p); markTask("lesson"); } };
  }
}

function shuffleOpts(q) {
  const opts = q.options.map((text, k) => ({ text, ok: k === q.answer }));
  const m = shuffle(opts);
  return { options: m.map(o => o.text), answer: m.findIndex(o => o.ok), explain: q.explain };
}

function renderSession(kind, id) {
  if (kind === "speak") return renderSpeak(id);
  const cfg = buildSession(kind, id);
  runSession(cfg);
}

// ======================= Hablar =======================
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

function renderSpeak(id) {
  const u = getUnit(id);
  const src = id === 10 ? UNITS.flatMap(x => x.dialogue) : u.dialogue;
  const exs = id === 10 ? UNITS.flatMap(x => x.grammar.flatMap(g => g.examples.map(e => [null, e[0], e[1]]))) : u.grammar.flatMap(g => g.examples.map(e => [null, e[0], e[1]]));
  const pool = shuffle([...src, ...exs].filter(d => d[1].split(" ").length <= 8));
  const items = pool.slice(0, 6);
  let i = 0, okCount = 0;

  function draw() {
    const it = items[i];
    app.innerHTML = `<button class="link" id="exit">← Salir</button>
      <div class="bar"><span style="width:${(i / items.length) * 100}%"></span></div>
      <p class="muted">Pronunciación · ${i + 1} de ${items.length}</p>
      <h2>${esc(it[1])}</h2><p class="muted">${esc(it[2])}</p>
      <div class="audiorow">${audioBtns(it[1])}</div>
      <p>1) Escucha la frase. 2) Toca el micrófono y dila en voz alta.</p>
      ${SR ? `<button class="primary mic" id="mic">🎤 Hablar</button>` : `<p class="muted">Este navegador no reconoce voz. Di la frase en voz alta y compárala con el audio.</p>
        <button class="primary" id="said">La dije bien</button><button class="primary" id="redo">Repetir</button>`}
      <div id="exp"></div>`;
    document.getElementById("exit").onclick = () => { speechSynthesis.cancel(); go("unit", id); };
    if (SR) document.getElementById("mic").onclick = listen;
    else {
      document.getElementById("said").onclick = () => { okCount++; nextItem(); };
      document.getElementById("redo").onclick = () => say(it[1], true);
    }
    setTimeout(() => say(it[1], false), 300);
  }

  function listen() {
    const it = items[i];
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    const btn = document.getElementById("mic");
    btn.textContent = "🎤 Escuchando…";
    btn.disabled = true;
    let got = false;
    rec.onresult = ev => {
      got = true;
      const alts = [...ev.results[0]].map(a => a.transcript);
      const target = norm(it[1]).split(" ");
      let best = 0, heard = alts[0];
      alts.forEach(a => {
        const w = norm(a).split(" ");
        const hit = target.filter(t => w.includes(t)).length / target.length;
        if (hit > best) { best = hit; heard = a; }
      });
      const ok = best >= 0.75;
      if (ok) okCount++;
      document.getElementById("exp").innerHTML =
        `<p class="explain ${ok ? "good" : "bad"}">${ok ? "✔ ¡Muy bien!" : "✘ Casi. Escucha otra vez y repite."} Oí: «${esc(heard)}» (${Math.round(best * 100)} %)</p>
         <button class="primary" id="retry">Intentar otra vez</button><button class="primary" id="nx">${i < items.length - 1 ? "Siguiente" : "Terminar"}</button>`;
      btn.remove();
      document.getElementById("retry").onclick = draw;
      document.getElementById("nx").onclick = nextItem;
    };
    rec.onerror = ev => {
      got = true;
      document.getElementById("exp").innerHTML = `<p class="explain bad">No pude escuchar (${esc(ev.error || "error")}). Revisa que el navegador tenga permiso para usar el micrófono e inténtalo de nuevo.</p>`;
      btn.textContent = "🎤 Hablar"; btn.disabled = false;
    };
    rec.onend = () => { if (!got) { btn.textContent = "🎤 Hablar"; btn.disabled = false; } };
    try { rec.start(); } catch (e) { btn.textContent = "🎤 Hablar"; btn.disabled = false; }
  }

  function nextItem() {
    i++;
    if (i < items.length) draw();
    else {
      markTask("speak");
      app.innerHTML = `<h2>Terminaste</h2><p class="big">${okCount} de ${items.length}</p>
        <p>${okCount >= 4 ? "✔ Muy buena pronunciación." : "Repite la sesión hasta que te salgan más frases."}</p>
        <button class="primary" onclick="go('session','speak',${id})">Repetir</button>
        <button class="primary" onclick="go('unit',${id})">Volver</button>`;
    }
  }
  draw();
}

// ======================= Tarjetas (repaso espaciado) =======================
const INTERVALS = [1, 2, 4, 8, 16, 32];

function renderCards() {
  const s = load();
  const t = todayStr();
  const keys = Object.keys(s.cards);
  const due = keys.filter(k => s.cards[k].due <= t);
  if (!keys.length) {
    app.innerHTML = `<h2>Tarjetas</h2><p>Todavía no tienes palabras. Abre la lección de una unidad y sus palabras se agregan aquí automáticamente.</p>
      <button class="primary" onclick="go('unit', 1)">Ir a la unidad 1</button>`;
    return;
  }
  if (!due.length) {
    markTask("cards");
    const next = Math.min(...keys.map(k => s.cards[k].due));
    app.innerHTML = `<h2>Tarjetas</h2><p class="big">✔ Al día</p>
      <p>No tienes tarjetas pendientes. Tienes ${keys.length} palabras en tu mazo. Tu próximo repaso es el ${next}.</p>
      <button class="primary" id="extra">Repasar 10 tarjetas extra</button>`;
    document.getElementById("extra").onclick = () => runCards(shuffle(keys).slice(0, 10), true);
    return;
  }
  runCards(shuffle(due).slice(0, 20), false);
}

function runCards(queue, extra) {
  let i = 0, known = 0, total = queue.length;
  const find = k => { const [uid, ...rest] = k.split(":"); const en = rest.join(":"); return UNITS.find(u => u.id === Number(uid)).vocab.find(v => v.en === en); };

  function draw() {
    if (!queue.length) return finish();
    const k = queue[0], v = find(k);
    const dir = Math.random() < 0.6 ? "en" : "es";
    app.innerHTML = `<button class="link" id="exit">← Salir</button>
      <div class="bar"><span style="width:${(i / total) * 100}%"></span></div>
      <p class="muted">Tarjeta ${Math.min(i + 1, total)} de ${total}</p>
      <div class="flash" id="flash"><div class="fword">${dir === "en" ? esc(v.en) : esc(v.es)}</div>
        ${dir === "en" ? `<div class="audiorow">${audioBtns(v.en)}</div>` : ""}
        <p class="muted">Piensa la respuesta y luego voltea la tarjeta.</p></div>
      <button class="primary" id="flip">Voltear</button><div id="ans"></div>`;
    document.getElementById("exit").onclick = () => { speechSynthesis.cancel(); go("home"); };
    if (dir === "en") setTimeout(() => say(v.en, false), 250);
    document.getElementById("flip").onclick = () => {
      document.getElementById("flip").remove();
      document.getElementById("ans").innerHTML =
        `<div class="flash back">${art(v.en, true)}<div class="fword">${dir === "en" ? esc(v.es) : esc(v.en)}</div>
          <p>${esc(v.ex)}<br><span class="exes">${esc(v.exEs)}</span></p><div class="audiorow">${audioBtns(dir === "en" ? v.ex : v.en)}</div></div>
         <div class="two"><button class="danger" id="no">No la sabía</button><button class="primary" id="yes">Sí la sabía</button></div>`;
      if (dir === "es") say(v.en, false);
      document.getElementById("yes").onclick = () => grade(true);
      document.getElementById("no").onclick = () => grade(false);
    };
  }

  function grade(ok) {
    const k = queue.shift();
    i++;
    if (!extra) {
      update(s => {
        const c = s.cards[k];
        if (ok) { c.box = Math.min(c.box + 1, INTERVALS.length - 1); c.due = addDays(todayStr(), INTERVALS[c.box]); }
        else { c.box = 0; c.due = todayStr(); }
      });
    }
    if (ok) known++;
    else if (!extra) { /* se vuelve a mostrar al final de esta sesión */ queue.push(k); total++; }
    draw();
  }

  function finish() {
    markTask("cards");
    app.innerHTML = `<h2>¡Listo!</h2><p class="big">${known} bien</p><p>Repasaste tus tarjetas de hoy. Las que fallaste volverán más pronto.</p>
      <button class="primary" onclick="go('home')">Volver al inicio</button>`;
  }
  draw();
}

// ======================= Conversación =======================
function renderTalk(id) {
  const u = getUnit(id === 10 ? 9 : id);
  const done = (load().days[todayStr()] || { tasks: [] }).tasks.includes("talk");
  app.innerHTML = `<button class="link" onclick="go('unit', ${u.id})">← Unidad ${u.id}</button>
    <h2>Conversación en casa</h2>
    <p class="muted">Unidad ${u.id}: ${esc(u.title)}</p>
    <div class="card"><strong>Para quien practica con él</strong><p>${esc(u.talk.es)}</p></div>
    <h3>Preguntas para empezar</h3>
    <p class="muted">Toca 🔊 para escuchar la pronunciación correcta. Después, la persona las lee en voz alta y él responde en inglés.</p>
    ${u.talk.questions.map(q => exCell(q[0], q[1])).join("")}
    <h3>Reglas de la práctica (15 minutos)</h3>
    <div class="card"><ul class="rules">
      <li>Hablen solo en inglés. Si él no sabe una palabra, puede decirla en español y se la dicen en inglés.</li>
      <li>Hablen despacio y con frases cortas. No se necesitan frases perfectas.</li>
      <li>Corrijan una cosa a la vez y con calma. Lo más importante es que se atreva a hablar.</li>
      <li>Si no entiende, repitan más despacio o con otras palabras. No traduzcan de inmediato.</li>
      <li>Cada día cambien un poco el tema con las palabras de la unidad actual.</li>
    </ul></div>
    <button class="primary strong" id="talkdone">${done ? "✔ Ya practiqué hoy" : "Ya practiqué 15 minutos hoy"}</button>`;
  document.getElementById("talkdone").onclick = () => { markTask("talk"); go("talk", id); };
}

// ======================= Plan =======================
function renderPlan() {
  app.innerHTML = `<h2>Plan de estudio</h2>
    <div class="card"><strong>Meta y ritmo</strong>
      <p>1 hora diaria en la app + conversación diaria con familia. El objetivo es llegar al nivel B2 del Marco Europeo. Cambridge calcula entre 500 y 600 horas de estudio para llegar a B2 desde cero.</p>
      <p class="muted">Con una hora diaria más práctica oral y escucha fuera de la app, B1 sólido es lo esperado en 8 meses, y B2 queda en el rango de 12 a 14 meses. Cada fase termina con una prueba de avance para ajustar el ritmo.</p></div>
    <h3>Sesión diaria (60 min)</h3>
    <div class="card">${TASKS.map(x => `<p>${x.label} <span class="muted">· ${x.min} min</span></p>`).join("")}
      <p class="muted">La suma es de 70 min, pero la conversación suele hacerse en un momento aparte del día. Cuentan como día cumplido 4 de 6 tareas.</p></div>
    <h3>Fases</h3>
    ${[
      ["Meses 1 y 2 · A1", "Unas 600 palabras. Verbo to be, presente simple, can, presente continuo, rutinas, números, vocabulario de taller y componentes.", "ahora"],
      ["Meses 3 y 4 · A2", "Unas 1,500 palabras. Pasado simple, futuro (will y going to), comparaciones, preguntas y lectura de instrucciones y hojas de especificaciones simples.", "próximamente"],
      ["Meses 5 y 6 · B1", "Unas 2,500 palabras. Presente perfecto, condicionales, textos más largos, hablar de proyectos y escribir correos cortos de trabajo.", "próximamente"],
      ["Meses 7 y 8 · B1 sólido", "Unas 3,500 palabras. Voz pasiva, estilo indirecto, lectura técnica de datasheets y manuales, simulacros tipo B1 Preliminary.", "próximamente"],
      ["Meses 9 a 14 · B2", "Unas 4,500 palabras. Gramática avanzada, argumentar y presentar proyectos en inglés, simulacros completos de B2 First.", "próximamente"]
    ].map(p => `<div class="card"><strong>${p[0]}</strong> <span class="badge ${p[2] === "ahora" ? "progress" : "none"}">${p[2] === "ahora" ? "Disponible" : "Próximamente"}</span><p class="muted">${p[1]}</p></div>`).join("")}
    <h3>Lo que no hace la app</h3>
    <div class="card"><p>No puede evaluar la expresión oral con la profundidad de una persona. Por eso la conversación diaria es parte obligatoria del plan. Además conviene ver 15 a 20 minutos al día de videos o series con subtítulos en inglés (primero en español, luego en inglés), idealmente sobre electrónica y robótica.</p></div>`;
}

// ======================= Avance =======================
function renderProgress() {
  const s = load();
  const days = Object.keys(s.days).filter(d => s.days[d].tasks.length >= DAY_GOAL).length;
  const cardsN = Object.keys(s.cards).length;
  const mature = Object.values(s.cards).filter(c => c.box >= 3).length;
  app.innerHTML = `<h2>Avance</h2>
    <div class="card"><p>🔥 Racha actual: <strong>${streak()}</strong> días</p>
      <p>Días cumplidos: <strong>${days}</strong></p>
      <p>Palabras en el mazo: <strong>${cardsN}</strong> (bien aprendidas: ${mature})</p></div>
    <h3>Por unidad</h3>
    ${ALL_UNITS().map(u => {
      const st = s.units[u.id] || { status: "none", best: 0, attempts: [] };
      return `<div class="card"><strong>${u.id === 10 ? "" : u.id + ". "}${esc(u.title)}</strong>
        <p class="muted">${st.attempts.length ? `Intentos: ${st.attempts.length} · Mejor: ${st.best} %` : "Sin prueba"} · ${st.status === "approved" ? "✔ Aprobada" : "Pendiente"}</p></div>`;
    }).join("")}
    <h3>Voz</h3>
    <div class="card"><p>Velocidad del audio normal</p>
      <input type="range" id="rate" min="0.5" max="1.2" step="0.05" value="${s.rate}">
      <button class="audio" data-say="${encodeURIComponent("Hello, my name is Luis. Nice to meet you.")}">🔊 Probar</button></div>
    <button class="danger" onclick="resetProgress()">Reiniciar todo el progreso</button>`;
  document.getElementById("rate").oninput = e => update(st => { st.rate = Number(e.target.value); });
}

function resetProgress() {
  if (confirm("¿Seguro que quieres borrar todo el avance?")) { localStorage.removeItem(KEY); go("home"); }
}

// ======================= Navegación =======================
function go(view, a, b) {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  document.querySelectorAll("nav button").forEach(n => n.classList.toggle("active", n.dataset.view === view || (view === "unit" && n.dataset.view === "units")));
  if (view === "home") renderHome();
  else if (view === "units") renderUnits();
  else if (view === "unit") renderUnit(a);
  else if (view === "session") renderSession(a, b);
  else if (view === "cards") renderCards();
  else if (view === "talk") renderTalk(a);
  else if (view === "plan") renderPlan();
  else if (view === "progress") renderProgress();
  window.scrollTo(0, 0);
}
document.querySelectorAll("nav button").forEach(b => b.onclick = () => go(b.dataset.view));

go("home");
