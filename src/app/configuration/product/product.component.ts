'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductColumns, TypeRegion, TransformColumns } from '../../app.keys';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { COLUMNS_PRODUCT, COLUMNS_PINNED_TOP_DATA } from './productColumns';
import { ExcelExportService } from '../../shared/service/export-excel.service';
import * as _ from 'lodash';
import { ProductService } from 'src/app/shared/service/product.service';

//const dataVal = require('./product.json');

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, TransformColumns {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;
  
  
  public data: any;  //dataVal;
  public gridColumns = COLUMNS_PRODUCT;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;
  public val: string;
  public pinnedTopRowDataVal: any;
  public pinnedBottomRowDataVal: any;
  public defaultColDefVal: any;
  

  constructor(
    private excelExportService: ExcelExportService, 
    private productService: ProductService,
    ) {
      const self = this;
      this.getDataProduct().subscribe(data => {
        self.data = data;        
       });
  }

  ngOnInit() {
    this.enabledTitle = true;
    this.allowExcelExport = true;
    this.pinnedTopRowDataVal = [
      COLUMNS_PINNED_TOP_DATA
    ];
    this.pinnedBottomRowDataVal = [
      COLUMNS_PINNED_TOP_DATA
    ];

    this.defaultColDefVal = {
      editable: true,
      resizable: true,
      cellClassRules: {
        'cell-green': 'value.startsWith("Green")',
        'cell-blue': 'value.startsWith("Blue")',
        'cell-red': 'value.startsWith("Red")',
        'cell-yellow': 'value.startsWith("Yellow")',
        'cell-orange': 'value.startsWith("Orange")',
        'cell-grey': 'value.startsWith("Grey")',
      },
    };
  }
  
  /**
   * Export Excel
   * @param {name, gridColumns, data}
   *
   */
  public onExportExcel(excelData): any {
    if (!_.isNil(excelData.data) && !_.isEmpty(excelData.data)) {
      this.excelExportService.generateExcelFromJson(
        excelData.name,
        excelData.gridColumns,
        excelData.data
      );
    }
  }

  public onJsonData(jsonData){    
    console.log('data de Producto es', JSON.stringify(jsonData));    
    let jsonFinal = this.namesToProps(jsonData);  
    console.log('jsonFinal', jsonFinal);  
    return this.productService.createProduct('1', JSON.stringify(jsonFinal));
  }

  public getDataProduct() {
    return this.productService.getProductByRegion(TypeRegion.SIERRA);
  }

  public namesToProps(json){
    return json.map(key => {      
      let res = {};
      res[`${ProductColumns.ID.prop}`] = key[ProductColumns.ID.name];
      res[`${ProductColumns.COD.prop}`] = key[ProductColumns.COD.name];
      res[`${ProductColumns.SUBLINE.prop}`] = key[ProductColumns.SUBLINE.name];
      res[`${ProductColumns.DESCRIPTION.prop}`] = key[ProductColumns.DESCRIPTION.name];
      res[`${ProductColumns.SERIE.prop}`] = key[ProductColumns.SERIE.name];
      res[`${ProductColumns.NIVEL.prop}`] = key[ProductColumns.NIVEL.name];
      res[`${ProductColumns.DEGREE.prop}`] = key[ProductColumns.DEGREE.name];
      res[`${ProductColumns.BUSINESS_LINE.prop}`] = key[ProductColumns.BUSINESS_LINE.name];
      res[`${ProductColumns.ISBN.prop}`] = key[ProductColumns.ISBN.name];
      res[`${ProductColumns.REGION.prop}`] = key[ProductColumns.REGION.name];
      return res;
    });
  }

}
