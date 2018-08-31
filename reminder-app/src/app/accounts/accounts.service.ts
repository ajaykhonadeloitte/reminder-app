import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hosting } from '../hosting';

@Injectable()
export class AccountsService {
  // editMode: boolean = false;
  currentIndex: number = -1;
  accountList: Array<any> = [];

  constructor(private _http: HttpClient) { }

  addAccount(account) {
    return this._http.post(Hosting.getUrl('/api/accounts/add'), account);
  }
  getAccounts() {
    return this._http.get(Hosting.getUrl('/api/accounts'));
  }
  modifyAccount(account) {
    return this._http.put(Hosting.getUrl('/api/accounts'), account);
  }

  uploadFile(file: File) {
    let formData = new FormData();
    formData.append('accounts', file, file.name);
    return this._http.post(Hosting.getUrl('/api/accounts/upload'), formData);
  }
}
