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
    renderKitVersions();
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
        renderKitVersions();
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
        renderKitVersions();
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
        renderKitVersions();
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
        renderKitVersions();
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
        renderKitVersions();
      });
    });
  }

  // initialized selected kit version
  initializeSelectedKit();
  function initializeSelectedKit() {
    const { appSettings, checklistVersions } = loadAppData();
    const { selectedChecklistVersionId } = appSettings;

    const kitVersionSelectInput = document.querySelector('#kitVersion');
    let kitVersionSelectInputHTML = '';
    checklistVersions.forEach(e => {
      kitVersionSelectInputHTML += `
      <option class="kit-options" value="${e.id}" ${e.id === selectedChecklistVersionId ? 'selected' : ''}>${e.name}</option>
    `;
    });
    kitVersionSelectInput.innerHTML = kitVersionSelectInputHTML;
    renderKitDetails();
  }

  // handle on change of kit version dropdown selection
  document.querySelector('#kitVersion').addEventListener('change', e => {
    const data = loadAppData(); // need to retrieve the data from localStorage again baka kasi updated,
    data.appSettings.selectedChecklistVersionId = e.target.value;
    saveAppData(data);
    renderKitDetails();
    renderChecklist();
    renderKitVersions();
  });


  const addKitForm = document.querySelector('#add-kit-form');
  addKitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const checklistKitVersions = getAllChecklistKitVersions();
    const addKitFormData = new FormData(addKitForm);
    const kitName = addKitFormData.get('kitName');
    const kitDescription = addKitFormData.get('kitDescription');
    const data = loadAppData();
    const today = new Date();

    checklistKitVersions.push({
      id: crypto.randomUUID(),
      name: kitName,
      desc: kitDescription,
      createdAt: today,
      updatedAt: today,
    });
    console.log(data);
    data.checklistVersions = checklistKitVersions;
    saveAppData(data);
    renderChecklist();
    e.target.reset();
    renderKitDetails();
    renderKitVersions();
  });

  // initialize kit versions
  renderKitVersions();
  function renderKitVersions() {
    const checklistKitVersions = getAllChecklistKitVersions();
    const { appSettings } = loadAppData();
    let checklistKitVersionsHTML = '';
    const isDisabled = checklistKitVersions.length <= 1 ? 'disabled' : '';

    checklistKitVersions.forEach(c => {
      checklistKitVersionsHTML += `
      <div class="card emergency-kit-card" data-id="${c.id}">
        <div class="checklist-info">
          <h3 class="checklist-title">${c.name}</h3>
          <p class="checklist-desc">${c.desc}</p>
          <div class="checklist-progress">
            <span>${c.totalItems} items</span> • <span>${c.totalCheckedItems} completed</span>
          </div>
        </div>

        <div class="checklist-actions">
          ${appSettings.selectedChecklistVersionId === c.id
          ? '<span class="status-badge active">Selected</span>'
          : ''}
          <button class="btn-edit btn-edit-kit" data-id="${c.id}">
            <i class="ph ph-pencil"></i>
          </button>
          <button 
            class="btn-delete btn-delete-kit ${isDisabled}"
            data-id="${c.id}"
            ${isDisabled}>
            <i class="ph ph-trash"></i>
          </button>
        </div>
      </div>
    `;
    });

    document.querySelector('.emergency-kits-list').innerHTML = checklistKitVersionsHTML;

    initializeSelectedKit();
    deleteKitHandler();
    editKitHandler();
  }

  function editKitHandler() {
    const kitsEditBtn = document.querySelectorAll('.btn-edit-kit');

    kitsEditBtn.forEach(editBtn => {
      editBtn.addEventListener('click', e => {
        const data = loadAppData();
        const { checklistVersions } = data;
        const kitId = e.currentTarget.dataset.id;
        const kit = checklistVersions.find(k => k.id === kitId);
        if (!kit) return;

        // find the card element
        const card = e.currentTarget.closest('.emergency-kit-card');

        card.innerHTML = `
        <form class="edit-kit-form">
          <div class="form-fields">
            <div class="kit-form-input">
              <div class="field-container kit-field-container">
                <label>Kit Name</label>
                <input type="text" name="kitName" value="${kit.name}" required />
              </div>
              <div class="field-container kit-field-container">
                <label>Kit Description</label>
                <input type="text" name="kitDescription" value="${kit.desc}" required />
              </div>
            </div>
            <div class="kit-form-action">
              <div class="form-actions">
                <button type="submit" class="btn btn-success">Save</button>
                <button type="button" class="btn btn-danger btn-cancel-edit">Cancel</button>
              </div>
            </div>
          </div>
        </form>
      `;

        const form = card.querySelector('.edit-kit-form');
        const cancelBtn = card.querySelector('.btn-cancel-edit');

        // save handler
        form.addEventListener('submit', ev => {
          ev.preventDefault();
          const formData = new FormData(form);
          kit.name = formData.get('kitName').trim();
          kit.desc = formData.get('kitDescription').trim();
          kit.updatedAt = new Date();

          saveAppData(data);
          renderKitVersions();
          renderKitDetails(); 
        });

        // cancel handler
        cancelBtn.addEventListener('click', () => {
          renderKitVersions(); 
        });
      });
    });
  }

  function deleteKitHandler() {
    const kitsDeleteBtn = document.querySelectorAll('.btn-delete-kit');
    kitsDeleteBtn.forEach(kitDeleteBtn => {
      kitDeleteBtn.addEventListener('click', e => {
        const data = loadAppData();
        const { checklistVersions, checklistItems, appSettings } = data;
        const kitId = e.currentTarget.dataset.id;

        if (checklistVersions.length <= 1) {
          console.log('Cannot delete last remaining kit');
          return;
        }

        const kitItems = checklistItems.filter(i => i.checklistVersionId === kitId);

        if (kitItems.length > 0) {
          showConfirmModal(
            `This kit has ${kitItems.length} items.\nDo you really want to delete it?`,
            () => {
              proceedDeleteKit(data, kitId);
            }
          );
        } else {
          proceedDeleteKit(data, kitId);
        }
      });
    });

    function proceedDeleteKit(data, kitId) {
      let { checklistVersions, checklistItems, appSettings } = data;

      if (appSettings.selectedChecklistVersionId === kitId) {
        const availableKits = checklistVersions.filter(k => k.id !== kitId);
        appSettings.selectedChecklistVersionId = availableKits[0]?.id || null;
      }

      data.checklistVersions = checklistVersions.filter(i => i.id !== kitId);
      data.checklistItems = checklistItems.filter(i => i.checklistVersionId !== kitId);

      saveAppData(data);
      renderChecklist();
      renderKitDetails();
      renderKitVersions();
    }
  }

  // initialize categories
  renderCategories();
  function renderCategories() {
    const categories = getAllChecklistCategories();
    let categoriesHTML = '';
    let categoriesOptionsHTML = '';
    categories.forEach(c => {
      categoriesHTML += `
      <div class="card emergency-category-card" data-id="${c.id}">
        <div class="checklist-info">
          <h3 class="checklist-title">${c.name}</h3>
        </div>

        <div class="checklist-actions">
          <button class="btn-edit btn-edit-category" data-id="${c.id}">
            <i class="ph ph-pencil"></i>
          </button>
          <button class="btn-delete btn-delete-category" data-id="${c.id}">
            <i class="ph ph-trash"></i>
          </button>
        </div>
      </div>
    `;
      // also refresh dropdown options
      categoriesOptionsHTML += `
        <option value="${c.id}">${c.name}</option>
      `;
    });
    document.querySelector('#itemCategory').innerHTML = categoriesOptionsHTML;
    document.querySelector('.categories-list').innerHTML = categoriesHTML;

    editCategoryHandler();
    deleteCategoryHandler();
  }

  const addCategoryForm = document.querySelector('#add-category-form');
  addCategoryForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = loadAppData();
    const { categories } = data;
    const addCategoryFormData = new FormData(addCategoryForm);
    const categoryName = addCategoryFormData.get('categoryName');
    const today = new Date();

    categories.push({
      id: crypto.randomUUID(),
      name: categoryName,
      createdAt: today,
      updatedAt: today,
    });

    data.categories = categories;
    saveAppData(data);
    renderCategories();
    addCategoryForm.reset();
  });

  function editCategoryHandler() {
    const editBtns = document.querySelectorAll('.btn-edit-category');

    editBtns.forEach(editBtn => {
      editBtn.addEventListener('click', e => {
        const data = loadAppData();
        const { categories } = data;
        const categoryId = e.currentTarget.dataset.id;
        const category = categories.find(c => c.id === categoryId);
        if (!category) return;

        const card = e.currentTarget.closest('.emergency-category-card');
        card.innerHTML = `
        <form class="edit-category-form">
          <div class="form-fields">
            <div clas="category-form-input">
              <div class="field-container">
                <label>Category Name</label>
                <input type="text" name="categoryName" value="${category.name}" required />
              </div>
            </div>
            <div class="category-form-action">
              <div class="form-actions">
                <button type="submit" class="btn btn-success">Save</button>
                <button type="button" class="btn btn-danger btn-cancel-edit">Cancel</button>
              </div>
            </div>
          </div>
        </form>
      `;

        const form = card.querySelector('.edit-category-form');
        const cancelBtn = card.querySelector('.btn-cancel-edit');

        // save handler
        form.addEventListener('submit', ev => {
          ev.preventDefault();
          const formData = new FormData(form);
          category.name = formData.get('categoryName').trim();
          category.updatedAt = new Date();

          saveAppData(data);
          renderCategories();
          renderChecklist();
        });

        // cancel handler
        cancelBtn.addEventListener('click', () => {
          renderCategories(); // restore orig card
        });
      });
    });
  }

  function deleteCategoryHandler() {
    const deleteBtns = document.querySelectorAll('.btn-delete-category');

    deleteBtns.forEach(deleteBtn => {
      deleteBtn.addEventListener('click', e => {
        const data = loadAppData();
        let { categories, checklistItems } = data;
        const categoryId = e.currentTarget.dataset.id;
        const categoryItems = checklistItems.filter(i => i.categoryId === categoryId);

        if (categoryItems.length > 0) {
          showConfirmModal(
            `This category has ${categoryItems.length} items.\nDo you really want to delete it?`,
            () => {
              proceedDeleteCategory(data, categoryId);
            }
          );
        } else {
          proceedDeleteCategory(data, categoryId);
        }
      });
    });

    function proceedDeleteCategory(data, categoryId) {
      let { categories, checklistItems } = data;
      data.categories = categories.filter(c => c.id !== categoryId);
      data.checklistItems = checklistItems.filter(i => i.categoryId !== categoryId);

      saveAppData(data);
      renderCategories();
      renderChecklist();
    }
  }

  function showConfirmModal(message, onConfirm) {
    const modal = document.querySelector('#confirmModal');
    const messageBox = document.querySelector('#confirmMessage');
    const btnYes = document.querySelector('#confirmYes');
    const btnNo = document.querySelector('#confirmNo');

    messageBox.textContent = message;
    modal.classList.remove('hidden');

    // remove old listeners
    const newYes = btnYes.cloneNode(true);
    btnYes.parentNode.replaceChild(newYes, btnYes);
    const newNo = btnNo.cloneNode(true);
    btnNo.parentNode.replaceChild(newNo, btnNo);

    // attach fresh listeners
    newYes.addEventListener('click', () => {
      modal.classList.add('hidden');
      onConfirm();
    });
    newNo.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }
}