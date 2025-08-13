import { getUserLocation } from "../core/geolocation.js";
import { getWeather } from "../core/weather.js";
import { renderAlertReminder } from "./alert.js";

const kitCategories = {
  personal: [
    { name: "Food & Water", current: 0, total: 5 },
    { name: "Medical & Health", current: 0, total: 4 },
    { name: "Documents", current: 0, total: 3 },
    { name: "Tools & Equipment", current: 0, total: 5 },
    { name: "Clothing", current: 0, total: 3 },
    { name: "Electronics", current: 0, total: 2 },
    { name: "Personal Care", current: 0, total: 2 }
  ],
  family: [
    { name: "Food & Water", current: 0, total: 3 },
    { name: "Medical & Health", current: 0, total: 1 },
    { name: "Documents", current: 0, total: 2 },
    { name: "Tools & Equipment", current: 0, total:2 },
    { name: "Clothing", current: 0, total:1 },
    { name: "Personal Care", current: 0, total: 2 }
  ],
  pet: [
    { name: "Pet Supplies", current: 0, total: 8 }
  ]
};

export const dashboard = async () => {
  try {
    const { isAllowed, data } = await getUserLocation();
    const { lat, lon } = data;
    const response = await getWeather(lat, lon);
    renderAlertReminder(response);
    initKitSwitcher();
  } catch (error) {
    console.error(error);
  }
};

function renderCategoryProgress(kitType) {
  const list = document.querySelector(".progress-list");
  if (!list) return;

  list.innerHTML = ""; 
  const categories = kitCategories[kitType] || [];

  categories.forEach(cat => {
    const li = document.createElement("li");

    const labelContainer = document.createElement("div");
    labelContainer.className = "progress-label";

    const nameSpan = document.createElement("span");
    nameSpan.className = "label-name";
    nameSpan.textContent = cat.name;

    const valueSpan = document.createElement("span");
    valueSpan.className = "label-value";
    const percent = cat.total ? Math.round((cat.current / cat.total) * 100) : 0;
    valueSpan.textContent = `${cat.current}/${cat.total} (${percent}%)`;

    labelContainer.appendChild(nameSpan);
    labelContainer.appendChild(valueSpan);

    const bar = document.createElement("div");
    bar.className = "progress-bar";

    const fill = document.createElement("div");
    fill.className = "progress-bar-fill";
    fill.style.width = percent + "%";

    bar.appendChild(fill);

    li.appendChild(labelContainer);
    li.appendChild(bar);
    list.appendChild(li);
  });
}

function initKitSwitcher() {
  const kits = {
    personal: {
      title: "Personal Kit",
      desc: "Essential items for one person (72-hour survival)",
    },
    family: {
      title: "Family Kit",
      desc: "Comprehensive kit for families with children",
    },
    pet: {
      title: "Pet Kit",
      desc: "Additional supplies for pets during emergencies",
    },
  };

  const btn = document.getElementById("kit-dropdown-btn");
  const menu = document.getElementById("kit-dropdown-menu");
  const options = menu.querySelectorAll("li");
  const kitInfo = document.getElementById("kit-info");

  const overviewValue = document.querySelector(".active-kit-overview-card-title");
  const overviewSubtext = document.querySelector(".active-kit-overview-card-p"); 

  if (!btn || !menu || !kitInfo || !overviewValue || !overviewSubtext) return;

  function updateKitInfo(key) {
    const { title, desc } = kits[key];
    kitInfo.innerHTML = `<strong>${title}</strong><p>${desc}</p>`;
    overviewValue.textContent = title;
    overviewSubtext.textContent = desc;
    renderCategoryProgress(key);
  }

  updateKitInfo("personal");

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !expanded);
    menu.hidden = expanded;
  });

  options.forEach((option) => {
  option.addEventListener("click", () => {
    options.forEach((opt) => opt.setAttribute("aria-selected", "false"));
    option.setAttribute("aria-selected", "true");

    const arrow = btn.querySelector(".arrow") || document.createElement("span");
    arrow.classList.add("arrow");
    arrow.textContent = "▾";

    btn.innerHTML = `${option.textContent.trim()} `;
    btn.appendChild(arrow);

    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");

    updateKitInfo(option.dataset.value);
  });
});

  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }
  });
}