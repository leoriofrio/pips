'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientColumns } from '../../app.keys';
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
    {field: ClientColumns.ID.prop, headerName: ClientColumns.ID.name },
    {field: ClientColumns.COD_SANTILLANA.prop , headerName: ClientColumns.COD_SANTILLANA.name },
    {field: ClientColumns.COD_INSTITUTO.prop , headerName: ClientColumns.COD_INSTITUTO.name },
    {field: ClientColumns.STATUS.prop , headerName: ClientColumns.STATUS.name },
    {field: ClientColumns.DELEGATE_TEXT.prop , headerName: ClientColumns.DELEGATE_TEXT.name },
    {field: ClientColumns.DELEGATE_ENGLISH.prop , headerName: ClientColumns.DELEGATE_ENGLISH.name },
    {field: ClientColumns.DELEGATE_SHARED.prop , headerName: ClientColumns.DELEGATE_SHARED.name },
    {field: ClientColumns.PROVINCE.prop , headerName: ClientColumns.PROVINCE.name },
    {field: ClientColumns.CANTON.prop , headerName: ClientColumns.CANTON.name },
    {field: ClientColumns.PARISH.prop , headerName: ClientColumns.PARISH.name },
    {field: ClientColumns.NAME.prop , headerName: ClientColumns.NAME.name },
    {field: ClientColumns.ADDRESS.prop , headerName: ClientColumns.ADDRESS.name },
    {field: ClientColumns.NIVEL.prop , headerName: ClientColumns.NIVEL.name },
    {field: ClientColumns.TYPE.prop , headerName: ClientColumns.TYPE.name },
    {field: ClientColumns.SCHOOL_SYSTEM.prop , headerName: ClientColumns.SCHOOL_SYSTEM.name },
    {field: ClientColumns.MODALITY.prop , headerName: ClientColumns.MODALITY.name },
    {field: ClientColumns.SCHOOL_DAY.prop , headerName: ClientColumns.SCHOOL_DAY.name },
    {field: ClientColumns.REGION_ID.prop , headerName: ClientColumns.REGION_ID.name }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
