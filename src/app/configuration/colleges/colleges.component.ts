'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientColumns, CollegesColumns, LoaderIds, TransformColumns, TypeRegion } from '../../app.keys';
import { COLUMNS_COLLEGES } from './collegesColumns';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { ExcelExportService } from '../../shared/service/export-excel.service';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';
import { CollegeService } from 'src/app/shared/service/college.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

//const dataVal = require('./colleges.json');

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit, TransformColumns {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;
  
  public data: any;
  public gridColumns = COLUMNS_COLLEGES;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;

  constructor(
    private excelExportService: ExcelExportService,
    private collegeService: CollegeService,
    private router: Router,
    private loaderService: NgxUiLoaderService
    ) { }

  ngOnInit(): void {
    const self = this; 
    this.enabledTitle = true;
    this.allowExcelExport = true;

    this.getDataCollege().subscribe(data => {
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
    let jsonEditCollege: any[] = [];
    let jsonAddCollege: any[] = [];
    //console.log('data de Colleges es', jsonData);
    let jsonFinal = this.namesToProps(jsonData);
    //console.log('jsonFinal', jsonFinal);
    for ( const row of jsonFinal ){
      if( !_.isNil(row['id']) ){
        jsonEditCollege.push(row);
      } else {
        jsonAddCollege.push(row);
      }
    }

    for ( const row of jsonAddCollege )
      delete row['id'];

      const self = this;
      forkJoin(
        this.collegeService.createCollege(JSON.stringify(jsonAddCollege)),
        this.collegeService.updateCollege(JSON.stringify(jsonEditCollege))
      ).subscribe( ([addCollege, editCollege ]) => {
        alert('Se ha guardado correctamente los colegios');
        this.loaderService.stopLoader(LoaderIds.LOADER_PROJECT);
        this.router.navigateByUrl('/college', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/college']);
      }); 
        setTimeout(() => {}, 1000);        
      });
  }

  public namesToProps(json){
    return json.map(key => {      
      let res = {};
      res[`${CollegesColumns.ID.prop}`] = key[CollegesColumns.ID.name];
      res[`${CollegesColumns.COD_SANTILLANA.prop}`] = key[CollegesColumns.COD_SANTILLANA.name];
      res[`${CollegesColumns.COD_INSTITUTO.prop}`] = key[CollegesColumns.COD_INSTITUTO.name];
      res[`${CollegesColumns.STATUS.prop}`] = key[CollegesColumns.STATUS.name];
      res[`${CollegesColumns.DELEGATE_TEXT.prop}`] = key[CollegesColumns.DELEGATE_TEXT.name];
      res[`${CollegesColumns.DELEGATE_ENGLISH.prop}`] = key[CollegesColumns.DELEGATE_ENGLISH.name];
      res[`${CollegesColumns.DELEGATE_SHARED.prop}`] = key[CollegesColumns.DELEGATE_SHARED.name];
      res[`${CollegesColumns.PROVINCE.prop}`] = key[CollegesColumns.PROVINCE.name];
      res[`${CollegesColumns.CANTON.prop}`] = key[CollegesColumns.CANTON.name];
      res[`${CollegesColumns.PARISH.prop}`] = key[CollegesColumns.PARISH.name];

      res[`${CollegesColumns.NAME.prop}`] = key[CollegesColumns.NAME.name];
      res[`${CollegesColumns.ADDRESS.prop}`] = key[CollegesColumns.ADDRESS.name];
      res[`${CollegesColumns.NIVEL.prop}`] = key[CollegesColumns.NIVEL.name];
      res[`${CollegesColumns.TYPE.prop}`] = key[CollegesColumns.TYPE.name];
      res[`${CollegesColumns.SCHOOL_SYSTEM.prop}`] = key[CollegesColumns.SCHOOL_SYSTEM.name];
      res[`${CollegesColumns.MODALITY.prop}`] = key[CollegesColumns.MODALITY.name];
      res[`${CollegesColumns.SCHOOL_DAY.prop}`] = key[CollegesColumns.SCHOOL_DAY.name];
      res[`${CollegesColumns.REGION_ID.prop}`] = key[CollegesColumns.REGION_ID.name];
      return res;
    });
  }

  public getDataCollege() {
    return this.collegeService.getCollegeByRegion(TypeRegion.SIERRA);
  }

}
