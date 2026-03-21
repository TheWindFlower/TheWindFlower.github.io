const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");
let rx = 0,
    ry = 0,
    mx = 0,
    my = 0;

document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
});

(function lerpRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(lerpRing);
})();

/* ── MARQUEE ─────────────────────────────────────────── */
const items = ["Python", "C++", "Flutter", "HTML/CSS/JS", "Docker", "Linux"];
const track = document.getElementById("marquee");
if (track !== null) {
    const make = () =>
        items
            .map(
                (t) =>
                    `<span class="marquee-item">${t}</span><span class="marquee-sep">✦</span>`,
            )
            .join("");
    track.innerHTML = make() + make() + make(); // duplicate for seamless loop
}

/* ── 3D TILT ─────────────────────────────────────────── */
const TILT_MULT = 2;
document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${x * TILT_MULT}deg) rotateX(${
            -y * TILT_MULT
        }deg) scale(1.03)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transition =
            "transform .6s cubic-bezier(.23,1,.32,1), box-shadow .4s";
        card.style.transform = "";
        setTimeout(() => (card.style.transition = ""), 600);
    });
    card.addEventListener("mouseenter", () => {
        card.style.transition = "transform .12s ease, box-shadow .4s";
    });
});

/* ── TEXT SCRAMBLE ───────────────────────────────────── */
const CHARS = "!<>-_\\/[]{}—=+*^?#░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌";
const scrambleEl = document.getElementById("scramble-text");
const PHRASES = ["Portfolio"];
let phraseIdx = 0;
let scrambleTimer = null;

function scramble(el, newText) {
    clearInterval(scrambleTimer);
    const len = Math.max(el.innerText.length, newText.length);
    let iter = 0;
    scrambleTimer = setInterval(() => {
        el.innerText = newText
            .split("")
            .map((ch, i) => {
                if (i < iter) return newText[i];
                if (ch === " ") return " ";
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("");
        if (iter >= len + 4) clearInterval(scrambleTimer);
        iter += 0.6;
    }, 38);
}

scrambleEl.addEventListener("mouseenter", () => {
    phraseIdx = (phraseIdx + 1) % PHRASES.length;
    scramble(scrambleEl, PHRASES[phraseIdx]);
});

scramble(scrambleEl, PHRASES[0]); // init
