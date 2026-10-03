/* Electromagnetics course portal: course data, saved progress and navigation shared by the portal pages. */
const COURSE = [
 {id:"1", num:"01", title:"Introduction: Waves and Phasors", color:"sky",
  blurb:"Harmonic wave propagation, complex notation and phasor-domain analysis.",
  goals:["Read SI units and vector notation","Describe travelling and lossy waves","Work fluently with complex numbers and phasors"],
  sections:[
   {id:"1.1", title:"Dimensions, Units, and Notation", file:"topic1/dimensions_units_notation.html", desc:"SI base units, derived electromagnetic quantities ($V, A, \\Omega, F, H, T, Wb$) and vector notation conventions."},
   {id:"1.2", title:"The Nature of Electromagnetism", file:"topic1/nature_of_electromagnetism.html", desc:"The four fundamental forces, electric charge, the fields $\\mathbf{E}$ and $\\mathbf{B}$, and field–particle interaction."},
   {id:"1.3", title:"Travelling Waves", file:"topic1/traveling_waves.html", desc:"Sinusoidal waves $y(z,t) = A\\cos(\\omega t - \\beta z)$, phase velocity $u_p = \\omega/\\beta$ and wavelength $\\lambda$."},
   {id:"1.4", title:"The Electromagnetic Spectrum", file:"topic1/electromagnetic_spectrum.html", desc:"Bands from ELF/RF through microwave, infrared, visible light, X-rays and gamma rays ($c = f\\lambda$)."},
   {id:"1.5", title:"Review of Complex Numbers", file:"topic1/complex_numbers.html", desc:"Rectangular and polar forms, Euler's identity $e^{j\\theta} = \\cos\\theta + j\\sin\\theta$ and complex arithmetic."},
   {id:"1.6", title:"Review of Phasors", file:"topic1/phasors.html", desc:"Time domain to phasor domain $v(t) = \\mathfrak{Re}\\{\\tilde{V} e^{j\\omega t}\\}$ and $\\partial/\\partial t \\rightarrow j\\omega$."}]},
 {id:"2", num:"02", title:"Vector Analysis", color:"indigo",
  blurb:"Coordinate systems, vector-calculus operators and the integral theorems.",
  goals:["Use Cartesian, cylindrical and spherical coordinates","Compute gradient, divergence, curl and Laplacian","Apply the divergence and Stokes theorems"],
  sections:[
   {id:"2.1", title:"Basic Laws of Vector Algebra", file:"topic2/3d_vector.html", desc:"Vector addition, dot product $\\mathbf{A}\\cdot\\mathbf{B}$, cross product $\\mathbf{A}\\times\\mathbf{B}$ and triple products."},
   {id:"2.2", title:"Orthogonal Coordinate Systems", file:"topic2/coordinates_systems.html", desc:"Cartesian $(x,y,z)$, cylindrical $(r,\\phi,z)$ and spherical $(R,\\theta,\\phi)$ coordinates and metric factors."},
   {id:"2.3", title:"Transformations between Systems", file:"topic2/3d_vector_CCS.html", desc:"Transformation matrices for positions and vector components across the three coordinate systems."},
   {id:"2.4", title:"Gradient of a Scalar Field", file:"topic2/gradient_operator.html", desc:"Direction of maximum rate of change $\\nabla V$ and the directional derivative."},
   {id:"2.5", title:"Divergence of a Vector Field", file:"topic2/divergence_operator.html", desc:"Net outward flux per unit volume $\\nabla\\cdot\\mathbf{A}$ and the divergence theorem."},
   {id:"2.6", title:"Curl of a Vector Field", file:"topic2/curl_operator.html", desc:"Circulation density $\\nabla\\times\\mathbf{A}$ and Stokes' theorem."},
   {id:"2.7", title:"Laplacian Operator", file:"topic2/laplacian_operator.html", desc:"Second-order operator $\\nabla^2 V = \\nabla\\cdot(\\nabla V)$ for scalar and vector fields."},
   {id:"2.8", title:"Stokes' & Divergence Theorem", file:"topic2/stokes_and_divergence_theorem.html", desc:"Integral theorems linking the differential operators to boundary and surface integrals."}]},
 {id:"3", num:"03", title:"Electrostatics", color:"purple",
  blurb:"Static electric fields, charge distributions, dielectrics and capacitance.",
  goals:["Find E from charges with Coulomb's and Gauss's laws","Use the potential V and boundary conditions","Compute capacitance, energy and image solutions"],
  sections:[
   {id:"3.1", title:"Maxwell's Electrostatic Equations", file:"topic3/maxwell_s_equations_electromagnetics.html", desc:"The decoupled electrostatic pair $\\nabla\\cdot\\mathbf{D} = \\rho_v$ and $\\nabla\\times\\mathbf{E} = 0$."},
   {id:"3.2", title:"Charge & Current Distributions", file:"topic3/charge_and_current_distributions.html", desc:"Volume, surface and line charge densities $\\rho_v, \\rho_s, \\rho_\\ell$ and current density $\\mathbf{J}$."},
   {id:"3.3", title:"Coulomb's Law", file:"topic3/coulomb_law.html", desc:"Force between point charges $\\mathbf{F} = \\dfrac{q_1 q_2}{4\\pi\\varepsilon_0 R^2}\\boldsymbol{\\hat{R}}$ and the field $\\mathbf{E}$."},
   {id:"3.4", title:"Gauss's Law", file:"topic3/gauss_s_law.html", desc:"$\\oint_S \\mathbf{D}\\cdot d\\mathbf{s} = Q$ applied to symmetric charge geometries."},
   {id:"3.5", title:"Electric Scalar Potential", file:"topic3/electric_scalar_potential.html", desc:"$V = -\\int \\mathbf{E}\\cdot d\\boldsymbol{\\ell}$, $\\mathbf{E} = -\\nabla V$ and the Poisson and Laplace equations."},
   {id:"3.6", title:"Conductors", file:"topic3/conductors.html", desc:"Ohm's law $\\mathbf{J} = \\sigma\\mathbf{E}$, zero interior field and equipotential surfaces."},
   {id:"3.7", title:"Dielectrics", file:"topic3/dielectrics.html", desc:"Polarization $\\mathbf{P}$, $\\mathbf{D} = \\varepsilon_0\\mathbf{E} + \\mathbf{P}$, relative permittivity $\\varepsilon_r$ and breakdown."},
   {id:"3.8", title:"Electric Boundary Conditions", file:"topic3/electric_boundary_conditions.html", desc:"$E_{1t} = E_{2t}$ and $D_{1n} - D_{2n} = \\rho_s$ at an interface."},
   {id:"3.9", title:"Capacitance", file:"topic3/capacitance.html", desc:"$C = Q/V$ for parallel-plate, coaxial and spherical geometries."},
   {id:"3.10", title:"Electrostatic Potential Energy", file:"topic3/electrostatic_potential_energy.html", desc:"Stored energy $W_e = \\tfrac{1}{2}\\int_V \\varepsilon E^2\\,dV = \\tfrac{1}{2}CV^2$."},
   {id:"3.11", title:"Image Method", file:"topic3/image_method.html", desc:"Charge–ground-plane problems solved with mirror image charges."}]},
 {id:"4", num:"04", title:"Magnetostatics", color:"amber",
  blurb:"Steady magnetic fields, magnetic forces, vector potential and inductance.",
  goals:["Compute forces and torques on charges and currents","Find H with Biot–Savart and Ampère","Use A, material properties, inductance and energy"],
  sections:[
   {id:"4.1", title:"Magnetic Forces & Torques", file:"topic4/magnetic_forces_torques.html", desc:"Lorentz force $\\mathbf{F} = q(\\mathbf{E} + \\mathbf{u}\\times\\mathbf{B})$ and torque $\\mathbf{T} = \\mathbf{m}\\times\\mathbf{B}$."},
   {id:"4.2", title:"The Biot–Savart Law", file:"topic4/biot_savart_law.html", desc:"$d\\mathbf{H} = \\dfrac{I\\,d\\boldsymbol{\\ell}\\times\\boldsymbol{\\hat{R}}}{4\\pi R^2}$ for wires, loops and solenoids."},
   {id:"4.3", title:"Maxwell's Magnetostatic Equations", file:"topic4/maxwell_magnetostatic_equations.html", desc:"Ampère's law $\\nabla\\times\\mathbf{H} = \\mathbf{J}$ and $\\nabla\\cdot\\mathbf{B} = 0$ (no monopoles)."},
   {id:"4.4", title:"Vector Magnetic Potential", file:"topic4/vector_magnetic_potential.html", desc:"$\\mathbf{B} = \\nabla\\times\\mathbf{A}$ and magnetic flux $\\Phi = \\oint \\mathbf{A}\\cdot d\\boldsymbol{\\ell}$."},
   {id:"4.5", title:"Magnetic Material Properties", file:"topic4/magnetic_properties_of_materials.html", desc:"Magnetization $\\mathbf{M}$, $\\mu_r$, dia-, para- and ferromagnetism and hysteresis."},
   {id:"4.6", title:"Magnetic Boundary Conditions", file:"topic4/magnetic_boundary_conditions.html", desc:"$B_{1n} = B_{2n}$ and $\\boldsymbol{\\hat{n}}_2\\times(\\mathbf{H}_1 - \\mathbf{H}_2) = \\mathbf{J}_s$."},
   {id:"4.7", title:"Inductance", file:"topic4/inductance.html", desc:"Self and mutual inductance $L = \\Lambda/I$ for solenoids, toroids and parallel lines."},
   {id:"4.8", title:"Magnetic Energy", file:"topic4/magnetic_energy.html", desc:"Stored energy $W_m = \\tfrac{1}{2}\\int_V \\mu H^2\\,dV = \\tfrac{1}{2}LI^2$."}]},
 {id:"5", num:"05", title:"Maxwell's Equations for Time-Varying Fields", color:"rose",
  blurb:"Induction, displacement current, boundary conditions and electromagnetic potentials.",
  goals:["Apply Faraday's law to transformers, generators and moving conductors","Explain displacement current and charge continuity","Use retarded potentials and phasor Maxwell equations"],
  sections:[
   {id:"5.0", title:"Dynamic Fields Overview", file:"topic5/dynamic_fields_maxwell_equations.html", desc:"The coupled time-varying Maxwell system and how it predicts electromagnetic waves."},
   {id:"5.1", title:"Faraday's Law", file:"topic5/faraday_law.html", desc:"$V_{\\text{emf}} = -\\dfrac{d\\Phi}{dt}$ and Lenz's law for the direction of the induced current."},
   {id:"5.2", title:"Stationary Loop in Time-Varying Field", file:"topic5/stationary_loop.html", desc:"Transformer emf $V_{\\text{emf}}^{\\text{tr}} = -\\int_S \\dfrac{\\partial\\mathbf{B}}{\\partial t}\\cdot d\\mathbf{s}$."},
   {id:"5.3", title:"The Ideal Transformer", file:"topic5/the_ideal_transformer.html", desc:"$V_1/V_2 = N_1/N_2 = I_2/I_1$ and impedance transformation."},
   {id:"5.4", title:"Moving Conductor in Static Field", file:"topic5/moving_conductor_in_a_static_magnetic_field.html", desc:"Motional emf $V_{\\text{emf}}^{\\text{m}} = \\oint(\\mathbf{u}\\times\\mathbf{B})\\cdot d\\boldsymbol{\\ell}$ on sliding bars and rails."},
   {id:"5.5", title:"The Electromagnetic Generator", file:"topic5/electromagnetic_generator.html", desc:"A loop rotating in a uniform field gives $V_{\\text{emf}} = A\\omega B_0\\sin\\omega t$."},
   {id:"5.6", title:"Moving Conductor in Time-Varying Field", file:"topic5/moving_conductor_time-varying_magnetic_field.html", desc:"Total emf $V_{\\text{emf}} = V_{\\text{emf}}^{\\text{tr}} + V_{\\text{emf}}^{\\text{m}}$."},
   {id:"5.7", title:"Displacement Current", file:"topic5/displacement_current_electromagnetics.html", desc:"Maxwell's term $\\mathbf{J}_d = \\partial\\mathbf{D}/\\partial t$ through capacitor gaps and free space."},
   {id:"5.8", title:"Time-Varying Boundary Conditions", file:"topic5/boundary_conditions_for_electromagnetics.html", desc:"The complete set of field boundary conditions at dynamic interfaces."},
   {id:"5.9", title:"Charge-Current Continuity Relation", file:"topic5/charge_current_continuity_relation.html", desc:"Charge conservation $\\nabla\\cdot\\mathbf{J} = -\\partial\\rho_v/\\partial t$."},
   {id:"5.10", title:"Free-Charge Dissipation", file:"topic5/free_charge_dissipation_in_a_conductor.html", desc:"Relaxation $\\rho_v(t) = \\rho_{vo}e^{-t/\\tau_r}$ with $\\tau_r = \\varepsilon/\\sigma$."},
   {id:"5.11", title:"Electromagnetic Potentials", file:"topic5/electromagnetic_potentials.html", desc:"Retarded potentials $V$ and $\\mathbf{A}$, the Lorenz gauge and time-harmonic phasor solutions."}]}
];
/* per-module facts (visible interactive figures, quiz questions); counted from the pages */
const META = {"topic1/dimensions_units_notation.html":[1,5],"topic1/nature_of_electromagnetism.html":[4,5],"topic1/traveling_waves.html":[6,5],"topic1/electromagnetic_spectrum.html":[2,5],"topic1/complex_numbers.html":[3,5],"topic1/phasors.html":[3,5],"topic2/3d_vector.html":[2,5],"topic2/coordinates_systems.html":[1,5],"topic2/3d_vector_CCS.html":[1,5],"topic2/gradient_operator.html":[2,5],"topic2/divergence_operator.html":[2,5],"topic2/curl_operator.html":[2,5],"topic2/laplacian_operator.html":[2,5],"topic2/stokes_and_divergence_theorem.html":[4,5],"topic3/maxwell_s_equations_electromagnetics.html":[7,5],"topic3/charge_and_current_distributions.html":[8,5],"topic3/coulomb_law.html":[6,6],"topic3/gauss_s_law.html":[7,5],"topic3/electric_scalar_potential.html":[5,5],"topic3/conductors.html":[6,5],"topic3/dielectrics.html":[5,5],"topic3/electric_boundary_conditions.html":[8,6],"topic3/capacitance.html":[5,5],"topic3/electrostatic_potential_energy.html":[6,5],"topic3/image_method.html":[2,5],"topic4/magnetic_forces_torques.html":[5,5],"topic4/biot_savart_law.html":[6,5],"topic4/maxwell_magnetostatic_equations.html":[7,5],"topic4/vector_magnetic_potential.html":[5,5],"topic4/magnetic_properties_of_materials.html":[4,5],"topic4/magnetic_boundary_conditions.html":[2,5],"topic4/inductance.html":[5,5],"topic4/magnetic_energy.html":[3,5],"topic5/dynamic_fields_maxwell_equations.html":[2,5],"topic5/faraday_law.html":[4,5],"topic5/stationary_loop.html":[3,5],"topic5/the_ideal_transformer.html":[3,5],"topic5/moving_conductor_in_a_static_magnetic_field.html":[4,5],"topic5/electromagnetic_generator.html":[2,5],"topic5/moving_conductor_time-varying_magnetic_field.html":[2,5],"topic5/displacement_current_electromagnetics.html":[3,5],"topic5/boundary_conditions_for_electromagnetics.html":[2,5],"topic5/charge_current_continuity_relation.html":[2,5],"topic5/free_charge_dissipation_in_a_conductor.html":[3,5],"topic5/electromagnetic_potentials.html":[5,5]};
COURSE.forEach(t => t.sections.forEach(s => { const m = META[s.file] || [0, 0]; s.figs = m[0]; s.qs = m[1]; }));
const SHORT = {"1":"Waves & phasors","2":"Vector analysis","3":"Electrostatics","4":"Magnetostatics","5":"Time-varying fields"};
const COLORS = {
  sky:{hex:"#0284c7", text:"text-sky-800", bg:"bg-sky-50", border:"border-sky-200", bar:"bg-sky-600", ring:"ring-sky-600", soft:"bg-sky-500/10"},
  indigo:{hex:"#4f46e5", text:"text-indigo-700", bg:"bg-indigo-50", border:"border-indigo-200", bar:"bg-indigo-600", ring:"ring-indigo-600", soft:"bg-indigo-500/10"},
  purple:{hex:"#9333ea", text:"text-purple-700", bg:"bg-purple-50", border:"border-purple-200", bar:"bg-purple-600", ring:"ring-purple-600", soft:"bg-purple-500/10"},
  amber:{hex:"#d97706", text:"text-amber-800", bg:"bg-amber-50", border:"border-amber-200", bar:"bg-amber-600", ring:"ring-amber-600", soft:"bg-amber-500/10"},
  rose:{hex:"#e11d48", text:"text-rose-700", bg:"bg-rose-50", border:"border-rose-200", bar:"bg-rose-600", ring:"ring-rose-600", soft:"bg-rose-500/10"}
};
const STORE_KEY = "em-course-state-v2";
function loadState(){
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY) || "null"); } catch(e) {}
  if (!s) { s = {visited:{}, done:{}, notes:{}, last:null};
    try { const old = localStorage.getItem("em-course-last-page"); if (old) { s.last = old; s.page = old; } } catch(e) {} }
  s.visited = s.visited || {}; s.done = s.done || {}; s.notes = s.notes || {};
  return s;
}
function saveState(s){ try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch(e) {} }
const ALL = COURSE.flatMap(t => t.sections.map(s => ({...s, topic:t})));
function findSection(file){ return ALL.find(s => s.file === file) || null; }
function stripTeX(s){ return s.replace(/\$[^$]*\$/g, "").replace(/\s+/g, " "); }

const inShell = window.parent !== window;
let state = loadState();


/* ---------- shared portal helpers (welcome.html and portal/*.html) ---------- */
const ROOT = document.documentElement.dataset.root || '';          // '' on welcome.html, '../' on portal/*.html
const href = file => ROOT + file;
const PAGES = [
  {file:'portal/modules.html',   title:'Modules',            icon:'layout-grid'},
  {file:'portal/maxwell.html',   title:"Maxwell's equations", icon:'sigma'},
  {file:'portal/guide.html',     title:'Study & teaching',    icon:'graduation-cap'},
  {file:'portal/reference.html', title:'Reference',           icon:'book-marked'}
];
/* Inside the portal, links ask the shell to open the page, so the menu, progress and URL stay in sync */
function bindNav(root){
  (root || document).querySelectorAll('a.nav').forEach(a => { if (a._b) return; a._b = 1; a.addEventListener('click', e => {
    if (a.dataset.topic) { try { localStorage.setItem('em-portal-topic', a.dataset.topic); } catch(_) {} }
    if (!inShell || e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;
    e.preventDefault(); parent.postMessage({em:'open', file:a.dataset.file}, '*');
  }); });
}
function typeset(el){ if (window.EM) EM.typeset(el); }
function icons(){ if (window.lucide) lucide.createIcons(); }
/* The shell sends the latest progress whenever a page loads or something changes */
const onState = [];
window.addEventListener('message', e => { const m = e.data || {}; if (m.em === 'state' && m.state) { state = m.state; onState.forEach(f => f()); } });
function portalReady(){ bindNav(document); icons(); if (inShell) parent.postMessage({em:'hello'}, '*'); }
function nextSection(){
  const last = state.last && findSection(state.last);
  return last ? (state.done[last.file] ? ALL[Math.min(ALL.indexOf(last) + 1, ALL.length - 1)] : last) : null;
}
/* Sub-page header: back to overview + tabs */
function portalHeader(current){
  const el = document.getElementById('portal-header'); if (!el) return;
  el.innerHTML = `<div class="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
    <a href="${href('welcome.html')}" data-file="welcome.html" class="nav flex items-center gap-3 group">
      <span class="p-2 bg-gradient-to-br from-sky-500 via-indigo-500 to-rose-500 rounded-xl text-white shadow-sm"><i data-lucide="radio" class="w-5 h-5"></i></span>
      <span><span class="block text-base font-bold text-slate-900 group-hover:text-sky-800">ECE Electromagnetics</span><span class="block text-sm text-slate-600">← Overview</span></span>
    </a>
    <nav aria-label="Portal pages" class="flex gap-1.5 text-sm font-medium overflow-x-auto max-w-full">
      ${PAGES.map(p => `<a href="${href(p.file)}" data-file="${p.file}" class="nav whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${p.file === current ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}" ${p.file === current ? 'aria-current="page"' : ''}><i data-lucide="${p.icon}" class="w-4 h-4"></i>${p.title}</a>`).join('')}
    </nav></div>`;
}
