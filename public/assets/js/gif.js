document.addEventListener('DOMContentLoaded', () => {
    const gifElement = document.getElementById('gif-element');
    const loader = document.getElementById('loader');

    // Function to trigger the reveal
    const revealGif = () => {
        loader.style.opacity = '0'; // Fade out loader
        setTimeout(() => {
            loader.style.display = 'none'; // Remove from flow
            gifElement.classList.remove('hidden'); // Fade in GIF
        }, 300); // Wait for loader to visually fade
    };

    // Check if the image is already cached and loaded
    if (gifElement.complete && gifElement.naturalHeight !== 0) {
        revealGif();
    } else {
        // Wait for the heavy GIF file to download
        gifElement.addEventListener('load', revealGif);
        
        // Optional: Handle broken links gracefully
        gifElement.addEventListener('error', () => {
            loader.style.display = 'none';
            gifElement.parentElement.innerHTML += '<p style="color: #666; font-size: 0.9rem;">Media unavailable</p>';
        });
    }
});
