import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { ApiKeys } from 'src/app/app.keys';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
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

  public getProject() {
    const url = this.baseUrl+`proform/all`;
    console.log(url);
    return this.http.get<any>(url);
  }

}
