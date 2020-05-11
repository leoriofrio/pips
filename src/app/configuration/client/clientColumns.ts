import { ClientColumns } from '../../app.keys';

export const COLUMNS_CLIENT = [
    {field: ClientColumns.ID.prop, headerName: ClientColumns.ID.name, resizable: true, width: 60  },
    {field: ClientColumns.COD_CLIENT.prop , headerName: ClientColumns.COD_CLIENT.name, resizable: true, width: 100 },
    {field: ClientColumns.PROVINCE.prop , headerName: ClientColumns.PROVINCE.name, resizable: true, width: 150 },
    {field: ClientColumns.CITY.prop , headerName: ClientColumns.CITY.name, resizable: true, width: 150 },
    {field: ClientColumns.NAME.prop , headerName: ClientColumns.NAME.name, resizable: true, width: 400 },
    {field: ClientColumns.NICKNAME.prop , headerName: ClientColumns.NICKNAME.name, resizable: true, width: 400 },
    {field: ClientColumns.TYPE.prop , headerName: ClientColumns.TYPE.name, resizable: true, width: 120 },
    {field: ClientColumns.STATUS.prop , headerName: ClientColumns.STATUS.name, resizable: true, width: 180 },
  ];