'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ExcelExportService } from '../../shared/service/export-excel.service';
import { COLUMNS_PROFORM } from './proformColumns';
import * as _ from 'lodash';
import { ProjectComponent } from 'src/app/shared/components/project/project.component';
import { ProformService } from '../../shared/service/proform.service';
import { Router } from '@angular/router';

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
  public proformId: any;

  constructor(
    private excelExportService: ExcelExportService,
    private proformService: ProformService,
    private router: Router,    
    ) {

   }


  ngOnInit(): void {    
    this.enabledTitle = false;
    this.allowExcelExport = false;
    this.getProform();
  }

  public getProform(): void {    
    this.proformService.getProform().subscribe( proform => {
      _.forEach(proform, function(value, key) {
        value['number_proform'] = value['number_proform'] + ' - ' + value['state_number'];
        value['user_id'] = value['user']['codUser'] + ' - ' + value['user']['userName'];
        value['college_id'] = value['college']['codSantillana'] + ' - ' + value['college']['name'];
        value['client_id'] = value['client']['codClient'] + ' - ' + value['client']['name'];
      });
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

  public selectProject(row): any {
    this.router.navigate(['proform-edit',row['data']['id']]) ;
  }

  public edit() {
    const idProform = (<HTMLInputElement>document.getElementById("txtProforma")).value;
    this.router.navigate(['proform-edit',idProform]) ;
  }

}
