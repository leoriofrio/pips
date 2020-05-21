import { Proform } from '../../app.keys';

export const COLUMNS_PROFORM = [
    {field: Proform.ID.prop, headerName: Proform.ID.name, resizable: true, width: 160  },
    {field: Proform.NUMBER_PROFORM.prop , headerName: Proform.NUMBER_PROFORM.name, resizable: true, width: 150 },
    {field: Proform.DATE_PROFORM.prop , headerName: Proform.DATE_PROFORM.name, resizable: true, width: 120 },
    {field: Proform.DATE_DELIVERY.prop , headerName: Proform.DATE_DELIVERY.name, resizable: true, width: 120 },
    {field: Proform.CLIENT_ID.prop , headerName: Proform.CLIENT_ID.name, resizable: true, width: 150 },
    {field: Proform.COLLEGES_ID.prop , headerName: Proform.COLLEGES_ID.name, resizable: true, width: 200 },    
    {field: Proform.TYPE_CLIENT_SALE.prop , headerName: Proform.TYPE_CLIENT_SALE.name, resizable: true, width: 250 },
  ];