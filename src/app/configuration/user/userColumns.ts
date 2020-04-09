import { UserColumns } from '../../app.keys';


export const COLUMNS_USER = [
    {field: UserColumns.ID.prop, headerName: UserColumns.ID.name },
    {field: UserColumns.EMAIL.prop, headerName: UserColumns.EMAIL.name },
    {field: UserColumns.FIRST_NAME.prop, headerName: UserColumns.FIRST_NAME.name }, 
    {field: UserColumns.LAST_NAME.prop, headerName: UserColumns.LAST_NAME.name},
    {field: UserColumns.PASSWORD.prop, headerName: UserColumns.PASSWORD.name}, 
    {field: UserColumns.STATUS.prop, headerName: UserColumns.STATUS.name}    
  ];