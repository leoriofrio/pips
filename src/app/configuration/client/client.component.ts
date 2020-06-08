'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientColumns } from '../../app.keys';
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
export class ClientComponent implements OnInit {
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
  }

}
