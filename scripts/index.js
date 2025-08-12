import { showToast } from "./features/toast.js";
import { SwitchThemeMode } from "./features/theme.js";
import { dashboard } from "./features/dashboard.js";
import { emergency } from "./features/emergency-contacts.js";
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
    emergency();
    showToast();
    break;

  case '/guide.html':
    break;

  default:
    break;
}