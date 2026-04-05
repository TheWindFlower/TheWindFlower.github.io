{
    document.addEventListener("DOMContentLoaded", () => {
        const containers = document.querySelectorAll(".crsl-img-container");
        const N = containers.length;
        const angle = 360 / N;
        const cardWidth = 320;
        const gap = 20;
        const radius = Math.round(
            (cardWidth / 2 + gap) / Math.tan(Math.PI / N),
        );

        gsap.set(".crsl-a3d", { z: -400 });

        containers.forEach((container, i) => {
            gsap.set(container, { rotationY: i * angle });
            const img = container.querySelector(".crsl-card");
            gsap.set(img, { z: -radius });
        });

        gsap.to(".crsl-a3d", {
            rotationY: -360,
            duration: 35,
            ease: "none",
            repeat: -1,
        });
    });
}
