/* ===============================
   Project Portfolio — Shared Script
   =============================== */

// Lightbox logic
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const closeBtn = document.getElementById('close');
let currentIndex = 0;

function updateButtons() {
  if (!prevBtn || !nextBtn) return;
  // Hide prev if first, hide next if last
  prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
  nextBtn.style.display = currentIndex === galleryImages.length - 1 ? 'none' : 'flex';
}

function showImage(index) {
  if (index < 0 || index >= galleryImages.length) return;
  lightboxImg.src = galleryImages[index].src;
  currentIndex = index;
  lightbox.classList.add('show');
  updateButtons();
}

// Open image
galleryImages.forEach((img, i) => {
  img.addEventListener('click', () => showImage(i));
});

// Close lightbox
closeBtn?.addEventListener('click', () => lightbox.classList.remove('show'));
lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('show');
});

// Navigate images
nextBtn?.addEventListener('click', () => {
  if (currentIndex < galleryImages.length - 1) {
    showImage(currentIndex + 1);
  }
});
prevBtn?.addEventListener('click', () => {
  if (currentIndex > 0) {
    showImage(currentIndex - 1);
  }
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('show')) return;
  if (e.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) nextBtn.click();
  if (e.key === 'ArrowLeft' && currentIndex > 0) prevBtn.click();
  if (e.key === 'Escape') closeBtn.click();
});

// Scroll-to-top logic
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) toTop.classList.add('show');
  else toTop.classList.remove('show');
});
toTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
