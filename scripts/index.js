import { SwitchThemeMode } from "./features/theme.js";
import { dashboard } from "./features/dashboard.js";
import { emergency } from "./features/emergency-contacts.js";
import { resetAppData, loadAppData } from "./core/appData.js";
import { hamburger } from "./features/hamburger.js";
import { checklist } from "./features/checklist.js";
import { guide } from "./features/guide.js";

//pang register ng service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("Service Worker registered:", reg.scope))
      .catch((err) => console.log("Service Worker failed:", err));
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
