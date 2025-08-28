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

            switch (window.location.pathname.split('/').pop()) {
              case '':
              case 'index.html':
                prop.innerHTML = `
                <a href="./index.html" id="dashboard" class="active"><i class="ph ph-house" ></i>Dashboard</a>
                <a href="./checklist.html" id="checklist"><i class="ph ph-check-square"></i>Checklist</a>
                <a href="./emergency.html" id="emergency"><i class="ph ph-phone"></i>Emergency</a>
                <a href="./guide.html" id="guide"><i class="ph ph-question"></i>Guide</a>
              `; burger.appendChild(prop);
                isMobileMenuOpen = true;
                break;

              case 'checklist.html':
                prop.innerHTML = `
                <a href="./index.html" id="dashboard" ><i class="ph ph-house" ></i>Dashboard</a>
                <a href="./checklist.html" id="checklist" class="active"><i class="ph ph-check-square"></i>Checklist</a>
                <a href="./emergency.html" id="emergency"><i class="ph ph-phone"></i>Emergency</a>
                <a href="./guide.html" id="guide"><i class="ph ph-question"></i>Guide</a>
              `; burger.appendChild(prop);
                isMobileMenuOpen = true;
                break;

              case 'emergency.html':
                prop.innerHTML = `
                <a href="./index.html" id="dashboard" ><i class="ph ph-house" ></i>Dashboard</a>
                <a href="./checklist.html" id="checklist"><i class="ph ph-check-square"></i>Checklist</a>
                <a href="./emergency.html" id="emergency" class="active"><i class="ph ph-phone"></i>Emergency</a>
                <a href="./guide.html" id="guide"><i class="ph ph-question"></i>Guide</a>
              `; burger.appendChild(prop);
                isMobileMenuOpen = true;
                break;

              case 'guide.html':
                prop.innerHTML = `
                <a href="./index.html" id="dashboard" ><i class="ph ph-house" ></i>Dashboard</a>
                <a href="./checklist.html" id="checklist"><i class="ph ph-check-square"></i>Checklist</a>
                <a href="./emergency.html" id="emergency"><i class="ph ph-phone"></i>Emergency</a>
                <a href="./guide.html" id="guide" class="active"><i class="ph ph-question"></i>Guide</a>
              `; burger.appendChild(prop);
                isMobileMenuOpen = true;
                break;

              default:
                break;
            }

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

