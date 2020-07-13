import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProjectComponent } from '../../shared/components/project/project.component';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { COLUMNS_DETAIL_PROFORM, COLUMNS_DETAIL, COLUMNS_HEADER } from './model/proformColumns.model';
import { Proform, TypeClientSale, Agreement, AppStatusForm, TypeRegion, ProformDetail } from 'src/app/app.keys';
import { ExcelExportService } from 'src/app/shared/service/export-excel.service';
import * as _ from 'lodash';
import { of as observableOf } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GridRecord, PROFORM_SUMMARY, MODEL_DETAIL_SAVE } from 'src/app/app.type';
import Handsontable from 'handsontable';
import { ProformService } from '../../shared/service/proform.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/service/product.service';
import { UtilsService  } from 'src/app/shared/service/utils.service';
import { map, switchMap, tap, startWith } from 'rxjs/operators';



//const dataVal = require('./proformList.json');
//const clientes = require('./clientes.json');
//const colegios = require('./colegios.json');


@Component({
  selector: 'app-proform-add',
  templateUrl: './proform-add.component.html',
  styleUrls: ['./proform-add.component.scss']
})
export class ProformAddComponent implements OnInit {
  @ViewChild(ProjectComponent, {static: true}) child: ProjectComponent;
  @ViewChild('container') container: ElementRef;

  public userData: any;
  public productCod: any[] = [];
  public productDescription: any[] = [];
  
  public data: any;
  public dataOfBank: any[] = [];
  public dataset: any[] = [];
  public datasetSummary: PROFORM_SUMMARY ;
  public gridColumns = COLUMNS_DETAIL_PROFORM;
  public columnsGrid: any;  // = COLUMNS_DETAIL;
  public columnsHeader = COLUMNS_HEADER;
  public enabledTitle: boolean;
  public allowExcelExport: boolean;
  public condition: string;
  public enableEdit: boolean;
  public validation: string;
  public defaultColDefVal: any;
  public dataService: any;
  public dataProduct: any;
  public dataProformId;
  public currentDate: {};
  public form = new FormGroup({});
  public model = {};
  public options = {};

  constructor(
    private excelExportService: ExcelExportService, 
    private route: ActivatedRoute,
    private proformService: ProformService,
    private productService: ProductService,
    private utilsService: UtilsService,
    private router: Router,
  ) { 
    const self = this;
    //this.data = dataVal;
    //this.dataOfBank = dataVal;
    for (let value = 0; value < this.dataOfBank.length; value++) {
      let row = this.dataOfBank[value];
      //this.dataset.push(row);
    };
    

    this.getDataProduct().subscribe(data => {
      self.dataProduct = data;
      _.forEach(self.dataProduct, function(value, key) {
        _.forEach(value, function(valueProduct, keyProduct) {
          if ( keyProduct === 'description' ) {
            self.productDescription.push(valueProduct);
          }
          if ( keyProduct === 'cod' ) {
            self.productCod.push(valueProduct);
          }
          
        });
      });
      
     });
   
    
  }

  
  ngOnInit() {
    const self = this;
    this.enabledTitle = false;
    this.allowExcelExport = false;

    this.columnsGrid = [
      { data: ProformDetail.ID.prop, readOnly: true },
      { type: 'text', data: ProformDetail.DEGREE.prop,  },
      { type: 'autocomplete', 
        data: 'codigo', 
        renderer: 'currency', 
        source:  this.productCod, 
        strict: true, 
        filter: false},
      { type: 'autocomplete', 
        data: ProformDetail.PRODUCT_ID.prop, 
        renderer: 'currency', 
        source:  this.productDescription, 
        strict: true, 
        filter: false},
      { type: 'numeric', data: ProformDetail.QUANTITY.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.PRICE.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.SUB_TOTAL.prop, renderer: 'currency' , readOnly: true  },
      { type: 'numeric', data: ProformDetail.SALE_DIRECT.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.SALE_EXTERNAL_LIBRARY.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.SALE_EVENT.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.SALE_TEACHER.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.SALE_INFRASTRUCTURE.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.SALE_SCHOLARSHIPS.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.SALE_STAFF.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.SALE_TRAINING.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.CAPEX.prop, renderer: 'currency' },
      { type: 'numeric', data: ProformDetail.TOTAL.prop, renderer: 'currency' , readOnly: true  },
    ]


    this.currentDate = new Date();    
    
    
    if (!this.enableEdit){
      this.validation = '!model.text';      
    } else {
      this.validation = 'model.text';
      
    }

    this.defaultColDefVal = {
      editable: true,
      resizable: true
    };

    let date_now = new Date();
    
    self.model =  {
      "date_proform": date_now.getFullYear() + '-' + _.padStart(date_now.getMonth().toString(), 2, '0') + '-' + _.padStart(date_now.getDate().toString(), 2, '0'),
      "date_delivery": date_now.getFullYear() + '-' + _.padStart(date_now.getMonth().toString(), 2, '0') + '-' + _.padStart(date_now.getDate().toString(), 2, '0'),
    
    };

    this.refreshData();

  }

  

  
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
          key: Proform.STATUS.prop,
          type: 'input',
          templateOptions: {
            label: Proform.TYPE_CLIENT_SALE.name,
          },
          hideExpression: '!model.name',
        },
        {
          key: Proform.STATE_NUMBER.prop,
          type: 'input',
          templateOptions: {
            label: Proform.STATE_NUMBER.name,
          },
          hideExpression: '!model.name',
        },
        {
          className: 'col-2',
          type: 'input',
          key: Proform.NUMBER_PROFORM.prop,
          defaultValue: '2020-1-',
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
            valueProp: 'id',
            labelProp: 'name',
            //options: vendedores,
          },
          lifecycle: {
            onInit: (form, field) => {
              this.utilsService
                .getUsers()
                .pipe()
                .subscribe(data => {
                  //field.templateOptions.options = _.sortBy(data, "userName");
                  let dataUser: any[] = [];
                  _.forEach(data, function(value, key) {
                    dataUser.push({'id': value['id'], 'name': value['userName'] + ' - ' + value['codUser'], 'codUser': Number(value['codUser'])});
                  });
                  field.templateOptions.options = _.sortBy(dataUser, "name");
                  this.userData = data;
                });
                const numberProform = this.form.get(Proform.NUMBER_PROFORM.prop);
                form
                .get(Proform.USER_ID.prop)
                .valueChanges.pipe(
                  tap(value => {
                    if (value) {
                      //field.formControl.setValue(' ');
                      //console.log(this.userData);
                      numberProform.setValue('2020-1-' + this.userData['codUser'].value);
                    }
                  })
                )
                .subscribe();
            }
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },  
        {
          type: 'input',
          key: Proform.DATE_PROFORM.prop,
          className: 'col-m-1',
          defaultValue: this.currentDate,
          templateOptions: {
            type: 'date',
            required: true,
            label: Proform.DATE_PROFORM.name ,
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },       
        {
          type: 'input',
          key: Proform.DATE_DELIVERY.prop,
          className: 'col-m-1',
          defaultValue: new Date(),
          templateOptions: {
            type: 'date',
            required: true,
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
          key: Proform.COLLEGE_ID.prop,
          templateOptions: {
            label: Proform.COLLEGE_ID.name,
            valueProp: 'id',
            labelProp: 'name',
            required: true,
            //options: _.sortBy(colegios, "label"),
          },
          lifecycle: {
            onInit: (form, field) => {              
              this.utilsService
                .getCollegesByRegion(TypeRegion.SIERRA)
                .pipe()
                .subscribe(data => { 
                  let dataCollege: any[] = [];
                  _.forEach(data, function(value, key) {
                    dataCollege.push({'id': value['id'], 'name': value['codSantillana'] + ' - ' + value['name'], 'codSantillana': Number(value['codSantillana'])});
                  });
                  field.templateOptions.options = _.sortBy(dataCollege, "codSantillana");
                });
              }
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
            valueProp: 'id',
            labelProp: 'name',
            required: true,
            //options: _.sortBy(clientes, "label"),
          },
          lifecycle: {
            onInit: (form, field) => {
              this.utilsService
                .getClientsAll()
                .pipe()
                .subscribe(data => {  
                  let dataClient: any[] = [];
                  _.forEach(data, function(value, key) {
                    dataClient.push({'id': value['id'], 'name': value['codClient'] + ' - ' + value['name'], 'codClient': value['codClient']});
                  });                
                  field.templateOptions.options = _.sortBy(dataClient, "codClient");                  
                });
              }
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },
        {
          className: 'col-2',
          type: 'select',
          key: Proform.TYPE_CLIENT_SALE.prop,
          templateOptions: {
            label: Proform.TYPE_CLIENT_SALE.name,
            required: true,
            options: TypeClientSale.TYPE_SALE
          },
          expressionProperties: {
            'templateOptions.disabled': this.validation,
            }
        },        
        {
          className: 'col-2',
          type: 'select',
          key: Proform.AGREEMENT.prop,
          templateOptions: {
            label: Proform.AGREEMENT.name,
            required: true,
            options: Agreement.TYPE_AGREEMENT
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
      this.model['date_delivery'] = new Date(this.model['date_delivery']).toISOString();
      this.model['date_proform'] = new Date(this.model['date_proform']).toISOString();
      this.model['user_id'] = Number(this.model['user_id']);
      this.model['college_id'] = Number(this.model['college_id']);
      this.model['client_id'] = Number(this.model['client_id']);
      this.model['state_number'] = 0;
      this.model['status'] = AppStatusForm.active;
            
      

      //Detail
      /*
      this.proformService.createProform(this.model).pipe(
        map( proform => {
          this.dataProformId = Number(proform.id);
          for (const row of this.dataset) {
            row['product_id'] = this.matchProduct(row['product_id'], this.dataProduct);
          }

          let grid = _.cloneDeep(this.dataset);
          let objTemp =[];          

          for( let obj of grid  ) {
            objTemp.push(_.pick(obj, _.keys(MODEL_DETAIL) ));
          }

          return this.proformService.createProformDetail(this.dataProformId.toString(), _.replace(JSON.stringify(objTemp), '\r\n', 0));
          
        } )
      ).subscribe(
        response => {
          alert('Se ha guardado la Proforma correctamente ');
          this.router.navigate(['/']);
        }
      );
        */

      if (!this.validateFields()) {
        return;
      }
      
      this.proformService.createProform(this.model).subscribe(response => {        
        this.dataProformId = Number(response.id);
        for (const row of this.dataset) {
          row['product_id'] = this.matchProduct(row['codigo'], this.dataProduct);
        }

        let grid = _.cloneDeep(this.dataset);
        let objTemp =[];
        
        for( let obj of grid  ) {
          objTemp.push(_.pick(obj, _.keys(MODEL_DETAIL_SAVE) ));
        }

        this.proformService.createProformDetail(this.dataProformId.toString(), _.replace(JSON.stringify(objTemp), '\r\n', 0)).subscribe();
        alert('Se ha guardado la Proforma ' + this.dataProformId.toString() + ' correctamente ');
        this.router.navigate(['/']);
      });
      
      
    } else {
      alert('Antes de guardar debe llenar todos los campos requeridos del formulario');
    }  
  }

  public validateFields (): any {

    let grid = _.cloneDeep(this.dataset);

    if ( _.size(grid) <= 0 ) {
      alert('Antes de guardar debe ingresar el detalle de los productos');
      return false;
    }

    if ( _.isNil(this.model['client_id']) || _.isNaN(this.model['client_id']) ) {
      this.model['client_id'] = null;
    }

    
    for (const row of grid) {
      if ( !_.isNil(row['codigo'])) {
        if( _.isNil(this.matchProduct(row['codigo'], this.dataProduct)) ) {
          alert('No existe el producto ' + row['product_id']);
          return false;
        }
      } else {
        alert('No existe el código del producto ' + row['cod']);
        return false;
      }

      if ( Number(row['quantity']) <= 0 ) {
        alert('No puede tener valor 0 el producto ' + row['product_id']);
        return false;
      }

      if ( Number(row['price']) <= 0 ) {
        alert('No puede tener valor 0 el producto ' + row['product_id']);
        return false;
      }
      
      if ( Number(row['total']) <= 0 ) {
        alert('No puede tener el valor total menor a 0 en el producto ' + row['product_id']);
        return false;
      }
       
    }

    return true;
  }

  public refreshData(){
    const self = this;
    self.datasetSummary = {    
      quantity: 0,
      subtotal:0,
      sale_direct: 0,
      sale_external_library: 0,
      sale_event: 0,
      sale_teacher: 0,
      sale_infrastructure: 0,
      sale_scholarships: 0,
      sale_staff: 0,
      sale_training: 0,
      capex: 0,
      total:0,
    };

    _.forEach(this.dataset, function(value, key) {     
      self.datasetSummary.quantity = Number(self.datasetSummary.quantity) +  value['quantity'];
      self.datasetSummary.subtotal = Number(self.datasetSummary.subtotal) +  value['subtotal'];
      self.datasetSummary.total = Number(self.datasetSummary.total) +  value['total'];
      self.datasetSummary.sale_direct = (Number(self.datasetSummary.subtotal) *  value['sale_direct'] / 100) as any;
   });
  }

  public onChange(data: GridRecord[]): void {
    this.refreshData();
   
  }

  public close() {
    this.router.navigate(['/']);
  }

  public getDataProduct() {
    return this.productService.getProductByRegion(TypeRegion.SIERRA);
  }

  public matchProduct(codigo: string, product: any[]): number | undefined {

    let productObj = _.find(product, (x) => x.cod === codigo);
    if (_.isNil(productObj)) {
      return null;
    }
    return productObj.id;

  }


}
