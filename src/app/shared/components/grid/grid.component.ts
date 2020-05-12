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

  private hot: Handsontable;

  constructor() { }

  ngOnInit(): void {
    (Handsontable.renderers as any).registerRenderer('currency', this.currencyRenderer);

    const containerVal = this.container.nativeElement;
    this.hot = new Handsontable(containerVal, {
      data: this.budgetRecords,
      contextMenu: ['cut', 'copy'],
      colHeaders:  this.columnsHeader ,
      rowHeaders: false,
      stretchH: 'all',
      width: 880,
      height: 487,
      autoWrapRow: true,
      manualRowResize: true,
      manualColumnResize: true,
      manualRowMove: true,
      manualColumnMove: true,
      filters: true,
      dropdownMenu: true,
      licenseKey: 'non-commercial-and-evaluation',
      columns: this.columnsGrid,
    });
  }

  ngOnDestroy(): void {
    this.hot.destroy();
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