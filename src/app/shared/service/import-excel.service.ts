import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiKeys } from 'src/app/app.keys';

import * as XLSX from 'xlsx';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelImportService {

  private baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = ApiKeys.API_URL;
  }

  public excelToJson(file: File): Observable<any> {
    const fileReader: FileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    return Observable.create( (observer: Subscriber<any[]>): void => {
      fileReader.onload = ( (e): void => {
        let data = new Uint8Array( e.target.result as ArrayBuffer);
        let arr = Array.prototype.map.call(data, val => {
          return String.fromCharCode(val);
        });
        let workbook = XLSX.read(arr.join(""), { type: "binary" });
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        observer.next(jsonData);
        observer.complete();
      });
      fileReader.onerror = (error): void => {
        observer.error(error);
      }
    });
  }

}
