{
    const track = document.getElementById("track");
    const imgUrls = [
        "/public/assets/img/flutter1.png",
        "/public/assets/img/flutter2.png",
        "/public/assets/img/flutter3.png",
        "/public/assets/img/flutter4.png",
    ];

    let currentIndex = Math.floor(imgUrls.length / 2);
    const angleStep = 22;

    imgUrls.forEach((url, i) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.backgroundImage = `url(${url})`;
        track.appendChild(card);
    });

    const cards = document.querySelectorAll(".card");

    function updateCards() {
        cards.forEach((card, i) => {
            const cardRotation = (i - currentIndex) * angleStep;
            card.style.transform = `rotate(${cardRotation}deg)`;
            if (i === currentIndex) {
                card.classList.add("active");
            } else {
                card.classList.remove("active");
            }
        });
    }

    function move(dir) {
        const newIndex = currentIndex + dir;
        if (newIndex >= 0 && newIndex < imgUrls.length) {
            currentIndex = newIndex;
            updateCards();
        }
    }

    updateCards();

    // Scope wheel listener to the container only
    const container = document.getElementById("carousel-container");
    let lastScroll = 0;
}
