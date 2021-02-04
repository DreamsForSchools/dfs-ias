  
export const schoolColumns = [
  { name: 'name', title: 'Name'},
  { name: 'address', title: 'Address'},
  { name: 'programs', title: 'Programs', getCellValue: row=> {
    return row.programs?Object.keys(row.programs):[]
  }},
  { name: 'schedule', title: 'Schedule', getCellValue: row=> {
    return row.programs?row.programs[Object.keys(row.programs)[0]]:{}
  }},
  { name: 'number_of_instructors', title: 'Num. Inst.', getCellValue: row=> {
    return row.programs?row.programs[Object.keys(row.programs)[0]]['number_of_instructors']:{}
  }},
  { name: 'special_language_request', title: 'Language Requests'},
  { name: 'is_virtual', title: 'Virtual'},
  { name: 'location_preferences', title: 'Location Preference'},
  { name: 'program_time_flexibility', title: 'Flexible Schedule'},
  { name: 'region', title: 'Region'},
];

export const schoolDefaultColumnWidths = [
    { columnName: 'name', width: 270 },
    { columnName: 'address', width: 200 },
    { columnName: 'programs', width: 110 },
    { columnName: 'schedule', width: 290 },
    { columnName: 'number_of_instructors', width: 111 },
    { columnName: 'special_language_request', width: 180 },
    { columnName: 'is_virtual', width: 100 },
    { columnName: 'location_preferences', width: 135 },
    { columnName: 'program_time_flexibility', width: 100},
    { columnName: 'region', width: 135},
  ];
  
  export const schoolDefaultColumnOrder = [
    'name',
    'programs',
    'schedule',
    'number_of_instructors',
    'special_language_request',
    'is_virtual',
    'region',
    'location_preferences',
    'address',
    'program_time_flexibility',
  ];