
import { FormlyFieldConfig, FieldType } from '@ngx-formly/core';
import { Proform, ProformDetail } from '../../../app.keys';
import { of } from 'rxjs';

export const COLUMNS_DETAIL_PROFORM = [
    {field: ProformDetail.ID.prop, headerName: ProformDetail.ID.name, resizable: true, width: 60  },
    {field: ProformDetail.DEGREE.prop, headerName: ProformDetail.DEGREE.name, resizable: true, width: 100 },  //, cellRenderer: 'selectionRender'
    {field: ProformDetail.PRODUCT_ID.prop, headerName: ProformDetail.PRODUCT_ID.name, resizable: true, width: 400 }, 
    {field: 'codigo', headerName: 'Codigo Producto', resizable: true, width: 400 }, 
    {field: ProformDetail.QUANTITY.prop, headerName: ProformDetail.QUANTITY.name, resizable: true, width: 100},
    {field: ProformDetail.PRICE.prop, headerName: ProformDetail.PRICE.name, resizable: true, width: 100}, 
    {field: ProformDetail.SUB_TOTAL.prop, headerName: ProformDetail.SUB_TOTAL.name, resizable: true, width: 100}, 
    {field: ProformDetail.SALE_DIRECT.prop, headerName: ProformDetail.SALE_DIRECT.name, resizable: true, width: 100}, 
    {field: ProformDetail.SALE_DONATION.prop, headerName: ProformDetail.SALE_DONATION.name, resizable: true, width: 100}, 
    {field: ProformDetail.SALE_EXTERNAL_LIBRARY.prop, headerName: ProformDetail.SALE_EXTERNAL_LIBRARY.name, resizable: true, width: 100}, 
    {field: ProformDetail.SALE_EVENT.prop, headerName: ProformDetail.SALE_EVENT.name, resizable: true, width: 100},
    {field: ProformDetail.SALE_TEACHER.prop, headerName: ProformDetail.SALE_TEACHER.name, resizable: true, width: 100},
    {field: ProformDetail.SALE_INFRASTRUCTURE.prop, headerName: ProformDetail.SALE_INFRASTRUCTURE.name, resizable: true, width: 100},
    {field: ProformDetail.SALE_SCHOLARSHIPS.prop, headerName: ProformDetail.SALE_SCHOLARSHIPS.name, resizable: true, width: 100},
    {field: ProformDetail.SALE_STAFF.prop, headerName: ProformDetail.SALE_STAFF.name, resizable: true, width: 100},
    {field: ProformDetail.SALE_TRAINING.prop, headerName: ProformDetail.SALE_TRAINING.name, resizable: true, width: 100},
    {field: ProformDetail.CAPEX.prop, headerName: ProformDetail.CAPEX.name, resizable: true, width: 100},
    {field: ProformDetail.TOTAL.prop, headerName: ProformDetail.TOTAL.name, resizable: true, width: 100}
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
  { type: 'numeric', data: ProformDetail.PRICE.prop, renderer: 'currency', readOnly: true },
  { type: 'numeric', data: ProformDetail.SUB_TOTAL.prop, renderer: 'currency' , readOnly: true  },
  { type: 'numeric', data: ProformDetail.SALE_DIRECT.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.SALE_DONATION.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.SALE_EXTERNAL_LIBRARY.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.SALE_EVENT.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.SALE_TEACHER.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.SALE_INFRASTRUCTURE.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.SALE_SCHOLARSHIPS.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.SALE_STAFF.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.SALE_TRAINING.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.CAPEX.prop, renderer: 'currency' },
  { type: 'numeric', data: ProformDetail.TOTAL.prop, renderer: 'currency' , readOnly: true  },
]

export const COLUMNS_HEADER = [
  ProformDetail.ID.name, ProformDetail.DEGREE.name, 'codigo',  ProformDetail.PRODUCT_ID.name, ProformDetail.QUANTITY.name, 
  ProformDetail.PRICE.name, ProformDetail.SUB_TOTAL.name, ProformDetail.SALE_DIRECT.name, ProformDetail.SALE_DONATION.name, 
  ProformDetail.SALE_EXTERNAL_LIBRARY.name, ProformDetail.SALE_EVENT.name, ProformDetail.SALE_TEACHER.name, 
  ProformDetail.SALE_INFRASTRUCTURE.name, ProformDetail.SALE_SCHOLARSHIPS.name, 
  ProformDetail.SALE_STAFF.name, ProformDetail.SALE_TRAINING.name, ProformDetail.CAPEX.name, ProformDetail.TOTAL.name
];



  