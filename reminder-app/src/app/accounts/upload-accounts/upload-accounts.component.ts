import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-upload-accounts',
  templateUrl: './upload-accounts.component.html',
  styleUrls: ['./upload-accounts.component.scss']
})
export class UploadAccountsComponent implements OnInit {
  uploadFile: File;
  constructor(private as: AccountsService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.uploadFile = files.item(0);
  }

  upload() {
    this.as.uploadFile(this.uploadFile).subscribe((response) => {
      console.log(response);
    });
  }
}
