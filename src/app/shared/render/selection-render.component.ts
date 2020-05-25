// src/app/red-component/red-component.component.ts
import {Component} from "@angular/core";
import {ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'currency-cell',
    template: `
    {{ params.value  }}
  `
})

export class selectionRenderComponent implements ICellRendererAngularComp {

  public refresh : any;

  public params:any = {
    value : "none"
  };

  buttonClick(event)
  {
    event.preventDefault();  // prevent page reloading.
    //console.log ("Button clicked");
    const target = event.target;
  }
  
  showMenu : boolean = false;

  downArrowClick(event)
  {
    event.preventDefault();  // prevent page reloading.
  
    const target = event.target;
    this.showMenu = !this.showMenu

    //console.log ("Button clicked  this.showMenu = " +  this.showMenu );
  }

  mouseleave(event)
  {
    event.preventDefault();  // prevent page reloading.
  
    const target = event.target;
    this.showMenu = false;

    //console.log ("mouseleave this.showMenu = " +  this.showMenu );
  }


  
  
  agInit(params:any):void {
      this.params = params;
 //     console.dir(params);
  }
  
}