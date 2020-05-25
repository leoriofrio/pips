'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ExcelExportService } from '../../shared/service/export-excel.service';
import { COLUMNS_PROFORM } from './proformColumns';
import * as _ from 'lodash';
import { ProjectComponent } from 'src/app/shared/components/project/project.component';
import { ProformService } from '../../shared/service/proform.service';

@Component({
  selector: 'app-proform-list',
  templateUrl: './proform-list.component.html',
  styleUrls: ['./proform-list.component.scss']
})
export class ProformListComponent implements OnInit {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;
  
  public data: any ;
  public gridColumns = COLUMNS_PROFORM;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;

  constructor(
    private excelExportService: ExcelExportService,
    private proformService: ProformService
    ) {

   }


  ngOnInit(): void {
    this.enabledTitle = false;
    this.allowExcelExport = false;
    this.getProform();
  }

  public getProform(): void {
    this.proformService.getProform().subscribe( proform => {
      this.data = proform;
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

}
