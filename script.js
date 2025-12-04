// Santa fly script (starts when #nextBtn is clicked)
function flySanta() {
    const santa = document.getElementById("santaContainer");
    if (!santa) return;
    // Use transform to move across the screen
    santa.style.transition = "transform 5s ease-out";
    santa.style.transform = "translateX(150vw)";

    setTimeout(() => {
        const final = document.getElementById("finalScreen");
        if (final) final.style.display = "flex";
    }, 5000);
}

// Attach listener safely: if #nextBtn not present yet, poll until it exists
(function attachNext() {
    const btn = document.getElementById("nextBtn");
    if (btn) {
        btn.addEventListener("click", flySanta);
    } else {
        const interval = setInterval(() => {
            const b = document.getElementById("nextBtn");
            if (b) {
                b.addEventListener("click", flySanta);
                clearInterval(interval);
            }
        }, 300);
    }
})();
