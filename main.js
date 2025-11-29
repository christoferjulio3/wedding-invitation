const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

/* ============================
   PARALLAX EFFECTS
============================ */
window.addEventListener("scroll", function() {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionX = offset * (-0.3) - 100 + "px";
});

window.addEventListener("scroll", function() {
    let offset = window.pageYOffset - 3100;
    parallax1.style.backgroundPositionY = offset * 0.1 + "px";
});

window.addEventListener("scroll", function() {
    let offset = window.pageYOffset - 4800;
    parallax2.style.backgroundPositionY = offset * (-0.1) + "px";
});

/* ============================
   MENU CLOSE
============================ */
function myFunction() {
    document.getElementById("check").checked = false;
}

/* ============================
   REVEAL EFFECT
============================ */
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);


/* ============================
   GALLERY SLIDE (Left & Right)
============================ */
let index = 0;
const track = document.querySelector(".gallery-track");
const items = document.querySelectorAll(".gallery-item");

function updateGallery() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector(".gallery-btn.prev").onclick = () => {
    index = (index - 1 + items.length) % items.length;
    updateGallery();
};

document.querySelector(".gallery-btn.next").onclick = () => {
    index = (index + 1) % items.length;
    updateGallery();
};

// music button
document.addEventListener("DOMContentLoaded", () => {

    const musicButton = document.getElementById("music-btn");
    const music = document.getElementById("bg-music");

    // If we are NOT on index.html, stop here
    if (!musicButton || !music) return;

    // Update icon based on state
    function updateMusicIcon() {
        if (music.paused) {
            musicButton.textContent = "🔇";
            musicButton.classList.remove("playing");
        } else {
            musicButton.textContent = "♫";
            musicButton.classList.add("playing");
        }
    }

    // Toggle music
    musicButton.addEventListener("click", () => {
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
        updateMusicIcon();
    });

    // Restore previous state (optional but recommended)
    const savedState = sessionStorage.getItem("musicState");

    if (savedState === "paused") {
        music.pause();
    } else {
        music.play();
    }

    music.addEventListener("play", () => {
        sessionStorage.setItem("musicState", "playing");
    });

    music.addEventListener("pause", () => {
        sessionStorage.setItem("musicState", "paused");
    });

    // Initialize icon
    updateMusicIcon();
});
