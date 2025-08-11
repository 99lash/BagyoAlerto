import { showToast } from "./features/toast.js";
import { SwitchThemeMode } from "./features/theme.js";
import { renderAlertReminder } from "./features/alert.js";
import { copyButton } from "./features/emergency-contacts.js";
import { callButton } from "./features/emergency-contacts.js";

showToast();
SwitchThemeMode();
renderAlertReminder();
copyButton();
callButton();
