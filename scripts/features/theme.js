/* SWITCH THEME FUNCTION   */
export const SwitchThemeMode = () => {
  document.getElementById('mode').addEventListener('click', () => {
    const html = document.documentElement;
    const modeIcon = document.getElementById("mode");
    const isDark = html.classList.toggle('dark');
    isDark ? modeIcon.innerHTML = `<i class="ph ph-sun"></i>` : modeIcon.innerHTML = `<i class="ph ph-moon"></i>`;
  });
}
