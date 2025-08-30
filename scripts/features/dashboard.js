import { getUserLocation } from "../core/geolocation.js";
import { getWeather } from "../core/weather.js";
import { renderAlertReminder } from "./alert.js";
import { loadAppData, saveAppData, resetAppData } from "../core/appData.js";
import { installPWA } from "../utils/pwa.js"
import { getCurrentSelectedChecklist, getAllChecklistItemsByCategories, getAllCategoryProgressByChecklistVersions } from '../utils/checklistUtils.js';


export const dashboard = async () => {
  try {
    installPWA();
    const { data } = await getUserLocation();
    const { lat, lon } = data;
    const response = await getWeather(lat, lon);
    renderAlertReminder(response);
    const appData = loadAppData();

    renderOverview(response);
    initKitSwitcher();
    // resetAppData();
  } catch (error) {
    console.error(error);
  }
};

function renderOverview(weather = {}) {
  const overviewCards = document.querySelectorAll(".overview-card");
  if (!overviewCards.length) return;

  const data = loadAppData();
  const { checklistVersions, appSettings } = data;
  const selectedId = appSettings.selectedChecklistVersionId;

  // kuha ng current selected kit stats
  const { totalItems, totalCheckedItems, progressInPercent } = getCurrentSelectedChecklist();

  // 🔹 Helper for readiness badge + bar
  function updateReadiness(card, percent) {
    if (!card) return;
    card.querySelector(".overview-value").textContent = percent + "%";

    const barFill = card.querySelector(".bar-fill");
    const badge = card.querySelector(".badge");
    if (!barFill || !badge) return;

    const levels = [
      { max: 25, text: "Needs Work", color: "var(--readiness-needs-work)", bg: "var(--readiness-needs-work-background)" },
      { max: 50, text: "Fair",       color: "var(--readiness-fair)",       bg: "var(--readiness-fair-background)" },
      { max: 75, text: "Good",       color: "var(--readiness-good)",       bg: "var(--readiness-good-background)" },
      { max: 100, text: "Excellent", color: "var(--readiness-excellent)",  bg: "var(--readiness-excellent-background)" }
    ];

    const level = levels.find(l => percent <= l.max) || levels[levels.length - 1];

    barFill.style.width = `${percent || 1}%`;
    barFill.style.backgroundColor = level.color;
    badge.textContent = level.text;
    badge.style.color = level.color;
    badge.style.backgroundColor = level.bg;
  }

  // 🔹 Helper for finding active kit
  function getSelectedKit() {
    return checklistVersions.find(k => k.id === selectedId) || null;
  }

  // 1. Overall readiness
  updateReadiness(overviewCards[0], progressInPercent);

  // 2. Items packed
  if (overviewCards[1]) {
    overviewCards[1].querySelector(".overview-value").textContent = totalCheckedItems;
    overviewCards[1].querySelector(".overview-subtext").textContent = `of ${totalItems} total items`;
  }

  // 3. Active kit
  if (overviewCards[2]) {
    const kit = getSelectedKit();
    if (kit) {
      overviewCards[2].querySelector(".overview-value").textContent = kit.name;
      overviewCards[2].querySelector(".overview-subtext").textContent = kit.desc;
    }
  }

  // 4. Weather status
  if (overviewCards[3] && weather?.name) {
    const weatherEl = overviewCards[3].querySelector(".readiness-season");
    if (weatherEl) weatherEl.textContent = weather.name;
  }
}

function renderCategoryProgress() {
  const { appSettings } = loadAppData();
  const selectedId = appSettings.selectedChecklistVersionId;

  const allKitCategoryProgress = getAllCategoryProgressByChecklistVersions();
  const selectedKit = allKitCategoryProgress.find(k => k.kit.id === selectedId);

  const list = document.querySelector(".progress-list");
  list.innerHTML = "";

  selectedKit.categories.forEach(({ category, totalItems, totalCheckedItems, progressInPercent }) => {
    const li = document.createElement("li");

    const labelContainer = document.createElement("div");
    labelContainer.className = "progress-label";

    const nameSpan = document.createElement("span");
    nameSpan.className = "label-name";
    nameSpan.textContent = category.name;

    const valueSpan = document.createElement("span");
    valueSpan.className = "label-value";
    valueSpan.textContent = `${totalCheckedItems}/${totalItems} (${progressInPercent}%)`;

    labelContainer.appendChild(nameSpan);
    labelContainer.appendChild(valueSpan);

    const bar = document.createElement("div");
    bar.className = "progress-bar";

    const barFill = document.createElement("div");
    barFill.className = "progress-bar-fill";
    barFill.style.width = `${progressInPercent}%`;

    if (progressInPercent <= 25) {
      barFill.style.backgroundColor = 'var(--readiness-needs-work)';
    } else if (progressInPercent <= 50) {
      barFill.style.backgroundColor = 'var(--readiness-fair)';
    } else if (progressInPercent <= 75) {
      barFill.style.backgroundColor = 'var(--readiness-good)';
    } else {
      barFill.style.backgroundColor = 'var(--readiness-excellent)';
    }

    bar.appendChild(barFill);
    li.appendChild(labelContainer);
    li.appendChild(bar);
    list.appendChild(li);
  });
}



function initKitSwitcher() {
  const appData = loadAppData();
  const kits = appData.checklistVersions || [];
  let selectedId = appData.appSettings.selectedChecklistVersionId;

  if (!selectedId && kits.length > 0) {
    selectedId = kits[0].id; // fallback to first kit if none selected
    appData.appSettings.selectedChecklistVersionId = selectedId;
    saveAppData(appData);
  }

  const btn = document.getElementById("kit-dropdown-btn");
  const menu = document.getElementById("kit-dropdown-menu");
  const kitInfo = document.getElementById("kit-info");
  const overviewValue = document.querySelector(".overview-card:nth-child(3) .overview-value");
  const overviewSubtext = document.querySelector(".overview-card:nth-child(3) .overview-subtext");

  if (!btn || !menu || !kitInfo || !overviewValue || !overviewSubtext) return;

  // build dropdown list
  menu.innerHTML = "";
  kits.forEach(kit => {
    const li = document.createElement("li");
    li.setAttribute("role", "option");
    li.dataset.value = kit.id;
    li.innerHTML = `
      ${kit.name} <span class="checkmark" style="visibility: ${kit.id === selectedId ? 'visible' : 'hidden'}"><i class="ph ph-check"></i></span>
    `;
    li.setAttribute("aria-selected", kit.id === selectedId ? "true" : "false");
    menu.appendChild(li);
  });

  function updateKitInfo(kitId) {
    const kit = kits.find(k => k.id === kitId);
    if (!kit) return;

    const currentSelectedChecklist = getCurrentSelectedChecklist();

    kitInfo.innerHTML = `<strong>${kit.name}</strong><p>${kit.desc}</p>`;
    document.querySelector('.progress-percent').textContent = `${currentSelectedChecklist.progressInPercent}%`
    overviewValue.textContent = kit.name;
    overviewSubtext.textContent = kit.desc;

    btn.innerHTML = `${kit.name} <span class="arrow"><i class="ph ph-caret-down"></i></span>`;
    renderCategoryProgress();
  }

  // initial render
  updateKitInfo(selectedId);

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !expanded);
    menu.hidden = expanded;
  });

  // dropdown option click
  menu.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      const selectedKitId = option.dataset.value;

      menu.querySelectorAll("li").forEach(li => {
        li.setAttribute("aria-selected", "false");
        li.querySelector(".checkmark").style.visibility = "hidden";
      });
      option.setAttribute("aria-selected", "true");
      option.querySelector(".checkmark").style.visibility = "visible";

      appData.appSettings.selectedChecklistVersionId = selectedKitId;
      saveAppData(appData);

      updateKitInfo(selectedKitId);
      renderOverview();

      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    });
  });

  // close menu on outside click
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }
  });
}
