'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientColumns } from '../../app.keys';
import { COLUMNS_COLLEGES } from './collegesColumns';
import { ProjectComponent } from '../../shared/components/project/project.component';

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


  constructor() { }

  ngOnInit(): void {
  }

}
