CategoryItem {
  id: string,
  name: string,
  createdAt: date,
  upaatedAt: date
}

ChecklistItem {
  id: string,
  checklistVersionId: string (FORIEGN),
  catergoryItemId: string (FORIEGN),
  name: string,
  isChecked: boolean,
  isCustom: boolean,
  createdAt: date,
  updatedAt: date
}

ChecklistVersion {
  id: string,
  name: string,
  description: string,
  createdAt: date,
  updatedAt: date
}

EmergencyType {
  id: string,
  name: string
}

EmergencyContact {
  id: string,
  emergencyTypeId: string (FOREIGN),
  name: string,
  number: string,
  description: string,
  createdAt: date,
  updatedAt: date
}

WeatherAlert {
  id: string,
  title: string,
  message: string,
  severity: 'low' | 'medium' | 'high',
  timtStamp: date
}

Theme {
  name: 'light' | 'dark'
}

AppSettings {
  theme: Theme.name (FOREIGN),
  selectedChecklistVersion: string,
  weatherAlertsEnabled: boolean,
  updateAt: date
}