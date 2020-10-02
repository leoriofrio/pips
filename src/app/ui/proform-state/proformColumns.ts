import { Proform } from '../../app.keys';

export const COLUMNS_PROFORM = [
  {
    headerName: ' ',
    field: 'value',
    cellRenderer: 'selectProjectRenderer',
    colId: 'params',
    width: 85
  },
  { field: Proform.ID.prop, headerName: Proform.ID.name, resizable: true, width: 90 },
  { field: Proform.NUMBER_PROFORM.prop, headerName: Proform.NUMBER_PROFORM.name, resizable: true, width: 150 },
  { field: Proform.DATE_PROFORM.prop, headerName: Proform.DATE_PROFORM.name, resizable: true, width: 120 },
  { field: Proform.DATE_DELIVERY.prop, headerName: Proform.DATE_DELIVERY.name, resizable: true, width: 120 },
  { field: Proform.USER_ID.prop, headerName: Proform.USER_ID.name, resizable: true, width: 150 },
  { field: Proform.CLIENT_ID.prop, headerName: Proform.CLIENT_ID.name, resizable: true, width: 150 },
  { field: Proform.COLLEGE_ID.prop, headerName: Proform.COLLEGE_ID.name, resizable: true, width: 200 },
  {
    headerName: ' ',
    field: 'value',
    cellRenderer: 'proformOptionsStateRenderer',    
    width: 250
  }
];