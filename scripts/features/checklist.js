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
    const currentChecklist = getCurrentSelectedChecklist();
    document.querySelector('.active-kit-progress').innerHTML = `${currentChecklist.totalCheckedItems} of ${currentChecklist.totalItems} completed (${currentChecklist.progressInPercent}%)`;
    document.querySelector('.active-kit-description').innerHTML = currentChecklist.desc;
    // document.querySelector('#active-kit-progress-bar-fill').style.width = currentChecklist.progressInPercent;
    // console.log(parseInt(currentChecklist.progressInPercent));
    document.querySelector('#active-kit-progress-bar-fill').style.width = `${currentChecklist.progressInPercent}%`;

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
    renderKitDetails();
    // console.log(checklistItems);
  });

  renderChecklist();
  function renderChecklist() {
    const checklistItemsByCategories = getAllChecklistItemsByCategories();
    // console.log(checklistItemsByCategories);

    const prevWidths = {};
    document.querySelectorAll('.progress-bar-fill-category').forEach(bar => {
      console.log(bar.style.width);
      prevWidths[bar.id] = bar.style.width || '0%';
    });

    let checklistTemplateHTML = '';
    let categories = [];
    let categoryIndex = 0;

    for (const list of Object.values(checklistItemsByCategories)) {
      const { category, items, progressInPercent, totalCheckedItems, totalItems } = list;
      let itemsTemplateHTML = '';
      categories[categoryIndex++] = {
        id: category.id,
        progressInPercent
      };
      items.forEach(item => {
        itemsTemplateHTML += `
        <li>
          <div class="item-container">
            <label class="item-details">
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
              (${totalCheckedItems} of ${totalItems} items, ${progressInPercent}%)
            </span>
          </h3>
          <div class="category-actions">
            <button class="btn-check btn-check-category" data-id="${category.id}"><i class="ph ph-check"></i></button>
            <button class="btn-uncheck btn-uncheck-category" data-id="${category.id}"><i class="ph ph-x"></i></button>
            <button class="btn-delete btn-delete-category" data-id="${category.id}"><i class="ph ph-trash"></i></button>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="progress-bar">
          <div 
            class="progress-bar-fill progress-bar-fill-category"
            id="category-progress-bar-fill-${category.id}"
            style="width: ${prevWidths[`category-progress-bar-fill-${category.id}`] || '0%'}">
          </div>
        </div>

        <!-- Items list -->
        <ul class="category-items">
          ${itemsTemplateHTML}
        </ul>
      </div>\n
    `;
    }
    document.querySelector('.checklist-list').innerHTML = checklistTemplateHTML;

    requestAnimationFrame(() => {
      // document.querySelector(`#category-progress-bar-fill-${category.id}`).style.width = `${progressInPercent}%`;
      categories.forEach(category => {
        const progressBar = document.querySelector(`#category-progress-bar-fill-${category.id}`);
        progressBar.style.width = `${category.progressInPercent}%`;
        console.log(progressBar);
      });
    });
    // checklistTemplateHTML = '';
    isChecklistDoneHandler();
    deleteItemHandler();
    deleteAllCategoryItemsHandler();
    checkAllChecklistItemsByCategoryHandler();
    uncheckAllChecklistItemsByCategoryHandler();
  }

  function deleteItemHandler() {
    const itemsDeleteBtn = document.querySelectorAll('.btn-delete-item');
    itemsDeleteBtn.forEach(itemDeleteBtn => {
      itemDeleteBtn.addEventListener('click', e => {
        const data = loadAppData();
        const { checklistItems } = data;
        const itemId = e.currentTarget.dataset.id;
        // console.log(itemId);
        data.checklistItems = checklistItems.filter(i => i.id !== itemId);
        saveAppData(data);
        renderChecklist();
        renderKitDetails();
      });
    });
  }

  function deleteAllCategoryItemsHandler() {
    const categoriesDeleteBtn = document.querySelectorAll('.btn-delete-category');
    categoriesDeleteBtn.forEach(categoryDeleteBtn => {
      categoryDeleteBtn.addEventListener('click', e => {
        const data = loadAppData();
        let { checklistItems, appSettings } = data;
        const categoryId = e.currentTarget.dataset.id;
        const categoryChecklistItems = checklistItems.filter(i => i.categoryId === categoryId && i.checklistVersionId === appSettings.selectedChecklistVersionId)
        // console.log(categoryChecklistItems);
        categoryChecklistItems.forEach(i => {
          checklistItems = checklistItems.filter(j => j.id !== i.id);
        });
        data.checklistItems = checklistItems;
        saveAppData(data);
        renderChecklist();
        renderKitDetails();
      });
    })
  }

  function checkAllChecklistItemsByCategoryHandler() {
    const categoriesCheckBtn = document.querySelectorAll('.btn-check-category');
    categoriesCheckBtn.forEach(categoryCheckBtn => {
      categoryCheckBtn.addEventListener('click', e => {
        const data = loadAppData();
        let { checklistItems, appSettings } = data;
        const categoryId = e.currentTarget.dataset.id;
        data.checklistItems = checklistItems.map(i => {
          if (i.categoryId === categoryId && i.checklistVersionId === appSettings.selectedChecklistVersionId) {
            i.isChecked = true;
          }
          return i;
        });
        saveAppData(data);
        renderChecklist();
        renderKitDetails();
      });
    });
  }

  function uncheckAllChecklistItemsByCategoryHandler() {
    const categoriesUncheckBtn = document.querySelectorAll('.btn-uncheck-category');
    categoriesUncheckBtn.forEach(categoryCheckBtn => {
      categoryCheckBtn.addEventListener('click', e => {
        const data = loadAppData();
        let { checklistItems, appSettings } = data;
        const categoryId = e.currentTarget.dataset.id;
        data.checklistItems = checklistItems.map(i => {
          if (i.categoryId === categoryId && i.checklistVersionId === appSettings.selectedChecklistVersionId) {
            i.isChecked = false;
          }
          return i;
        });
        saveAppData(data);
        renderChecklist();
        renderKitDetails();
      });
    });
  }

  // checkbox listener para sa checklist items
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
        renderKitDetails();
      });
    });
  }
}