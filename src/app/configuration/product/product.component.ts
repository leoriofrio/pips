'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductColumns, TypeRegion, TransformColumns } from '../../app.keys';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { COLUMNS_PRODUCT, COLUMNS_PINNED_TOP_DATA } from './productColumns';
import { ExcelExportService } from '../../shared/service/export-excel.service';
import * as _ from 'lodash';
import { ProductService } from 'src/app/shared/service/product.service';
import { ExcelImportService } from 'src/app/shared/service/import-excel.service';
import { forkJoin, pipe } from 'rxjs';
import { Router, NavigationStart, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    private excelImportService: ExcelImportService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      
  }

  ngOnInit() {
    const self = this;      
    this.enabledTitle = true;
    this.allowExcelExport = true;
    this.pinnedTopRowDataVal = [
      COLUMNS_PINNED_TOP_DATA
    ];
    this.pinnedBottomRowDataVal = [
      COLUMNS_PINNED_TOP_DATA
    ];
/*
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
*/
    this.getDataProduct().subscribe(data => {
      self.data = data;        
     });
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
    let jsonEditProduct: any[] = [];
    let jsonAddProduct: any[] = [];
    let jsonFinal = this.namesToProps(jsonData);
    for ( const row of jsonFinal ){
      if( !_.isNil(row['id']) ){
        jsonEditProduct.push(row);
      } else {
        jsonAddProduct.push(row);
      }
    }

    for ( const row of jsonAddProduct )
      delete row['id'];

      const self = this;
      forkJoin(
        this.productService.createProduct('1', JSON.stringify(jsonAddProduct)),
        this.productService.updateProduct('1', JSON.stringify(jsonEditProduct))
      ).subscribe( ([addProduct, editProduct ]) => {
        alert('Se ha guardado correctamente los productos');
        this.router.navigateByUrl('/product', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/product']);
      }); 
        setTimeout(() => {}, 1000);        
      });  
      //console.log(JSON.stringify(jsonEditProduct));
      //console.log(JSON.stringify(jsonAddProduct));
      /*
    return this.productService.createProduct('1', JSON.stringify(jsonAddProduct)).subscribe(response => { 
      alert('Se ha guardado correctamente los productos');
      }    
    );
      */
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
