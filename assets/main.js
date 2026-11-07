// Menú móvil
const nav = document.querySelector('.nav');
const toggle = document.getElementById('toggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#menu a').forEach(a =>
  a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', false); })
);

// Animaciones al hacer scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Año del pie
document.getElementById('year').textContent = new Date().getFullYear();

// Formulario -> abre el correo con el mensaje preparado
const EMAIL = 'pfjquique@gmail.com';
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  let ok = true;
  ['nombre', 'email', 'mensaje'].forEach(n => {
    const el = f[n];
    const valid = el.value.trim() && (n !== 'email' || /\S+@\S+\.\S+/.test(el.value));
    el.classList.toggle('invalid', !valid);
    if (!valid) ok = false;
  });
  if (!ok) return;
  const asunto = `Consulta web SAT27: ${f.tipo.value}`;
  const cuerpo = `Nombre: ${f.nombre.value}\nEmail: ${f.email.value}\nServicio: ${f.tipo.value}\n\n${f.mensaje.value}`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
});
