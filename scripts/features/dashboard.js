import { getUserLocation } from "../core/geolocation.js";
import { getWeather } from "../core/weather.js";
import { renderAlertReminder } from "./alert.js";
import { loadAppData } from "../core/appData.js";
import { installPWA } from "../utils/pwa.js"

export const dashboard = async () => {
  try {
    installPWA();
    const { data } = await getUserLocation();
    const { lat, lon } = data;
    const response = await getWeather(lat, lon);
    renderAlertReminder(response);
    initKitSwitcher();
  } catch (error) {
    console.error(error);
  }
};

function renderCategoryProgress(selectedKitId) {
  const list = document.querySelector(".progress-list");
  if (!list) return;

  const appData = loadAppData();
  const items = appData.checklistItems || [];

  const filteredItems = items.filter(item => item.kitId === selectedKitId);
  const categoryMap = {};

  filteredItems.forEach(item => {
    const categoryId = item.categoryId;
    const category = appData.categories.find(cat => cat.id === categoryId);
    if (!category) return;

    if (!categoryMap[categoryId]) {
      categoryMap[categoryId] = {
        name: category.name,
        total: 0,
        current: 0
      };
    }

    categoryMap[categoryId].total += 1;
    if (item.checked) categoryMap[categoryId].current += 1;
  });

  list.innerHTML = "";

  Object.values(categoryMap).forEach(cat => {
    const percent = 0; // pang compute ko lang to pag meron ng progress talaga

    const li = document.createElement("li");
    const labelContainer = document.createElement("div");
    labelContainer.className = "progress-label";

    const nameSpan = document.createElement("span");
    nameSpan.className = "label-name";
    nameSpan.textContent = cat.name;

    const valueSpan = document.createElement("span");
    valueSpan.className = "label-value";
    valueSpan.textContent = `${cat.current}/${cat.total} (${percent}%)`;

    labelContainer.appendChild(nameSpan);
    labelContainer.appendChild(valueSpan);

    const bar = document.createElement("div");
    bar.className = "progress-bar";

    li.appendChild(labelContainer);
    li.appendChild(bar);
    list.appendChild(li);
  });
}

function initKitSwitcher() {
  const appData = loadAppData();
  const kits = appData.checklistVersions || [];
  const selectedId = appData.appSettings.selectedChecklistVersionId;

  const btn = document.getElementById("kit-dropdown-btn");
  const menu = document.getElementById("kit-dropdown-menu");
  const kitInfo = document.getElementById("kit-info");
  const overviewValue = document.querySelector(".overview-card:nth-child(3) .overview-value");
  const overviewSubtext = document.querySelector(".overview-card:nth-child(3) .overview-subtext");

  if (!btn || !menu || !kitInfo || !overviewValue || !overviewSubtext) return;

  /* pang populate ng dropdown na dynamic */
  menu.innerHTML = "";
  kits.forEach((kit, index) => {
    const li = document.createElement("li");
    li.setAttribute("role", "option");
    li.dataset.value = kit.id;
    li.innerHTML = `
      ${kit.name} <span class="checkmark" style="visibility: ${kit.id === selectedId ? 'visible' : 'hidden'}"><i class="ph ph-check"></i></span>
    `;
    if (kit.id === selectedId) li.setAttribute("aria-selected", "true");
    menu.appendChild(li);
  });

  function updateKitInfo(kitId) {
    const kit = kits.find(k => k.id === kitId);
    if (!kit) return;

    kitInfo.innerHTML = `<strong>${kit.name}</strong><p>${kit.desc}</p>`;
    overviewValue.textContent = kit.name;
    overviewSubtext.textContent = kit.desc;
    renderCategoryProgress(kitId);
  }

  updateKitInfo(selectedId);

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !expanded);
    menu.hidden = expanded;
  });

  menu.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      const selectedKitId = option.dataset.value;

      /* pang update ng dropdown */
      menu.querySelectorAll("li").forEach(li => {
        li.setAttribute("aria-selected", "false");
        li.querySelector(".checkmark").style.visibility = "hidden";
      });
      option.setAttribute("aria-selected", "true");
      option.querySelector(".checkmark").style.visibility = "visible";

      const arrow = btn.querySelector(".arrow") || document.createElement("span");
      arrow.classList.add("arrow");

      const selectedKit = kits.find(k => k.id === selectedKitId);
      btn.innerHTML = `${selectedKit.name} `;
      btn.appendChild(arrow);

      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");

      updateKitInfo(selectedKitId);
    });
  });

  
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }
  });
}
