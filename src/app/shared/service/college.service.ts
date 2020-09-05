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
export class CollegeService {
  private baseUrl: string;
  private cache$: Observable<any[]>;

  constructor(
    private http: HttpClient
  ) { 
    this.baseUrl = ApiKeys.API_URL;
  }

  public getCollegeByRegion(region: string) {
    const url = this.baseUrl+`college/`+region.toString();
    return this.http.get<any>(url);
  }
  public createCollege(college: any): Observable<any> {    
    const url = this.baseUrl+`college`;
    return this.http.post<any>(url, college, httpOptions);
  }

  public updateCollege(college: any): Observable<any> {    
    const url = this.baseUrl+`college/edit`;
    return this.http.patch<any>(url, college, httpOptions);
  }
  
}
