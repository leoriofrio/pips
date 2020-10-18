'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientColumns, LoaderIds, TransformColumns } from '../../app.keys';
import { COLUMNS_CLIENT } from './clientColumns';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { ExcelExportService } from '../../shared/service/export-excel.service';
import * as _ from 'lodash';
import { ClientService } from 'src/app/shared/service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

//const dataVal = require('./client.json');

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, TransformColumns {
  @ViewChild(ProjectComponent, { static: true }) child: ProjectComponent;

  public data: any;
  public gridColumns = COLUMNS_CLIENT;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;

  constructor(
    private excelExportService: ExcelExportService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: NgxUiLoaderService
  ) {
  }

  ngOnInit(): void {
    const self = this;

    this.enabledTitle = true;
    this.allowExcelExport = true;

    this.getDataClient().subscribe(data => {
      self.data = data;
    });
  }


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
    let jsonEditClient: any[] = [];
    let jsonAddClient: any[] = [];
    let jsonFinal = this.namesToProps(jsonData);
    for (const row of jsonFinal) {
      if (!_.isNil(row['id'])) {
        jsonEditClient.push(row);
      } else {
        jsonAddClient.push(row);
      }
    }

    for (const row of jsonAddClient)
      delete row['id'];

    const self = this;
    forkJoin(
      this.clientService.createClient(JSON.stringify(jsonAddClient)),
      this.clientService.updateClient(JSON.stringify(jsonEditClient))
    ).subscribe(([addClient, editClient]) => {
      alert('Se ha guardado correctamente los clientes');
      this.loaderService.stopLoader(LoaderIds.LOADER_PROJECT);
      this.router.navigateByUrl('/client', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/client']);
      });
      setTimeout(() => { }, 1000);
    }, err => {
      alert('Ha ocurrido un error al guardar los clientes');
      this.loaderService.stopLoader(LoaderIds.LOADER_PROJECT);
    });
  }

  public namesToProps(json) {
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

  public getDataClient() {
    return this.clientService.getClientActive();
  }

}
