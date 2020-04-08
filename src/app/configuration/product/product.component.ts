'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductColumns } from '../../app.keys';
import { ProjectComponent } from '../../shared/components/project/project.component';

const dataVal = require('./product.json');

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;
  
  public data = dataVal;
  public gridColumns = [
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


  ngOnInit() {
    

    
  }



}
