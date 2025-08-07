import { showToast } from "./features/toast.js";
import { SwitchThemeMode } from "./features/theme.js";
import { renderAlertReminder } from "./features/alert.js";


window.showToast = showToast; // sher di ko alam if bakit di pwede yung normal na showToast(msg), if may possible solution na iba gawa nalang ng issue
SwitchThemeMode();
renderAlertReminder();