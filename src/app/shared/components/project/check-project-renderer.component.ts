import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'child-cell',
  template: `
    <span><img src="../assets/images/edit.png" (click)="invokeParentMethod()"/></span>
  `
})
export class CheckProjectRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.checkProject(this.params.node);
  }

  refresh(): boolean {
    return false;
  }
}
