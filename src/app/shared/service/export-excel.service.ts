import {Injectable} from '@angular/core';
import {Workbook} from 'exceljs';
import * as FileSaver from 'file-saver';
import {ExcelKeys} from '../../app.keys';
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

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const fileData: Blob = new Blob([buffer], {type: ExcelKeys.EXCEL_TYPE});
    FileSaver.saveAs(fileData, fileName + '_export_' + new Date().getTime() + ExcelKeys.EXCEL_EXTENSION);
  }
}