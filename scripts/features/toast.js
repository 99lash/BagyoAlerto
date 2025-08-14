export function showToast(state, message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        const icon = document.createElement('i');
        switch (state) {
            case "call":
                icon.className = 'ph ph-phone';
                break;
            case "copy":
                icon.className = 'ph ph-copy';
                break;
            case "success":
                icon.className = 'ph ph-check-circle';
                break;
            case "info":
                icon.className = 'ph ph-info';
                break;
            case "warning":
                icon.className = 'ph ph-warning';
                break;
            case "error":
                icon.className = 'ph ph-x-circle';
                break;
        }
        toast.appendChild(icon);
        toast.appendChild(document.createTextNode(message));
        toastBox.appendChild(toast);


        setTimeout(() => {
            toast.remove();
        }, 3000);
}