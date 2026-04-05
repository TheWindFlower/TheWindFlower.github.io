document.addEventListener("DOMContentLoaded", () => {

  // ── Card these ──────────────────────────────
  const CARD_WIDTH  = 320;  // px, card width
  const CARD_HEIGHT = 420;  // px, card height
  const GAP         = 20;   // px, spacing between cards
  // ─────────────────────────────────────────────

  const containers = document.querySelectorAll('.crsl-img-container');
  const N      = containers.length;
  const angle  = 360 / N;
  const radius = Math.round((CARD_WIDTH / 2 + GAP) / Math.tan(Math.PI / N));

  // Apply card size to the a3d wrapper
  const a3d = document.querySelector('.crsl-a3d');
  gsap.set(a3d, {
    width:  CARD_WIDTH,
    height: CARD_HEIGHT,
    z:      -radius
  });

  // Apply card size to each container
  containers.forEach((container, i) => {
    gsap.set(container, {
      width:  CARD_WIDTH,
      height: CARD_HEIGHT,
      rotationY: i * angle
    });
    const img = container.querySelector('.crsl-card');
    gsap.set(img, { z: -radius });
  });

  gsap.to('.crsl-a3d', {
    rotationY: -360,
    duration:  35,
    ease:      "none",
    repeat:    -1
  });

});
