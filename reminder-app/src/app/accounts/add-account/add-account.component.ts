import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
  providers: []
})
export class AddAccountComponent implements OnInit, OnDestroy {
  accountForm: FormGroup;
  emails: Array<string>;
  phones: Array<string>;
  accountsService: AccountsService
  constructor(private fb: FormBuilder, private as: AccountsService, private router: Router) {
    this.accountsService = as;
  }

  ngOnInit() {
    let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.accountForm = this.fb.group({
      accountId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ,.'-]+$")]],
      email: ['', [Validators.pattern(emailRegEx)]],
      phone: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      creditPeriod: [30, [Validators.pattern("^[0-9]*$")]],
      emailFlag: [false, []],
      smsFlag: [false, []]
    });
    this.emails = [];
    this.phones = [];
    if (this.accountsService.currentIndex > -1) {
      this.editModeInitialization();
    }
  }

  editModeInitialization() {
    this.accountForm.controls['accountId'].setValue(this.accountsService.accountList[this.accountsService.currentIndex].accountId);
    this.accountForm.controls['name'].setValue(this.accountsService.accountList[this.accountsService.currentIndex].name);
    this.accountForm.controls['creditPeriod'].setValue(this.accountsService.accountList[this.accountsService.currentIndex].creditPeriod);
    this.accountForm.controls['emailFlag'].setValue(this.accountsService.accountList[this.accountsService.currentIndex].emailFlag == 0 ? false : true);
    this.accountForm.controls['smsFlag'].setValue(this.accountsService.accountList[this.accountsService.currentIndex].smsFlag == 0 ? false : true);
    this.emails = [];
    this.phones = [];
    this.accountsService.accountList[this.accountsService.currentIndex].email.forEach(element => {
      this.emails.push(element);
    });
    this.accountsService.accountList[this.accountsService.currentIndex].phone.forEach(element => {
      this.phones.push(element);
    });
  }

  back() {
    this.router.navigateByUrl('/landing/accounts');
  }
  next() {
    this.accountsService.currentIndex++;
    this.editModeInitialization();
  }
  previous() {
    this.accountsService.currentIndex--;
    this.editModeInitialization();
  }

  ngOnDestroy() {
    this.accountsService.currentIndex = -1;
    this.accountsService.accountList = [];
  }
  get accountId() {
    return this.accountForm.get('accountId');
  }
  get name() {
    return this.accountForm.get('name');
  }
  get email() {
    return this.accountForm.get('email');
  }
  get phone() {
    return this.accountForm.get('phone')
  }
  get creditPeriod() {
    return this.accountForm.get('creditPeriod');
  }
  get emailFlag() {
    return this.accountForm.get('emailFlag');
  }
  get smsFlag() {
    return this.accountForm.get('smsFlag');
  }
  addEmail(email: string) {
    if (this.emails.indexOf(email) == -1)
      this.emails.push(email);
    this.accountForm.controls['email'].setValue('');
  }

  addPhone(phone: string) {
    if (this.phones.indexOf(phone) == -1)
      this.phones.push(phone);
    this.accountForm.controls['phone'].setValue('');
  }

  removeEmail(index: number) {
    this.emails.splice(index, 1);
  }
  removePhone(index: number) {
    this.phones.splice(index, 1);
  }

  submitForm() {
    if (this.accountForm.valid) {
      if (this.email.value.trim() != '' && this.email.valid) {
        this.emails.push(this.email.value);
        this.accountForm.controls['email'].setValue('');
      }
      if (this.phone.value.trim() != '' && this.phone.valid) {
        this.phones.push(this.phone.value);
        this.accountForm.controls['phone'].setValue('');
      }
      let accountData = {
        accountId: this.accountId.value,
        name: this.name.value,
        emailFlag: this.emailFlag.value,
        smsFlag: this.smsFlag.value,
        creditPeriod: this.creditPeriod.value,
        email: this.emails,
        phone: this.phones
      };
      console.log(accountData);
      if (this.accountsService.currentIndex == -1) {
        this.accountsService.addAccount(accountData).subscribe(res => {
          console.log(res);
        });
      }
      else {
        this.accountsService.modifyAccount(accountData).subscribe(res => {
          console.log(res);
        });
      }

    }
  }


}
