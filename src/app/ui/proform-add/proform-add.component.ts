import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FIELDS, states, COLUMNS_DETAIL_PROFORM } from './model/proformColumns.model';
import { Proform } from 'src/app/app.keys';
import { of } from 'rxjs';
import { ExcelExportService } from 'src/app/shared/service/export-excel.service';
import * as _ from 'lodash';

const dataVal = require('./proformList.json');

@Component({
  selector: 'app-proform-add',
  templateUrl: './proform-add.component.html',
  styleUrls: ['./proform-add.component.scss']
})
export class ProformAddComponent implements OnInit {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;
  
  public data = dataVal;
  public gridColumns = COLUMNS_DETAIL_PROFORM;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;

  constructor(private excelExportService: ExcelExportService) { 

  }

  ngOnInit() {
    this.enabledTitle = false;
    this.allowExcelExport = false;
  }

  form = new FormGroup({});
  model = {};

  options = {};

  public formFields: FormlyFieldConfig[] = [
    {
      className: 'section-label',
      template: '<hr /><div><strong>Datos Generales:</strong></div>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: Proform.ID.prop,
          templateOptions: {
            label: Proform.ID.name,
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: Proform.NUMBER_PROFORM.prop,
          templateOptions: {
            label: Proform.NUMBER_PROFORM.name,
            required: true            
          }
        },  
        {
          className: 'col-4',
          type: 'select',
          key: Proform.USER_ID.prop,
          templateOptions: {
            label: Proform.USER_ID.name,
            required: true,
            options: [
              { label: 'Snickers', value: 'snickers' },
              { label: 'Baby Ruth', value: 'baby_ruth' },
              { label: 'Milky Way', value: 'milky_way' },
            ],
          }
        },         
      ],      
    },
    {
      className: 'section-label',
      template: '<hr /><div><strong>Datos del Colegio y del Cliente</strong></div>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [        
        {
          className: 'col-6',
          type: 'select',
          key: Proform.COLLEGES_ID.prop,
          templateOptions: {
            label: Proform.COLLEGES_ID.name,
            options: [
              { label: 'Snickers', value: 'snickers' },
              { label: 'Baby Ruth', value: 'baby_ruth' },
              { label: 'Milky Way', value: 'milky_way' },
            ],
          }
        },        
        {
          className: 'col-6',
          type: 'select',
          key: Proform.CLIENT_ID.prop,
          templateOptions: {
            label: Proform.CLIENT_ID.name,
            options: [
              { label: 'Snickers', value: 'snickers' },
              { label: 'Baby Ruth', value: 'baby_ruth' },
              { label: 'Milky Way', value: 'milky_way' },
            ],
          }
        },        
      ],      
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          type: 'input',
          key: Proform.DATE_PROFORM.prop,
          className: 'col-sm-4',
          templateOptions: {
            type: 'date',
            label: Proform.DATE_PROFORM.name ,
          },
        },
        {
          type: 'input',
          key: Proform.DATE_DELIVERY.prop,
          className: 'col-sm-4',
          templateOptions: {
            type: 'date',
            label: Proform.DATE_DELIVERY.name,
          },
        },
                
      ],
      
    },
  ];
  

  public filterStates(name: string) {
    return states.filter(state =>
      state.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  
/**
   * Export Excel
   * @param {name, gridColumns, data}
   *
   */
  public onExportExcel(excelData): any {
    if (!_.isNil(excelData.data) && !_.isEmpty(excelData.data)) {
      this.excelExportService.generateExcelFromJson(
        excelData.name,
        excelData.gridColumns,
        excelData.data
      );
    }
  }

}
