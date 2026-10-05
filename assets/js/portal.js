/* portal.js: course data and shared logic of the portal pages (welcome.html, portal/*.html). Keep COURSE in sync with index.html. */
const COURSE = [
 {id:"1", num:"01", title:"Introduction: Waves and Phasors", color:"sky",
  blurb:"Harmonic wave propagation, complex notation and phasor-domain analysis.",
  goals:["Read SI units and vector notation","Describe travelling and lossy waves","Work fluently with complex numbers and phasors"],
  sections:[
   {id:"1.1", title:"Dimensions, Units, and Notation", file:"topic1/dimensions_units_notation.html", figs:1, desc:"SI base units, derived electromagnetic quantities ($V, A, \\Omega, F, H, T, Wb$) and vector notation conventions."},
   {id:"1.2", title:"The Nature of Electromagnetism", file:"topic1/nature_of_electromagnetism.html", figs:4, desc:"The four fundamental forces, electric charge, the fields $\\mathbf{E}$ and $\\mathbf{B}$, and field–particle interaction."},
   {id:"1.3", title:"Travelling Waves", file:"topic1/traveling_waves.html", figs:6, desc:"Sinusoidal waves $y(z,t) = A\\cos(\\omega t - \\beta z)$, phase velocity $u_p = \\omega/\\beta$ and wavelength $\\lambda$."},
   {id:"1.4", title:"The Electromagnetic Spectrum", file:"topic1/electromagnetic_spectrum.html", figs:2, desc:"Bands from ELF/RF through microwave, infrared, visible light, X-rays and gamma rays ($c = f\\lambda$)."},
   {id:"1.5", title:"Review of Complex Numbers", file:"topic1/complex_numbers.html", figs:3, desc:"Rectangular and polar forms, Euler's identity $e^{j\\theta} = \\cos\\theta + j\\sin\\theta$ and complex arithmetic."},
   {id:"1.6", title:"Review of Phasors", file:"topic1/phasors.html", figs:3, desc:"Time domain to phasor domain $v(t) = \\mathfrak{Re}\\{\\tilde{V} e^{j\\omega t}\\}$ and $\\partial/\\partial t \\rightarrow j\\omega$."}]},
 {id:"2", num:"02", title:"Vector Analysis", color:"indigo",
  blurb:"Coordinate systems, vector-calculus operators and the integral theorems.",
  goals:["Use Cartesian, cylindrical and spherical coordinates","Compute gradient, divergence, curl and Laplacian","Apply the divergence and Stokes theorems"],
  sections:[
   {id:"2.1", title:"Basic Laws of Vector Algebra", file:"topic2/3d_vector.html", figs:2, desc:"Vector addition, dot product $\\mathbf{A}\\cdot\\mathbf{B}$, cross product $\\mathbf{A}\\times\\mathbf{B}$ and triple products."},
   {id:"2.2", title:"Orthogonal Coordinate Systems", file:"topic2/coordinates_systems.html", figs:1, desc:"Cartesian $(x,y,z)$, cylindrical $(r,\\phi,z)$ and spherical $(R,\\theta,\\phi)$ coordinates and metric factors."},
   {id:"2.3", title:"Transformations between Systems", file:"topic2/3d_vector_CCS.html", figs:1, desc:"Transformation matrices for positions and vector components across the three coordinate systems."},
   {id:"2.4", title:"Gradient of a Scalar Field", file:"topic2/gradient_operator.html", figs:2, desc:"Direction of maximum rate of change $\\nabla V$ and the directional derivative."},
   {id:"2.5", title:"Divergence of a Vector Field", file:"topic2/divergence_operator.html", figs:2, desc:"Net outward flux per unit volume $\\nabla\\cdot\\mathbf{A}$ and the divergence theorem."},
   {id:"2.6", title:"Curl of a Vector Field", file:"topic2/curl_operator.html", figs:2, desc:"Circulation density $\\nabla\\times\\mathbf{A}$ and Stokes' theorem."},
   {id:"2.7", title:"Laplacian Operator", file:"topic2/laplacian_operator.html", figs:2, desc:"Second-order operator $\\nabla^2 V = \\nabla\\cdot(\\nabla V)$ for scalar and vector fields."},
   {id:"2.8", title:"Stokes' & Divergence Theorem", file:"topic2/stokes_and_divergence_theorem.html", figs:4, desc:"Integral theorems linking the differential operators to boundary and surface integrals."}]},
 {id:"3", num:"03", title:"Electrostatics", color:"purple",
  blurb:"Static electric fields, charge distributions, dielectrics and capacitance.",
  goals:["Find E from charges with Coulomb's and Gauss's laws","Use the potential V and boundary conditions","Compute capacitance, energy and image solutions"],
  sections:[
   {id:"3.1", title:"Maxwell's Electrostatic Equations", file:"topic3/maxwell_s_equations_electromagnetics.html", figs:6, desc:"The decoupled electrostatic pair $\\nabla\\cdot\\mathbf{D} = \\rho_v$ and $\\nabla\\times\\mathbf{E} = 0$."},
   {id:"3.2", title:"Charge & Current Distributions", file:"topic3/charge_and_current_distributions.html", figs:8, desc:"Volume, surface and line charge densities $\\rho_v, \\rho_s, \\rho_\\ell$ and current density $\\mathbf{J}$."},
   {id:"3.3", title:"Coulomb's Law", file:"topic3/coulomb_law.html", figs:6, desc:"Force between point charges $\\mathbf{F} = \\dfrac{q_1 q_2}{4\\pi\\varepsilon_0 R^2}\\boldsymbol{\\hat{R}}$ and the field $\\mathbf{E}$."},
   {id:"3.4", title:"Gauss's Law", file:"topic3/gauss_s_law.html", figs:7, desc:"$\\oint_S \\mathbf{D}\\cdot d\\mathbf{s} = Q$ applied to symmetric charge geometries."},
   {id:"3.5", title:"Electric Scalar Potential", file:"topic3/electric_scalar_potential.html", figs:5, desc:"$V = -\\int \\mathbf{E}\\cdot d\\boldsymbol{\\ell}$, $\\mathbf{E} = -\\nabla V$ and the Poisson and Laplace equations."},
   {id:"3.6", title:"Conductors", file:"topic3/conductors.html", figs:6, desc:"Ohm's law $\\mathbf{J} = \\sigma\\mathbf{E}$, zero interior field and equipotential surfaces."},
   {id:"3.7", title:"Dielectrics", file:"topic3/dielectrics.html", figs:5, desc:"Polarization $\\mathbf{P}$, $\\mathbf{D} = \\varepsilon_0\\mathbf{E} + \\mathbf{P}$, relative permittivity $\\varepsilon_r$ and breakdown."},
   {id:"3.8", title:"Electric Boundary Conditions", file:"topic3/electric_boundary_conditions.html", figs:8, desc:"$E_{1t} = E_{2t}$ and $D_{1n} - D_{2n} = \\rho_s$ at an interface."},
   {id:"3.9", title:"Capacitance", file:"topic3/capacitance.html", figs:5, desc:"$C = Q/V$ for parallel-plate, coaxial and spherical geometries."},
   {id:"3.10", title:"Electrostatic Potential Energy", file:"topic3/electrostatic_potential_energy.html", figs:6, desc:"Stored energy $W_e = \\tfrac{1}{2}\\int_V \\varepsilon E^2\\,dV = \\tfrac{1}{2}CV^2$."},
   {id:"3.11", title:"Image Method", file:"topic3/image_method.html", figs:2, desc:"Charge–ground-plane problems solved with mirror image charges."}]},
 {id:"4", num:"04", title:"Magnetostatics", color:"amber",
  blurb:"Steady magnetic fields, magnetic forces, vector potential and inductance.",
  goals:["Compute forces and torques on charges and currents","Find H with Biot–Savart and Ampère","Use A, material properties, inductance and energy"],
  sections:[
   {id:"4.1", title:"Magnetic Forces & Torques", file:"topic4/magnetic_forces_torques.html", figs:5, desc:"Lorentz force $\\mathbf{F} = q(\\mathbf{E} + \\mathbf{u}\\times\\mathbf{B})$ and torque $\\mathbf{T} = \\mathbf{m}\\times\\mathbf{B}$."},
   {id:"4.2", title:"The Biot–Savart Law", file:"topic4/biot_savart_law.html", figs:6, desc:"$d\\mathbf{H} = \\dfrac{I\\,d\\boldsymbol{\\ell}\\times\\boldsymbol{\\hat{R}}}{4\\pi R^2}$ for wires, loops and solenoids."},
   {id:"4.3", title:"Maxwell's Magnetostatic Equations", file:"topic4/maxwell_magnetostatic_equations.html", figs:7, desc:"Ampère's law $\\nabla\\times\\mathbf{H} = \\mathbf{J}$ and $\\nabla\\cdot\\mathbf{B} = 0$ (no monopoles)."},
   {id:"4.4", title:"Vector Magnetic Potential", file:"topic4/vector_magnetic_potential.html", figs:5, desc:"$\\mathbf{B} = \\nabla\\times\\mathbf{A}$ and magnetic flux $\\Phi = \\oint \\mathbf{A}\\cdot d\\boldsymbol{\\ell}$."},
   {id:"4.5", title:"Magnetic Material Properties", file:"topic4/magnetic_properties_of_materials.html", figs:4, desc:"Magnetization $\\mathbf{M}$, $\\mu_r$, dia-, para- and ferromagnetism and hysteresis."},
   {id:"4.6", title:"Magnetic Boundary Conditions", file:"topic4/magnetic_boundary_conditions.html", figs:2, desc:"$B_{1n} = B_{2n}$ and $\\boldsymbol{\\hat{n}}_2\\times(\\mathbf{H}_1 - \\mathbf{H}_2) = \\mathbf{J}_s$."},
   {id:"4.7", title:"Inductance", file:"topic4/inductance.html", figs:5, desc:"Self and mutual inductance $L = \\Lambda/I$ for solenoids, toroids and parallel lines."},
   {id:"4.8", title:"Magnetic Energy", file:"topic4/magnetic_energy.html", figs:3, desc:"Stored energy $W_m = \\tfrac{1}{2}\\int_V \\mu H^2\\,dV = \\tfrac{1}{2}LI^2$."}]},
 {id:"5", num:"05", title:"Maxwell's Equations for Time-Varying Fields", color:"rose",
  blurb:"Induction, displacement current, boundary conditions and electromagnetic potentials.",
  goals:["Apply Faraday's law to transformers, generators and moving conductors","Explain displacement current and charge continuity","Use retarded potentials and phasor Maxwell equations"],
  sections:[
   {id:"5.0", title:"Dynamic Fields Overview", file:"topic5/dynamic_fields_maxwell_equations.html", figs:2, desc:"The coupled time-varying Maxwell system and how it predicts electromagnetic waves."},
   {id:"5.1", title:"Faraday's Law", file:"topic5/faraday_law.html", figs:4, desc:"$V_{\\text{emf}} = -\\dfrac{d\\Phi}{dt}$ and Lenz's law for the direction of the induced current."},
   {id:"5.2", title:"Stationary Loop in Time-Varying Field", file:"topic5/stationary_loop.html", figs:3, desc:"Transformer emf $V_{\\text{emf}}^{\\text{tr}} = -\\int_S \\dfrac{\\partial\\mathbf{B}}{\\partial t}\\cdot d\\mathbf{s}$."},
   {id:"5.3", title:"The Ideal Transformer", file:"topic5/the_ideal_transformer.html", figs:3, desc:"$V_1/V_2 = N_1/N_2 = I_2/I_1$ and impedance transformation."},
   {id:"5.4", title:"Moving Conductor in Static Field", file:"topic5/moving_conductor_in_a_static_magnetic_field.html", figs:4, desc:"Motional emf $V_{\\text{emf}}^{\\text{m}} = \\oint(\\mathbf{u}\\times\\mathbf{B})\\cdot d\\boldsymbol{\\ell}$ on sliding bars and rails."},
   {id:"5.5", title:"The Electromagnetic Generator", file:"topic5/electromagnetic_generator.html", figs:2, desc:"A loop rotating in a uniform field gives $V_{\\text{emf}} = A\\omega B_0\\sin\\omega t$."},
   {id:"5.6", title:"Moving Conductor in Time-Varying Field", file:"topic5/moving_conductor_time-varying_magnetic_field.html", figs:2, desc:"Total emf $V_{\\text{emf}} = V_{\\text{emf}}^{\\text{tr}} + V_{\\text{emf}}^{\\text{m}}$."},
   {id:"5.7", title:"Displacement Current", file:"topic5/displacement_current_electromagnetics.html", figs:3, desc:"Maxwell's term $\\mathbf{J}_d = \\partial\\mathbf{D}/\\partial t$ through capacitor gaps and free space."},
   {id:"5.8", title:"Time-Varying Boundary Conditions", file:"topic5/boundary_conditions_for_electromagnetics.html", figs:2, desc:"The complete set of field boundary conditions at dynamic interfaces."},
   {id:"5.9", title:"Charge-Current Continuity Relation", file:"topic5/charge_current_continuity_relation.html", figs:2, desc:"Charge conservation $\\nabla\\cdot\\mathbf{J} = -\\partial\\rho_v/\\partial t$."},
   {id:"5.10", title:"Free-Charge Dissipation", file:"topic5/free_charge_dissipation_in_a_conductor.html", figs:3, desc:"Relaxation $\\rho_v(t) = \\rho_{vo}e^{-t/\\tau_r}$ with $\\tau_r = \\varepsilon/\\sigma$."},
   {id:"5.11", title:"Electromagnetic Potentials", file:"topic5/electromagnetic_potentials.html", figs:5, desc:"Retarded potentials $V$ and $\\mathbf{A}$, the Lorenz gauge and time-harmonic phasor solutions."}]}
];
const COLORS = {
  sky:{hex:"#0284c7", text:"text-sky-800", bg:"bg-sky-50", border:"border-sky-200", bar:"bg-sky-600", ring:"ring-sky-600", soft:"bg-sky-500/10"},
  indigo:{hex:"#4f46e5", text:"text-indigo-700", bg:"bg-indigo-50", border:"border-indigo-200", bar:"bg-indigo-600", ring:"ring-indigo-600", soft:"bg-indigo-500/10"},
  purple:{hex:"#9333ea", text:"text-purple-700", bg:"bg-purple-50", border:"border-purple-200", bar:"bg-purple-600", ring:"ring-purple-600", soft:"bg-purple-500/10"},
  amber:{hex:"#d97706", text:"text-amber-800", bg:"bg-amber-50", border:"border-amber-200", bar:"bg-amber-600", ring:"ring-amber-600", soft:"bg-amber-500/10"},
  rose:{hex:"#e11d48", text:"text-rose-700", bg:"bg-rose-50", border:"border-rose-200", bar:"bg-rose-600", ring:"ring-rose-600", soft:"bg-rose-500/10"}
};

/* ------------------------------------------------------------------
   Shared portal logic for welcome.html and portal/*.html
   (course data above, then state, navigation and shell messaging)
   ------------------------------------------------------------------ */
const PAGES = [
  {file: "welcome.html",          title: "Overview",           icon: "home"},
  {file: "portal/modules.html",   title: "All modules",        icon: "layout-grid"},
  {file: "portal/maxwell.html",   title: "Maxwell's equations", icon: "sigma"},
  {file: "portal/guide.html",     title: "Study & teaching",   icon: "graduation-cap"},
  {file: "portal/reference.html", title: "Quick reference",    icon: "book-marked"}
];
/* language: English data above; Vietnamese pages load portal.vi.js first (window.EM_VI) */
const LANG = /^vi/i.test(document.documentElement.getAttribute("lang") || "") ? "vi" : "en";
if (LANG === "vi" && window.EM_VI) {
  const V = window.EM_VI;
  COURSE.forEach(t => { Object.assign(t, V.topics[t.id] || {}); t.sections.forEach(s => Object.assign(s, V.sections[s.file] || {})); });
  PAGES.forEach(p => { if (V.pages[p.file]) p.title = V.pages[p.file]; });
}
const STORE_KEY = "em-course-state-v2", TOPIC_KEY = "em-portal-topic";
const ROOT = /\/portal\/[^\/]*$/.test(location.pathname.replace(/\\/g, "/")) ? "../" : "";
const HERE = ROOT ? "portal/" + decodeURIComponent(location.pathname.split("/").pop()) : "welcome.html";
const inShell = window.parent !== window;
const ALL = COURSE.flatMap(t => t.sections.map(s => ({...s, topic: t})));
const onState = [];

function href(file){ return ROOT + file; }
function loadState(){
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY) || "null"); } catch (e) {}
  if (!s) { s = {visited: {}, done: {}, notes: {}, last: null};
    try { const old = localStorage.getItem("em-course-last-page"); if (old) { s.last = old; s.page = old; } } catch (e) {} }
  s.visited = s.visited || {}; s.done = s.done || {}; s.notes = s.notes || {};
  return s;
}
function saveState(s){ try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) {} }
let state = loadState();
function findSection(file){ return ALL.find(s => s.file === file) || null; }
function stripTeX(s){ return s.replace(/\$[^$]*\$/g, "").replace(/\s+/g, " "); }
/* where to continue: the last module if it is not done yet, otherwise the one after it */
function nextSection(){
  const last = state.last && findSection(state.last);
  if (!last) return null;
  if (!state.done[last.file]) return last;
  const i = ALL.indexOf(last);
  return ALL.slice(i + 1).find(s => !state.done[s.file]) || ALL.find(s => !state.done[s.file]) || null;
}
function icons(){ if (window.lucide && lucide.createIcons) lucide.createIcons(); }
function typeset(el){ if (window.EM && EM.typeset) EM.typeset(el || document.body); }

/* links: inside the portal shell (index.html) ask the shell to open the page,
   so the menu, progress and address bar stay in sync; on their own they are normal links */
function bindNav(root){
  (root || document).querySelectorAll("a.nav").forEach(a => {
    if (a.dataset.file && !a.dataset.bound) {
      a.dataset.bound = 1;
      const t = a.dataset.topic;
      a.setAttribute("href", href(a.dataset.file) + (t ? "#topic=" + t : ""));
      a.addEventListener("click", e => {
        try { t ? localStorage.setItem(TOPIC_KEY, t) : localStorage.removeItem(TOPIC_KEY); } catch (_) {}
        if (!inShell || e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;
        e.preventDefault(); parent.postMessage({em: "open", file: a.dataset.file}, "*");
      });
    }
    a.classList.toggle("is-here", a.dataset.file === HERE && a.closest("#top-nav") !== null);
    if (a.closest("#top-nav")) a.toggleAttribute("aria-current", a.dataset.file === HERE);
  });
}
/* the topic a page was asked to show (modules page) */
function requestedTopic(){
  const m = location.hash.match(/topic=([0-9]+)/);
  let t = m ? m[1] : null;
  try { if (!t) t = localStorage.getItem(TOPIC_KEY); localStorage.removeItem(TOPIC_KEY); } catch (_) {}
  return COURSE.some(c => c.id === t) ? t : null;
}
function fireState(){ onState.forEach(f => { try { f(); } catch (e) { console.error(e); } }); }
function portalReady(){
  window.addEventListener("message", e => {
    const m = e.data || {};
    if (m.em === "state" && m.state) { state = m.state; fireState(); }
  });
  /* progress changed in another tab, or the page came back from the history cache */
  window.addEventListener("storage", e => { if (e.key === STORE_KEY) { state = loadState(); fireState(); } });
  window.addEventListener("pageshow", e => { if (e.persisted) { state = loadState(); fireState(); } });
  bindNav(document); icons();
  if (inShell) parent.postMessage({em: "hello"}, "*");
}
function topNav(){
  const el = document.getElementById("top-nav"); if (!el) return;
  el.innerHTML = PAGES.map(p => `<a href="${href(p.file)}" data-file="${p.file}" class="nav whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white border-slate-200 text-slate-700 hover:bg-slate-50"><i data-lucide="${p.icon}" class="w-4 h-4"></i>${p.title}</a>`).join("");
  langSwitch(el);
}
/* EN | VI switch: same page in the other language (the whole portal when inside index.html) */
function langUrl(lang){
  if (inShell) {
    const root = new URL(ROOT ? "../" : "./", location.href).href;     // .../en/ or .../vi/
    return (window.EM && EM.langUrl ? EM.langUrl(lang, root) : root) + "index.html#/" + HERE;
  }
  return window.EM && EM.langUrl ? EM.langUrl(lang) : null;
}
function langSwitch(parentEl){
  const box = document.createElement("span");
  box.className = "lang-switch"; box.setAttribute("role", "group"); box.setAttribute("aria-label", LANG === "vi" ? "Ngôn ngữ" : "Language");
  box.innerHTML = ["en", "vi"].map(l => l === LANG
    ? `<span class="on" aria-current="true" lang="${l}">${l.toUpperCase()}</span>`
    : `<a href="${langUrl(l) || "#"}" lang="${l}" target="${inShell ? "_top" : "_self"}" title="${l === "vi" ? "Xem bằng tiếng Việt" : "View in English"}">${l.toUpperCase()}</a>`).join("");
  box.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { try { localStorage.setItem("em-lang", a.getAttribute("lang")); } catch (_) {} }));
  parentEl.appendChild(box);
}
