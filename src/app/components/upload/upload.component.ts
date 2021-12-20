import { UploadService } from './../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {

  chosenFiles!: any;
  existingFile!: any;
  progress = 0;
  msg = '';

  FileDetail!: Observable<any>;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
    this.FileDetail = this.uploadService.getFiles();
  }
  
  chooseFile(event:any ): void {
    this.chosenFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
  
    this.existingFile = this.chosenFiles.item(0);

    this.uploadService.uploadFile(this.existingFile).subscribe( (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total!);
        } else if (event instanceof HttpResponse) {
          this.msg = event.body.message;
          this.FileDetail = this.uploadService.getFiles();
        }
      }, (error) => {
        this.progress = 0;
        this.msg = 'Error occured while uploading file';
        this.existingFile = null;
      });

    this.chosenFiles = null;
  }  

}
