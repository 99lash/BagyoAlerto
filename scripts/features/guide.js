function setDrop() {
  const arrows = document.querySelectorAll('.arrowD');

  arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      const icon = arrow.querySelector("i");
      icon.classList.toggle("ph-caret-right");
      icon.classList.toggle("ph-caret-down");

      // Find the guideDrops that belongs to THIS arrow
      const guideDrop = arrow.closest(".get-started-info").querySelector(".guideDrops");
      if (guideDrop) {
        guideDrop.classList.toggle("open");
      }
    });
  });
}

export const guide = () => {
  setDrop();
}
