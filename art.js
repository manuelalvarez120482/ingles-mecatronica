// Ilustraciones propias (SVG dibujado a mano en código). Una por palabra del vocabulario.
// art("sensor") devuelve el <svg> o "" si la palabra no tiene dibujo.
// Clases: y = contorno amarillo, f = relleno plata, k = amarillo, r/g/b = rojo/verde/azul, d = azul oscuro.

const _t = (txt, x, y, size, cls) => `<text class="${cls || "tw"}" x="${x}" y="${y}" font-size="${size}" text-anchor="middle">${txt}</text>`;

function _person(x, y, s, o) {
  o = o || {};
  const c = o.c || "f";
  let h = "";
  if (o.k === "woman" || o.k === "girl") h += `<path class="k" d="M${x - 7 * s} ${y + 8 * s}v-${8 * s}a${7 * s} ${7 * s} 0 0 1 ${14 * s} 0v${8 * s}z"/>`;
  h += o.k === "woman"
    ? `<path class="${c}" d="M${x} ${y + 6 * s}l${-9 * s} ${22 * s}h${18 * s}z"/>`
    : `<rect class="${c}" x="${x - 7 * s}" y="${y + 7 * s}" width="${14 * s}" height="${20 * s}" rx="${4 * s}"/>`;
  h += `<circle class="${c}" cx="${x}" cy="${y}" r="${6 * s}"/>`;
  if (o.k === "girl") h += `<circle class="k" cx="${x - 7 * s}" cy="${y + 3 * s}" r="${2.4 * s}"/><circle class="k" cx="${x + 7 * s}" cy="${y + 3 * s}" r="${2.4 * s}"/>`;
  if (o.hat === "hard") h += `<path class="k" d="M${x - 8 * s} ${y - 1 * s}a${8 * s} ${8 * s} 0 0 1 ${16 * s} 0z"/><rect class="k" x="${x - 9 * s}" y="${y - 1.5 * s}" width="${18 * s}" height="${2.5 * s}" rx="1"/>`;
  if (o.hat === "grad") h += `<path class="d" d="M${x - 10 * s} ${y - 5 * s}l${10 * s} -${5 * s} ${10 * s} ${5 * s} -${10 * s} ${5 * s}z"/><path class="y" d="M${x + 9 * s} ${y - 5 * s}v${6 * s}"/>`;
  if (o.glasses) h += `<circle class="y" cx="${x - 2.5 * s}" cy="${y}" r="${2 * s}" style="stroke-width:1.5"/><circle class="y" cx="${x + 2.5 * s}" cy="${y}" r="${2 * s}" style="stroke-width:1.5"/>`;
  return h;
}
const _bubble = (txt, size) => `<path class="f" d="M5 10h54a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H30l-10 10v-10H5a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z"/>${_t(txt, 32, 30, size || 11, "tn")}`;
const _num = (n) => `<circle class="d y" cx="32" cy="32" r="24"/>${_t(n, 32, n.length > 3 ? 38 : 41, n.length > 3 ? 14 : n.length > 2 ? 18 : 28, "tk")}`;
const _sun = (cx, cy, r) => {
  let rays = "";
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; rays += `<path class="y" d="M${(cx + Math.cos(a) * (r + 4)).toFixed(1)} ${(cy + Math.sin(a) * (r + 4)).toFixed(1)}L${(cx + Math.cos(a) * (r + 9)).toFixed(1)} ${(cy + Math.sin(a) * (r + 9)).toFixed(1)}"/>`; }
  return `<circle class="k" cx="${cx}" cy="${cy}" r="${r}"/>${rays}`;
};
const _moon = `<path class="k" d="M40 12a19 19 0 1 0 13 28a15 15 0 0 1-13-28z"/><circle class="k" cx="16" cy="16" r="1.5"/><circle class="k" cx="52" cy="14" r="1.5"/><circle class="k" cx="46" cy="52" r="1.5"/>`;
const _week = (n, label) => {
  let h = "";
  "MTWTFSS".split("").forEach((l, i) => {
    h += _t(l, 7.5 + i * 8.5, 18, 7, "tw") + `<rect class="${label ? (i >= 5 ? "k" : "d") : i < n ? "k" : "d"} y" x="${4 + i * 8.5}" y="22" width="7" height="20" rx="2" style="stroke-width:1.5"/>`;
  });
  return h;
};
const _swatch = (cls) => `<circle class="${cls} y" cx="32" cy="32" r="22" style="stroke-width:3"/>`;
const _flag = `<rect class="g" x="8" y="16" width="16" height="32"/><rect class="w" x="24" y="16" width="16" height="32"/><rect class="r" x="40" y="16" width="16" height="32"/><circle cx="32" cy="32" r="4.5" fill="#a0743c"/><rect class="y" x="8" y="16" width="48" height="32" style="stroke-width:2"/>`;
const _face = (mouth, extra) => `<circle class="k" cx="32" cy="32" r="22"/><circle cx="24" cy="27" r="2.5" fill="#0b1d3a"/><circle cx="40" cy="27" r="2.5" fill="#0b1d3a"/>${mouth}${extra || ""}`;
const _chip = `<rect class="d y" x="18" y="18" width="28" height="28" rx="3"/><circle class="k" cx="25" cy="25" r="2"/>` +
  [0, 1, 2, 3].map(i => `<path class="y" d="M${24 + i * 5} 18v-6M${24 + i * 5} 46v6M18 ${24 + i * 5}h-6M46 ${24 + i * 5}h6"/>`).join("");
const _monitor = (inner) => `<rect class="d y" x="6" y="10" width="52" height="34" rx="4"/>${inner || ""}<path class="y" d="M24 54h16M32 44v10"/>`;
const _bolt = `<path class="k" d="M36 6L16 36h13l-4 22 22-32H33z"/>`;
const _tri = (fill, inner) => `<path class="${fill} y" d="M32 7L59 54H5z"/>${inner}`;
const _plug = (gap) => `<rect class="f" x="${6}" y="26" width="16" height="12" rx="3"/><path class="y" d="M22 29h6M22 35h6"/><path class="y" d="M2 32h4"/><rect class="k" x="${34 + gap}" y="24" width="10" height="16" rx="3"/><path class="y" d="M${44 + gap} 32h${16 - gap}"/>`;
const _door = (open) => open
  ? `<path class="d y" d="M14 8h22v48H14z"/><path class="f" d="M36 8l16 6v40l-16 2z"/><circle class="k" cx="46" cy="34" r="2"/>`
  : `<rect class="f y" x="16" y="8" width="32" height="48" rx="2"/><circle class="k" cx="42" cy="34" r="2.5"/>`;
const _toggle = (on) => `<rect class="${on ? "g" : "f"} y" x="8" y="22" width="48" height="22" rx="11"/><circle class="${on ? "w" : "d"} y" cx="${on ? 45 : 19}" cy="33" r="8"/>${_t(on ? "ON" : "OFF", on ? 24 : 42, 37, 9, on ? "tn" : "tn")}`;
const _pos = (kind) => {
  const A = `<rect class="b y" x="4" y="24" width="18" height="18" rx="2"/>`;
  const B = `<rect class="r y" x="42" y="24" width="18" height="18" rx="2"/>`;
  if (kind === "next") return `<rect class="b y" x="8" y="24" width="20" height="20" rx="2"/><rect class="r y" x="30" y="24" width="20" height="20" rx="2"/>`;
  if (kind === "under") return `<rect class="f y" x="6" y="14" width="52" height="8" rx="2"/><path class="y" d="M12 22v26M52 22v26"/><circle class="k" cx="32" cy="42" r="7"/>`;
  return A + B + `<circle class="k" cx="32" cy="33" r="7"/>`;
};
const _book = `<path class="b y" d="M8 12h22a4 4 0 0 1 2 1v40a4 4 0 0 0-2-1H8z"/><path class="f y" d="M56 12H34a4 4 0 0 0-2 1v40a4 4 0 0 1 2-1h22z"/><path class="y" d="M14 22h12M14 30h12M38 22h12M38 30h12"/>`;
const _clock = `<circle class="f y" cx="32" cy="32" r="22"/><path class="y" d="M32 18v14l9 6"/>`;
const _alarm = `<circle class="f y" cx="32" cy="35" r="19"/><path class="y" d="M32 24v11l7 5"/><path class="k" d="M10 18a10 10 0 0 1 12-10zM54 18a10 10 0 0 0-12-10z"/>`;
const _plate = (inner) => `<circle class="f y" cx="32" cy="34" r="22"/><circle class="d y" cx="32" cy="34" r="14" style="stroke-width:1.5"/>${inner}`;
const _thermo = (hot) => `<rect class="f y" x="26" y="6" width="12" height="38" rx="6"/><circle class="${hot ? "r" : "b"} y" cx="32" cy="48" r="10"/><rect class="${hot ? "r" : "b"}" x="30" y="${hot ? 16 : 28}" width="4" height="${hot ? 32 : 20}" rx="2"/>`;
const _bat = (bolt) => `<rect class="f y" x="6" y="20" width="44" height="26" rx="4"/><rect class="k" x="50" y="29" width="6" height="8" rx="1"/><rect class="g" x="10" y="24" width="${bolt ? 36 : 14}" height="18" rx="2"/>${bolt ? `<path class="d" d="M30 22l-8 12h6l-2 10 9-13h-6z"/>` : ""}`;
const _arrowc = `<path class="y" d="M50 32a18 18 0 1 1-6-13.5"/><path class="k" d="M46 8v14H32z"/>`;
const _ruler = `<rect class="f y" x="4" y="24" width="56" height="16" rx="2"/>` + Array.from({ length: 11 }, (_, i) => `<path class="y" d="M${10 + i * 4.8} 24v${i % 2 ? 5 : 8}" style="stroke:#0b1d3a;stroke-width:1.5"/>`).join("");
const _head = `<path class="y" d="M12 36V30a20 20 0 0 1 40 0v6"/><rect class="f y" x="8" y="34" width="10" height="16" rx="4"/><rect class="f y" x="46" y="34" width="10" height="16" rx="4"/>`;

const ART_RAW = {
  // ---- unidad 1
  "hello": _bubble("Hello!"), "hi": _bubble("Hi!", 14), "goodbye": _bubble("Bye!", 13), "please": _bubble("Please", 10), "thank you": _bubble("Thanks!", 10), "sorry": _bubble("Sorry", 11),
  "good morning": `<path class="y" d="M4 46h56"/><path class="k" d="M18 46a14 14 0 0 1 28 0z"/><path class="y" d="M32 22v-8M16 28l-5-5M48 28l5-5"/><path class="y" d="M10 56h44" style="opacity:.5"/>`,
  "good afternoon": _sun(32, 28, 12) + `<path class="y" d="M4 54h56"/>`,
  "good evening": `<path class="y" d="M4 50h56"/><path class="k" d="M10 50a10 10 0 0 1 20 0z"/>` + `<path class="k" d="M50 10a12 12 0 1 0 6 18a9 9 0 0 1-6-18z" style="transform:scale(.8) translate(12px,2px)"/>`,
  "yes": `<circle class="g y" cx="32" cy="32" r="24"/><path class="y" d="M20 33l8 8 16-17" style="stroke-width:5"/>`,
  "no": `<circle class="r y" cx="32" cy="32" r="24"/><path class="y" d="M22 22l20 20M42 22L22 42" style="stroke-width:5"/>`,
  "name": `<rect class="f y" x="6" y="12" width="52" height="40" rx="6"/><rect class="r" x="6" y="12" width="52" height="12" rx="6"/>${_t("HELLO", 32, 21, 8, "tw")}${_t("my name is", 32, 34, 7, "tn")}${_t("Luis", 32, 46, 11, "tn")}`,
  "student": _person(32, 20, 1.4, { hat: "grad" }),
  "nice to meet you": _person(14, 22, 1, {}) + _person(50, 22, 1, { k: "woman" }) + `<path class="y" d="M22 38h20" style="stroke-width:5"/><circle class="k" cx="32" cy="38" r="4"/>`,
  "engineer": _person(32, 22, 1.4, { hat: "hard" }),
  "computer": _monitor(`<path class="y" d="M14 20l8 7-8 7M28 34h14"/>`),
  "robot": `<path class="y" d="M32 6v8"/><circle class="k" cx="32" cy="6" r="3"/><rect class="f y" x="12" y="14" width="40" height="30" rx="8"/><circle class="b" cx="24" cy="28" r="5"/><circle class="b" cx="40" cy="28" r="5"/><path class="y" d="M24 38h16"/><rect class="f y" x="20" y="46" width="24" height="10" rx="3"/><path class="y" d="M8 24v10M56 24v10"/>`,
  "sensor": `<rect class="g y" x="6" y="30" width="30" height="22" rx="3"/><circle class="k" cx="21" cy="41" r="6"/><path class="y" d="M42 30a14 14 0 0 1 14 0M44 22a22 22 0 0 1 18 0M40 38a10 10 0 0 1 0-12" style="stroke-width:2.5"/><path class="y" d="M12 52v6M20 52v6M28 52v6"/>`,
  // ---- unidad 2
  "zero": _num("0"), "one": _num("1"), "two": _num("2"), "three": _num("3"), "four": _num("4"), "five": _num("5"), "six": _num("6"), "seven": _num("7"), "eight": _num("8"), "nine": _num("9"), "ten": _num("10"),
  "twenty": _num("20"), "thirty": _num("30"), "fifty": _num("50"), "one hundred": _num("100"),
  "age": `<path class="y" d="M32 8c3 4 0 6 0 8"/><path class="k" d="M32 14c4 4-4 4 0 0z"/><rect class="r y" x="10" y="30" width="44" height="22" rx="4"/><path class="f y" d="M12 30c6 8 10-6 14 0s8-6 14 0 8-6 12 0v2H12z"/><rect class="f y" x="30" y="16" width="4" height="14" rx="1"/>`,
  "phone number": `<rect class="d y" x="18" y="4" width="28" height="56" rx="6"/>` + [0, 1, 2].flatMap(r => [0, 1, 2].map(c => `<circle class="f" cx="${25 + c * 7}" cy="${22 + r * 8}" r="2.5"/>`)).join("") + `<circle class="g" cx="32" cy="50" r="4"/>`,
  "email": `<rect class="f y" x="6" y="14" width="52" height="36" rx="4"/><path class="y" d="M6 18l26 20 26-20"/><circle class="k" cx="48" cy="46" r="9"/>${_t("@", 48, 51, 12, "tn")}`,
  "letter": `<rect class="f y" x="6" y="12" width="24" height="24" rx="4"/><rect class="k y" x="34" y="12" width="24" height="24" rx="4"/><rect class="b y" x="20" y="38" width="24" height="24" rx="4"/>${_t("A", 18, 31, 18, "tn")}${_t("B", 46, 31, 18, "tn")}${_t("C", 32, 57, 18, "tw")}`,
  "spell": `<rect class="f y" x="4" y="22" width="16" height="20" rx="3"/><rect class="f y" x="24" y="22" width="16" height="20" rx="3"/><rect class="f y" x="44" y="22" width="16" height="20" rx="3"/>${_t("C", 12, 38, 15, "tn")}${_t("A", 32, 38, 15, "tn")}${_t("T", 52, 38, 15, "tn")}<path class="y" d="M12 50v4M32 50v4M52 50v4"/>`,
  "pin": `<rect class="d y" x="6" y="30" width="52" height="14" rx="2"/>` + [0, 1, 2, 3, 4].map(i => `<rect class="k" x="${11 + i * 10}" y="14" width="4" height="16"/>`).join("") + `<path class="y" d="M13 44v12M23 44v12M33 44v12M43 44v12M53 44v12" style="stroke-width:2"/>`,
  "bit": `<rect class="d y" x="4" y="20" width="26" height="26" rx="5"/><rect class="k y" x="34" y="20" width="26" height="26" rx="5"/>${_t("0", 17, 41, 20, "tw")}${_t("1", 47, 41, 20, "tn")}`,
  "volt": `<circle class="d y" cx="32" cy="32" r="24"/>${_bolt.replace("M36 6L16 36h13l-4 22 22-32H33z", "M35 12L20 35h11l-3 17 16-23H33z")}`,
  // ---- unidad 3
  "mexico": _flag, "mexican": _flag, "country": `<circle class="b y" cx="32" cy="32" r="24"/><path class="g" d="M20 18c6-4 12 0 10 6s-8 4-6 10-8 2-8-4-2-8 4-12zM40 30c6-2 10 4 8 10s-8 4-10-2 0-6 2-8z"/>`,
  "american": `<circle class="b y" cx="32" cy="32" r="24"/><path class="g" d="M20 18c6-4 12 0 10 6s-8 4-6 10-8 2-8-4-2-8 4-12zM40 30c6-2 10 4 8 10s-8 4-10-2 0-6 2-8z"/>`,
  "city": `<rect class="f y" x="6" y="24" width="14" height="34"/><rect class="f y" x="22" y="8" width="18" height="50"/><rect class="f y" x="42" y="30" width="16" height="28"/>` + [0, 1, 2, 3].map(i => `<rect class="k" x="26" y="${14 + i * 10}" width="4" height="5"/><rect class="k" x="33" y="${14 + i * 10}" width="4" height="5"/>`).join(""),
  "from": `<path class="y" d="M10 52h26" style="stroke-width:5"/><path class="k" d="M34 42l12 10-12 10z"/><path class="r y" d="M22 8a10 10 0 0 1 10 10c0 8-10 20-10 20S12 26 12 18A10 10 0 0 1 22 8z" style="transform:translate(0,-2px)"/><circle class="w" cx="22" cy="15" r="3.5"/>`,
  "where": `<path class="r y" d="M32 4a16 16 0 0 1 16 16c0 12-16 34-16 34S16 32 16 20A16 16 0 0 1 32 4z"/>${_t("?", 32, 27, 20, "tw")}<ellipse class="y" cx="32" cy="58" rx="10" ry="3"/>`,
  "who": _person(32, 22, 1.6, {}).replace(/class="f"/g, 'class="d y"') + _t("?", 32, 49, 20, "tk"),
  "teacher": `<rect class="g y" x="26" y="8" width="34" height="24" rx="2"/>${_t("A+B", 43, 25, 11, "tw")}` + _person(14, 24, 1.1, { glasses: true }),
  "friend": _person(18, 22, 1.2, {}) + _person(46, 22, 1.2, { k: "girl", c: "k" }) + `<path class="y" d="M28 34h8" style="stroke-width:4"/>`,
  "boy": _person(32, 22, 1.4, {}), "girl": _person(32, 22, 1.4, { k: "girl" }), "man": _person(32, 18, 1.7, {}), "woman": _person(32, 18, 1.7, { k: "woman" }),
  "happy": _face(`<path class="y" d="M20 36q12 14 24 0" style="stroke-width:3.5"/>`),
  "tired": _face(`<path class="y" d="M22 42h20" style="stroke-width:3.5"/>`, `<path class="d" d="M20 27h8M36 27h8" style="stroke:#0b1d3a;stroke-width:3"/>${_t("z", 54, 14, 12, "tw")}${_t("Z", 58, 8, 9, "tw")}`).replace('<circle cx="24" cy="27" r="2.5" fill="#0b1d3a"/><circle cx="40" cy="27" r="2.5" fill="#0b1d3a"/>', ""),
  "here": `<path class="r y" d="M32 6a16 16 0 0 1 16 16c0 12-16 30-16 30S16 34 16 22A16 16 0 0 1 32 6z"/><circle class="w" cx="32" cy="22" r="6"/>${_t("HERE", 32, 62, 10, "tk")}`,
  "technician": _person(24, 22, 1.3, { hat: "hard" }) + `<path class="y" d="M46 52l10-10a8 8 0 0 0-10-10l4 4-3 5-5 3-4-4a8 8 0 0 0 8 12z" style="transform:translate(-6px,2px)"/><path class="f y" d="M44 56l12-12" style="stroke-width:5"/>`,
  "programmer": `<rect class="d y" x="10" y="26" width="44" height="26" rx="3"/>${_t("&lt;/&gt;", 32, 45, 14, "tk")}<path class="f y" d="M4 56h56"/>` + _person(32, 12, .8, {}),
  // ---- unidad 4
  "mother": _person(22, 20, 1.3, { k: "woman" }) + _person(46, 30, .8, { c: "k" }), "father": _person(22, 20, 1.3, {}) + _person(46, 30, .8, { c: "k" }),
  "brother": _person(20, 22, 1.2, { c: "k" }) + _person(44, 22, 1.2, {}), "sister": _person(20, 22, 1.2, { k: "girl", c: "k" }) + _person(44, 22, 1.2, { k: "girl" }),
  "parents": _person(20, 20, 1.3, {}) + _person(44, 20, 1.3, { k: "woman" }),
  "uncle": _person(32, 18, 1.7, {}) + `<path class="d" d="M26 22q6 4 12 0" style="stroke:#0b1d3a;stroke-width:3;fill:none"/>`,
  "aunt": _person(32, 18, 1.7, { k: "woman", glasses: true }),
  "cousin": _person(14, 26, .9, { c: "k" }) + _person(32, 26, .9, { k: "girl", c: "k" }) + _person(50, 26, .9, { c: "k" }),
  "family": _person(14, 16, 1, {}) + _person(34, 16, 1, { k: "woman" }) + _person(22, 36, .7, { c: "k" }) + _person(46, 36, .7, { k: "girl", c: "k" }),
  "phone": `<rect class="d y" x="18" y="4" width="28" height="56" rx="6"/><rect class="b" x="22" y="10" width="20" height="38" rx="2"/><circle class="f" cx="32" cy="54" r="3"/>`,
  "book": _book,
  "bag": `<path class="y" d="M22 14a10 10 0 0 1 20 0"/><rect class="r y" x="10" y="14" width="44" height="44" rx="10"/><rect class="d y" x="18" y="34" width="28" height="16" rx="4"/><path class="y" d="M18 42h28"/>`,
  "pen": `<path class="k y" d="M10 54l4-12 32-32 8 8-32 32z"/><path class="f y" d="M14 42l8 8M46 10l8 8"/><path class="d" d="M10 54l4-12 8 8z"/>`,
  "laptop": `<rect class="d y" x="12" y="10" width="40" height="28" rx="3"/><path class="y" d="M20 20l5 4-5 4M30 28h8"/><path class="f y" d="M4 42h56l-4 10H8z"/>`,
  "table": `<rect class="k y" x="4" y="18" width="56" height="8" rx="2"/><path class="y" d="M10 26v30M54 26v30" style="stroke-width:5"/>`,
  "cable": `<rect class="f y" x="4" y="26" width="12" height="12" rx="2"/><path class="y" d="M16 32c10-14 14 14 24 0s14 8 14 0" style="stroke-width:4"/><rect class="k y" x="50" y="26" width="10" height="12" rx="2"/>`,
  "battery": _bat(false),
  "screen": _monitor(`<path class="g" d="M12 36l8-10 8 6 8-14 8 12 8-6v14z" style="opacity:.9"/>`),
  // ---- unidad 5
  "lab": `<path class="f y" d="M26 6h12v14l14 28a6 6 0 0 1-5 9H17a6 6 0 0 1-5-9l14-28z"/><path class="g" d="M18 40h28l6 12a3 3 0 0 1-3 4H15a3 3 0 0 1-3-4z"/><circle class="w" cx="28" cy="46" r="2"/><circle class="w" cx="38" cy="50" r="3"/>`,
  "tool": `<path class="f y" d="M44 6a12 12 0 0 0-11 16L8 48a5 5 0 0 0 7 7l25-25a12 12 0 0 0 16-11l-8 8-8-2-2-8z"/>`,
  "screwdriver": `<rect class="r y" x="4" y="26" width="22" height="14" rx="6"/><path class="y" d="M26 33h28" style="stroke-width:4"/><path class="f y" d="M54 29v8" style="stroke-width:5"/>`,
  "pliers": `<path class="f y" d="M32 28L14 6M32 28L50 6M32 28L20 48M32 28L44 48"/><path class="r y" d="M20 48l-8 10M44 48l8 10" style="stroke-width:7"/><circle class="k" cx="32" cy="28" r="3.5"/>`,
  "hammer": `<rect class="f y" x="10" y="8" width="38" height="14" rx="3"/><path class="k y" d="M30 22v36" style="stroke-width:8"/><path class="y" d="M48 12l8-4v18l-8-4" style="stroke-width:2.5"/>`,
  "wire": `<path class="y" d="M4 40c10-26 18 14 28-6s16-6 28-12" style="stroke:#e5484d;stroke-width:5"/><path class="y" d="M4 40l-2 2M60 22l2-2" style="stroke:#cfd6df;stroke-width:4"/>`,
  "resistor": `<path class="y" d="M2 32h14M48 32h14"/><rect class="k y" x="14" y="20" width="36" height="24" rx="10"/><rect class="r" x="20" y="21" width="4" height="22"/><rect class="d" x="28" y="21" width="4" height="22" style="fill:#5b3b1a"/><rect class="g" x="36" y="21" width="4" height="22"/>`,
  "led": `<path class="r y" d="M20 34V22a12 12 0 0 1 24 0v12z"/><rect class="r y" x="16" y="34" width="32" height="5" rx="1"/><path class="y" d="M26 39v18M38 39v14"/><path class="k" d="M52 8l6-4M54 18h8M8 8l-6-4" style="stroke:#ffe98a;stroke-width:3"/>`,
  "switch": _toggle(true).replace('class="g y"', 'class="g y"'),
  "motor": `<rect class="f y" x="8" y="18" width="34" height="28" rx="5"/><path class="y" d="M16 18v28M24 18v28M32 18v28" style="stroke-width:2"/><path class="k y" d="M42 32h16" style="stroke-width:5"/><rect class="d y" x="4" y="26" width="4" height="12"/>`,
  "breadboard": `<rect class="f y" x="4" y="10" width="56" height="44" rx="4"/><path class="y" d="M4 32h56"/>` + [0, 1, 2, 3, 4, 5, 6, 7, 8].flatMap(c => [0, 1, 2].map(r => `<circle class="d" cx="${12 + c * 5.5}" cy="${18 + r * 4}" r="1.4"/><circle class="d" cx="${12 + c * 5.5}" cy="${38 + r * 4}" r="1.4"/>`)).join("") + `<path class="y" d="M17 18v20" style="stroke:#e5484d;stroke-width:2.5"/>`,
  "microcontroller": _chip + _t("MCU", 32, 36, 8, "tk"),
  "button": `<rect class="f y" x="8" y="34" width="48" height="20" rx="4"/><circle class="r y" cx="32" cy="30" r="14"/><path class="y" d="M22 12l-4-6M32 8V2M42 12l4-6" style="stroke-width:2.5"/>`,
  "red": _swatch("r"), "blue": _swatch("b"), "green": _swatch("g"), "black": `<circle class="y" cx="32" cy="32" r="22" style="fill:#000"/>`, "white": _swatch("w"), "yellow": _swatch("k"),
  "small": `<circle class="k y" cx="32" cy="32" r="8"/><path class="y" d="M10 32h8M54 32h-8M32 10v8M32 54v-8" style="stroke-width:2"/>`,
  "big": `<circle class="k y" cx="32" cy="32" r="26"/>`,
  "next to": _pos("next"), "under": _pos("under"), "between": _pos("between"),
  // ---- unidad 6
  "wake up": _alarm, "get up": `<path class="f y" d="M4 50V30h56v20"/><path class="k y" d="M4 40h56"/><circle class="k" cx="18" cy="26" r="6"/>${_sun(50, 14, 6)}`,
  "have breakfast": _plate(`<ellipse class="w" cx="32" cy="34" rx="9" ry="7"/><circle class="k" cx="32" cy="34" r="4"/>`),
  "have lunch": _plate("") + `<path class="y" d="M4 14v20M8 14v10M12 14v20M8 24v28M58 14c-6 4-6 14 0 18v20"/>`,
  "go to school": `<path class="r y" d="M4 28L32 8l28 20z"/><rect class="f y" x="10" y="28" width="44" height="28"/><rect class="d y" x="26" y="38" width="12" height="18"/><path class="y" d="M32 8V2"/><path class="k" d="M32 2h10v6H32z"/>`,
  "study": _book.replace('class="b y"', 'class="b y"') + `<path class="k y" d="M48 52l8-8" style="stroke-width:4"/>`,
  "work": `<circle class="f y" cx="32" cy="32" r="12"/><circle class="d" cx="32" cy="32" r="5"/>` + Array.from({ length: 8 }, (_, i) => `<rect class="f y" x="29" y="6" width="6" height="9" style="transform-origin:32px 32px;transform:rotate(${i * 45}deg)"/>`).join(""),
  "go home": `<path class="r y" d="M6 30L32 8l26 22z"/><rect class="f y" x="14" y="30" width="36" height="26"/><rect class="d y" x="27" y="40" width="10" height="16"/><path class="k" d="M2 60h18l-5-4M20 60l-5 4" style="stroke:#ffe98a;stroke-width:2.5;fill:none"/>`,
  "sleep": `<rect class="f y" x="4" y="34" width="56" height="16" rx="3"/><rect class="b y" x="4" y="28" width="22" height="10" rx="4"/><path class="y" d="M4 50v8M60 50v8"/>${_t("Z", 40, 24, 16, "tk")}${_t("z", 50, 14, 11, "tk")}`,
  
  "morning": `<path class="y" d="M4 46h56"/><path class="k" d="M18 46a14 14 0 0 1 28 0z"/><path class="y" d="M32 22v-8M16 28l-5-5M48 28l5-5"/>`,
  "afternoon": _sun(32, 28, 12) + `<path class="y" d="M4 54h56"/>`,
  "night": _moon,
  "code": `<rect class="d y" x="4" y="10" width="56" height="44" rx="5"/>${_t("&lt;/&gt;", 32, 40, 22, "tk")}`,
  "program": `<rect class="d y" x="4" y="8" width="56" height="30" rx="4"/><path class="y" d="M12 18h20M12 24h30M12 30h14" style="stroke:#3ecf8e"/><path class="f y" d="M24 44h16l4 12H20z"/>`,
  "test": `<rect class="f y" x="10" y="6" width="44" height="52" rx="4"/><path class="y" d="M16 18l4 4 7-8M16 32l4 4 7-8M16 46l4 4 7-8" style="stroke:#3ecf8e;stroke-width:3.5"/><path class="d" d="M32 18h16M32 32h16M32 46h16" style="stroke:#0b1d3a;stroke-width:3"/>`,
  // ---- unidad 7
  "always": _week(7), "usually": _week(5), "often": _week(4), "sometimes": _week(2), "never": _week(0), "every day": _week(7),
  "weekend": _week(0, true),
  "like": `<path class="r y" d="M32 54C10 38 6 24 14 16c6-6 14-4 18 4 4-8 12-10 18-4 8 8 4 22-18 38z"/>`,
  "play": `<rect class="f y" x="4" y="20" width="56" height="28" rx="12"/><path class="d" d="M16 34h12M22 28v12"  style="stroke:#0b1d3a;stroke-width:4"/><circle class="r" cx="44" cy="30" r="3.5"/><circle class="g" cx="50" cy="37" r="3.5"/>`,
  "watch": `<path class="f y" d="M2 32C12 16 52 16 62 32 52 48 12 48 2 32z"/><circle class="b y" cx="32" cy="32" r="10"/><circle class="d" cx="32" cy="32" r="4"/>`,
  "read": _book, "listen": _head, "music": `<path class="y" d="M24 46V12l28-6v34" style="stroke-width:4"/><ellipse class="k y" cx="18" cy="46" rx="8" ry="6"/><ellipse class="k y" cx="46" cy="40" rx="8" ry="6"/>`,
  "eat": `<path class="y" d="M14 8v18a6 6 0 0 0 6 6v26M14 8v14M20 8v14M26 8v14"/><path class="f y" d="M44 8c-8 4-8 24 0 28v22"/>`,
  "drink": `<path class="f y" d="M16 12h32l-4 44H20z"/><path class="b" d="M18 26h28l-2 26H20z"/><path class="y" d="M36 4l-4 22"/>`,
  "measure": _ruler, "check": `<rect class="f y" x="8" y="8" width="48" height="48" rx="6"/><path class="y" d="M18 34l10 10 20-22" style="stroke:#3ecf8e;stroke-width:6"/>`,
  "update": _arrowc,
  // ---- unidad 8
  "can": `<circle class="g y" cx="32" cy="32" r="24"/>${_t("CAN", 32, 38, 14, "tw")}`,
  "help": `<circle class="f y" cx="32" cy="32" r="24"/><circle class="r y" cx="32" cy="32" r="10"/><path class="r" d="M32 8v14M32 42v14M8 32h14M42 32h14" style="stroke:#e5484d;stroke-width:9"/><circle class="d y" cx="32" cy="32" r="9"/>`,
  "open": _door(true), "close": _door(false),
  "turn on": _toggle(true), "turn off": _toggle(false),
  "connect": _plug(0), "disconnect": _plug(12),
  "press": `<rect class="f y" x="8" y="42" width="48" height="14" rx="4"/><circle class="r y" cx="32" cy="38" r="14"/><path class="y" d="M32 4v14M26 12l6 6 6-6" style="stroke-width:4"/>`,
  "touch": `<path class="f y" d="M24 36V14a4 4 0 0 1 8 0v18l10 2c6 2 8 6 6 14l-2 8H26L12 40c-2-4 2-6 6-4z"/>`,
  "hot": _thermo(true) + `<path class="r" d="M50 30c-6-2 0-10-4-14 12 4 12 22 0 24-8-2-6-8-2-10z" style="transform:translate(2px,2px)"/>`,
  "careful": _tri("k", _t("!", 32, 48, 30, "tn")),
  "danger": `<path class="r y" d="M22 4h20l18 18v20L42 60H22L4 42V22z"/>${_t("!", 32, 46, 36, "tw")}`,
  "warning": _tri("k", _t("!", 32, 48, 30, "tn")),
  "power": `<circle class="d y" cx="32" cy="32" r="24"/><path class="y" d="M32 14v18M20 22a16 16 0 1 0 24 0" style="stroke:#3ecf8e;stroke-width:5"/>`,
  "safety glasses": `<rect class="b y" x="4" y="20" width="22" height="18" rx="6" style="fill-opacity:.55"/><rect class="b y" x="38" y="20" width="22" height="18" rx="6" style="fill-opacity:.55"/><path class="y" d="M26 28h12M4 26L1 22M60 26l3-4" style="stroke-width:4"/>`,
  "wear": _person(32, 24, 1.5, { hat: "hard" }),
  "high voltage": _tri("k", `<path class="d" d="M34 20L24 38h8l-2 12 10-18h-8z"/>`),
  // ---- unidad 9
  "now": _clock + _t("NOW", 32, 12, 9, "tk"),
  "at the moment": _clock, "right now": _clock + `<path class="k" d="M52 8l4 4M56 20h4" style="stroke:#ffe98a;stroke-width:3"/>`,
  "run": _person(36, 14, 1.2, {}) + `<path class="y" d="M4 28h14M2 36h12M6 44h10" style="stroke-width:2.5"/>`,
  "stop": `<path class="r y" d="M22 4h20l18 18v20L42 60H22L4 42V22z"/>${_t("STOP", 32, 38, 15, "tw")}`,
  "move": `<path class="y" d="M32 6v52M6 32h52" style="stroke-width:4"/><path class="k" d="M32 2l-8 10h16zM32 62l-8-10h16zM2 32l10-8v16zM62 32l-10-8v16z"/>`,
  "wait": `<path class="f y" d="M14 6h36M14 58h36M18 6c0 20 14 20 14 26S18 44 18 58M46 6c0 20-14 20-14 26s14 6 14 26"/><path class="k" d="M24 52h16c-2-6-6-8-8-8s-6 2-8 8z"/>`,
  "write": `<rect class="f y" x="8" y="8" width="34" height="46" rx="3"/><path class="y" d="M14 20h22M14 28h22M14 36h14"/><path class="k y" d="M30 56l4-10 20-20 6 6-20 20z"/>`,
  "listen to": _head,
  "rotate": _arrowc + `<circle class="f y" cx="32" cy="32" r="8"/>`,
  "blink": `<path class="y" d="M20 34V24a12 12 0 0 1 24 0v10z" style="fill:#ffe98a"/><rect class="k y" x="16" y="34" width="32" height="5" rx="1"/><path class="y" d="M26 39v18M38 39v14"/><path class="k" d="M52 8l6-4M56 20h6M8 8L2 4M8 20H2" style="stroke:#ffe98a;stroke-width:3"/>`,
  "charge": _bat(true), "load": `<rect class="d y" x="6" y="24" width="52" height="16" rx="8"/><rect class="g" x="9" y="27" width="32" height="10" rx="5"/>${_t("67%", 32, 56, 12, "tk")}`,
  "current": `<path class="y" d="M6 18h52v28H6z" style="stroke-width:4"/><path class="k" d="M20 14l10 4-10 4zM44 42l-10 4 10 4z"/>${_t("A", 32, 36, 14, "tk")}`,
  "voltage": `<circle class="d y" cx="32" cy="32" r="24"/>${_t("V", 32, 44, 30, "tk")}`,
  "speed": `<path class="f y" d="M6 46a26 26 0 1 1 52 0z"/><path class="y" d="M32 46l14-18" style="stroke:#e5484d;stroke-width:4"/><circle class="k" cx="32" cy="46" r="4"/>`,
  "temperature": _thermo(true),
  "fast": `<path class="k" d="M40 8L14 36h14l-4 20 28-30H36z"/><path class="y" d="M4 22h8M2 32h6M4 42h8"/>`,
  "slow": `<path class="g y" d="M6 50h42c8 0 10-6 10-8l-4-2c0 6-6 6-10 6V30c0-10-8-16-18-16S8 22 8 34z" style="transform:translate(0,2px)"/><path class="k y" d="M20 36a10 10 0 0 1 20 0 10 10 0 0 1-20 0z" style="transform:translate(0,-3px)"/><path class="y" d="M52 36V26M58 38V30" style="stroke-width:2"/>`
};

// Los días de la semana: se resalta el día en el calendario.
["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].forEach((d, i) => {
  ART_RAW[d] = `<rect class="f y" x="6" y="10" width="52" height="46" rx="5"/><rect class="r y" x="6" y="10" width="52" height="12" rx="5"/>` +
    _t(d.slice(0, 3).toUpperCase(), 32, 20, 9, "tw") + _t(String(i + 1), 32, 48, 22, "tn");
});

function art(word, big) {
  const inner = ART_RAW[String(word || "").toLowerCase()];
  if (!inner) return "";
  return `<svg class="art${big ? " big" : ""}" viewBox="0 0 64 64" role="img" aria-hidden="true">${inner}</svg>`;
}
