export const emergency = () => {
  copyButton();
  callButton(); 
}

export function copyButton() {
    document.querySelectorAll(".copy").forEach((btn, index) => {
        btn.addEventListener("click", function () {
            const text = document.querySelectorAll(".number")[index].textContent.trim();
            navigator.clipboard.writeText(text)
        });
    });
}
// REMOVE THE ALERT FEATURE SINCE MAS MAGANDA PAG TOAST NALANG LALABAS

export function callButton() {
    document.querySelectorAll(".call").forEach((btn, index) => {
        btn.addEventListener("click", function () {
            const number = document.querySelectorAll(".number")[index].textContent.trim();
            window.location.href = `tel:${number}`;
        });
    });
}