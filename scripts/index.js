import { showToast } from "./features/toast.js";
import { SwitchThemeMode } from "./features/theme.js";
import { renderAlertReminder } from "./features/alert.js";


window.showToast = showToast;
SwitchThemeMode();
renderAlertReminder();