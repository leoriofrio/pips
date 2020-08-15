'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientColumns, TransformColumns } from '../../app.keys';
import { COLUMNS_CLIENT } from './clientColumns';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { ExcelExportService } from '../../shared/service/export-excel.service';
import * as _ from 'lodash';

const dataVal = require('./client.json');

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, TransformColumns {
  @ViewChild(ProjectComponent, { static: true }) child: ProjectComponent;

  public data = dataVal;
  public gridColumns = COLUMNS_CLIENT;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;

  constructor(private excelExportService: ExcelExportService) {

  }

  ngOnInit(): void {
    this.enabledTitle = true;
    this.allowExcelExport = true;
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

  public onJsonData(jsonData) {
    console.log('data de Cliente es', jsonData);
    let jsonFinal = this.namesToProps(jsonData);
    console.log('jsonFinal', jsonFinal);
  }

  public namesToProps(json){
    return json.map(key => {      
      let res = {};
      res[`${ClientColumns.ID.prop}`] = key[ClientColumns.ID.name];
      res[`${ClientColumns.COD_CLIENT.prop}`] = key[ClientColumns.COD_CLIENT.name];
      res[`${ClientColumns.PROVINCE.prop}`] = key[ClientColumns.PROVINCE.name];
      res[`${ClientColumns.CITY.prop}`] = key[ClientColumns.CITY.name];
      res[`${ClientColumns.NAME.prop}`] = key[ClientColumns.NAME.name];
      res[`${ClientColumns.NICKNAME.prop}`] = key[ClientColumns.NICKNAME.name];
      res[`${ClientColumns.TYPE.prop}`] = key[ClientColumns.TYPE.name];
      res[`${ClientColumns.STATUS.prop}`] = key[ClientColumns.STATUS.name];      
      return res;
    });
  }

}
