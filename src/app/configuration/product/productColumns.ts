import { ProductColumns } from '../../app.keys';

export const COLUMNS_PRODUCT = [
    {field: ProductColumns.ID.prop, headerName: ProductColumns.ID.name },
    {field: ProductColumns.SUBLINE.prop, headerName: ProductColumns.SUBLINE.name },
    {field: ProductColumns.COD.prop, headerName: ProductColumns.COD.name }, 
    {field: ProductColumns.DESCRIPTION.prop, headerName: ProductColumns.DESCRIPTION.name},
    {field: ProductColumns.STATUS.prop, headerName: ProductColumns.STATUS.name}, 
    {field: ProductColumns.STOCK.prop, headerName: ProductColumns.STOCK.name}, 
    {field: ProductColumns.DEGREE.prop, headerName: ProductColumns.DEGREE.name}, 
    {field: ProductColumns.BUSINESS_LINE.prop, headerName: ProductColumns.BUSINESS_LINE.name}, 
    {field: ProductColumns.ISBN.prop, headerName: ProductColumns.ISBN.name}, 
    {field: ProductColumns.REGION_ID.prop, headerName: ProductColumns.REGION_ID.name}
  ];
