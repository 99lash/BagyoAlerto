export function showToast(){
    document.querySelectorAll(".copy").forEach((btn, index) => { 
        btn.addEventListener("click", () => {
            const text = document.querySelectorAll(".number")[index].textContent.trim();

            const toast = document.createElement('div');
            toast.classList.add('toast');
            toast.innerText = "SUCCESSFULLY COPIED " + text;
            toastBox.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        })
    });

    document.querySelectorAll(".call").forEach((btn, index) => { 
        btn.addEventListener("click", () => {
            const text = document.querySelectorAll(".number")[index].textContent.trim();

            const toast = document.createElement('div');
            toast.classList.add('toast');
            toast.innerText = "CALLING " + text;
            toastBox.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        })
    });
}