import { Component, Output, EventEmitter, OnDestroy, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import Handsontable from 'handsontable';
import { GridRecord } from '../../../app.type';
import * as _ from 'lodash';

const dataVal = require('./product.json');
const dataPrices = require('./prices.json');

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container: ElementRef;
  @Input() 
  public budgetRecords: GridRecord[];
  @Input()
  public columnsGrid: any[];
  @Input()
  public columnsHeader: any[];
  @Output() 
  public change = new EventEmitter<GridRecord[]>();
  @Output()
  public addRow = new  EventEmitter<any>();
  
  public hot: Handsontable;

  private  setter = false;

  constructor() { }

  ngOnInit(): void {
    (Handsontable.renderers as any).registerRenderer('currency', this.currencyRenderer);

    const et = this;
    let varField: any;
    let varRow: any;

    const containerVal = this.container.nativeElement;
    var container = document.getElementById('example');

    this.hot = new Handsontable(container, {
      data: this.budgetRecords,
      contextMenu: ['row_above','row_below','remove_row', 'copy'],
      colHeaders:  this.columnsHeader ,
      afterChange: function(changes, src){        
        if( !changes ) {
          return;
        }

        
        if (!this.setter) { 
          for(const row of changes) {
            if ( row[1] === 'codigo' ) {
              this.setter = true;
            this.setDataAtCell(row[0], 1, et.matchDegreeByProduct(row[3],dataVal)  );
            this.setDataAtCell(row[0], 3, et.matchProduct(row[3],dataVal)  );
            this.setDataAtCell(row[0], 4, 1  );
            this.setDataAtCell(row[0], 5, et.matchPrice(row[3],dataPrices)  );
            this.setDataAtCell(row[0], 6, et.matchPrice(row[3],dataPrices)  );
            }

            if ( row[1] === 'quantity' || row[1] === 'price' ) {
              this.setDataAtCell(row[0], 6, Number(this.getDataAtCell(row[0],4)) * Number(this.getDataAtCell(row[0],5))  );
            }
            
            if ( row[1] === 'product_id' ) {
              varField = et.matchProductByName(row[3],dataVal);
              if ( _.isNil(varField)  ) {
                if (  this.getDataAtCell(row[0],3) === 'undefined' && !_.isNil(row[2]) ) {
                  this.setDataAtCell(row[0], 3, row[2]  );
                } else if ( !_.isNil(row[3])) {
                  this.setDataAtCell(row[0], 3, null  );
                }                
              } else {
                if ( varField !== this.getDataAtCell(row[0],2)  ) {
                  this.setDataAtCell(row[0], 2, et.matchProductByName(row[3],dataVal)  );
                }  
              }
              
            }
            
            switch(row[1]) { 
              case 'quantity':
              case 'price':
              case 'subtotal':
              case 'sale_direct':
              case 'sale_external_library': 
              case 'sale_event':
              case 'sale_teacher':
              case 'sale_infrastructure':
              case 'sale_scholarships':
              case 'sale_staff':
              case 'sale_training':{      
                
                varRow = 0;

                if (_.includes(row[3], '%')) {
                  varField = _.replace(row[3], '%', '');
                  varField = _.replace(varField, ',', '.');
                  varRow = (row[1] === 'sale_direct' && varRow === 0 ) ? varRow = 7 : varRow = varRow;
                  varRow = (row[1] === 'sale_external_library' && varRow === 0 ) ? varRow = 8 : varRow = varRow;
                  varRow = (row[1] === 'sale_event' && varRow === 0 ) ? varRow = 9 : varRow = varRow;
                  varRow = (row[1] === 'sale_teacher' && varRow === 0 ) ? varRow = 10 : varRow = varRow;
                  varRow = (row[1] === 'sale_infrastructure' && varRow === 0 ) ? varRow = 11 : varRow = varRow;
                  varRow = (row[1] === 'sale_scholarships' && varRow === 0 ) ? varRow = 12 : varRow = varRow;
                  varRow = (row[1] === 'sale_staff' && varRow === 0 ) ? varRow = 13 : varRow = varRow;
                  varRow = (row[1] === 'sale_training' && varRow === 0 ) ? varRow = 14 : varRow = varRow;

                  this.setDataAtCell(row[0], varRow, Number(varField)  );

                }
                
                //statements;
                let sale_direct;
                let sale_external_library;
                let sale_event;
                let sale_teacher;
                let sale_infrastructure;
                let sale_scholarships;
                let sale_staff;
                let sale_training;

                sale_direct = _.isNil(this.getDataAtCell(row[0],7)) ? sale_direct = 0 : sale_direct = Number(this.getDataAtCell(row[0],7));
                sale_external_library = _.isNil(this.getDataAtCell(row[0],8)) ? sale_external_library = 0 : sale_external_library = Number(this.getDataAtCell(row[0],8));
                sale_event = _.isNil(this.getDataAtCell(row[0],9)) ? sale_event = 0 : sale_event = Number(this.getDataAtCell(row[0],9));
                sale_teacher = _.isNil(this.getDataAtCell(row[0],10)) ? sale_teacher = 0 : sale_teacher = Number(this.getDataAtCell(row[0],10));
                sale_infrastructure = _.isNil(this.getDataAtCell(row[0],11)) ? sale_infrastructure = 0 : sale_infrastructure = Number(this.getDataAtCell(row[0],11));
                sale_scholarships = _.isNil(this.getDataAtCell(row[0],12)) ? sale_scholarships = 0 : sale_scholarships = Number(this.getDataAtCell(row[0],12));
                sale_staff = _.isNil(this.getDataAtCell(row[0],13)) ? sale_staff = 0 : sale_staff = Number(this.getDataAtCell(row[0],13));
                sale_training = _.isNil(this.getDataAtCell(row[0],14)) ? sale_training = 0 : sale_training = Number(this.getDataAtCell(row[0],14));

                let total_descount = sale_direct + sale_external_library + sale_event + sale_teacher + sale_infrastructure + sale_scholarships + sale_staff + sale_training;
                let total = Number(this.getDataAtCell(row[0],6)) -  ( Number(this.getDataAtCell(row[0],6)) * total_descount / 100 );
                
                
                this.setDataAtCell(row[0], 15, total  );
                break; 
             } 
            }



          }          
        } else {
          this.setter = false;
        }
        


        /*
        if (!this.setter) {
          this.setter = true;
          this.setDataAtCell(changes[0][0], 3, et.matchProduct(changes[0][3],dataVal)  );
        } else {
          this.setter = false;
        }
        */
      },
      rowHeaders: true,
      stretchH: 'all',
      width: 950,
      height: 400,
      colWidths: [45, 75, 120, 330, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      autoWrapRow: true,
      manualRowResize: true,
      manualColumnResize: true,
      manualRowMove: true,
      manualColumnMove: true,
      filters: true,
      dropdownMenu: true,
      renderAllRows: false,
      outsideClickDeselects: true,
      licenseKey: 'non-commercial-and-evaluation',
      columns: this.columnsGrid,
      viewportRowRenderingOffset: "auto"
    });

    //this.addCalc();
    
  }

  public addCalc() {
    //adding row and pushing new data
    this.hot.setDataAtCell(this.hot.countRows(), 0, '');
    //changing header to AVE for the last row  
    this.hot.updateSettings({
      afterGetRowHeader: function(row, TH) {
        if (row === this.hot.countRows() - 1) {
          TH.textContent = 'SUM';       
        }
      }
    })
    
    let lastRow = this.hot.countRows() - 1;
    this.hot.setDataAtCell(this.hot.countRows() - 1, 0, '=SUM(E1:E'+lastRow+')');
  }

  ngOnDestroy(): void {
    this.hot.destroy();
  }

  public add() {
    this.hot.alter('insert_row', 0);
  }

  public reloadData() {
    this.hot.render();
  }

  public remove() {
    
  }

  private currencyRenderer(instance, td, row, col, prop, value, cellProperties) {
    if(isNaN(value)){
      td.innerHTML = value;
    }else{
      td.innerHTML = value;
    }
   return td;
 }


 public matchProduct(cod: string, product: any[]): string | undefined {
  let productObj = _.find(product, (x) => x.cod === cod);
  if (_.isNil(productObj)) {
    return null;
  }
  return productObj.description;

}

public matchProductByName(description: string, product: any[]): string | undefined {
  let productObj = _.find(product, (x) => x.description === description);
  if (_.isNil(productObj)) {
    return null;
  }
  return productObj.cod;

}

public matchDegreeByProduct(cod: string, product: any[]): string | undefined {
  let productObj = _.find(product, (x) => x.cod === cod);
  if (_.isNil(productObj)) {
    return null;
  }
  return productObj.degree;

}


public matchPrice(cod: string, product: any[]): any | undefined {
  let productObj = _.find(product, (x) => x.cod === cod);
  if (_.isNil(productObj)) {
    return 0;
  }
  return productObj.price;

}


}


//  https://stackblitz.com/edit/handsontable-angular-vtnhyk?file=app%2Fapp.component.ts

//http://jsfiddle.net/t79u4w66/
