import { SwitchThemeMode } from "./features/theme.js";
import { dashboard } from "./features/dashboard.js";

SwitchThemeMode();

switch (window.location.pathname) {
  case '/index.html':
    dashboard();
    break;

  case '/checlist.html':
    break;

  case '/emergency.html':
    break;

  case '/guide.html':
    break;

  default:
    break;
}