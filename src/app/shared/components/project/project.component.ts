'use strict';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ExcelExportService } from '../../service/export-excel.service';
import { AppKeys, ExcelKeys, LoaderIds } from 'src/app/app.keys';
import { Module } from 'ag-grid-community';


import * as _ from 'lodash';
import { selectionRenderComponent } from '../../render/selection-render.component';
import { SelectProjectRendererComponent } from './select-project-renderer.component';
import { ExcelImportService } from '../../service/import-excel.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @ViewChild('content', { static: true })
  private row;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;
  private gridApi;
  private gridColumnApi;
  public context; // ag-grid's parent context
  public frameworkComponents; // framework component
  public uploadFile: boolean = true;
  public loaderProject: string;

  @Input()
  public gridColumns;
  @Input()
  public data;
  @Input()
  public enabledTitleOp: boolean;
  @Input()
  public allowExcelExportOp: boolean;
  @Input()
  public styleFormat: string;
  @Input()
  public pinnedTopRowData;
  @Input()
  public pinnedBottomRowData;
  @Input()
  public defaultColDef
  @Output()
  public exportExcel = new EventEmitter<any>();
  @Output()
  public projectSelected = new EventEmitter<any>();
  @Output()
  public emitJsonData = new EventEmitter<any>();

  public file: File;

  constructor(
    private excelExportService: ExcelExportService,
    private excelImportService: ExcelImportService,
    private loaderService: NgxUiLoaderService) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      selectionRender: selectionRenderComponent,
      selectProjectRenderer: SelectProjectRendererComponent,
    };
    this.loaderProject = LoaderIds.LOADER_PROJECT;
  }

  ngOnInit() {


    this.enabledTitle = this.enabledTitleOp;
    this.allowExcelExport = this.allowExcelExportOp;
    if (_.isNull(this.styleFormat)) {
      this.styleFormat = '670px;';
    }

  }

  public exportAsXLSX(): void {
    this.exportExcel.emit({ name: ExcelKeys.DEFAULT_EXCEL_NAME, gridColumns: this.gridColumns, data: this.data });
  }

  public selectProject(row) {
    this.projectSelected.emit(row);
  }


  public changeView() {
    this.uploadFile = !this.uploadFile;
  }

  public processDataFromClipboard(params) {
    var containsRed;
    var containsYellow;
    var data = params.data;
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      for (var j = 0; j < row.length; j++) {
        var value = row[j];
        if (value) {
          if (value.startsWith('Red')) {
            containsRed = true;
          } else if (value.startsWith('Yellow')) {
            containsYellow = true;
          }
        }
      }
    }
    if (containsRed) {
      return [['Orange', 'Orange'], ['Grey', 'Grey']];
    }
    if (containsYellow) {
      return null;
    }
    return data;
  }


  public onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  changeFile(event) {
    this.file = event.target.files[0];
  }

  upload() {    
    this.loaderService.startLoader(this.loaderProject);
    this.excelImportService.excelToJson(this.file).subscribe((jsonData: any[]): void => {
      this.emitJsonData.emit(jsonData);
      this.changeView();      
    });
  }
}
//  https://www.ag-grid.com/javascript-grid-clipboard/


//  https://www.ag-grid.com/javascript-grid-value-getters/



//  npmjs.com/package/react-data-leo
//  https://adazzle.github.io/react-data-grid/docs/examples/simple-grid


//  https://www.npmjs.com/package/angular-open-datagrid
//  

//  Examples  
//          https://www.ngdevelop.tech/best-angular-tables/


// Good exampels copy and paste
//    https://handsontable.com/examples?headers
//    https://www.npmjs.com/package/handsontable
//    https://stackblitz.com/edit/handsontable-poc?file=src%2Fapp%2Fbudget-grid%2Fbudget-grid.component.ts


//  https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid
//    https://www.grapecity.com/wijmo/demos/Grid/Overview/angular