'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteColumns } from '../../app.keys';
import { ProjectComponent } from '../../shared/components/project/project.component';

const dataVal = require('./client.json');

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;
  
  public data = dataVal;
  public gridColumns = [
    {field: ClienteColumns.ID.prop, headerName: ClienteColumns.ID.name },
    {field: ClienteColumns.COD_SANTILLANA.prop , headerName: ClienteColumns.COD_SANTILLANA.name },
    {field: ClienteColumns.COD_INSTITUTO.prop , headerName: ClienteColumns.COD_INSTITUTO.name },
    {field: ClienteColumns.STATUS.prop , headerName: ClienteColumns.STATUS.name },
    {field: ClienteColumns.DELEGATE_TEXT.prop , headerName: ClienteColumns.DELEGATE_TEXT.name },
    {field: ClienteColumns.DELEGATE_ENGLISH.prop , headerName: ClienteColumns.DELEGATE_ENGLISH.name },
    {field: ClienteColumns.DELEGATE_SHARED.prop , headerName: ClienteColumns.DELEGATE_SHARED.name },
    {field: ClienteColumns.PROVINCE.prop , headerName: ClienteColumns.PROVINCE.name },
    {field: ClienteColumns.CANTON.prop , headerName: ClienteColumns.CANTON.name },
    {field: ClienteColumns.PARISH.prop , headerName: ClienteColumns.PARISH.name },
    {field: ClienteColumns.NAME.prop , headerName: ClienteColumns.NAME.name },
    {field: ClienteColumns.ADDRESS.prop , headerName: ClienteColumns.ADDRESS.name },
    {field: ClienteColumns.NIVEL.prop , headerName: ClienteColumns.NIVEL.name },
    {field: ClienteColumns.TYPE.prop , headerName: ClienteColumns.TYPE.name },
    {field: ClienteColumns.SCHOOL_SYSTEM.prop , headerName: ClienteColumns.SCHOOL_SYSTEM.name },
    {field: ClienteColumns.MODALITY.prop , headerName: ClienteColumns.MODALITY.name },
    {field: ClienteColumns.SCHOOL_DAY.prop , headerName: ClienteColumns.SCHOOL_DAY.name },
    {field: ClienteColumns.REGION_ID.prop , headerName: ClienteColumns.REGION_ID.name }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
