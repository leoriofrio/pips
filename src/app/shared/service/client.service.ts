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
export class ClientService {
  private baseUrl: string;
  private cache$: Observable<any[]>;

  constructor(
    private http: HttpClient
  ) { 
    this.baseUrl = ApiKeys.API_URL;
  }

  public getClientActive() {
    const url = this.baseUrl+`client/all`;
    return this.http.get<any>(url);
  }
  public createClient(client: any): Observable<any> {    
    const url = this.baseUrl+`client`;
    return this.http.post<any>(url, client, httpOptions);
  }

  public updateClient(client: any): Observable<any> {    
    const url = this.baseUrl+`client/edit`;
    return this.http.patch<any>(url, client, httpOptions);
  }
}
