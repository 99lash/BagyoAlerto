import { loadAppData, saveAppData } from "../core/appData.js";

/* SWITCH THEME FUNCTION   */
export const SwitchThemeMode = () => {
  try {
    const switchThemeBtn = document.getElementById('mode');
    const html = document.documentElement;
    const data = loadAppData();
    const { appSettings } = data;
    console.log(appSettings);

    if (appSettings.theme === 'dark') {
      switchThemeBtn.innerHTML = `<i class="ph ph-sun"></i>`;
      html.classList.toggle('dark');
    } else {
      switchThemeBtn.innerHTML = `<i class="ph ph-moon"></i>`;
      html.classList.remove('dark');
    }

    document.getElementById('mode').addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      appSettings.theme = isDark ? 'dark' : 'light';
      data.appSettings = appSettings;
      switchThemeBtn.innerHTML = isDark ? `<i class="ph ph-sun"></i>` : `<i class="ph ph-moon"></i>`;
      saveAppData(data);
    });
  } catch (error) {
    console.error(error);
  }
}
