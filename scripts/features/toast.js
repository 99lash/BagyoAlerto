const toastBox = document.getElementById('toastBox');
export const showToast = (msg) => {
    if (!toastBox) {
        console.error('toastBox element not found');
        return;
    }
    
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerText = msg;
    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}