export const hamburger = () => {
  initHamburgerMenu();
  handleHamburgerMenu();
};

function handleHamburgerMenu() {
  const rightSide = document.getElementById('right-side');
  const burger = document.getElementById('burger'); // Fixed: properly get the element
  let isMobileMenuOpen = false;

  // Check if screen size is correct
  if (window.innerWidth <= 768) {
    if (!document.querySelector('.hamburger-btn')) {
      const hamburgerBtn = document.createElement('button');
      hamburgerBtn.className = 'hamburger-btn';
      hamburgerBtn.innerHTML = '<i class="ph ph-list"></i>';

      rightSide.appendChild(hamburgerBtn);

      // Add click event listener to the newly created button
      hamburgerBtn.addEventListener("click", () => {
        const burger = document.getElementById('burger');

        if (burger) {
          if (!isMobileMenuOpen) {
            // Open menu
            const prop = document.createElement('div');
            prop.classList.add('burger-item');

            prop.innerHTML = `
        <a href="./index.html" id="dashboard"><i class="ph ph-house"></i>Dashboard</a>
        <a href="./checklist.html" id="checklist"><i class="ph ph-check-square"></i>Checklist</a>
        <a href="./emergency.html" id="emergency"><i class="ph ph-phone"></i>Emergency</a>
        <a href="./guide.html" id="guide"><i class="ph ph-question"></i>Guide</a>
      `;

            setActiveMenuItemByHref();

            burger.appendChild(prop);
            isMobileMenuOpen = true;
          } else {
            // Close menu
            burger.innerHTML = '';
            isMobileMenuOpen = false;
          }
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
function setActiveMenuItemByHref() {
  const currentURL = window.location.href;
  
  document.querySelectorAll('.burger-item a').forEach(link => {
    link.classList.remove('active');
    
    // Check if current URL ends with the link's href
    if (currentURL.includes(link.getAttribute('href').replace('./', ''))) {
      link.classList.add('active');
    }
  });
}