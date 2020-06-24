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
export class UtilsService {
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

  public getUsers() {
    const url = this.baseUrl+`users`;
    return this.http.get<any>(url);
  }

  public getCollegesByRegion(region: string) {
    const url = this.baseUrl+`college/`+region.toString();
    return this.http.get<any>(url);
  }

  public getClientsAll() {
    const url = this.baseUrl+`client/all`;
    return this.http.get<any>(url);
  }
}
