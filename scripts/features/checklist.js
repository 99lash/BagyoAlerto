import { loadAppData, resetAppData, saveAppData } from '../core/appData.js';
import { getAllChecklistKitVersions, getCurrentSelectedChecklist, getAllChecklistCategories, getAllChecklistItemsByCategories, getAllChecklistItems } from '../utils/checklistUtils.js';

export const checklist = () => {

  // tab handler
  const btnTabs = document.querySelectorAll('.actions-tablist-item');
  const contentTabs = document.querySelectorAll('.actions-tablist-content');
  btnTabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
      const clickedTab = e.target;

      //disable previous active-tab
      for (var i = 0; i < btnTabs.length; i++) {
        if (btnTabs[i].classList.contains('active-tab') && contentTabs[i].classList.contains('active-tab-content')) {
          btnTabs[i].classList.remove('active-tab');
          contentTabs[i].classList.remove('active-tab-content');
          break;
        }
      }
      clickedTab.classList.add('active-tab');
      contentTabs[index].classList.add('active-tab-content');
    });
  });

  function renderKitDetails() {
    const currentChecklist = getCurrentSelectedChecklist()
    // document.querySelector('.active-kit-progress').innerHTML = progress;
    document.querySelector('.active-kit-description').innerHTML = currentChecklist.desc;
  }
  // initialized selected kit version
  initializeSelectedKit();
  function initializeSelectedKit() {
    const { appSettings, checklistVersions } = loadAppData();
    const { selectedChecklistVersionId } = appSettings;

    const kitVersionSelectInput = document.querySelector('#kitVersion');
    checklistVersions.forEach(e => {
      kitVersionSelectInput.innerHTML += `
      <option class="kit-options" value="${e.id}" ${e.id === selectedChecklistVersionId ? 'selected' : ''}>${e.name}</option>
    `;
    });
    renderKitDetails();
    // handle on change of kit version dropdown selection
    kitVersionSelectInput.addEventListener('change', e => {
      const data = loadAppData(); // need to retrieve the data from localStorage again baka kasi updated,
      data.appSettings.selectedChecklistVersionId = e.target.value;
      saveAppData(data);
      renderKitDetails();
      renderChecklist();
    });
  }

  // initialize kit versions
  const checklistKitVersions = getAllChecklistKitVersions();
  checklistKitVersions.forEach(c => {
    document.querySelector('.emergency-kits-list').innerHTML += `
      <div class="card emergency-kit-card">
        <div class="checklist-info">
          <h3 class="checklist-title">
            ${c.name}
          </h3>
          <p class="checklist-desc">
            ${c.desc}
          </p>
          <div class="checklist-progress">
            <span>0 items</span> • <span>0 completed</span>
          </div>
        </div>

        <div class="checklist-actions">
          <span class="status-badge active">Active</span>
          <button class="btn-edit">
            <i class="ph ph-pencil"></i>
          </button>
          <button class="btn-delete">
            <i class="ph ph-trash"></i>
          </button>
        </div>
      </div>
    `;
  });


  // initialize item categories
  const checklistCategories = getAllChecklistCategories();
  checklistCategories.forEach(c => {
    document.querySelector('.categories-list').innerHTML += `
      <div class="card emergency-kit-card">
        <div class="checklist-info">
          <h3 class="checklist-title">
            ${c.name}
          </h3>
        </div>

        <div class="checklist-actions">
          <button class="btn-edit">
            <i class="ph ph-pencil"></i>
          </button>
          <button class="btn-delete">
            <i class="ph ph-trash"></i>
          </button>
        </div>
      </div>
    `;
    document.querySelector('#itemCategory').innerHTML += `
      <option value="${c.id}">${c.name}</option>
    `;
  });


  // handle add item form
  const addItemForm = document.querySelector('#add-item-form');
  addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const checklistItems = getAllChecklistItems();
    const addItemFormData = new FormData(addItemForm);
    const itemName = addItemFormData.get('itemName');
    const categoryId = addItemFormData.get('itemCategory');
    const data = loadAppData();
    const today = new Date();

    checklistItems.push({
      id: crypto.randomUUID(),
      checklistVersionId: data.appSettings.selectedChecklistVersionId,
      categoryId,
      name: itemName,
      isChecked: false,
      createdAt: today,
      updatedAt: today,
    });
    // console.log(data);
    data.checklistItems = checklistItems;
    saveAppData(data);
    renderChecklist();
    e.target.reset();
    // console.log(checklistItems);
  });




  renderChecklist();
  function renderChecklist() {
    const checklistItemsByCategories = getAllChecklistItemsByCategories();
    console.log(checklistItemsByCategories);
    let checklistTemplateHTML = '';
    for (const list of Object.values(checklistItemsByCategories)) {
      const { category, items } = list;
      let itemsTemplateHTML = '';
      let checkedCount = 0;

      items.forEach(item => {
        checkedCount += item.isChecked ? 1 : 0
        itemsTemplateHTML += `
        <li>
          <div class="item-container">
            <label>
              <input type="checkbox" class="item" id="${item.id}" data-id="${item.id}" ${item.isChecked && 'checked' || ''} >
              ${item.name}
            </label>
            <button class="btn-delete-item" data-id="${item.id}">
              <i class="ph ph-trash"></i>
            </button>
          </div>
        </li>`;
      });

      checklistTemplateHTML += `
      <div class="category-card" data-id="${category.id}">
        <!-- Header -->
        <div class="category-header">
          <h3>${category.name}
            <span class="category-progress">
              (${checkedCount} of ${items.length} items, ${((checkedCount / items.length) * 100).toFixed(2)}%)
            </span>
          </h3>
          <div class="category-actions">
            <button class="btn-check"><i class="ph ph-check"></i></button>
            <button class="btn-uncheck"><i class="ph ph-x"></i></button>
            <button class="btn-delete"><i class="ph ph-trash"></i></button>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="progress-bar">
          <div class="progress-fill" style="width: 0%;"></div>
        </div>

        <!-- Items list -->
        <ul class="category-items">
          ${itemsTemplateHTML}
        </ul>
      </div>
    \n`;
    }
    document.querySelector('.checklist-list').innerHTML = checklistTemplateHTML;
    checklistTemplateHTML = '';
    isChecklistDoneHandler();
  }

  // isChecked listener para sa checklist items
  function isChecklistDoneHandler() {
    const items = document.querySelectorAll('.item');
    // console.log(items);
    items.forEach((item, index) => {
      item.addEventListener('change', e => {
        const data = loadAppData();
        const { checklistItems } = data;
        const itemCheckbox = e.target;
        console.log(`${itemCheckbox.dataset.id} is ${itemCheckbox.checked ? 'checked' : 'unchecked'}`);
        data.checklistItems = checklistItems.map((i) => {
          if (i.id === itemCheckbox.dataset.id) {
            i.isChecked = !i.isChecked;
          }
          return i;
        });
        // console.log(itemCheckbox.checked);
        saveAppData(data);
        renderChecklist();
      });
    });
  }
}