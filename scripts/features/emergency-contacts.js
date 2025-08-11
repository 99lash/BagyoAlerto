export const emergency = () => {
  copyButton();
  callButton(); 
}

function copyButton() {
  document.querySelectorAll(".copy").forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const text = document.querySelectorAll(".number")[index].textContent.trim();

      navigator.clipboard.writeText(text)
        .then(() => {
          alert(" Copied: " + text);
        })
        .catch(err => {
          console.error("Copy failed", err);
        });
    });
  });
}

function callButton() {
  document.querySelectorAll(".call").forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const number = document.querySelectorAll(".number")[index].textContent.trim();
      window.location.href = `tel:${number}`;
    });
  });
}