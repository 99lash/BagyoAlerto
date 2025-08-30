const appData = {
  meta: {
    schemaVersion: 1,
    updatedAt: '2025-08-13T10:55:08.801Z'
  },
  categories: [
    // mga fixed/default categories
    {
      id: 'cc891d39-5851-47d1-bc02-6deba2cdbe79',
      name: 'Food & Water',
      createdAt: '2025-08-13T10:55:08.801Z',
      updatedAt: '2025-08-13T10:55:08.801Z',
    },
    {
      id: '6091fd67-d94e-4366-a69d-b09c9d263aec',
      name: 'Document',
      createdAt: '2025-08-13T10:55:08.801Z',
      updatedAt: '2025-08-13T10:55:08.801Z',
    },
    {
      id: '108f2999-3683-4b9e-8a2f-44bb0d6c0ebf',
      name: 'Medical & Health',
      createdAt: '2025-08-13T10:55:08.801Z',
      updatedAt: '2025-08-13T10:55:08.801Z',
    },
    {
      id: '99d3a9c7-401d-488d-ad9f-fc52b6fba557',
      name: 'Electronics',
      createdAt: '2025-08-13T10:55:08.801Z',
      updatedAt: '2025-08-13T10:55:08.801Z',
    },
  ],
  checklistVersions: [
    // mga fixed/default checklist versions / kits
    {
      id: '54bdbb9b-a4d7-4356-88e8-dff9406eb6d9',
      name: 'Personal Kit',
      desc: 'For 1 person',
      createdAt: '2025-08-13T10:55:08.801Z',
      updatedAt: '2025-08-13T10:55:08.801Z',
    },
    {
      id: 'cf6238ee-81db-4080-b7df-0e9a8ccf4da7',
      name: 'Family Kit',
      desc: 'For 4-5 people',
      createdAt: '2025-08-13T10:55:08.801Z',
      updatedAt: '2025-08-13T10:55:08.801Z',
    },
    {
      id: 'f35e64f8-2e7b-48b8-b9b4-2968d7246c58',
      name: 'Pet Kit',
      desc: 'For my furbabies',
      createdAt: '2025-08-13T10:55:08.801Z',
      updatedAt: '2025-08-13T10:55:08.801Z',
    },
  ],
  checklistItems: [
    {
      id: '989ebfeb-a12f-459f-82d6-766c63d56657',
      checklistVersionId: '54bdbb9b-a4d7-4356-88e8-dff9406eb6d9',
      categoryId: 'cc891d39-5851-47d1-bc02-6deba2cdbe79',
      name: 'Instant Noodles',
      isChecked: false,
      createdAt: '2025-08-13T10:55:08.801Z',
      updatedAt: '2025-08-13T10:55:08.801Z'
    },
    {
      id: '989ebfeb-a12f-429f-82d6-766c63d56657',
      checklistVersionId: '54bdbb9b-a4d7-4356-88e8-dff9406eb6d9',
      categoryId: 'cc891d39-5851-47d1-bc02-6deba2cdbe79',
      name: 'Meow',
      isChecked: true,
      createdAt: '2025-08-13T10:55:08.801Z',
      updatedAt: '2025-08-13T10:55:08.801Z'
    },
  ],
  emergencyTypes: [
    // mga fixed/default emergency types sa PHperso
    { 
      id: 'de2624bd-8763-4a0e-bb98-35eed735b291',
      name: 'Government',
    },
    { 
      id: '6a15b012-46e9-4174-9946-1e0982924bb7',
      name: 'Local',
    },
    { 
      id: 'a8c46d92-40bc-434b-8560-c9f9a56cea78',
      name: 'Emergency',
    },
  ],
  emergencyContacts: [
    // mga fixed/default emergency contacts sa PH
    {
      id: '4344ed53-19bc-4b19-ad91-6ae39482d260',
      emergencyTypeId: 'de2624bd-8763-4a0e-bb98-35eed735b291',
      name: 'NDRRMC hotline',
      desc: 'National Disaster Risk Reduction and Management Council',
      number: '911',
    },
    {
      id: 'b7a64309-fea2-4177-a50b-0eff133b454a',
      emergencyTypeId: 'de2624bd-8763-4a0e-bb98-35eed735b291',
      name: 'PAGASA Weather',
      desc: 'Philippine Atmospheric, Geophysical and Astronomical Services Administration',
      number: '8284-0800',
    },
    {
      id: '4344ed53-19bc-4b19-ad91-6ae39482d260',
      emergencyTypeId: 'de2624bd-8763-4a0e-bb98-35eed735b291',
      name: 'DOH Health Emergency',
      desc: 'Department of Health emergency hotline',
      number: '1555',
    },
    {
      id: '79d2950f-1dca-40d2-a5b4-365a340b71ad',
      emergencyTypeId: 'a8c46d92-40bc-434b-8560-c9f9a56cea78',
      name: 'Philippine Red Cross',
      desc: 'Emergency assistance and rescue operations',
      number: '143',
    },
    {
      id: 'e51d3d45-0cdc-41b1-9159-28ecfeb66d1c',
      emergencyTypeId: 'a8c46d92-40bc-434b-8560-c9f9a56cea78',
      name: 'Coast Guard',
      desc: 'Maritime emergencies and rescue',
      number: '8527-8481',
    },
    {
      id: '268952a3-c589-4947-b9fd-8678b9431238',
      emergencyTypeId: 'a8c46d92-40bc-434b-8560-c9f9a56cea78',
      name: 'Fire Department',
      desc: 'Fire emergencies and rescue',
      number: '116',
    },
    {
      id: '4d69e116-de9a-4d02-92da-f0d369cbf859',
      emergencyTypeId: 'a8c46d92-40bc-434b-8560-c9f9a56cea78',
      name: 'Police Emergency',
      desc: 'Police emergency and response',
      number: '117',
    },
    {
      id: '017e2f92-f4f7-45c3-a270-f52d5beccea3',
      emergencyTypeId: '6a15b012-46e9-4174-9946-1e0982924bb7',
      name: 'Manila DRRMO',
      desc: 'Manila Disaster Risk Reduction and Management Office',
      number: '8527-5174',
    },
  ],
  themes: [
    { name: 'light' },
    { name: 'dark' }
  ],
  appSettings: {
    //default lang
    theme: 'light', 
    selectedChecklistVersionId: 'cf6238ee-81db-4080-b7df-0e9a8ccf4da7',
    updatedAt: '2025-08-13T10:55:08.801Z'
  }
}

export const saveAppData = (data) => {
  data.meta.lastUpdated = new Date().toISOString();
  localStorage.setItem('bagyoAlerto', JSON.stringify(data));
}

export const loadAppData = () => {
  const raw = localStorage.getItem('bagyoAlerto');
  return raw ? JSON.parse(raw) : null;
}

export const resetAppData = () => {
  saveAppData(appData);
}
