(() => {
  const $ = (s, r = document) => r.querySelector(s), root = document.documentElement;
  const pages = {home:"/",projects:"/projects/",profile:"/profile/",resume:"/resume/",contact:"/contact/"};
  const order = Object.values(pages);
  let lang = "en";
  try { lang = localStorage.getItem("lang") || (navigator.language || "en").slice(0, 2); } catch (e) {}
  const setLang = l => { lang = l === "fr" ? "fr" : "en"; root.dataset.l = lang; root.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {} say(lang === "fr" ? "langue : français" : "language: english"); };
  const cmd = $("#cmd"), cin = $("#cmdin"), ctxt = $("#cmdtxt");
  const say = t => { ctxt.textContent = t; clearTimeout(say.t); say.t = setTimeout(() => ctxt.innerHTML = "&nbsp;", 2500); };
  root.dataset.l = lang === "fr" ? "fr" : "en"; lang = root.dataset.l; root.lang = lang;

  // gutter line numbers
  const win = $(".win"), buf = $("#buf"), gut = $(".gutter"), posEl = $("#pos");
  const lh = () => parseFloat(getComputedStyle(buf).lineHeight);
  const gutter = () => { const n = Math.max(1, Math.ceil(buf.scrollHeight / lh())), cur = Math.round(win.scrollTop / lh()) + 1;
    let s = ""; for (let i = 1; i <= n; i++) s += (i === cur ? '<span class="cur">' + i + "</span>" : i) + "\n"; gut.innerHTML = s;
    posEl.textContent = cur + ":1"; };
  win.addEventListener("scroll", () => requestAnimationFrame(gutter)); addEventListener("resize", gutter);
  new ResizeObserver(gutter).observe(buf); gutter();

  // slides
  document.querySelectorAll("[data-slides]").forEach(f => {
    const im = [...f.querySelectorAll("img")], cap = $("[data-capt]", f); let i = 0;
    const go = d => { im[i].hidden = true; i = (i + d + im.length) % im.length; im[i].hidden = false; cap.textContent = im[i].dataset.cap; };
    $("[data-prev]", f).onclick = () => go(-1); $("[data-next]", f).onclick = () => go(1);
  });

  // typed line on home
  const typed = $("#typed");
  if (typed) { const t = "whoami --pretty", reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce) typed.textContent = t; else { let k = 0; const id = setInterval(() => { typed.textContent = t.slice(0, ++k); if (k >= t.length) clearInterval(id); }, 70); } }

  // commands
  const go = n => { const u = pages[n]; if (u) location.href = u; else say("E492: Not an editor command: " + n); };
  const run = c => { const [a, b] = c.trim().split(/\s+/);
    if (["e", "edit", "b", "buffer"].includes(a)) go((b || "").replace(/\..*/, ""));
    else if (a === "lang") setLang(b); else if (a === "help" || a === "h") say(":e <home|projects|profile|resume|contact>  :lang <en|fr>  gt/gT  1-5  L");
    else if (a === "q") say("nice try :)"); else if (a) say("E492: Not an editor command: " + a); };
  const open = () => { cmd.classList.add("on"); cin.value = ""; cin.focus(); $(".statusline").classList.add("ins"); };
  const close = () => { cmd.classList.remove("on"); cin.blur(); $(".statusline").classList.remove("ins"); };
  cin.addEventListener("keydown", e => { if (e.key === "Enter") { const v = cin.value; close(); run(v); } else if (e.key === "Escape") close(); });
  $("#lang").onclick = () => setLang(lang === "en" ? "fr" : "en");
  document.querySelectorAll('[data-act="lang"]').forEach(b => b.onclick = () => setLang(lang === "en" ? "fr" : "en"));

  // normal-mode keys
  let g = false;
  addEventListener("keydown", e => {
    if (e.target === cin || e.ctrlKey || e.metaKey || e.altKey || /input|textarea/i.test(e.target.tagName)) return;
    const k = e.key, idx = order.indexOf(location.pathname.endsWith("/") ? location.pathname : location.pathname + "/");
    if (k === ":") { e.preventDefault(); open(); }
    else if (k === "L") setLang(lang === "en" ? "fr" : "en");
    else if (k === "j") win.scrollBy(0, lh()); else if (k === "k") win.scrollBy(0, -lh());
    else if (k === "G") win.scrollTo(0, 1e6); else if (k === "g") { if (g) { win.scrollTo(0, 0); g = false; } else { g = true; setTimeout(() => g = false, 600); } }
    else if (g && k === "t") location.href = order[(idx + 1) % order.length];
    else if (g && k === "T") location.href = order[(idx - 1 + order.length) % order.length];
    else if (/^[1-5]$/.test(k)) location.href = order[k - 1];
    else if (k === "p") go("projects"); else if (k === "a") go("profile"); else if (k === "r") go("resume"); else if (k === "c") go("contact"); else if (k === "h") go("home");
  });
})();
