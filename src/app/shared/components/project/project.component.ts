'use strict';
import { Component, OnInit, Input, ViewChild } from '@angular/core';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild('content', {static: true})
  private row;

  @Input() 
  public gridColumns;
  @Input() 
  public data;


  constructor() { }

  ngOnInit(){
  }

}
