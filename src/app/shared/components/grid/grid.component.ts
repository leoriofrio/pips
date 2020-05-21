import { Component, Output, EventEmitter, OnDestroy, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import Handsontable from 'handsontable';
import { GridRecord } from '../../../app.type';

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

  private hot: Handsontable;

  constructor() { }

  ngOnInit(): void {
    (Handsontable.renderers as any).registerRenderer('currency', this.currencyRenderer);

    const containerVal = this.container.nativeElement;
    var container = document.getElementById('example');
    console.log(containerVal);
    this.hot = new Handsontable(container, {
      data: this.budgetRecords,
      contextMenu: ['row_above','row_below','remove_row', 'copy'],
      colHeaders:  this.columnsHeader ,
      rowHeaders: true,
      stretchH: 'all',
      width: 1450,
      height: 400,
      autoWrapRow: true,
      manualRowResize: true,
      manualColumnResize: true,
      manualRowMove: true,
      manualColumnMove: true,
      filters: true,
      dropdownMenu: true,
      outsideClickDeselects: false,
      licenseKey: 'non-commercial-and-evaluation',
      columns: this.columnsGrid,
      viewportRowRenderingOffset: "auto",
    });
  }

  

  ngOnDestroy(): void {
    this.hot.destroy();
  }

  public add() {
    this.hot.alter('insert_row', 0);
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

}


//  https://stackblitz.com/edit/handsontable-angular-vtnhyk?file=app%2Fapp.component.ts

//http://jsfiddle.net/t79u4w66/