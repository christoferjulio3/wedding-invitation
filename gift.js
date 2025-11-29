// ===== Modal Elements =====
const giftModal = document.getElementById("gift-modal");
const giftBtn = document.querySelector(".gift-button");
const closeBtn = document.querySelector(".gift-close");

// ===== Open Modal =====
giftBtn.addEventListener("click", () => {
    giftModal.style.display = "flex";
});

// ===== Close Modal =====
closeBtn.addEventListener("click", () => {
    giftModal.style.display = "none";
});

// ===== Close when clicking outside =====
window.addEventListener("click", (e) => {
    if (e.target === giftModal) {
        giftModal.style.display = "none";
    }
});

// ===== Copy Button Logic (works for all buttons) =====
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-btn")) {
        
        const accNumber = e.target.getAttribute("data-copy");

        navigator.clipboard.writeText(accNumber).then(() => {
            e.target.innerText = "Copied!";
            e.target.style.background = "#000";
            e.target.style.color = "#fff";

            setTimeout(() => {
                e.target.innerText = "Copy";
                e.target.style.background = "#fff";
                e.target.style.color = "#000";
            }, 1500);
        });
    }
});
