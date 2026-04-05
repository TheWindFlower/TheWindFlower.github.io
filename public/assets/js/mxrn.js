(() => {
  const canvas       = document.getElementById("mxrn-canvas");
  const ctx          = canvas.getContext("2d");
  const indicatorsEl = document.getElementById("mxrn-indicators");

  const images = [
    { src: "https://images.unsplash.com/photo-1540968221243-29f5d70540bf?w=600&fit=crop", alt: "" },
    { src: "https://images.unsplash.com/photo-1596135187959-562c650d98bc?w=600&fit=crop", alt: "" },
    { src: "https://images.unsplash.com/photo-1628944682084-831f35256163?w=600&fit=crop", alt: "" },
    { src: "https://images.unsplash.com/photo-1590013330451-3946e83e0392?w=600&fit=crop", alt: "" },
    { src: "https://images.unsplash.com/photo-1590421959604-741d0eec0a2e?w=600&fit=crop", alt: "" },
    { src: "https://images.unsplash.com/photo-1572613000712-eadc57acbecd?w=600&fit=crop", alt: "" },
  ];

  let currentIndex = 0;
  let isTransitioning = false;
  let animationFrame = null;
  const loadedImages = [];

  const MATRIX_CHARS = "天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]|/\\=+*@#$%";
  const CHAR_SIZE = 14;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    if (!isTransitioning && loadedImages[currentIndex]) {
      drawImageCover(loadedImages[currentIndex]);
    }
  }

  function drawImageCover(img, targetCtx, targetCanvas) {
    const c = targetCtx || ctx;
    const cvs = targetCanvas || canvas;
    const cw = cvs.width / devicePixelRatio;
    const ch = cvs.height / devicePixelRatio;
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    const imgRatio = imgW / imgH;
    const canvasRatio = cw / ch;
    let sx, sy, sw, sh;
    if (imgRatio > canvasRatio) {
      sh = imgH; sw = sh * canvasRatio; sx = (imgW - sw) / 2; sy = 0;
    } else {
      sw = imgW; sh = sw / canvasRatio; sx = 0; sy = (imgH - sh) / 2;
    }
    c.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }

  function drawCoverRaw(img, targetCtx, w, h) {
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    const imgRatio = imgW / imgH;
    const canvasRatio = w / h;
    let sx, sy, sw, sh;
    if (imgRatio > canvasRatio) {
      sh = imgH; sw = sh * canvasRatio; sx = (imgW - sw) / 2; sy = 0;
    } else {
      sw = imgW; sh = sw / canvasRatio; sx = 0; sy = (imgH - sh) / 2;
    }
    targetCtx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  }

  function matrixTransition(fromImg, toImg, callback) {
    const cw = canvas.width / devicePixelRatio;
    const ch = canvas.height / devicePixelRatio;
    const pw = Math.floor(cw);
    const ph = Math.floor(ch);
    const cols = Math.ceil(pw / CHAR_SIZE);
    const rows = Math.ceil(ph / CHAR_SIZE);

    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = pw; sampleCanvas.height = ph;
    const sampleCtx = sampleCanvas.getContext("2d");
    drawCoverRaw(toImg, sampleCtx, pw, ph);
    const sampleData = sampleCtx.getImageData(0, 0, pw, ph);

    const fromCanvas = document.createElement("canvas");
    fromCanvas.width = canvas.width; fromCanvas.height = canvas.height;
    const fromCtx = fromCanvas.getContext("2d");
    fromCtx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    drawImageCover(fromImg, fromCtx, fromCanvas);

    const toCanvas = document.createElement("canvas");
    toCanvas.width = canvas.width; toCanvas.height = canvas.height;
    const toCtx = toCanvas.getContext("2d");
    toCtx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    drawImageCover(toImg, toCtx, toCanvas);

    const columns = [];
    for (let col = 0; col < cols; col++) {
      const trailLen = 15 + Math.floor(Math.random() * 5);
      columns.push({
        head: -Math.floor(Math.random() * rows * 1.5),
        speed: 0.3 + Math.random() * 0.5,
        trailLength: trailLen,
        chars: [],
        revealed: new Array(rows).fill(false),
      });
      for (let row = 0; row < rows; row++) {
        columns[col].chars.push(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]);
      }
    }

    const duration = 5000;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      ctx.clearRect(0, 0, cw, ch);

      if (progress < 0.5) {
        ctx.globalAlpha = 1 - progress * 2;
        ctx.drawImage(fromCanvas, 0, 0, cw, ch);
        ctx.globalAlpha = 1;
      }

      for (let col = 0; col < cols; col++) {
        const column = columns[col];
        for (let row = 0; row < rows; row++) {
          if (column.revealed[row]) {
            const x = col * CHAR_SIZE;
            const y = row * CHAR_SIZE;
            ctx.drawImage(toCanvas,
              x * devicePixelRatio, y * devicePixelRatio,
              CHAR_SIZE * devicePixelRatio, CHAR_SIZE * devicePixelRatio,
              x, y, CHAR_SIZE, CHAR_SIZE
            );
          }
        }
      }

      ctx.font = `${CHAR_SIZE}px monospace`;
      ctx.textBaseline = "top";

      for (let col = 0; col < cols; col++) {
        const column = columns[col];
        column.head += column.speed;
        const headRow = Math.floor(column.head);
        const trailLength = column.trailLength;

        for (let i = 0; i < trailLength; i++) {
          const row = headRow - i;
          if (row < 0 || row >= rows) continue;
          const x = col * CHAR_SIZE;
          const y = row * CHAR_SIZE;
          if (Math.random() < 0.05) {
            column.chars[row] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          }
          const brightness = i === 0 ? 1.0 : Math.max(0, 1 - i / trailLength);
          if (i === 0) {
            ctx.fillStyle = `rgba(200, 255, 200, ${brightness})`;
          } else if (i < 3) {
            ctx.fillStyle = `rgba(0, 255, 70, ${brightness * 0.9})`;
          } else {
            const sx = Math.min(Math.floor(x + CHAR_SIZE / 2), pw - 1);
            const sy = Math.min(Math.floor(y + CHAR_SIZE / 2), ph - 1);
            const idx = (sy * pw + sx) * 4;
            const r = sampleData.data[idx] || 0;
            const g = sampleData.data[idx + 1] || 0;
            const b = sampleData.data[idx + 2] || 0;
            const mix = Math.min(1, i / trailLength + 0.3);
            ctx.fillStyle = `rgba(${Math.floor(r*(1-mix))}, ${Math.floor(g*(1-mix)+255*mix)}, ${Math.floor(b*(1-mix)+70*mix)}, ${brightness * 0.7})`;
          }
          ctx.fillText(column.chars[row], x, y);
        }

        const revealRow = headRow - trailLength - 3;
        if (revealRow >= 0 && revealRow < rows) column.revealed[revealRow] = true;
      }

      let allRevealed = true;
      if (progress > 0.7) {
        outer:
        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            if (!columns[col].revealed[row]) { allRevealed = false; break outer; }
          }
        }
      } else {
        allRevealed = false;
      }

      if (progress < 1 && !allRevealed) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, cw, ch);
        drawImageCover(toImg);
        callback();
      }
    }

    animationFrame = requestAnimationFrame(animate);
  }

  function goTo(targetIndex) {
    if (isTransitioning || targetIndex === currentIndex) return;
    isTransitioning = true;
    const dots = indicatorsEl.querySelectorAll(".mxrn-indicator");
    dots[currentIndex].classList.remove("active");
    dots[targetIndex].classList.add("active");
    matrixTransition(loadedImages[currentIndex], loadedImages[targetIndex], () => {
      currentIndex = targetIndex;
      isTransitioning = false;
    });
  }

  function next() { goTo((currentIndex + 1) % images.length); }
  function prev() { goTo((currentIndex - 1 + images.length) % images.length); }


  function preloadImages() {
    let loaded = 0;
    return new Promise((resolve) => {
      images.forEach((imgData, index) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => { loadedImages[index] = img; loaded++; if (loaded === images.length) resolve(); };
        img.onerror = () => {
          const placeholder = document.createElement("canvas");
          placeholder.width = 1920; placeholder.height = 1080;
          const pCtx = placeholder.getContext("2d");
          const gradient = pCtx.createLinearGradient(0, 0, 1920, 1080);
          gradient.addColorStop(0, `hsl(${120 + index * 15}, 60%, 15%)`);
          gradient.addColorStop(1, `hsl(${120 + index * 15}, 60%, 8%)`);
          pCtx.fillStyle = gradient;
          pCtx.fillRect(0, 0, 1920, 1080);
          pCtx.fillStyle = "#0f0";
          pCtx.font = "48px monospace";
          pCtx.textAlign = "center";
          pCtx.fillText(imgData.alt, 960, 540);
          loadedImages[index] = placeholder;
          loaded++;
          if (loaded === images.length) resolve();
        };
        img.src = imgData.src;
      });
    });
  }

  async function init() {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = `mxrn-indicator${index === 0 ? " active" : ""}`;
      dot.addEventListener("click", () => goTo(index));
      indicatorsEl.appendChild(dot);
    });
    await preloadImages();
    drawImageCover(loadedImages[0]);
  }

  document.getElementById("mxrn-prevBtn").addEventListener("click", () => { prev();});
  document.getElementById("mxrn-nextBtn").addEventListener("click", () => { next();});
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  { prev(); }
    if (e.key === "ArrowRight") { next(); }
  });


  init();
})();
