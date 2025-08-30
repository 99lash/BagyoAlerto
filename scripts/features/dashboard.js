import { getUserLocation } from "../core/geolocation.js";
import { getWeather } from "../core/weather.js";
import { renderAlertReminder } from "./alert.js";
import { loadAppData, saveAppData, resetAppData } from "../core/appData.js";

export const dashboard = async () => {
  try {
    const { data } = await getUserLocation();
    const { lat, lon } = data;
    // const response = await getWeather(lat, lon);
    // renderAlertReminder(response);
    const appData = loadAppData();

    renderOverview(appData);
    initKitSwitcher();
    // resetAppData();
  } catch (error) {
    console.error(error);
  }
};

function renderOverview(appData, weather = {}) {
  if (!appData) return;

  const overviewCards = document.querySelectorAll(".overview-card");
  const checklistItems = appData.checklistItems || [];
  const selectedId = appData.appSettings.selectedChecklistVersionId;

  // overall readiness
  if (overviewCards[0]) {
    let totalItems = 0, checkedItems = 0;
    for (let i = 0; i < checklistItems.length; i++) {
      totalItems++;
      if (checklistItems[i].checked) checkedItems++;
    }
    const readinessPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

    overviewCards[0].querySelector(".overview-value").textContent = readinessPercent + "%";
    const barFill = overviewCards[0].querySelector(".bar-fill");
    if (barFill) barFill.style.width = readinessPercent + "%";

    const badge = overviewCards[0].querySelector(".badge");
    if (badge) {
      // dito mo cchange yung percent badge sher para maging dyanmic.
      if (readinessPercent >= 80) badge.textContent = "Excellent"; // triny ko lang, wala pa to
      else if (readinessPercent >= 50) badge.textContent = "Good"; // triny ko lang, wala pa to
      else badge.textContent = "Needs Work"; // triny ko lang, wala pa to
    }
  }

  // items packed
  if (overviewCards[1]) {
    let kitTotal, kitChecked = 0;
    for (let i = 0; i < checklistItems.length; i++) {
      const item = checklistItems[i];
      if (item.kitId === selectedId) {
        kitTotal++;
        if (item.checked) kitChecked++;
      }
    }
    overviewCards[1].querySelector(".overview-value").textContent = kitChecked;
    overviewCards[1].querySelector(".overview-subtext").textContent = `of ${kitTotal} total items`;
  }

  // active kit
  if (overviewCards[2]) {
    let kit = null;
    for (let i = 0; i < appData.checklistVersions.length; i++) {
      if (appData.checklistVersions[i].id === selectedId) {
        kit = appData.checklistVersions[i];
        break;
      }
    }
    if (kit) {
      overviewCards[2].querySelector(".overview-value").textContent = kit.name;
      overviewCards[2].querySelector(".overview-subtext").textContent = kit.desc;
    }
  }
  // weather status
  if (overviewCards[3] && weather?.name) {
    const weatherEl = overviewCards[3].querySelector(".readiness-season");
    if (weatherEl) weatherEl.textContent = weather.name;
  }
}

function renderCategoryProgress(selectedKitId) {
  const list = document.querySelector(".progress-list");
  if (!list) return;
  list.innerHTML = "";

  const appData = loadAppData();
  const items = appData.checklistItems || [];
  const categoryMap = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.kitId !== selectedKitId) continue;

    const categoryId = item.categoryId;
    const category = appData.categories.find(cat => cat.id === categoryId);
    if (!category) continue;

    if (!categoryMap[categoryId]) {
      categoryMap[categoryId] = {
        name: category.name,
        total: 0,
        current: 0
      };
    }

    categoryMap[categoryId].total += 1;
    if (item.checked) categoryMap[categoryId].current += 1;
  }

  for (let i = 0; i < appData.categories.length; i++) {
    const cat = appData.categories[i];
    if (!categoryMap[cat.id]) {
      categoryMap[cat.id] = { name: cat.name, total: 0, current: 0 };
    }
  }

  const categoryIds = Object.keys(categoryMap);
  for (let i = 0; i < categoryIds.length; i++) {
    const cat = categoryMap[categoryIds[i]];
    const percent = cat.total > 0 ? Math.round((cat.current / cat.total) * 100) : 0;

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

    const barFill = document.createElement("div");
    barFill.className = "progress-bar-fill";
    barFill.style.width = percent + "%";

    bar.appendChild(barFill);

    li.appendChild(labelContainer);
    li.appendChild(bar);
    list.appendChild(li);
  }
}


function initKitSwitcher() {
  const appData = loadAppData();
  const kits = appData.checklistVersions || [];
  let selectedId = appData.appSettings.selectedChecklistVersionId;

  const btn = document.getElementById("kit-dropdown-btn");
  const menu = document.getElementById("kit-dropdown-menu");
  const kitInfo = document.getElementById("kit-info");
  const overviewValue = document.querySelector(".overview-card:nth-child(3) .overview-value");
  const overviewSubtext = document.querySelector(".overview-card:nth-child(3) .overview-subtext");

  if (!btn || !menu || !kitInfo || !overviewValue || !overviewSubtext) return;


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
    const appData = loadAppData();
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !expanded);
    menu.hidden = expanded;
    updateKitDropdown(appData);
  });

  updateKitDropdown();
  function updateKitDropdown(appData) {
    menu.querySelectorAll("li").forEach(option => {
      option.addEventListener("click", () => {
        const selectedKitId = option.dataset.value;

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

        appData.appSettings.selectedChecklistVersionId = selectedKitId;
        console.log(appData);

        saveAppData(appData);

        updateKitInfo(selectedKitId);
      });
    });
  }

  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }
  });
}