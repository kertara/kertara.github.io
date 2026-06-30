const getRootPath = () => {
    const scripts = document.getElementsByTagName("script");
    for (let script of scripts) {
        const src = script.getAttribute("src");
        if (src && src.includes("components.js")) {
            let root = src.replace("js/components.js", "");
            return root === "" ? "./" : root;
        }
    }
    return "./";
};

const ROOT = getRootPath();

const navbarHtml = `
    <header class="site-header">
        <div class="nav-container">
            <a href="${ROOT}" class="brand">Kertara</a>
            <button id="mobile-menu-btn" class="mobile-menu-btn">Menu</button>
        </div>
        <ul id="nav-links" class="nav-links">
            <li><a href="${ROOT}">Home</a></li>
            <li><a href="${ROOT}projects/">Projects</a></li>
            <li><a href="${ROOT}team/">Team</a></li>
            <li><a href="${ROOT}gallery/">Gallery</a></li>
        </ul>
        <button id="theme-toggle" class="theme-toggle">Dark Mode</button>
    </header>
`;

const footerHtml = `
    <footer class="site-footer">
        <p>Email: <a href="mailto:contact@kertara.app">contact@kertara.app</a> | GitHub: <a href="https://github.com/kertara">github.com/kertara</a></p>
        <p>&copy; 2026 Kertara Community. All rights reserved.</p>
    </footer>
`;

function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (!themeToggleBtn) return;

    let savedTheme = "light";
    try {
        savedTheme = localStorage.getItem("theme") || "light";
    } catch (e) {
        console.warn("localStorage is not available", e);
    }
    
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggleBtn.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";

    themeToggleBtn.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        themeToggleBtn.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
        console.log("Theme switched to:", newTheme);
        
        try {
            localStorage.setItem("theme", newTheme);
        } catch (e) {
            console.warn("localStorage is not available", e);
        }
    });
}

function initMobileMenu() {
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            mobileBtn.textContent = navLinks.classList.contains("active") ? "Close" : "Menu";
        });
    }
}

function initProjectSearch() {
    const searchInput = document.getElementById("project-search");
    const projectItems = document.querySelectorAll(".project-item");
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            const query = e.target.value.toLowerCase();
            projectItems.forEach(item => {
                const title = item.querySelector(".project-title").textContent.toLowerCase();
                const desc = item.querySelector(".project-desc").textContent.toLowerCase();
                item.style.display = (title.includes(query) || desc.includes(query)) ? "block" : "none";
            });
        });
    }
}

function initLightbox() {
    const galleryImgs = document.querySelectorAll(".gallery-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxContent = document.getElementById("lightbox-content");
    if (galleryImgs.length > 0 && lightbox && lightboxContent) {
        galleryImgs.forEach(img => {
            img.addEventListener("click", function () {
                lightboxContent.src = this.src;
                lightbox.classList.add("active");
            });
        });
        lightbox.addEventListener("click", function () {
            lightbox.classList.remove("active");
            lightboxContent.src = "";
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const navPlaceholder = document.getElementById("navbar-placeholder");
    if (navPlaceholder) navPlaceholder.outerHTML = navbarHtml;

    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) footerPlaceholder.outerHTML = footerHtml;

    initTheme();
    initMobileMenu();
    initProjectSearch();
    initLightbox();
});