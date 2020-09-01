import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiKeys } from 'src/app/app.keys';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string;

  constructor(
    private http: HttpClient
  ) { 
    this.baseUrl = ApiKeys.API_URL;
  }

  public getProductByRegion(region: string) {
    const url = this.baseUrl+`product/`+region.toString();
    return this.http.get<any>(url);
  }

  public createProduct(id: string, product: any): Observable<any> {
    //debugger;
    const url = this.baseUrl+`product/Sierra`;
    return this.http.post<any>(url, product, httpOptions);
  }
}
