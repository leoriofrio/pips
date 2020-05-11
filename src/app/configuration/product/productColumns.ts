import { ProductColumns } from '../../app.keys';

export const COLUMNS_PRODUCT = [
    {field: ProductColumns.ID.prop, headerName: ProductColumns.ID.name, resizable: true, width: 60 },    
    {field: ProductColumns.COD.prop, headerName: ProductColumns.COD.name, resizable: true, width: 150 }, 
    {field: ProductColumns.SUBLINE.prop, headerName: ProductColumns.SUBLINE.name, resizable: true, width: 100 },
    {field: ProductColumns.DESCRIPTION.prop, headerName: ProductColumns.DESCRIPTION.name, resizable: true, width: 450 },
    {field: ProductColumns.SERIE.prop, headerName: ProductColumns.SERIE.name, resizable: true, width: 280 },
    {field: ProductColumns.NIVEL.prop, headerName: ProductColumns.NIVEL.name, resizable: true, width: 150 },
    {field: ProductColumns.DEGREE.prop, headerName: ProductColumns.DEGREE.name, resizable: true, width: 90 }, 
    {field: ProductColumns.BUSINESS_LINE.prop, headerName: ProductColumns.BUSINESS_LINE.name, resizable: true, width: 150 }, 
    {field: ProductColumns.ISBN.prop, headerName: ProductColumns.ISBN.name, resizable: true, width: 150 }, 
    {field: ProductColumns.REGION.prop, headerName: ProductColumns.REGION.name, resizable: true, width: 90 }    
  ];

  export const COLUMNS_PINNED_TOP_DATA = [
    {
      
    }
  ];

  