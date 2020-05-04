import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FIELDS } from './model/proformColumns.model';

@Component({
  selector: 'app-proform-add',
  templateUrl: './proform-add.component.html',
  styleUrls: ['./proform-add.component.scss']
})
export class ProformAddComponent implements OnInit {
  
  constructor() { 

  }

  form = new FormGroup({});
  model = {};

  options = {};

  public formFields: FormlyFieldConfig[] = FIELDS;
  
  ngOnInit(): void {

  }

  


}
