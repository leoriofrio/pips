'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductColumns, TypeRegion } from '../../app.keys';
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
export class ProductComponent implements OnInit {
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
    return this.productService.createProduct('1', JSON.stringify(jsonData));
  }

  public getDataProduct() {
    return this.productService.getProductByRegion(TypeRegion.SIERRA);
  }

}
