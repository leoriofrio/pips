import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { ApiKeys } from 'src/app/app.keys';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ProformService {
  private baseUrl: string;
  private id: any;

  constructor(
    private http: HttpClient
  ) { 
    this.baseUrl = ApiKeys.API_URL;
  }

  public getProform() {
    const url = this.baseUrl+`proform/all`;
    return this.http.get<any>(url);
  }

  public createProform(proform: any): Observable<any> {
    const url = this.baseUrl+`proform/create`;
    return this.http.post<any>(url, proform);
  }

  public createProformDetail(id: string, proformDetail: any): Observable<any> {
    const url = this.baseUrl+`proform/`+id.toString()+`/proformDetail`;
    return this.http.post<any>(url, proformDetail, httpOptions);
  }

  

}
