(function () {
    const container = document.querySelector('.premium-container');
    if (!container) return;

    const track = container.querySelector('.premium-track');
    const slides = Array.from(track.children);
    const nextButton = container.querySelector('.premium-next');
    const prevButton = container.querySelector('.premium-prev');
    const navIndicator = container.querySelector('.premium-nav');
    const fullscreenButton = container.querySelector('.premium-fullscreen-btn');

    let currentIndex = 0;
    let autoPlayInterval;

    // 1. Build pagination dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('premium-dot');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        if (index === 0) dot.classList.add('premium-active');
        dot.dataset.index = index;
        navIndicator.appendChild(dot);
    });

    const dots = Array.from(navIndicator.children);

    // 2. Navigation Engine
    const updateCarousel = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;

        slides.forEach(slide => slide.classList.remove('premium-active'));
        dots.forEach(dot => dot.classList.remove('premium-active'));

        slides[index].classList.add('premium-active');
        dots[index].classList.add('premium-active');
    };

    const moveToNextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel(currentIndex);
    };

    const moveToPrevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(currentIndex);
    };
    // Target your two custom cursor elements
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            container.requestFullscreen().then(() => {
                // Move the cursor divs inside the container so they sit on top of the fullscreen layer
                if (cursorDot) container.appendChild(cursorDot);
                if (cursorRing) container.appendChild(cursorRing);
            }).catch(err => {
                console.error(`Error enabling fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Global listener to detect when fullscreen closes (handles button clicks AND 'Esc' key)
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            // Move them back to the body when exiting fullscreen
            if (cursorDot) document.body.appendChild(cursorDot);
            if (cursorRing) document.body.appendChild(cursorRing);
        }
    });
    // 4. Event Listeners
    fullscreenButton.addEventListener('click', toggleFullscreen);
    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPrevSlide);

    navIndicator.addEventListener('click', e => {
        const targetDot = e.target.closest('.premium-dot');
        if (!targetDot) return;
        currentIndex = parseInt(targetDot.dataset.index);
        updateCarousel(currentIndex);
    });

    // 5. Touch Gestures
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                moveToNextSlide();
            } else {
                moveToPrevSlide();
            }
        }
    };

    // 6. Auto-Play Loop
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(moveToNextSlide, 6000);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    startAutoPlay();
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
})();
