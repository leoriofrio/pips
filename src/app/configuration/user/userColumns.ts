import { UserColumns } from '../../app.keys';


export const COLUMNS_USER = [
    {field: UserColumns.ID.prop, headerName: UserColumns.ID.name, resizable: true, width: 60 },
    {field: UserColumns.COD_USER.prop, headerName: UserColumns.COD_USER.name, resizable: true, width: 90 },
    {field: UserColumns.REGION.prop, headerName: UserColumns.REGION.name, resizable: true, width: 100 }, 
    {field: UserColumns.NAME.prop, headerName: UserColumns.NAME.name, resizable: true, width: 250 },
    {field: UserColumns.USER_NAME.prop, headerName: UserColumns.USER_NAME.name, resizable: true, width: 200},
    {field: UserColumns.PASSWORD.prop, headerName: UserColumns.PASSWORD.name, resizable: true, width: 100},
    {field: UserColumns.ZONE.prop, headerName: UserColumns.ZONE.name, resizable: true, width: 320 },
    {field: UserColumns.PHONE.prop, headerName: UserColumns.PHONE.name, resizable: true, width: 120 },
    {field: UserColumns.MAIL.prop, headerName: UserColumns.MAIL.name, resizable: true, width: 250 },
    {field: UserColumns.POSITION.prop, headerName: UserColumns.POSITION.name, resizable: true, width: 200 },
  ];