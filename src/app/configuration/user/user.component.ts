'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserColumns } from '../../app.keys';
import { COLUMNS_USER } from './userColumns';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { ExcelExportService } from '../../shared/service/export-excel.service';
import * as _ from 'lodash';

const dataVal = require('./user.json');

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;

  public data = dataVal;
  public gridColumns = COLUMNS_USER;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;

  constructor(private excelExportService: ExcelExportService) { }

  ngOnInit(): void {
    this.enabledTitle = false;
    this.allowExcelExport = false;
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
