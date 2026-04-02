const STORAGE_KEY = "preferred-lang";
const DEFAULT_LANG = "en";

const toggle = document.getElementById("langToggle");
const sections = document.querySelectorAll("[data-lang]");
const buttons = Array.from(document.getElementsByClassName("lang-button"));

function setLang(lang) {
    // Update buttons
    buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.target === lang);
    });

    // Update visible content
    sections.forEach((el) => {
        el.classList.toggle("visible", el.dataset.lang === lang);
    });

    // Update <html lang=""> for accessibility & SEO
    document.documentElement.lang = lang;

    // Remember the choice
    localStorage.setItem(STORAGE_KEY, lang);
}

// Button clicks
buttons.forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.target));
});

// Restore saved preference on load
const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
setLang(saved);

