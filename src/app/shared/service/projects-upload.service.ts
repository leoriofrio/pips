import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { FileUpload, DataUpload } from '../../app.type';

@Injectable({
  providedIn: 'root'
})
export class ProjectsUploadService {
  public dataFiles = new Subject<DataUpload>();

  private uploadUrl;
  private user;
  constructor() {
    this.user = { name: 'John Doe'};
   }

   uploadFiles(files: Array<any>, description: string): Observable<FileUpload[]> {
    const filesUpload:FileUpload[] = [];
    for (const item of files) {
      filesUpload.push({
        name: item.name, 
        url: item.url, 
        description: item.description, 
        date: new Date(), 
        user: this.user.name, 
        icon: (item.type.indexOf("image") >= 0) ? "image" : "file"});
    }
    return of(filesUpload);
  }

  public refreshCurrentPayPlanPeriod(payPlanPeriod, route?: string): void {
    this.dataFiles.next({payPlanPeriod, route});
  }
}

//icon: (item.type.indexOf("image") >= 0) ? "image" : "file"
