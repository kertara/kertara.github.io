document.addEventListener("DOMContentLoaded", function() {
    
    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    const savedTheme = localStorage.getItem("theme") || "light";
    
    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
        }
    }

    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function() {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener("click", function() {
            navLinks.classList.toggle("active");
            mobileBtn.textContent = navLinks.classList.contains("active") ? "Close" : "Menu";
        });
    }

    // --- Project Search ---
    const searchInput = document.getElementById("project-search");
    const projectItems = document.querySelectorAll(".project-item");

    if (searchInput) {
        searchInput.addEventListener("input", function(e) {
            const query = e.target.value.toLowerCase();
            
            projectItems.forEach(item => {
                const title = item.querySelector(".project-title").textContent.toLowerCase();
                const desc = item.querySelector(".project-desc").textContent.toLowerCase();
                
                if (title.includes(query) || desc.includes(query)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }

    // --- Lightbox ---
    const galleryImgs = document.querySelectorAll(".gallery-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxContent = document.getElementById("lightbox-content");

    if (galleryImgs.length > 0 && lightbox && lightboxContent) {
        galleryImgs.forEach(img => {
            img.addEventListener("click", function() {
                lightboxContent.src = this.src;
                lightbox.classList.add("active");
            });
        });

        lightbox.addEventListener("click", function() {
            lightbox.classList.remove("active");
            lightboxContent.src = "";
        });
    }
});
