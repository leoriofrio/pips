import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { COLUMNS_DETAIL_PROFORM, COLUMNS_DETAIL, COLUMNS_HEADER } from './model/proformColumns.model';
import { Proform } from 'src/app/app.keys';
import { ExcelExportService } from 'src/app/shared/service/export-excel.service';
import * as _ from 'lodash';
import { of as observableOf } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GridRecord } from 'src/app/app.type';
import Handsontable from 'handsontable';
import { ProformService } from '../../shared/service/proform.service';
import { Router } from '@angular/router';


const dataVal = require('./proformList.json');
const vendedores = require('./vendedores.json');
const clientes = require('./clientes.json');
const colegios = require('./colegios.json');


@Component({
  selector: 'app-proform-add',
  templateUrl: './proform-add.component.html',
  styleUrls: ['./proform-add.component.scss']
})
export class ProformAddComponent implements OnInit {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;
  @ViewChild('container') container: ElementRef;
  
  public data: any;
  public dataOfBank: any[] = [];
  public dataset: any[] = [];
  public gridColumns = COLUMNS_DETAIL_PROFORM;
  public columnsGrid = COLUMNS_DETAIL;
  public columnsHeader = COLUMNS_HEADER;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;
  public condition: string;
  public enableEdit: boolean;
  public validation: string;
  public defaultColDefVal: any;
  public dataService: any;

  public dateProform: any;
  currentDate: {};

  constructor(
    private excelExportService: ExcelExportService, 
    private route: ActivatedRoute,
    private proformService: ProformService,
    private router: Router
  ) { 
    
    this.data = dataVal;
    this.dataOfBank = dataVal;
    for (let value = 0; value < this.dataOfBank.length; value++) {
      let row = this.dataOfBank[value];
      //this.dataset.push(row);
    };
  }

  ngOnInit() {
    this.enabledTitle = false;
    this.allowExcelExport = false;

    this.currentDate = new Date();
    console.log(this.currentDate);
    

    this.route.queryParams.subscribe(
      params => {
        console.log('Got the JWT as: ', params['val']);
        this.condition =  params['val'];
        this.condition == 'EDT' ? this.enableEdit = true : this.enableEdit = false;        
      }
    )
    
    if (!this.enableEdit){
      this.validation = '!model.text';      
    } else {
      this.validation = 'model.text';
      //this.data = {};
    }

    this.defaultColDefVal = {
      editable: true,
      resizable: true
    };

    
    
    
    
  }

  form = new FormGroup({});
  model = {};

  options = {};

  
  public formFields: FormlyFieldConfig[] = [
    {
      className: 'section-label',
      template: '<h3><strong>Registro de Proforma</strong></h3><div><strong>Datos Generales:</strong></div>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-2',
          type: 'input',
          key: Proform.ID.prop,
          templateOptions: {
            label: Proform.ID.name,
          },
        expressionProperties: {
          'templateOptions.disabled': '!model.text',
          },
        },
        {
          className: 'col-2',
          type: 'input',
          key: Proform.NUMBER_PROFORM.prop,
          defaultValue: 'PROSIERRA-',
          templateOptions: {
            label: Proform.NUMBER_PROFORM.name,
            required: true            
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },  
        {
          className: 'col-3',
          type: 'select',
          key: Proform.USER_ID.prop,
          templateOptions: {
            label: Proform.USER_ID.name,
            required: true,
            options: vendedores,
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },  
        {
          type: 'input',
          key: Proform.DATE_PROFORM.prop,
          className: 'col-sm-2',
          templateOptions: {
            type: 'date',
            label: Proform.DATE_PROFORM.name ,
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },
        {
          type: 'input',
          key: Proform.DATE_DELIVERY.prop,
          className: 'col-sm-2',
          defaultValue: new Date(),
          templateOptions: {
            type: 'date',
            label: Proform.DATE_DELIVERY.name,
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },       
      ],      
    },
    {
      className: 'section-label',
      template: '<div><strong>Datos del Colegio y del Cliente</strong></div>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [        
        {
          className: 'col-4',
          type: 'select',
          key: Proform.COLLEGES_ID.prop,
          templateOptions: {
            label: Proform.COLLEGES_ID.name,
            options: _.sortBy(colegios, "label"),
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },       
        {
          className: 'col-3',
          type: 'select',
          key: Proform.CLIENT_ID.prop,
          templateOptions: {
            label: Proform.CLIENT_ID.name,
            options: _.sortBy(clientes, "label"),
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },
        {
          className: 'col-2',
          type: 'checkbox',
          key: Proform.TYPE_CLIENT_SALE.prop,
          defaultValue: false,
          templateOptions: {
            label: Proform.TYPE_CLIENT_SALE.name,
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },        
        {
          className: 'col-2',
          type: 'checkbox',
          key: Proform.AGREEMENT.prop,
          defaultValue: false,
          templateOptions: {
            label: Proform.AGREEMENT.name,
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },     
      ],      
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        
        
                
      ],
      
    },
  ];
  

  
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

  public save() {
    if (this.form.valid) {
      console.log(JSON.stringify(this.model));
      console.log(JSON.stringify(this.dataset));
    }
    alert('Se ha guardado la Proforma correctamente');
    this.router.navigate(['/']);
  }

  public onChange(data: GridRecord[]): void {
    console.log(data);
  }


  public close() {
    
  }


}
