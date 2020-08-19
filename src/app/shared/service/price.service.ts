import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiKeys } from 'src/app/app.keys';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private baseUrl: string;

  constructor(
    private http: HttpClient
  ) { 
    this.baseUrl = ApiKeys.API_URL;
  }

  public getPriceByPromotion(promotion: string) {
    const url = this.baseUrl+`price/`+promotion;
    return this.http.get<any>(url);
  }

  public createPrice(promotion: string, price: any): Observable<any> {    
    const url = this.baseUrl+`price/`+ promotion.toString();
    return this.http.post<any>(url, price, httpOptions);
  }

  public updatePrice(promotion: string, price: any): Observable<any> {    
    const url = this.baseUrl+`price/`+promotion.toString();
    return this.http.patch<any>(url, price, httpOptions);
  }
}
