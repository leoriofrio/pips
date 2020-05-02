import { ClientColumns } from '../../app.keys';

export const COLUMNS_CLIENT = [
    {field: ClientColumns.ID.prop, headerName: ClientColumns.ID.name },
    {field: ClientColumns.RUC.prop , headerName: ClientColumns.RUC.name },
    {field: ClientColumns.NAME.prop , headerName: ClientColumns.NAME.name },
    {field: ClientColumns.ADDRESS.prop , headerName: ClientColumns.ADDRESS.name },
    {field: ClientColumns.PHONE.prop , headerName: ClientColumns.PHONE.name },
    {field: ClientColumns.MAIL.prop , headerName: ClientColumns.MAIL.name },    
  ];