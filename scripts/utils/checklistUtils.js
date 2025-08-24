import { loadAppData } from "../core/appData.js"


export const getCurrentSelectedChecklist = () => {
  const { appSettings, checklistVersions, checklistItems } = loadAppData();
  const currentChecklistKit = checklistVersions.find(k => k.id === appSettings.selectedChecklistVersionId);
  const currentChecklistItems = checklistItems.filter(i => i.checklistVersionId === appSettings.selectedChecklistVersionId)
  return {
    ...currentChecklistKit,
    currentChecklistItems
  };
}

export const getAllChecklistKitVersions = () => {
  const { checklistVersions } = loadAppData();
  return checklistVersions;
}

export const getAllChecklistCategories = () => {
  const { categories } = loadAppData();
  return categories;
}

export const getAllChecklistItems = () => {
  const { checklistItems } = loadAppData();
  return checklistItems;
}

export const getAllChecklistItemsByCategories = () => {
  const { categories, checklistItems, appSettings } = loadAppData();

  let ChecklistGroupedByCategories = {};
  categories.forEach((category, index) => {
    ChecklistGroupedByCategories[index] = {
      category,
      items: checklistItems.filter((item) => item.categoryId === category.id && item.checklistVersionId === appSettings.selectedChecklistVersionId)
    };
    if (!ChecklistGroupedByCategories[index].items.length)
      delete ChecklistGroupedByCategories[index];
  });
  // console.log(ChecklistGroupedByCategories);
  return ChecklistGroupedByCategories;
}