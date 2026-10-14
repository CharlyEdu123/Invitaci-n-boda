// 1. Audio Synthesis & Playback Simulation
let audioCtx = null;
let isPlaying = false;
let synthInterval = null;

const musicBtn = document.getElementById('musicToggleBtn');
const musicIcon = document.getElementById('musicIcon');
const musicLabel = document.getElementById('musicLabel');
const soundWave = document.getElementById('soundWaveAnim');

function playTone(freq, duration) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio policy fallback
  }
}

function toggleMusic() {
  if (!isPlaying) {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    isPlaying = true;
    musicIcon.textContent = 'pause';
    musicLabel.textContent = 'Sonando';
    soundWave.classList.remove('hidden');
    soundWave.classList.add('flex');
    musicBtn.classList.add('bg-secondary-fixed/30');

    const melody = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63];
    let noteIndex = 0;
    synthInterval = setInterval(() => {
      playTone(melody[noteIndex % melody.length], 0.8);
      noteIndex++;
    }, 900);
    showToast("Reproduciendo melodía romántica 🎵");
  } else {
    isPlaying = false;
    clearInterval(synthInterval);
    musicIcon.textContent = 'music_note';
    musicLabel.textContent = 'Música';
    soundWave.classList.remove('flex');
    soundWave.classList.add('hidden');
    musicBtn.classList.remove('bg-secondary-fixed/30');
    showToast("Música en pausa");
  }
}
if (musicBtn) {
  musicBtn.addEventListener('click', toggleMusic);
}

// 2. Real-time Countdown Timer (Target: Oct 18, 2025 16:30:00 - Ajusta la fecha si lo necesitas)
const weddingDate = new Date('2025-10-18T16:30:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl) return;

  if (distance < 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = days < 10 ? '0' + days : days;
  hoursEl.textContent = hours < 10 ? '0' + hours : hours;
  minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
  secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 3. Toast Function
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;
  
  toastMsg.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 3000);
}

// 4. Copiar CLABE al portapapeles
function copyClabe() {
  const clabeElem = document.getElementById('clabeNumber');
  if (!clabeElem) return;
  const clabe = clabeElem.innerText.trim();
  
  navigator.clipboard.writeText(clabe).then(() => {
    showToast("¡CLABE copiada con éxito!");
  }).catch(() => {
    showToast("CLABE copiada");
  });
}

// 5. Itinerary Modal Controller
function openItineraryModal() {
  const modal = document.getElementById('itineraryModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeItineraryModal() {
  const modal = document.getElementById('itineraryModal');
  if (!modal) return;
  modal.classList.remove('flex');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// 6. Lightbox Modal Gallery
function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!modal || !img) return;
  
  img.src = src;
  if (cap) cap.textContent = caption;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.remove('flex');
  modal.classList.add('hidden');
}

// Manejo del formulario RSVP enviado a WhatsApp
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // 1. CONFIGURA TU NÚMERO DE TELÉFONO AQUÍ (con código de país, ej. 52 para México)
  const numeroTelefono = "523220000000"; // Cambia este número por el tuyo

  // 2. Obtener los valores del formulario
  const nombre = document.getElementById('nombre').value;
  const asistencia = document.getElementById('asistencia').value;
  const pases = document.getElementById('pases').value;
  const mensaje = document.getElementById('mensaje').value;

  // 3. Crear el mensaje con formato bonito para WhatsApp
  let textoMensaje = `*¡Hola! Confirmación de asistencia a la boda* 💍\n\n`;
  textoMensaje += `*Nombre:* ${nombre}\n`;
  textoMensaje += `*Asistencia:* ${asistencia}\n`;
  textoMensaje += `*Número de asistentes:* ${pases}\n`;
  
  if (mensaje.trim() !== "") {
    textoMensaje += `*Notas/Mensaje:* ${mensaje}\n`;
  }

  // 4. Codificar el texto para la URL de WhatsApp
  const mensajeEncoded = encodeURIComponent(textoMensaje);

  // 5. Crear el enlace directo a WhatsApp
  const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeEncoded}`;

  // 6. Abrir en una pestaña nueva
  window.open(urlWhatsApp, '_blank');
});

// 8. Recomendador de Música
function handleSongSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('songInput');
  const feedback = document.getElementById('songFeedback');
  if (!input) return;
  
  if (input.value.trim() !== '') {
    if (feedback) feedback.classList.remove('hidden');
    showToast("¡Canción agregada a la lista!");
    input.value = '';
    if (feedback) setTimeout(() => feedback.classList.add('hidden'), 4000);
  }
}
// Carrusel automático para la galería
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach(container => {
    const images = container.querySelectorAll(".carousel-img");
    if (images.length <= 1) return;

    let currentIndex = 0;
    const intervalTime = parseInt(container.getAttribute("data-interval")) || 4000;

    setInterval(() => {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    }, intervalTime);
  });
});