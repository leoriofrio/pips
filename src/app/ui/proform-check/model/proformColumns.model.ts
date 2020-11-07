
import { FormlyFieldConfig, FieldType } from '@ngx-formly/core';
import { Proform, ProformDetail } from '../../../app.keys';
import { of } from 'rxjs';


export const COLUMNS_DETAIL_PROFORM = [
    {field: ProformDetail.ID.prop, headerName: ProformDetail.ID.name, resizable: true, width: 60  },
    {field: ProformDetail.DEGREE.prop, headerName: ProformDetail.DEGREE.name, resizable: true, width: 100 },
    {field: ProformDetail.PRODUCT_ID.prop, headerName: ProformDetail.PRODUCT_ID.name, resizable: true, width: 400 }, 
    {field: 'codigo', headerName: 'Codigo Producto', resizable: true, width: 400 }, 
    {field: ProformDetail.QUANTITY.prop, headerName: ProformDetail.QUANTITY.name, resizable: true, width: 120},
    {field: ProformDetail.QUANTITY_CHECK.prop, headerName: ProformDetail.QUANTITY_CHECK.name, resizable: true, width: 120}
  ];

export const COLUMNS_DETAIL = [
  { data: ProformDetail.ID.prop, readOnly: true },
  { type: 'text', data: ProformDetail.DEGREE.prop,  },
  { type: 'autocomplete', 
    data: 'codigo', 
    renderer: 'currency', 
    strict: true, 
    filter: false},
  { type: 'autocomplete', 
    data: ProformDetail.PRODUCT_ID.prop, 
    renderer: 'currency', 
    strict: true, 
    filter: false},
  { type: 'numeric', data: ProformDetail.QUANTITY.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.QUANTITY_CHECK.prop, renderer: 'currency'  },
]

export const COLUMNS_HEADER = [
  ProformDetail.ID.name, ProformDetail.DEGREE.name, 'codigo',  ProformDetail.PRODUCT_ID.name, ProformDetail.QUANTITY.name, 
  ProformDetail.QUANTITY_CHECK.name
];



  