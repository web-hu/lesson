// 首页轮播控制：支持自动播放、手动切换与键盘操作
const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dot"));
const previousButton = document.querySelector(".carousel-arrow.previous");
const nextButton = document.querySelector(".carousel-arrow.next");
const hero = document.querySelector(".hero");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeIndex = 0;
let autoplayTimer;

function showSlide(index) {
  activeIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeIndex;
    dot.classList.toggle("is-active", isActive);
    if (isActive) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });
}

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
}

function startAutoplay() {
  stopAutoplay();
  if (!prefersReducedMotion.matches && !document.hidden) {
    autoplayTimer = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, 6000);
  }
}

previousButton.addEventListener("click", () => {
  showSlide(activeIndex - 1);
  startAutoplay();
});

nextButton.addEventListener("click", () => {
  showSlide(activeIndex + 1);
  startAutoplay();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startAutoplay();
  });
});

hero.addEventListener("mouseenter", stopAutoplay);
hero.addEventListener("mouseleave", startAutoplay);
hero.addEventListener("focusin", stopAutoplay);
hero.addEventListener("focusout", startAutoplay);
document.addEventListener("visibilitychange", startAutoplay);

startAutoplay();
