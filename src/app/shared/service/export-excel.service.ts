import {Injectable} from '@angular/core';
import {Workbook} from 'exceljs';
import * as FileSaver from 'file-saver';
import {ExcelKeys, Proform, UserColumns, CollegesColumns, ClientColumns, ProformDetail} from '../../app.keys';
import * as _ from 'lodash';
import {isNull} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {
  structure: boolean;

  constructor() {
    this.structure = false;
  }

  public setStructure(valid: boolean) {
    this.structure = valid;
  }

  public getStructure(): boolean {
    return this.structure;
  }

  public setHeadersColumn(column: any): any {
    const header: string[] = [];
    for (const itemHeader of Object.keys(column)) {
      if (
        !_.isEmpty(_.trim(column[itemHeader].headerName)) &&
        column[itemHeader].headerName !== ExcelKeys.EXCEL_DETAIL_METADATA
      ) {
        header.push(column[itemHeader].headerName);
      }
    }
    if (header.length < column.length) {
      this.setStructure(false);
    } else {
      this.setStructure(true);
      this.getStructure();
    }
    return header;
  }

  public verifyHeadersAndDataFormat(headers: any, detail: any) {
    const filteredArray: string[] = [];
    const detailCompare: string[] = [];

    for (const itemHeader of Object.keys(headers)) {
      filteredArray.push(headers[itemHeader].field);
    }

    if (filteredArray.length === headers.length) {
      _.forEach(detail, function(value, key) {
        _.forEach(value, function(valueDet, keyDet) {
          if (!(keyDet === ExcelKeys.EXCEL_DETAIL_METADATA)) {
            if (_.indexOf(filteredArray, keyDet) < 0) {
              detailCompare.push(keyDet);
            }
          }
        });
      });
      if (detailCompare.length === 0) {
        this.setStructure(true);
        this.getStructure();
      } else {
        this.setStructure(false);
      }
    } else {
      this.setStructure(false);
    }
  }

  public generateExcelFromJson(fileName: string, headers: any, data: any) {
    // Create workbook and worksheet by the params from the Function
    let workbook = new Workbook();
    workbook = this.generateWorkBookFromJson(fileName, headers, data);
    this.verifyHeadersAndDataFormat(headers, data);
    // Generate Excel File with given name from the Function
    workbook.xlsx.writeBuffer().then(dataExport => {
      this.saveAsExcelFile(dataExport, fileName);
    });
  }

  public generateExcelWithFormat(fileName: string, title:string, topHeader:any, headers: any, data: any, footer: any) {
    // Create workbook and worksheet by the params from the Function
    let workbook = new Workbook();
    workbook = this.generateWorkBookWithFormat(fileName, title, topHeader, headers, data, footer);    
    // Generate Excel File with given name from the Function
    workbook.xlsx.writeBuffer().then(dataExport => {
      this.saveAsExcelFile(dataExport, fileName);
    });
  }

  public generateWorkBookFromJson(fileName: string, headers: any, data: any): Workbook {
    let dataDetail: string[] = [];
    let objMetaData: Object;
    let objCellStyle: Object;
    let cellField: number;
    let cellColor: any;
    let cellFormula: any;

    // Create workbook and worksheet by the params from the Function
    const workbook = new Workbook();
    if (isNull(fileName)) {
      return workbook;
    }
    const worksheet = workbook.addWorksheet(fileName);

    // Add Header Row
    const headerRow = worksheet.addRow(this.setHeadersColumn(headers));

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: ExcelKeys.EXCEL_CELL_TYPE,
        pattern: ExcelKeys.EXCEL_CELL_PATTERN,
        fgColor: {argb: ExcelKeys.EXCEL_HEADER_FGCOLOR},
        bgColor: {argb: ExcelKeys.EXCEL_HEADER_BGCOLOR}
      };
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
    });

    worksheet.columns.forEach(column => {
      column.width = column.header.length < 12 ? 12 : column.header.length
    })

    // Add Detail Row Value from Json File
    for (const item of Object.keys(data)) {
      dataDetail = [];
      for (const column of headers) {
        if (data[item].hasOwnProperty(column.field) && column.field === ExcelKeys.EXCEL_DETAIL_METADATA) {
          // Separate data from styles, formulas, colors, etc
          objCellStyle = null;

          objMetaData = data[item][column.field];
          if (!_.isNil(objMetaData)) {
            for (const meta of Object.keys(objMetaData)) {
              for (const detaMeta in objMetaData[meta]) {
                if (objMetaData[meta].hasOwnProperty(detaMeta)) {
                  switch (detaMeta) {
                    case ExcelKeys.EXCEL_DETAIL_CELL: {
                      objCellStyle = objMetaData[meta][detaMeta];
                      break;
                    }
                  }
                }
              }
            }
          }
          break;
        } else {
          if (!_.isEmpty(_.trim(column.headerName))) {
            dataDetail.push(data[item][column.field]);
          }
        }
      }

      // Add the row to the main grid
      const row = worksheet.addRow(dataDetail);
      // Add the style, colors, formulas, etc to the actual row
      if (objCellStyle != null) {
        for (const itemDet of Object.keys(objCellStyle)) {
          cellField = 0;
          cellColor = '';
          cellFormula = '';
          for (const option in objCellStyle[itemDet]) {
            if (objCellStyle[itemDet].hasOwnProperty(option)) {
              switch (option) {
                case ExcelKeys.EXCEL_DETAIL_FIELD: {
                  cellField = Number(objCellStyle[itemDet][option]);
                  break;
                }
                case ExcelKeys.EXCEL_DETAIL_COLOR: {
                  cellColor = objCellStyle[item][option];
                  break;
                }
                case ExcelKeys.EXCEL_DETAIL_FORMULA: {
                  cellFormula = objCellStyle[item][option];
                  break;
                }
              }
            }
          }
          // Set Color
          if (!_.isEmpty(cellColor)) {
            const qty = row.getCell(cellField);
            qty.fill = {
              type: ExcelKeys.EXCEL_CELL_TYPE,
              pattern: ExcelKeys.EXCEL_CELL_PATTERN,
              fgColor: {argb: cellColor}
            };
          }
          // Set Formula
          if (!_.isEmpty(cellFormula) && cellFormula !== '{}' && !_.isNull(cellFormula)) {
            row.getCell(cellField).value = {formula: cellFormula} as any;
          }
        }
      }
    }
    if (isNull(dataDetail)) {
      return workbook;
    }

    // Return a WorkBook, its similar to generateExcelFromJson
    return workbook;
  }

  public generateHeaderWithFormat(worksheet: any, title:string, topHeader:any){
    let dataDetail: string[] = [];
    let rowNew: any;
    let row;
    const rowBlank = null;

    worksheet.addRow(rowNew);    
    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(title);
    worksheet.addRow(dataDetail);
    //New Rows Black    
    worksheet.addRow(rowNew);
    
    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Código de Proforma :');
    dataDetail.push(topHeader['id']);
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Estado :');
    dataDetail.push(topHeader['status']);
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });
    
    
    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Numero de Proforma :');
    dataDetail.push(topHeader['number_proform']);
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });


    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Fecha de Proforma :');
    dataDetail.push(topHeader['date_proform']);
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Fecha de Entrega de Proforma :');
    dataDetail.push(topHeader['date_delivery']);
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Código de vendedor :');
    dataDetail.push(topHeader['user'][UserColumns.COD_USER.prop]);
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Vendedor: ');
    dataDetail.push(topHeader['user'][UserColumns.NAME.prop]);
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Código del vendedor al cual se asignará la venta en el momento del ingreso del pedido');
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    worksheet.addRow(dataDetail);
    
    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Código del Cliente :');
    dataDetail.push(topHeader['client'][ClientColumns.COD_CLIENT.prop]);
    dataDetail.push(rowBlank);
    dataDetail.push('Nombre del Cliente :');
    dataDetail.push(topHeader['client'][ClientColumns.NAME.prop]);
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Institución : ');
    dataDetail.push(topHeader['college'][CollegesColumns.NAME.prop]);
    dataDetail.push(rowBlank);
    dataDetail.push(topHeader['college'][CollegesColumns.COD_INSTITUTO.prop]);
    dataDetail.push('Código del Instituto');
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Dirección :');
    dataDetail.push(topHeader['college'][CollegesColumns.ADDRESS.prop]);
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('CANAL DE VENTAS :');
    dataDetail.push(topHeader['type_client_sale']);
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Convenio:');
    dataDetail.push(topHeader['agreement']);
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    worksheet.addRow(dataDetail);
  }

  public generateFooterWithFormat(worksheet: any,footer: any){
    let dataDetail: string[] = [];
    let rowNew: any;
    let row;
    const rowBlank = null;
    const totalDescount = ( footer['sale_direct'] +
    footer['sale_external_library'] +
    footer['sale_event'] + 
    footer['sale_teacher'] + 
    footer['sale_infrastructure'] + 
    footer['sale_scholarships'] + 
    footer['sale_staff'] + 
    footer['sale_training'] + 
    footer['capex'] ).toFixed(2);
  
    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);    
    dataDetail.push(rowBlank);
    dataDetail.push('Total :');
    dataDetail.push(footer['quantity']);
    dataDetail.push(rowBlank);
    dataDetail.push(footer['subtotal'].toFixed(2));
    dataDetail.push(footer['sale_direct'].toFixed(2));
    dataDetail.push(footer['sale_external_library'].toFixed(2));
    dataDetail.push(footer['sale_event'].toFixed(2));
    dataDetail.push(footer['sale_teacher'].toFixed(2));
    dataDetail.push(footer['sale_infrastructure'].toFixed(2));
    dataDetail.push(footer['sale_scholarships'].toFixed(2));
    dataDetail.push(footer['sale_staff'].toFixed(2));
    dataDetail.push(footer['sale_training'].toFixed(2));
    dataDetail.push(footer['capex'].toFixed(2));
    dataDetail.push(footer['total'].toFixed(2));
    worksheet.addRow(dataDetail);

    dataDetail = [];
    dataDetail.push(rowBlank);
    worksheet.addRow(dataDetail);
    dataDetail = [];
    dataDetail.push(rowBlank);
    worksheet.addRow(dataDetail);

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Programa Crecer Santillana ');
    dataDetail.push('% Descuento ');
    dataDetail.push('$ Descuento ');
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push(ProformDetail.SALE_DIRECT.name);
    dataDetail.push(footer['sale_direct'].toFixed(2));
    dataDetail.push( ( footer['sale_direct'] /100 * footer['subtotal'] ).toFixed(2) );
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push(ProformDetail.SALE_EXTERNAL_LIBRARY.name);
    dataDetail.push(footer['sale_external_library'].toFixed(2));
    dataDetail.push( ( footer['sale_external_library'] /100 * footer['subtotal'] ).toFixed(2) );
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push(ProformDetail.SALE_EVENT.name);
    dataDetail.push(footer['sale_event'].toFixed(2));
    dataDetail.push( ( footer['sale_event'] /100 * footer['subtotal'] ).toFixed(2) );
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push(ProformDetail.SALE_TEACHER.name);
    dataDetail.push(footer['sale_teacher'].toFixed(2));
    dataDetail.push( ( footer['sale_teacher'] /100 * footer['subtotal'] ).toFixed(2) );
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push(ProformDetail.SALE_INFRASTRUCTURE.name);
    dataDetail.push(footer['sale_infrastructure'].toFixed(2));
    dataDetail.push( ( footer['sale_infrastructure'] /100 * footer['subtotal'] ).toFixed(2) );
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push(ProformDetail.SALE_SCHOLARSHIPS.name);
    dataDetail.push(footer['sale_scholarships'].toFixed(2));
    dataDetail.push( ( footer['sale_scholarships'] /100 * footer['subtotal'] ).toFixed(2) );
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push(ProformDetail.SALE_STAFF.name);
    dataDetail.push(footer['sale_staff'].toFixed(2));
    dataDetail.push( ( footer['sale_staff'] /100 * footer['subtotal'] ).toFixed(2) );
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push(ProformDetail.SALE_TRAINING.name);
    dataDetail.push(footer['sale_training'].toFixed(2));
    dataDetail.push( ( footer['sale_training'] /100 * footer['subtotal'] ).toFixed(2) );
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });
    
    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push(ProformDetail.CAPEX.name);
    dataDetail.push(footer['capex'].toFixed(2));
    dataDetail.push( ( footer['capex'] /100 * footer['subtotal'] ).toFixed(2) );
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('TOTAL :');
    dataDetail.push(totalDescount);
    dataDetail.push( ( totalDescount /100 * footer['subtotal'] ).toFixed(2) );
    row = worksheet.addRow(dataDetail);
    row.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};            
    });

    dataDetail = [];
    dataDetail.push(rowBlank);
    worksheet.addRow(dataDetail);
    dataDetail = [];
    dataDetail.push(rowBlank);
    worksheet.addRow(dataDetail);


    dataDetail = [];
    dataDetail.push(rowBlank);
    dataDetail.push(rowBlank);
    dataDetail.push('Indicar si el plantel tiene convenio');
    worksheet.addRow(dataDetail);
    


  }

  public generateWorkBookWithFormat(fileName: string, title:string, topHeader:any, headers: any, data: any, footer: any): Workbook {
    let dataDetail: string[] = [];
    let objMetaData: Object;
    let objCellStyle: Object;
    let cellField: number;
    let cellColor: any;
    let cellFormula: any;    

    // Create workbook and worksheet by the params from the Function
    const workbook = new Workbook();
    if (isNull(fileName)) {
      return workbook;
    }
    const worksheet = workbook.addWorksheet(fileName, {
      pageSetup:{paperSize: 9, orientation:'landscape'}
    });    

    // adjust pageSetup settings afterwards
    worksheet.pageSetup.margins = {
      left: 0.7, right: 0.7,
      top: 0.75, bottom: 0.75,
      header: 0.3, footer: 0.3
    };

    //Top Header
    this.generateHeaderWithFormat(worksheet, title, topHeader);    

    // Add Header Row
    const headerRow = worksheet.addRow(this.setHeadersColumn(headers));    
    
    for (let i = 0; i < worksheet.columns.length; i += 1) { 
      let dataMax = 0;
      const column = worksheet.columns[i];
      for (let j = 1; j < column.values.length; j += 1) {
        let columnLength = column.values.length;
        if (columnLength > dataMax) {
          dataMax = columnLength;
        }
      }
      column.width = dataMax < 10 ? 10 : dataMax;
    };

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};      
    });
    

    // Add Detail Row Value from Json File

    for (const item of Object.keys(data)) {
      dataDetail = [];
      for (const column of headers) {
        if (data[item].hasOwnProperty(column.field)) {
          dataDetail.push(data[item][column.field]);
          
        }
      }

      // Add the row to the main grid
      let row;
      row = worksheet.addRow(dataDetail);
      row.eachCell({ includeEmpty: true }, (cell, number) => {
        cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        row.getCell(number).fill = {fgColor: {argb: '004e47cc'}};
      });
      
    }
    if (isNull(dataDetail)) {
      return workbook;
    }

    this.generateFooterWithFormat(worksheet, footer);

    // Return a WorkBook, its similar to generateExcelFromJson
    return workbook;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const fileData: Blob = new Blob([buffer], {type: ExcelKeys.EXCEL_TYPE});
    FileSaver.saveAs(fileData, fileName + '_export_' + new Date().getTime() + ExcelKeys.EXCEL_EXTENSION);
  }
}