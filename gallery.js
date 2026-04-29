// All photos in chronological order. To re-order, just shuffle this array.
const PHOTOS = [
  "找到一些舊照_1.webp",
  "找到一些舊照_2.webp",
  "找到一些舊照_3.webp",
  "找到一些舊照_4.webp",
  "20141009_1.webp",
  "20170809_1.webp",
  "20170809_2.webp",
  "20171008竹東_高山慕情_1.webp",
  "20171008竹東_高山慕情_2.webp",
  "20181209十二月聯合慶生_1.webp",
  "2019暑期活動_1.webp",
  "2019916_1.webp",
  "20200109_一月生日_1.webp",
  "20200426天佑慶生會_1.webp",
  "20200426天佑慶生會_2.webp",
  "20201213_宮川_聯合慶生_1.webp",
  "20201213_宮川_聯合慶生_2.webp",
  "20201213_宮川_聯合慶生_3.webp",
  "20201213_宮川_聯合慶生_4.webp",
  "2021125_1.webp",
  "2021827_1.webp",
  "2021827_2.webp",
  "2021827_3.webp",
  "雲林20220903_1.webp",
  "雲林20220903_2.webp",
  "雲林20220903_3.webp",
  "20221211聯合慶生_1.webp",
  "20221211聯合慶生_2.webp",
  "20230313_1.webp",
  "20230313_2.webp",
  "20230409天佑入伍+慶生_1.webp",
  "2023821_-22_台中市_谷關_1.webp",
  "2023821_-22_台中市_谷關_2.webp",
  "2023821_-22_台中市_谷關_3.webp",
  "2023821_-22_台中市_谷關_4.webp",
  "2023821_-22_台中市_谷關_5.webp",
  "2023821_-22_台中市_谷關_6.webp",
  "2023821_-22_台中市_谷關_7.webp",
  "2023821_-22_台中市_谷關_8.webp",
  "2023821_-22_台中市_谷關_9.webp",
  "20231217聯合慶生滎陽食堂_1.webp",
  "IMG_7723.webp",
  "IMG_7736.webp",
  "IMG_7743.webp",
  "IMG_7840.webp",
  "IMG_7858.webp",
  "IMG_7865.webp",
  "IMG_7878.webp",
  "IMG_7944.webp",
  "IMG_7995.webp",
  "IMG_8028.webp",
  "20240609開南_淡江畢業典禮_1.webp",
  "20240609開南_淡江畢業典禮_2.webp",
  "20240609開南_淡江畢業典禮_3.webp",
  "20240609開南_淡江畢業典禮_4.webp",
  "20240609開南_淡江畢業典禮_5.webp",
  "20241215聯合慶生ATT瀧厚_1.webp",
  "20241215聯合慶生ATT瀧厚_2.webp",
  "20241215聯合慶生ATT瀧厚_3.webp",
  "20241215聯合慶生ATT瀧厚_4.webp",
  "20241215聯合慶生ATT瀧厚_5.webp",
  "20241215聯合慶生ATT瀧厚_6.webp",
  "2025128除夕_1.webp",
  "20251227聯合慶生_1.webp",
  "阿嬤自摸🀄️_1.webp",
  "IMG_6363.webp",
  "IMG_20160926_195427.webp",
  "IMG_20160926_195733.webp",
  "IMG_20170326_202805.webp",
  "IMG_20180606_095353.webp",
  "IMG_20180606_154646.webp",
  "IMG_20190325_145815.webp",
  "327068.webp",
  "327069.webp",
  "327147.webp",
  "327217.webp",
  "327557.webp",
  "327558.webp",
  "327559.webp",
  "327561.webp",
  "327562.webp",
  "327563.webp",
  "327564.webp",
  "S__2293810_0.webp",
  "S__2293811_0.webp",
  "S__2293812_0.webp",
  "S__2293813_0.webp",
  "S__2293814_0.webp",
  "S__2293818_0.webp",
  "S__2293819_0.webp",
  "S__2293820_0.webp",
  "S__2375878.webp",
  "S__2375949.webp",
];

const PIC_PATH = "pic/web/";
const CAROUSEL_INTERVAL = 4500; // ms
const CAROUSEL_PRELOAD_RADIUS = 1; // load current ± N neighbors

const pathOf = (name) => PIC_PATH + name;

document.addEventListener("DOMContentLoaded", () => {
  const totalEl = document.getElementById("photo-count");
  if (totalEl) totalEl.textContent = PHOTOS.length;

  initCarousel();
  initGrid();
  initLightbox();
});

/* ---------------- Carousel ---------------- */
function initCarousel() {
  const carousel = document.getElementById("carousel");
  const counter = document.getElementById("carousel-counter");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  const total = PHOTOS.length;
  const slides = [];
  const imgs = [];

  // Build empty slides (no src yet)
  PHOTOS.forEach((name, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide" + (i === 0 ? " active" : "");
    const img = document.createElement("img");
    img.alt = "";
    img.decoding = "async";
    img.dataset.src = pathOf(name);
    slide.appendChild(img);
    slide.addEventListener("click", () => window.openLightbox(i));
    carousel.insertBefore(slide, prevBtn);
    slides.push(slide);
    imgs.push(img);
  });

  function ensureLoaded(idx) {
    const img = imgs[idx];
    if (img && !img.src && img.dataset.src) {
      img.src = img.dataset.src;
    }
  }

  function preloadAround(idx) {
    for (let d = -CAROUSEL_PRELOAD_RADIUS; d <= CAROUSEL_PRELOAD_RADIUS; d++) {
      ensureLoaded((idx + d + total) % total);
    }
  }

  let cur = 0;

  function show(idx) {
    slides[cur].classList.remove("active");
    cur = (idx + total) % total;
    slides[cur].classList.add("active");
    counter.textContent = `${cur + 1} / ${total}`;
    preloadAround(cur);
  }

  preloadAround(0);
  counter.textContent = `1 / ${total}`;

  let timer;
  function start() { timer = setInterval(() => show(cur + 1), CAROUSEL_INTERVAL); }
  function stop() { clearInterval(timer); }
  function restart() { stop(); start(); }

  prevBtn.addEventListener("click", () => { show(cur - 1); restart(); });
  nextBtn.addEventListener("click", () => { show(cur + 1); restart(); });
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);

  let touchX = 0;
  carousel.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; stop(); }, { passive: true });
  carousel.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) { dx > 0 ? show(cur - 1) : show(cur + 1); }
    start();
  });

  start();
}

/* ---------------- Flat grid (progressive load via IntersectionObserver) ---------------- */
function initGrid() {
  const grid = document.getElementById("gallery-grid");
  const supportsIO = "IntersectionObserver" in window;

  const items = PHOTOS.map((name, i) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    const img = document.createElement("img");
    img.alt = name;
    img.decoding = "async";
    img.loading = "lazy";
    img.dataset.src = pathOf(name);
    img.addEventListener("load", () => item.classList.add("loaded"));
    item.appendChild(img);
    item.addEventListener("click", () => window.openLightbox(i));
    grid.appendChild(item);
    return img;
  });

  if (!supportsIO) {
    // Fallback: just set all srcs (browser native lazy will still defer offscreen)
    items.forEach((img) => { img.src = img.dataset.src; });
    return;
  }

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      }
      observer.unobserve(img);
    });
  }, { rootMargin: "300px 0px", threshold: 0.01 });

  items.forEach((img) => io.observe(img));
}

/* ---------------- Lightbox ---------------- */
function initLightbox() {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCounter = document.getElementById("lightbox-counter");
  let current = 0;

  function update() {
    lbImg.src = pathOf(PHOTOS[current]);
    lbCounter.textContent = `${current + 1} / ${PHOTOS.length}`;
  }

  function open(idx) {
    current = idx;
    update();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  function prev() { current = (current - 1 + PHOTOS.length) % PHOTOS.length; update(); }
  function next() { current = (current + 1) % PHOTOS.length; update(); }

  document.getElementById("lightbox-close").addEventListener("click", close);
  document.getElementById("lightbox-prev").addEventListener("click", (e) => { e.stopPropagation(); prev(); });
  document.getElementById("lightbox-next").addEventListener("click", (e) => { e.stopPropagation(); next(); });
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  let touchX = 0;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) { dx > 0 ? prev() : next(); }
  });

  // expose
  window.openLightbox = open;
}
