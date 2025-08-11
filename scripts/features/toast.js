export function showToast() {
    document.querySelectorAll(".copy").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const text = document.querySelectorAll(".number")[index].textContent.trim();
            const msg = " Copied " + text;



            const toast = document.createElement('div');
            toast.classList.add('toast');
            const icon = document.createElement('i');
            icon.className = 'ph ph-copy';
            toast.appendChild(icon);
            toast.appendChild(document.createTextNode(msg));
            toastBox.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        })
    });

    document.querySelectorAll(".call").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const text = document.querySelectorAll(".number")[index].textContent.trim();
            const msg = " Calling " + text;

            const toast = document.createElement('div');
            toast.classList.add('toast');
            const icon = document.createElement('i');
            icon.className = 'ph ph-phone';
            toast.appendChild(icon);
            toast.appendChild(document.createTextNode(msg));
            toastBox.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        });
    });
}