import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiKeys } from 'src/app/app.keys';
import { shareReplay } from 'rxjs/operators';

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
  private cache$: Observable<any[]>;

  constructor(
    private http: HttpClient
  ) { 
    this.baseUrl = ApiKeys.API_URL;
  }

  /**
   * @description Function that load cache
   * @param tenantId - tenand id
   * @return Observable<BaseProject> - list project
   */
  private loadCacheData(tenantId: string): void {
    if (!this.cache$) {
      this.cache$ = this.getProductByRegion("Sierra").pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }
  }

  public getProductByRegion(region: string) {
    const url = this.baseUrl+`product/`+region.toString();
    return this.http.get<any>(url);
  }

  public createProduct(id: string, product: any): Observable<any> {    
    const url = this.baseUrl+`product/Sierra`;
    return this.http.post<any>(url, product, httpOptions);
  }

  public updateProduct(id: string, product: any): Observable<any> {    
    const url = this.baseUrl+`product/`+id+`/edit`;
    return this.http.patch<any>(url, product, httpOptions);
  }
}
