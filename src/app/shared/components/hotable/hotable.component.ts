import { Component, OnInit } from '@angular/core';
import * as Handsontable from "handsontable";

@Component({
  selector: 'app-hotable',
  templateUrl: './hotable.component.html',
  styleUrls: ['./hotable.component.css']
})
export class HotableComponent implements OnInit {

  constructor() { }
  tableSettings: any = {
    //rowHeaders: true,
    //colHeaders: true,
    viewportColumnRenderingOffset: 27,
    viewportRowRenderingOffset: "auto",
    //colWidths: 150,
    height: 450,
    // allowInsertColumn: false,
    // allowInsertRow: false,
    // allowRemoveColumn: false,
    // allowRemoveRow: false,
    // autoWrapRow: false,
    // autoWrapCol: false,
   // stretchH: "all",
    width: 924,
    // autoWrapRow: true,
    //height: 487,
    maxRows: 22,
    manualRowResize: true,
    manualColumnResize: true,
    licenseKey: 'non-commercial-and-evaluation',
    // rowHeaders: true,
     columns: [
        {
          data: 'id',
          type: 'numeric',
          width: 40
        },
        {
        type: 'dropdown',
        source: ['yellow', 'red', 'orange', 'green', 'blue', 'gray', 'black', 'white']
      },
        {
          data: 'level',
          type: 'numeric',
          numericFormat: {
            pattern: '0.0000'
          }
        },
        {
          data: 'units',
          type: 'text'
        },
        {
          data: 'asOf',
          type: 'date',
          dateFormat: 'MM/DD/YYYY'
        },
        {
          data: 'onedChng',
          type: 'numeric',
          numericFormat: {
            pattern: '0.00%'
          }
        }
      ],
    colHeaders: ["ID", "Currency", "Level", "Units", "Date", "Change"],
    manualRowMove: true,
    manualColumnMove: true,
    contextMenu: true,
    filters: true,
    dropdownMenu: true,
    afterValidate: function(isValid, value, row, prop){
      if(value == false){
        //console.log( value, row, prop)    
            //alert("Invalid")
          //Value = isValid
          // row = inserted invalid value
          //prop = row index changed
      }
			
    }
  };

  dataset = [
    {
      id: 1,
      flag: "EUR",
      currencyCode: "EUR",
      currency: "Euro",
      level: 0.9033,
      units: "EUR / USD",
      asOf: "08/19/2019",
      onedChng: 0.0026
    },
    {
      id: 2,
      flag: "JPY",
      currencyCode: "JPY",
      currency: "Japanese Yen",
      level: 124.387,
      units: "JPY / USD",
      asOf: "08/19/2019",
      onedChng: 0.0001
    }
  ];


  ngOnInit() {
   
  }

  detectChanges = (hotInstance, changes, source) => {
    //console.log(changes);
  };

  
}
