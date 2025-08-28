import { SwitchThemeMode } from "./features/theme.js";
import { dashboard } from "./features/dashboard.js";
import { emergency } from "./features/emergency-contacts.js";
import { resetAppData, loadAppData } from "./core/appData.js";
import { hamburger } from "./features/hamburger.js";
import { checklist } from "./features/checklist.js";
import { guide } from "./features/guide.js";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("SW registered:", reg))
      .catch((err) => console.error("SW registration failed:", err));
  });

  window.addEventListener("appinstalled", () => {
    console.log("BagyoAlerto installed successfully!");
    const installBtn = document.querySelector("#installBtn");
    installBtn.style.display = "none";
  });


  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent automatic mini-infobar sa Chrome
    e.preventDefault();
    deferredPrompt = e;

    // Show your custom install button
    const installBtn = document.querySelector("#installBtn");
    installBtn.style.display = "block";

    installBtn.addEventListener("click", async () => {
      installBtn.style.display = "none";

      if (deferredPrompt) {
        deferredPrompt.prompt(); // Show browser A2HS prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        deferredPrompt = null;
      }
    });
  });

}

if (!loadAppData()) {
  //kapag walang data, initialized the fixed data.
  resetAppData();
}
SwitchThemeMode();
hamburger();

switch (window.location.pathname.split('/').pop()) {
  case '':
  case 'index.html':
    dashboard();
    break;

  case 'checklist.html':
    checklist();
    break;

  case 'emergency.html':
    emergency();
    break;

  case 'guide.html':
    guide();
    break;

  default:
    break;
}
