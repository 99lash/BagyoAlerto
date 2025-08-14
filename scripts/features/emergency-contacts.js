import { showToast } from "./toast.js";

export const emergency = () => {
  copyButton();
  callButton(); 
}

let preText;
export function copyButton() {
    document.querySelectorAll(".copy").forEach((btn, index) => {
        btn.addEventListener("click", function () {
            const text = document.querySelectorAll(".number")[index].textContent.trim();
            navigator.clipboard.writeText(text);
            if(text != preText){
            showToast('copy', `Successfully coppied ${text}`);
            setTimeout(() => {
                preText = null;
            }, 3000);
            }
            preText = text;
        });
    });
}
// REMOVE THE ALERT FEATURE SINCE MAS MAGANDA PAG TOAST NALANG LALABAS

let preNum;
export function callButton() {
    document.querySelectorAll(".call").forEach((btn, index) => {
        btn.addEventListener("click", function () {
            const number = document.querySelectorAll(".number")[index].textContent.trim();
            window.location.href = `tel:${number}`;
            if(number != preNum){
            showToast('call', `Calling ${number}`);
            setTimeout(() => {
                preNum = null;
            }, 3000);
            }
            preNum = number;
        });
    });
}