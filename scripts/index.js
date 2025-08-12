import { showToast } from "./features/toast.js";
import { SwitchThemeMode } from "./features/theme.js";
import { renderAlertReminder } from "./features/alert.js";
import { copyButton ,callButton} from "./features/emergency-contacts.js";

showToast();
SwitchThemeMode();
renderAlertReminder();
copyButton();
callButton();
