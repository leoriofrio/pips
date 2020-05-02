'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientColumns } from '../../app.keys';
import { COLUMNS_COLLEGES } from './collegesColumns';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { ExcelExportService } from '../../shared/service/export-excel.service';
import * as _ from 'lodash';

const dataVal = require('./colleges.json');

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;
  
  public data = dataVal;
  public gridColumns = COLUMNS_COLLEGES;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;

  constructor(private excelExportService: ExcelExportService) { }

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

}
