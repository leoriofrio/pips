'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientColumns } from '../../app.keys';
import { COLUMNS_CLIENT } from './clientColumns';
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
  public gridColumns = COLUMNS_CLIENT;


  constructor() { }

  ngOnInit(): void {
  }

}
