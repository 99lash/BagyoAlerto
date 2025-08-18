export const hamburger = () => {
  initHamburgerMenu();
  handleHamburgerMenu();
};

function handleHamburgerMenu() {
  const rightSide = document.getElementById('right-side');
  const burger = document.getElementById('burger'); // Fixed: properly get the element
  
  // Check if screen size is correct
  if (window.innerWidth <= 768) {
    if (!document.querySelector('.hamburger-btn')) {
      const hamburgerBtn = document.createElement('button');
      hamburgerBtn.className = 'hamburger-btn';
      hamburgerBtn.innerHTML = '<i class="ph ph-list"></i>';
      
      rightSide.appendChild(hamburgerBtn);
      
      // Add click event listener to the newly created button
      hamburgerBtn.addEventListener("click", () => {
        
        if (burger) { // Check if element exists
          const prop = document.createElement('div');
          prop.classList.add('burger-item');
          let index = '';
          let guide = '';
          let emergency = '';
          let checklist = '';
          
          
          prop.appendChild(document.createTextNode(""));
          burger.appendChild(prop);
        }
      });
    }
  } else {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    if (hamburgerBtn) {
      hamburgerBtn.remove();
    }
  }
}

function initHamburgerMenu() {
  // Run on page load
  document.addEventListener('DOMContentLoaded', handleHamburgerMenu);
  
  // Run on window resize
  window.addEventListener('resize', handleHamburgerMenu);
}