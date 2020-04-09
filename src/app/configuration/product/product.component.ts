'use strict';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductColumns } from '../../app.keys';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { COLUMNS_PRODUCT } from './productColumns';

const dataVal = require('./product.json');

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;
  
  public data = dataVal;
  public gridColumns = COLUMNS_PRODUCT;


  ngOnInit() {
    

    
  }



}
