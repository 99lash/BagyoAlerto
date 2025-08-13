import { dashboard } from "./features/dashboard.js";
import { emergency } from "./features/emergency-contacts.js";
import { SwitchThemeMode } from "./features/theme.js";
import { resetAppData, loadAppData } from "./core/appData.js";

if (!loadAppData()) {
  //kapag walang data, initialized the fixed data.
  resetAppData();
}
SwitchThemeMode();

switch (window.location.pathname.split('/').pop()) {
  case 'index.html':
    dashboard();
    break;

  case 'checlist.html':
    break;

  case 'emergency.html':
    emergency();
    break;

  case 'guide.html':
    break;

  default:
    break;
}