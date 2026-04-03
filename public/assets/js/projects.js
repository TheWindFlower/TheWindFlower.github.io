{
    const sections = document.querySelectorAll(".project-section");
    const dots = document.querySelectorAll(".progress-dot");
    let isScrolling = false;

    const header = document.querySelector("header");
    header.style.display = "none";

    const footer = document.querySelector("footer");
    footer.style.display = "none";

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const idx = parseInt(entry.target.dataset.index);
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    dots.forEach((d) => d.classList.remove("active"));
                    dots[idx].classList.add("active");

                    // Show footer on last section, hide on all others
                    footer.style.display =
                        idx === sections.length - 1 ? "block" : "none";
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        { threshold: 0.5 },
    );
    sections.forEach((s) => observer.observe(s));

    window.scrollTo({ top: sections[0].offsetTop, behavior: "instant" });

    // Click a dot to jump to its section
    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const idx = parseInt(dot.dataset.index);
            sections[idx].scrollIntoView({ behavior: "smooth" });
        });
    });

    // Snap scroll — one wheel tick = one section
    window.addEventListener(
        "wheel",
        (e) => {
            e.preventDefault();

            if (isScrolling) return;
            isScrolling = true;

            const current = [...sections].findIndex((s) =>
                s.classList.contains("is-visible"),
            );
            const next =
                e.deltaY > 0
                    ? Math.min(current + 1, sections.length - 1)
                    : Math.max(current - 1, 0);

            sections[next].scrollIntoView({ behavior: "smooth" });

            setTimeout(() => {
                isScrolling = false;
            }, 800);
        },
        { passive: false },
    );

    // Keyboard arrow navigation
    window.addEventListener("keydown", (e) => {
        if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
        e.preventDefault();

        if (isScrolling) return;
        isScrolling = true;

        const current = [...sections].findIndex((s) =>
            s.classList.contains("is-visible"),
        );
        const next =
            e.key === "ArrowDown"
                ? Math.min(current + 1, sections.length - 1)
                : Math.max(current - 1, 0);

        sections[next].scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    });
}
