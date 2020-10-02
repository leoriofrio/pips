import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { options } from './options';

@Component({
  selector: 'app-proform-options-state',
  templateUrl: './proform-options-state.component.html',
  styleUrls: ['./proform-options-state.component.css']
})
export class ProformOptionsStateComponent implements ICellRendererAngularComp {

  public params: ICellRendererParams;
  public options = options;

  constructor() { }
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  public invokeParentMethod(status) {
    this.params.context.componentParent.getProformState(status);
  }
 

}
