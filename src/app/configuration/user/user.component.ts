'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserColumns } from '../../app.keys';
import { COLUMNS_USER } from './userColumns';
import { ProjectComponent } from '../../shared/components/project/project.component';

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

  constructor() { }

  ngOnInit(): void {
  }

}
