'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientColumns, PriceColumns, TransformColumns, TypeRegion } from '../../app.keys';
import { COLUMNS_PRICE } from './priceColumns';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { ExcelExportService } from '../../shared/service/export-excel.service';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';
import { PriceService } from 'src/app/shared/service/price.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;

  public data: any;
  public gridColumns = COLUMNS_PRICE;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;

  constructor(
    private excelExportService: ExcelExportService,
    private priceService: PriceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const self = this; 
    this.enabledTitle = true;
    this.allowExcelExport = true;

    this.getDataPrice().subscribe(data => {
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
    let jsonEditPrice: any[] = [];
    let jsonAddPrice: any[] = [];
    //console.log('data de Prices es', jsonData);
    let jsonFinal = this.namesToProps(jsonData);
    //console.log('jsonFinal', jsonFinal);
    for ( const row of jsonFinal ){
      if( !_.isNil(row['id']) ){
        jsonEditPrice.push(row);
      } else {
        jsonAddPrice.push(row);
      }
    }

    for ( const row of jsonAddPrice )
      delete row['id'];

      const self = this;
      forkJoin(
        this.priceService.createPrice('20201',JSON.stringify(jsonAddPrice)),
        this.priceService.updatePrice('20201',JSON.stringify(jsonEditPrice))
      ).subscribe( ([addPrice, editPrice ]) => {
        alert('Se ha guardado correctamente los precios');
        this.router.navigateByUrl('/Price', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/Price']);
      }); 
        setTimeout(() => {}, 1000);        
      });
  }

  public namesToProps(json){
    return json.map(key => {      
      let res = {};
      res[`${PriceColumns.ID.prop}`] = key[PriceColumns.ID.name];
      res[`${PriceColumns.TYPE_PROMOTION.prop}`] = key[PriceColumns.TYPE_PROMOTION.name];
      res[`${PriceColumns.CODE.prop}`] = key[PriceColumns.CODE.name];
      res[`${PriceColumns.PRICE.prop}`] = key[PriceColumns.PRICE.name];
      
      return res;
    });
  }

  public getDataPrice() {
    return this.priceService.getPriceByPromotion('20201');
  }

}
