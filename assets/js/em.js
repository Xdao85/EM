/* ==========================================================================
   Electromagnetics course — shared runtime (em.js)
   Classic script (no modules) so pages work when opened directly from disk.
   Load order in <head>: katex.min.js, auto-render.min.js, em.js
   ========================================================================== */
(function () {
  'use strict';

  var EM = (window.EM = window.EM || {});
  var docEl = document.documentElement;

  /* ------------------------------------------------------------------------
     0. Language (English / Vietnamese). Pages live in <root>/en/... and <root>/vi/...;
        the page language comes from <html lang>. EM.t() translates the few strings
        this file writes itself; EM.langUrl(l) gives the same page in the other language.
     ------------------------------------------------------------------------ */
  EM.lang = /^vi/i.test(docEl.getAttribute('lang') || '') ? 'vi' : 'en';
  var VI = {
    '✓ Your answer · correct': '✓ Bạn chọn · đúng', '✗ Your answer': '✗ Bạn chọn', '✓ Correct answer': '✓ Đáp án đúng',
    'Live formula': 'Công thức trực tiếp', 'Edit ': 'Sửa ', ', now ': ', hiện tại ', 'Score: ': 'Điểm: ', 'Question ': 'Câu ',
    'Reset quiz': 'Làm lại', 'click a highlighted value to change it': 'bấm vào giá trị được tô màu để thay đổi', 'Close': 'Đóng', 'Self-assessment quiz': 'Câu hỏi tự kiểm tra',
    '<strong>Correct.</strong> ': '<strong>Đúng.</strong> ', '<strong>Not quite.</strong> ': '<strong>Chưa đúng.</strong> '
  };
  function T(s) { return EM.lang === 'vi' && VI[s] ? VI[s] : s; }
  EM.t = T;
  EM.langUrl = function (lang, href) {
    var u = href || location.href, i = Math.max(u.lastIndexOf('/en/'), u.lastIndexOf('/vi/'));
    return i < 0 ? null : u.slice(0, i) + '/' + lang + '/' + u.slice(i + 4);
  };
  EM.setLang = function (lang) { try { localStorage.setItem('em-lang', lang); } catch (e) {} };

  /* ------------------------------------------------------------------------
     1. Math rendering (KaTeX)
     ------------------------------------------------------------------------ */
  var DELIMITERS = [
    { left: '$$', right: '$$', display: true },
    { left: '\\[', right: '\\]', display: true },
    { left: '\\(', right: '\\)', display: false },
    { left: '$', right: '$', display: false }
  ];
  var MACROS = {};
  var KATEX_OPTS = {
    delimiters: DELIMITERS,
    throwOnError: false,
    strict: false,
    macros: MACROS,
    ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option', 'input'],
    ignoredClasses: ['no-math']
  };

  function toList(nodes) {
    if (!nodes) return [document.body];
    if (nodes.nodeType === 1 || nodes.nodeType === 11) return [nodes];
    return Array.prototype.slice.call(nodes);
  }

  /** Render every $...$, $$...$$, \(...\), \[...\] inside the given node(s). */
  EM.typeset = function (nodes) {
    if (typeof window.renderMathInElement !== 'function') return;
    toList(nodes).forEach(function (n) {
      if (n && n.nodeType) {
        try { window.renderMathInElement(n, KATEX_OPTS); } catch (e) { console.error('[EM] typeset', e); }
      }
    });
    if (EM.fitDisplays) toList(nodes).forEach(function (n) { if (n && n.querySelectorAll) EM.fitDisplays(n); });
  };

  /** Display formulas that are a little wider than their box are scaled down (to at most 82 %),
      so they fit without a sideways scrollbar. Wider ones keep the scrollbar. Re-checked on resize. */
  EM.fitDisplays = function (root) {
    (root || document).querySelectorAll('.katex-display').forEach(function (d) {
      var k = d.firstElementChild;
      if (!k) return;
      // Not laid out yet (hidden tab, collapsed panel, page still loading): fit when it gets a size
      if (fitRO && !d.__emFitObserved) { d.__emFitObserved = true; fitRO.observe(d); }
      if (!d.clientWidth) return;
      k.style.fontSize = '';
      var over = k.scrollWidth / d.clientWidth;
      if (over > 1.005) {
        var f = Math.max(0.82, 1 / over - 0.01);
        k.style.fontSize = (parseFloat(getComputedStyle(k).fontSize) * f).toFixed(2) + 'px';
      }
    });
  };
  var fitRO = ('ResizeObserver' in window) ? new ResizeObserver(function (entries) {
    entries.forEach(function (en) {
      var w = Math.round(en.contentRect.width);
      if (w && en.target.__emFitW !== w) { en.target.__emFitW = w; EM.fitDisplays(en.target.parentElement || document); }
    });
  }) : null;
  var fitSoon = null;
  window.addEventListener('resize', function () { clearTimeout(fitSoon); fitSoon = setTimeout(function () { EM.fitDisplays(); }, 150); });

  /** Render one TeX string into an element. Skips work if the string did not change. */
  EM.tex = function (el, tex, displayMode) {
    if (!el || !window.katex) return;
    var key = (displayMode ? 'D:' : 'I:') + tex;
    if (el.__emTex === key) return;
    el.__emTex = key;
    try {
      window.katex.render(tex, el, { displayMode: !!displayMode, throwOnError: false, strict: false, macros: MACROS });
    } catch (e) { el.textContent = tex; }
  };

  /** Render a plain-text formula label (e.g. "F = 0 R̂ + sin(θ) θ̂") as math.
      Unicode hats (R̂, θ̂ …) do not render reliably in UI fonts; KaTeX draws them properly. */
  var HAT = { 'x': '\\hat{\\mathbf{x}}', 'y': '\\hat{\\mathbf{y}}', 'z': '\\hat{\\mathbf{z}}', 'r': '\\hat{\\mathbf{r}}', 'R': '\\hat{\\mathbf{R}}',
              'θ': '\\hat{\\boldsymbol{\\theta}}', 'φ': '\\hat{\\boldsymbol{\\phi}}', 'ϕ': '\\hat{\\boldsymbol{\\phi}}' };
  EM.labelToTex = function (label) {
    var t = String(label).normalize('NFD');
    t = t.replace(/([xyzrRθφϕ])\u0302/g, function (_, c) { return ' ' + HAT[c] + ' '; });
    t = t.replace(/\u0302/g, '');
    t = t.replace(/\b(sin|cos|tan|exp|log|ln|sqrt)\b/g, '\\$1 ')
         .replace(/θ/g, '\\theta ').replace(/[φϕ]/g, '\\phi ')
         .replace(/\*/g, '\\,').replace(/²/g, '^2').replace(/³/g, '^3').replace(/−/g, '-');
    t = t.replace(/\\sqrt ?\(([^()]*)\)/g, '\\sqrt{$1}');
    t = t.replace(/\^\(((?:[^()]|\([^()]*\))*)\)/g, '^{$1}');   // e^(-r²) -> e^{-r^2}
    return t;
  };
  EM.formulaLabel = function (el, label) {
    if (!window.katex) { el.textContent = label; return; }
    try {
      el.innerHTML = window.katex.renderToString(EM.labelToTex(label), { throwOnError: true, strict: false });
      el.setAttribute('aria-label', label);
    } catch (e) { el.textContent = label; }
  };

  /** Signed vector components as TeX: [2, -2.52, 1] -> "2.00\,\hat{x} - 2.52\,\hat{\phi} + 1.00\,\hat{z}".
      system: 'cartesian' | 'cylindrical' | 'spherical'. Avoids "+ -2.52" and Unicode-hat rendering issues. */
  var UNITS = {
    cartesian: ['\\hat{\\mathbf{x}}', '\\hat{\\mathbf{y}}', '\\hat{\\mathbf{z}}'],
    cylindrical: ['\\hat{\\mathbf{r}}', '\\hat{\\boldsymbol{\\phi}}', '\\hat{\\mathbf{z}}'],
    spherical: ['\\hat{\\mathbf{R}}', '\\hat{\\boldsymbol{\\theta}}', '\\hat{\\boldsymbol{\\phi}}']
  };
  EM.vecTex = function (vals, system, digits) {
    var u = UNITS[system] || UNITS.cartesian, d = digits == null ? 2 : digits, out = '';
    for (var i = 0; i < 3; i++) {
      var v = Number(vals[i]); if (!isFinite(v)) v = 0;
      var neg = v < 0 && Math.abs(v) >= 0.5 * Math.pow(10, -d);
      var mag = Math.abs(v).toFixed(d);
      out += (i === 0 ? (neg ? '-' : '') : (neg ? ' - ' : ' + ')) + mag + '\\,' + u[i];
    }
    return out;
  };
  /** Signed number for use after an operator: 2 -> "2.0", -2 -> "(-2.0)". */
  EM.paren = function (v, digits) {
    var t = Number(v).toFixed(digits == null ? 1 : digits);
    if (/^-0(\.0*)?$/.test(t)) t = t.slice(1);          // -0.04 -> "0.0", not "(-0.0)"
    return t.charAt(0) === '-' ? '(' + t + ')' : t;
  };

  /** Mark a multiple-choice question after the student answered:
        chosen  -> ring + pop animation + "Your answer" tag
        correct -> green + "Correct answer" tag (also shown when the student chose wrong)
      All options are locked. Colours are never the only cue: every mark also has a text tag and an icon character. */
  EM.markQuiz = function (buttons, chosen, correct) {
    buttons.forEach(function (b) {
      b.disabled = true;
      b.classList.add('em-q-locked');
      b.removeAttribute('onclick');
      var tag = null;
      if (b === chosen && b === correct) { b.classList.add('em-q-chosen', 'em-q-correct'); tag = T('✓ Your answer · correct'); }
      else if (b === chosen)             { b.classList.add('em-q-chosen', 'em-q-wrong');   tag = T('✗ Your answer'); }
      else if (b === correct)            { b.classList.add('em-q-correct', 'em-q-reveal'); tag = T('✓ Correct answer'); }
      if (tag) {
        Array.prototype.forEach.call(b.querySelectorAll('svg, i[data-lucide]'), function (ic) { ic.style.display = 'none'; });
        var t = document.createElement('span');
        t.className = 'em-q-tag';
        t.textContent = tag;
        if (getComputedStyle(b).display.indexOf('flex') !== -1) b.appendChild(t);      // already a flex row (1.6)
        else { t.style.float = 'right'; b.insertBefore(t, b.firstChild); }              // plain text button: tag on the right
        b.setAttribute('aria-label', (b.textContent || '').replace(/\s+/g, ' ').trim());
      }
    });
    if (chosen) chosen.setAttribute('aria-pressed', 'true');
  };
  /** For pages whose option buttons carry onclick="fn(q, 'X', isCorrect)". */
  EM.markQuizByQuestion = function (fnName, qNum, chosenLetter, correctLetter) {
    var btns = Array.prototype.slice.call(document.querySelectorAll('button[onclick^="' + fnName + '(' + qNum + ',"]'));
    var find = function (L) { return btns.filter(function (b) { return b.getAttribute('onclick').indexOf("'" + L + "'") !== -1; })[0]; };
    var chosen = find(chosenLetter);
    var correct = correctLetter ? find(correctLetter)
      : btns.filter(function (b) { return /true\)\s*$/.test(b.getAttribute('onclick')); })[0];
    EM.markQuiz(btns, chosen, correct);
  };

  /** Write text only when it changed (avoids needless layout/style work). */
  EM.setText = function (el, text) {
    if (el && el.textContent !== text) el.textContent = text;
  };

  /* MathJax compatibility shim: existing page code keeps calling
     MathJax.typesetPromise([...]) and now gets KaTeX instead. */
  window.MathJax = {
    version: 'katex-shim',
    typesetPromise: function (nodes) { EM.typeset(nodes); return Promise.resolve(); },
    typeset: function (nodes) { EM.typeset(nodes); },
    typesetClear: function () {},
    startup: { promise: Promise.resolve(), typeset: false }
  };

  /* ------------------------------------------------------------------------
     2. Animation manager
        EM.loop(targets, fn) runs fn(timeMs, dtSeconds) every frame, but only
        while at least one target element is on screen and the tab is visible.
     ------------------------------------------------------------------------ */
  var loops = [];
  var rafPending = false;

  function tick(t) {
    rafPending = false;
    var anyRan = false;
    var hidden = document.hidden;
    var demandOK = EM.shouldRender();
    for (var i = 0; i < loops.length; i++) {
      var L = loops[i];
      if (L.stopped || L.paused || !L.visible || hidden) { L.last = 0; continue; }
      // demand loops sleep completely (no frames at all) until something asks for a render:
      // user input (EM.invalidate) or the loop itself returning true (camera still easing, animation on).
      if (L.demand && !demandOK && !L.keep) { L.last = 0; continue; }
      var dt = L.last ? Math.min(0.05, (t - L.last) / 1000) : 1 / 60;
      L.last = t;
      var ret;
      try { ret = L.fn(t, dt); } catch (e) { console.error('[EM] loop stopped after error', e); L.stopped = true; }
      L.keep = !!ret;
      anyRan = true;
    }
    if (anyRan) kick();
  }
  function kick() {
    if (!rafPending) { rafPending = true; requestAnimationFrame(tick); }
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });

  EM.loop = function (targets, fn, opts) {
    opts = opts || {};
    var els = (Array.isArray(targets) ? targets : [targets]).filter(Boolean);
    var L = { fn: fn, demand: !!opts.demand, keep: false, visible: els.length === 0, paused: false, stopped: false, last: 0, onScreen: new Set() };
    if (els.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) L.onScreen.add(en.target); else L.onScreen.delete(en.target);
        });
        var was = L.visible;
        L.visible = L.onScreen.size > 0;
        if (L.visible && !was) { if (L.demand) EM.invalidate(300); kick(); }
      }, { rootMargin: opts.rootMargin || '120px' });
      els.forEach(function (el) { io.observe(el); });
      L.io = io;
    } else {
      L.visible = true;
    }
    loops.push(L);
    kick();
    return {
      pause: function () { L.paused = true; },
      resume: function () { L.paused = false; kick(); },
      stop: function () { L.stopped = true; if (L.io) L.io.disconnect(); },
      isVisible: function () { return L.visible; }
    };
  };

  /* ------------------------------------------------------------------------
     Canvas sizing without per-frame layout reads.
     Old code did `canvas.width = canvas.parentElement.clientWidth` every frame,
     which forces a layout AND reallocates the canvas bitmap 60x per second.
     ------------------------------------------------------------------------ */
  var sizeCache = new WeakMap();
  var ro = ('ResizeObserver' in window) ? new ResizeObserver(function (entries) {
    entries.forEach(function (en) {
      var t = en.target;
      sizeCache.set(t, { w: t.clientWidth, h: t.clientHeight });
    });
    EM.invalidate(200);
  }) : null;

  /** Cached {w, h} of an element's parent (clientWidth/clientHeight), updated on resize. */
  EM.parentSize = function (el) {
    var p = el.parentElement;
    var s = sizeCache.get(p);
    if (!s) {
      s = { w: p.clientWidth, h: p.clientHeight };
      sizeCache.set(p, s);
      if (ro) ro.observe(p);
    }
    return s;
  };

  function resetCtx(ctx) {
    if (typeof ctx.reset === 'function') { ctx.reset(); return; }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    if (ctx.setLineDash) ctx.setLineDash([]);
    ctx.lineWidth = 1; ctx.lineCap = 'butt'; ctx.lineJoin = 'miter';
    ctx.shadowBlur = 0; ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#000'; ctx.strokeStyle = '#000';
    ctx.font = '10px sans-serif';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  /** Size a canvas to its parent and clear it; returns {w, h}.
      Drop-in replacement for the old per-frame `w = canvas.width = parent.clientWidth`. */
  EM.canvasSize = function (canvas) {
    var s = EM.parentSize(canvas);
    if (canvas.width !== s.w || canvas.height !== s.h) {
      canvas.width = s.w; canvas.height = s.h;   // resizing also clears + resets state
    } else {
      resetCtx(canvas.getContext('2d'));
    }
    return { w: s.w, h: s.h };
  };

  /* ------------------------------------------------------------------------
     Instanced arrows: hundreds of arrows in 2 draw calls instead of 2 per arrow.
       const b = new EM.ArrowBatch();
       b.add(origin, direction, length, color, headLength, headWidth);
       group.add(b.build());
     ------------------------------------------------------------------------ */
  EM.ArrowBatch = function (opts) { this.items = []; this.opts = opts || {}; };
  EM.ArrowBatch.prototype.add = function (origin, dir, length, color, headLength, headWidth) {
    if (!(length > 1e-6)) return;
    var d = dir.clone().normalize();
    var hl = Math.min(headLength != null ? headLength : 0.2 * length, length * 0.6);
    var hw = headWidth != null ? headWidth : 0.2 * hl;
    this.items.push({ o: origin.clone(), d: d, len: length, c: new THREE.Color(color), hl: hl, hw: hw });
  };
  EM.ArrowBatch.prototype.build = function () {
    var T = window.THREE, n = this.items.length, g = new T.Group();
    if (!n) return g;
    var shaftGeo = new T.CylinderGeometry(1, 1, 1, 8, 1, false); shaftGeo.translate(0, 0.5, 0);
    var headGeo = new T.ConeGeometry(1, 1, 12, 1, false); headGeo.translate(0, 0.5, 0);
    var mat = new T.MeshStandardMaterial({ roughness: 0.45, metalness: 0.05 });
    var shafts = new T.InstancedMesh(shaftGeo, mat, n);
    var heads = new T.InstancedMesh(headGeo, mat, n);
    var up = new T.Vector3(0, 1, 0), q = new T.Quaternion(), m = new T.Matrix4(), sc = new T.Vector3(), pos = new T.Vector3();
    var shaftR = this.opts.shaftRadius;
    for (var i = 0; i < n; i++) {
      var a = this.items[i];
      q.setFromUnitVectors(up, a.d);
      var r = shaftR != null ? shaftR : Math.max(0.008, a.hw * 0.16);
      sc.set(r, Math.max(1e-4, a.len - a.hl), r);
      m.compose(a.o, q, sc); shafts.setMatrixAt(i, m);
      pos.copy(a.d).multiplyScalar(a.len - a.hl).add(a.o);
      sc.set(a.hw / 2, a.hl, a.hw / 2);
      m.compose(pos, q, sc); heads.setMatrixAt(i, m);
      shafts.setColorAt(i, a.c); heads.setColorAt(i, a.c);
    }
    shafts.instanceMatrix.needsUpdate = true; heads.instanceMatrix.needsUpdate = true;
    if (shafts.instanceColor) shafts.instanceColor.needsUpdate = true;
    if (heads.instanceColor) heads.instanceColor.needsUpdate = true;
    g.add(shafts); g.add(heads);
    return g;
  };

  /** Instanced spheres: points = [{pos: Vector3, color}] -> one draw call. */
  EM.sphereBatch = function (points, radius, opts) {
    var T = window.THREE, g = new T.Group();
    if (!points.length) return g;
    var geo = new T.SphereGeometry(radius, 12, 10);
    var mat = new T.MeshStandardMaterial(Object.assign({ roughness: 0.4 }, opts || {}));
    var mesh = new T.InstancedMesh(geo, mat, points.length), m = new T.Matrix4();
    points.forEach(function (p, i) {
      m.makeTranslation(p.pos.x, p.pos.y, p.pos.z);
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, new T.Color(p.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    g.add(mesh);
    return g;
  };

  /** Coalesce bursts of calls (e.g. slider 'input' events) into one call per frame. */
  EM.perFrame = function (fn) {
    var pending = false, lastArgs, self;
    return function () {
      lastArgs = arguments; self = this;
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () { pending = false; fn.apply(self, lastArgs); });
    };
  };

  /* ------------------------------------------------------------------------
     3. Render gate for three.js scenes
        EM.invalidate(ms) asks for rendering during the next `ms` milliseconds.
        Any pointer / wheel / key / input activity on the page does this
        automatically, so static scenes stop redrawing when nobody touches them.
     ------------------------------------------------------------------------ */
  var renderUntil = 0;
  EM.invalidate = function (ms) {
    var until = performance.now() + (ms || 250);
    if (until > renderUntil) renderUntil = until;
    kick();
  };
  EM.shouldRender = function () { return performance.now() < renderUntil; };
  ['pointerdown', 'pointermove', 'wheel', 'keydown', 'input', 'change', 'click', 'touchmove'].forEach(function (type) {
    window.addEventListener(type, function (e) {
      // pointermove only matters while a button is held (dragging / orbiting)
      if (type === 'pointermove' && !e.buttons) return;
      EM.invalidate(type === 'wheel' ? 700 : 450);
    }, { passive: true, capture: true });
  });
  window.addEventListener('resize', function () { EM.invalidate(400); });

  /** Free GPU memory of a three.js object tree (geometries, materials, textures).
      Safe for shared geometries: three.js re-uploads a disposed geometry if it is drawn again. */
  EM.dispose3D = function (root) {
    if (!root || typeof root.traverse !== 'function') return;
    root.traverse(function (o) {
      if (o.geometry && o.geometry.dispose) o.geometry.dispose();
      var m = o.material;
      if (m) {
        (Array.isArray(m) ? m : [m]).forEach(function (mm) {
          if (mm.map && mm.map.dispose) mm.map.dispose();
          if (mm.dispose) mm.dispose();
        });
      }
    });
  };

  /** Remove and dispose every child of a group (optionally keeping some). */
  EM.clearGroup = function (group, keep) {
    if (!group) return;
    for (var i = group.children.length - 1; i >= 0; i--) {
      var c = group.children[i];
      if (keep && keep.indexOf(c) !== -1) { group.remove(c); continue; }
      EM.dispose3D(c);
      group.remove(c);
    }
  };

  /* ------------------------------------------------------------------------
     Live, editable formulas
       EM.liveFormula({
         title: 'Live formula',
         params: { A: { input: 'slider-amp', digits: 1, label: 'amplitude A', unit: 'm' }, ... },
         extra: ['some-checkbox-id'],             // other inputs that should trigger a re-render
         tex: function (v, P) { return 'y = ' + P.A + '\\cos(...)'; }   // v = numbers, P = clickable values
         anchor: element (optional; default = the common parent of the bound sliders)
       });
     Clicking (or Enter on) a highlighted value opens a small editor; the value is
     written back to the slider, so the simulation and the formula stay in sync.
     ------------------------------------------------------------------------ */
  var TRUST = function (ctx) { return ctx.command === '\\htmlClass' || ctx.command === '\\htmlData'; };
  var editor = null;
  function closeEditor() { if (editor) { editor.remove(); editor = null; } }
  function openEditor(target, spec, input, onDone) {
    closeEditor();
    var box = el('div', 'em-param-editor');
    var lab = el('label', '', (spec.label || 'value') + (spec.unit ? ' (' + spec.unit + ')' : ''));
    var num = document.createElement('input');
    num.type = 'number';
    // spec.edit = { to: slider->shown, from: shown->slider } lets e.g. a log-scale slider be edited in Hz
    var to = spec.edit ? spec.edit.to : function (x) { return x; };
    var from = spec.edit ? spec.edit.from : function (x) { return x; };
    var lo = to(parseFloat(input.min)), hi = to(parseFloat(input.max));
    num.min = lo; num.max = hi; num.step = spec.edit ? 'any' : (input.step || 'any');
    num.value = spec.edit ? Number(to(parseFloat(input.value)).toPrecision(4)) : input.value;
    num.setAttribute('aria-label', spec.label || 'value');
    var fmtR = function (x) { return Math.abs(x) >= 1e5 || (Math.abs(x) < 1e-3 && x !== 0) ? x.toExponential(2) : String(Number(x.toPrecision(4))); };
    var hint = el('div', 'em-param-hint', 'range ' + fmtR(lo) + ' … ' + fmtR(hi) + ' · Enter to apply, Esc to close');
    lab.appendChild(num); box.appendChild(lab); box.appendChild(hint);
    document.body.appendChild(box);
    var r = target.getBoundingClientRect();
    box.style.left = Math.max(8, Math.min(window.innerWidth - 240, r.left + window.scrollX - 20)) + 'px';
    box.style.top = (r.bottom + window.scrollY + 6) + 'px';
    function apply() {
      var v = parseFloat(num.value);
      if (!isFinite(v)) return;
      v = from(v);
      if (!isFinite(v)) return;
      v = Math.min(parseFloat(input.max), Math.max(parseFloat(input.min), v));
      input.value = v;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    num.addEventListener('input', apply);
    num.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { apply(); closeEditor(); onDone(); }
      if (e.key === 'Escape') { closeEditor(); onDone(); }
    });
    setTimeout(function () {
      document.addEventListener('pointerdown', function out(e) {
        if (editor && !editor.contains(e.target)) { closeEditor(); document.removeEventListener('pointerdown', out, true); }
      }, true);
    }, 0);
    editor = box;
    num.focus(); num.select();
  }

  EM.liveFormula = function (cfg) {
    var names = Object.keys(cfg.params);
    var inputs = {};
    names.forEach(function (n) { inputs[n] = document.getElementById(cfg.params[n].input); });
    var missing = names.filter(function (n) { return !inputs[n]; });
    if (missing.length) { console.warn('[EM] liveFormula: missing inputs', missing); return null; }

    // Where to put the box: before the smallest element that contains all bound sliders
    var anchor = cfg.anchor;
    if (!anchor) {
      anchor = inputs[names[0]].parentElement;
      while (anchor && !names.every(function (n) { return anchor.contains(inputs[n]); })) anchor = anchor.parentElement;
    }
    var box = el('div', 'em-live');
    var head = el('div', 'em-live-head', '<span>' + (cfg.title || T('Live formula')) + '</span><span class="em-live-hint">' + T('click a highlighted value to change it') + '</span>');
    var body = el('div', 'em-live-body');
    box.appendChild(head); box.appendChild(body);
    if (cfg.after) cfg.after.insertAdjacentElement('afterend', box);
    else anchor.parentElement.insertBefore(box, anchor);

    function values() {
      var v = {};
      names.forEach(function (n) { v[n] = parseFloat(inputs[n].value); });
      return v;
    }
    function fmt(n, x) {
      var d = cfg.params[n].digits;
      return d == null ? String(x) : x.toFixed(d);
    }
    var lastTex = '', pendingFocus = null;
    function render() {
      var v = values(), P = {};
      names.forEach(function (n) {
        var shown = cfg.params[n].show ? cfg.params[n].show(v[n], v) : fmt(n, v[n]);
        P[n] = '\\htmlClass{em-param}{\\htmlData{p=' + n + '}{' + shown + '}}';
      });
      var tex = cfg.tex(v, P);
      if (tex === lastTex) { focusPending(); return; }
      lastTex = tex;
      try {
        window.katex.render(tex, body, { displayMode: true, throwOnError: false, strict: false, trust: TRUST });
      } catch (e) { body.textContent = tex; }
      body.querySelectorAll('[data-p]').forEach(function (node) {
        var n = node.getAttribute('data-p'), spec = cfg.params[n];
        node.setAttribute('tabindex', '0');
        node.setAttribute('role', 'button');
        node.setAttribute('aria-label', T('Edit ') + (spec.label || n) + T(', now ') + inputs[n].value);
        node.title = T('Edit ') + (spec.label || n);
      });
      focusPending();
    }
    function focusPending() {
      if (!pendingFocus) return;
      var f = body.querySelector('[data-p="' + pendingFocus + '"]');
      pendingFocus = null;
      if (f) f.focus();
    }
    var renderSoon = EM.perFrame(render);
    names.forEach(function (n) { inputs[n].addEventListener('input', renderSoon); inputs[n].addEventListener('change', renderSoon); });
    (cfg.extra || []).forEach(function (id) {
      var x = document.getElementById(id);
      if (x) { x.addEventListener('input', renderSoon); x.addEventListener('change', renderSoon); x.addEventListener('click', renderSoon); }
    });
    function activate(e) {
      var node = e.target.closest && e.target.closest('[data-p]');
      if ((!node || !body.contains(node)) && e.type === 'click') {
        // KaTeX layout boxes of neighbouring rows can overlap a value; look under the pointer
        node = (document.elementsFromPoint(e.clientX, e.clientY) || [])
          .map(function (x) { return x.closest && x.closest('[data-p]'); })
          .filter(function (x) { return x && body.contains(x); })[0] || null;
      }
      if (!node || !body.contains(node)) return;
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      var n = node.getAttribute('data-p');
      openEditor(node, cfg.params[n], inputs[n], function () {
        pendingFocus = n;               // re-focus the value after the formula re-renders
        render();
      });
    }
    body.addEventListener('click', activate);
    body.addEventListener('keydown', activate);
    render();
    return { render: render, element: box };
  };

  /* ------------------------------------------------------------------------
     4. Quiz engine (multiple choice, instant feedback, score)
        EM.quiz(container, questions) renders inline;
        EM.quizButton(questions, title) adds a floating "Quiz" button + dialog
        (used by the full-screen 3D pages of Topic 2).
        question = { q, options:[...], answer: index, explain }
     ------------------------------------------------------------------------ */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  EM.quiz = function (container, questions, opts) {
    opts = opts || {};
    container.innerHTML = '';
    var score = 0, answered = 0;
    var scoreEl = opts.scoreEl || null;
    function updateScore() {
      if (scoreEl) scoreEl.textContent = T('Score: ') + score + ' / ' + questions.length;
    }
    questions.forEach(function (Q, qi) {
      var box = el('div', 'em-quiz-q');
      box.appendChild(el('div', 'em-quiz-q-title', T('Question ') + (qi + 1)));
      box.appendChild(el('div', 'em-quiz-q-text', Q.q));
      var fb = el('div', 'em-quiz-fb');
      fb.setAttribute('role', 'status');
      var buttons = [];
      Q.options.forEach(function (opt, oi) {
        var b = el('button', 'em-quiz-opt', String.fromCharCode(65 + oi) + '. ' + opt);
        b.type = 'button';
        b.addEventListener('click', function () {
          buttons.forEach(function (x) { x.disabled = true; });
          buttons[Q.answer].classList.add('correct');
          answered++;
          if (oi === Q.answer) {
            score++;
            fb.className = 'em-quiz-fb show ok';
            fb.innerHTML = T('<strong>Correct.</strong> ') + (Q.explain || '');
          } else {
            b.classList.add('wrong');
            fb.className = 'em-quiz-fb show bad';
            fb.innerHTML = T('<strong>Not quite.</strong> ') + (Q.explain || '');
          }
          EM.typeset(fb);
          updateScore();
        });
        buttons.push(b);
        box.appendChild(b);
      });
      box.appendChild(fb);
      container.appendChild(box);
    });
    var reset = el('button', 'em-quiz-reset', T('Reset quiz'));
    reset.type = 'button';
    reset.addEventListener('click', function () { EM.quiz(container, questions, opts); });
    container.appendChild(reset);
    updateScore();
    EM.typeset(container);
  };

  /* Floating buttons (bottom-right) that open a dialog. Stacked upward in call order. */
  var floatCount = 0;
  EM.dialogButton = function (opts) {
    var launch = el('button', 'em-quiz-launch', '<i class="fa-solid ' + (opts.icon || 'fa-book-open') + '" aria-hidden="true"></i><span>' + opts.label + '</span>');
    launch.type = 'button';
    launch.style.bottom = (16 + floatCount * 52) + 'px';
    if (opts.secondary) launch.classList.add('secondary');
    floatCount++;
    var overlay = el('div', 'em-quiz-overlay');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', opts.title);
    var dialog = el('div', 'em-quiz-dialog');
    var head = el('div', 'em-quiz-head');
    head.appendChild(el('h2', '', opts.title));
    var right = el('div', '');
    right.style.display = 'flex'; right.style.alignItems = 'center'; right.style.gap = '12px';
    var extra = el('span', 'em-quiz-score', '');
    var close = el('button', 'em-quiz-close', T('Close'));
    close.type = 'button';
    right.appendChild(extra); right.appendChild(close);
    head.appendChild(right);
    var body = el('div', 'em-dialog-body');
    dialog.appendChild(head); dialog.appendChild(body);
    overlay.appendChild(dialog);
    var built = false;
    function open() {
      if (!built) {
        if (opts.html) { body.innerHTML = opts.html; EM.typeset(body); }
        if (opts.build) opts.build(body, extra);
        built = true;
      }
      overlay.classList.add('open');
      close.focus();
    }
    function hide() { overlay.classList.remove('open'); launch.focus(); }
    launch.addEventListener('click', open);
    close.addEventListener('click', hide);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) hide(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) hide(); });
    function attach() { document.body.appendChild(launch); document.body.appendChild(overlay); }
    if (document.body) attach(); else document.addEventListener('DOMContentLoaded', attach);
    return { open: open, close: hide };
  };

  EM.quizButton = function (questions, title) {
    return EM.dialogButton({
      label: T('Self-assessment quiz'), icon: 'fa-circle-question', title: title || T('Self-assessment quiz'),
      build: function (body, scoreEl) { EM.quiz(body, questions, { scoreEl: scoreEl }); }
    });
  };

  /* Quiz answer tags for the pages' own quiz code (no page edits needed):
     after a quiz option is clicked, the page colours the options; we add a ring/pop to the chosen
     option and text tags ("✓ Correct answer", "✗ Your answer") so the result is not shown by colour alone. */
  function isQuizOption(b) {
    return b && b.tagName === 'BUTTON' && (/^answerQuiz\(/.test(b.getAttribute('onclick') || '') || (b.hasAttribute('data-j') && /q\d+-btn/.test(b.className)));
  }
  function groupOf(b) {
    var m = (b.getAttribute('onclick') || '').match(/^answerQuiz\((\d+)/);
    if (m) return Array.prototype.slice.call(document.querySelectorAll('button[onclick^="answerQuiz(' + m[1] + ',"]'));
    var c = (b.className.match(/q\d+-btn/) || [])[0];
    return c ? Array.prototype.slice.call(document.querySelectorAll('button.' + c)) : [b];
  }
  function addTag(b, text) {
    if (b.querySelector('.em-q-tag')) return;
    var t = document.createElement('span'); t.className = 'em-q-tag'; t.textContent = text;
    if (getComputedStyle(b).display.indexOf('flex') !== -1) { t.style.marginLeft = 'auto'; b.appendChild(t); }
    else { t.style.float = 'right'; b.insertBefore(t, b.firstChild); }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('button');
    if (!isQuizOption(b) || b.classList.contains('em-q-locked')) return;
    setTimeout(function () {                      // let the page's own handler colour the options first
      var group = groupOf(b);
      if (!group.some(function (x) { return x.disabled; })) return;   // page ignored the click
      group.forEach(function (x) {
        x.classList.add('em-q-locked');
        var correct = /emerald/.test(x.className);
        if (x === b) {
          x.classList.add('em-q-chosen', correct ? 'em-q-correct-chosen' : 'em-q-wrong');
          addTag(x, correct ? T('✓ Your answer · correct') : T('✗ Your answer'));
        } else if (correct) { x.classList.add('em-q-reveal'); addTag(x, T('✓ Correct answer')); }
      });
    }, 0);
  }, true);

  /* Helpers for "Load this example" buttons: drive the page through its own controls,
     so every page keeps its own logic. */
  EM.setControl = function (id, value) {
    var el = document.getElementById(id); if (!el) return;
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };
  EM.clickChip = function (groupId, v) {
    var b = document.querySelector('#' + groupId + ' button[data-v="' + v + '"]'); if (b) b.click();
  };

  /* ------------------------------------------------------------------------
     5. Editing helper: open any page with ?twdev to load the Tailwind CDN,
        so newly added Tailwind classes work while you edit (needs internet).
        Without ?twdev only the classes compiled into tailwind.css exist.
     ------------------------------------------------------------------------ */
  if (/[?&]twdev\b/.test(location.search)) {
    var s = document.createElement('script');
    s.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------------------------
     6. First render: typeset the page, then reveal it.
     ------------------------------------------------------------------------ */
  /* Language switch for module pages opened on their own (inside index.html the shell has its own). */
  function langSwitch() {
    if (window.parent !== window || !/\/topic\d\//.test(location.pathname.replace(/\\/g, '/'))) return;
    var other = EM.lang === 'vi' ? 'en' : 'vi', url = EM.langUrl(other); if (!url) return;
    var box = document.createElement('div');
    box.className = 'em-lang-switch';
    box.setAttribute('role', 'group'); box.setAttribute('aria-label', EM.lang === 'vi' ? 'Ngôn ngữ' : 'Language');
    box.innerHTML = '<span class="on" aria-current="true">' + EM.lang.toUpperCase() + '</span><a href="' + url + '" lang="' + other + '" title="' +
      (other === 'vi' ? 'Xem bằng tiếng Việt' : 'View in English') + '">' + other.toUpperCase() + '</a>';
    box.querySelector('a').addEventListener('click', function () { EM.setLang(other); });
    document.body.appendChild(box);
  }
  function firstRender() {
    langSwitch();
    EM.typeset(document.body);
    requestAnimationFrame(function () { docEl.classList.remove('em-pending'); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', firstRender);
  } else {
    firstRender();
  }
})();
