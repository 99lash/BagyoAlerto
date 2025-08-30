// checklistUtils.js
import { loadAppData } from "../core/appData.js";

/**
 * Get currently selected checklist (kit) details with items and progress.
 */
export const getCurrentSelectedChecklist = () => {
  const { appSettings, checklistVersions, checklistItems } = loadAppData();
  const selectedId = appSettings.selectedChecklistVersionId;

  const currentChecklistKit = checklistVersions.find(k => k.id === selectedId);
  const currentChecklistItems = checklistItems.filter(i => i.checklistVersionId === selectedId);

  const totalItems = currentChecklistItems.length;
  const totalCheckedItems = currentChecklistItems.filter(i => i.isChecked).length;
  const progressInPercent = totalItems > 0
    ? Number(((totalCheckedItems / totalItems) * 100).toFixed(2))
    : 0;

  return {
    ...currentChecklistKit,
    currentChecklistItems,
    totalItems,
    totalCheckedItems,
    progressInPercent
  };
};

/** Return all checklist kit versions */
export const getAllChecklistKitVersions = () => {
  const { checklistVersions, checklistItems } = loadAppData();

  return checklistVersions.map(kit => {
    const items = checklistItems.filter(i => i.checklistVersionId === kit.id);
    const totalItems = items.length;
    const totalCheckedItems = items.filter(i => i.isChecked).length;

    return {
      ...kit,
      totalItems,
      totalCheckedItems
    };
  });
};


/** Return all categories */
export const getAllChecklistCategories = () => loadAppData().categories;

/** Return all checklist items */
export const getAllChecklistItems = () => loadAppData().checklistItems;

/**
 * Return checklist items grouped by categories (only for selected kit).
 */
export const getAllChecklistItemsByCategories = () => {
  const { categories, checklistItems, appSettings } = loadAppData();
  const selectedId = appSettings.selectedChecklistVersionId;

  return categories.reduce((grouped, category, index) => {
    const items = checklistItems.filter(
      item => item.categoryId === category.id && item.checklistVersionId === selectedId
    );

    if (items.length === 0) return grouped;

    const totalItems = items.length;
    const totalCheckedItems = items.filter(item => item.isChecked).length;
    const progressInPercent = totalItems > 0
      ? Number(((totalCheckedItems / totalItems) * 100).toFixed(2))
      : 0;

    grouped[index] = {
      category,
      items,
      totalItems,
      totalCheckedItems,
      progressInPercent
    };

    return grouped;

  }, {});
};

export const getAllCategoryProgressByChecklistVersions = () => {
  const { categories, checklistItems, checklistVersions } = loadAppData();

  return checklistVersions.map(kit => {
    const categoryProgress = categories.map(category => {
      const items = checklistItems.filter(
        item => item.checklistVersionId === kit.id && item.categoryId === category.id
      );

      const totalItems = items.length;
      const totalCheckedItems = items.filter(item => item.isChecked).length;
      const progressInPercent =
        totalItems > 0 ? Number(((totalCheckedItems / totalItems) * 100).toFixed(2)) : 0;

      return {
        category,
        items,
        totalItems,
        totalCheckedItems,
        progressInPercent,
      };
    });

    return {
      kit,
      categories: categoryProgress,
    };
  });
};

export const isCategoryNameExist = (categoryName = '') => {
  const { categories } = loadAppData();
  return categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
}

export const isItemNameExist = (itemName = '') => {
  const { checklistItems } = loadAppData();
  return checklistItems.find(i => i.name === itemName);
}

export const isKitNameExist = (kitName = '') => {
  const { checklistVersions } = loadAppData();
  return checklistVersions.find(k => k.name.toLowerCase() === kitName.toLowerCase());
}