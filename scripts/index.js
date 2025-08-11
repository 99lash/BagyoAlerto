import { SwitchThemeMode } from "./features/theme.js";
import { dashboard } from "./features/dashboard.js";
import { emergency } from "./features/emergency-contacts.js";

SwitchThemeMode();

switch (window.location.pathname) {
  case '/index.html':
    dashboard();
    break;

  case '/checlist.html':
    break;

  case '/emergency.html':
    emergency();
    break;

  case '/guide.html':
    break;

  default:
    break;
}