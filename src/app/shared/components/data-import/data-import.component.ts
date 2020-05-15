'use strict';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ProjectsUploadService } from '../../service/projects-upload.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FilesType, ValidatesPattern  } from '../../../app.keys';
import { FileUpload } from 'src/app/app.type';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.scss']
})
export class DataImportComponent implements OnInit {
  
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  @Input() multiple = false;
  @Input() types = 'all';
  @Input() complete = false;
  @Input() imageUrl = null;

  public files = [];
  public pattern:string;

  constructor(private uploadService:  ProjectsUploadService,  private ngxService: NgxUiLoaderService) {

   }

  ngOnInit() {
    this.pattern = ValidatesPattern.alphanumeric;
    console.log('Nuevos' + this.files);
  }

  loadProcess(files: Array<any>) {
    this.files = this.valideFiles(files);
    if (!this.complete && this.files.length) {
      this.files[0].url = FilesType.mockImage;
      this.uploadProcess();
    }    
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  uploadProcess() {
    this.ngxService.start();
    setTimeout(() => {
      this.uploadService.uploadFiles(this.files, "test description").subscribe(filesUpload => {
        this.ngxService.stop();
        this.fileDropEl.nativeElement.value = "";
        this.files = [];
        if (!this.complete) {
          this.imageUrl = filesUpload[0].url;
        }
        this.files = filesUpload;  
      });
    }, 3000);
    this.uploadService.refreshCurrentPayPlanPeriod(this.files,'dataimport/dataimport');
    console.log(this.files);
  }

  addDescriptions(form: NgForm) {
    for (const item of this.files) {
      item.description = form.value[item.uid];
    }
    this.uploadProcess();
  }

  valideFiles(files: Array<any>) {
    let acceptedFiles = [];
    for (const item of files) {
      const ext = item.name.split('.').pop();
      if (FilesType[this.types].indexOf(ext) >= 0) {
        item.uid = Math.floor(Math.random() * 999);
        acceptedFiles.push(item);
      }
    }
    acceptedFiles = this.multiple ? acceptedFiles : [acceptedFiles[0]];
    return acceptedFiles;
  }

  

}
