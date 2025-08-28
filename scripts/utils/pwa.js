export const installPWA = () => {
  let deferredPrompt;
  const installCard = document.getElementById('install-card');
  const installBtn = document.getElementById('installBtn');
  const installCardHeader = document.querySelector('.install-card-header');
  // console.log(installCard);

  const ua = navigator.userAgent.toLowerCase();
  const device = /android|iphone|ipad|ipod/.test(ua);
  console.log(device);
  if (device) {
    installCardHeader.textContent = '📲Add BagyoAlerto to Home Screen';
    installBtn.textContent = 'Add to Home Screen';
  } else {
    installCardHeader.textContent = '📲Add BagyoAlerto to Desktop';
    installBtn.textContent = 'Add to Desktop';
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installCard.style.display = 'flex';
    console.log(installCard);
  });

  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('✅ User accepted install');
      } else {
        console.log('❌ User dismissed install');
      }
      deferredPrompt = null;
      installCard.style.display = 'none';
    }
  });

  //pang double check if installed naba ang BagyoAlerto
  window.addEventListener("appinstalled", () => {
    console.log("📲 PWA installed!");
    installCard.style.display = "none";
  });
}