const downloadToggle = document.getElementById(
    "resume-download-toggle"
);

const downloadMenu = document.getElementById(
    "resume-download-menu"
);

if (downloadToggle && downloadMenu) {
    downloadToggle.addEventListener("click", () => {
        const isOpen =
            downloadToggle.getAttribute("aria-expanded") === "true";

        downloadToggle.setAttribute("aria-expanded", String(!isOpen));
        downloadMenu.hidden = isOpen;
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".resume-download")) {
            downloadMenu.hidden = true;
            downloadToggle.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            downloadMenu.hidden = true;
            downloadToggle.setAttribute("aria-expanded", "false");
            downloadToggle.focus();
        }
    });
}
