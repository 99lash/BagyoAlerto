import { showToast } from "./features/toast.js";
import { SwitchThemeMode } from "./features/theme.js";
import { dashboard } from "./features/dashboard.js";
// import { emergency } from "./features/emergency-contacts.js"; uncaught error saken, walang exported na function na name "emergency" meron lang yung call and copy
import { renderAlertReminder } from "./features/alert.js";
import { copyButton ,callButton} from "./features/emergency-contacts.js";

SwitchThemeMode();

switch (window.location.pathname) {
  case '/index.html':
    dashboard();
    break;

  case './checklist.html':
    showToast();
    break;

  case '/emergency.html':
    // emergency(); tinangal ko muna since wala namang caught named function na emergency.
    showToast();
    callButton();
    copyButton();
    break;

  case '/guide.html':
    break;

  default:
    break;
}