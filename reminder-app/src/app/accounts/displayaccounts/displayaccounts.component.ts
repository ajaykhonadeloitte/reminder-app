import { Component, OnInit, Input } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-displayaccounts',
  templateUrl: './displayaccounts.component.html',
  styleUrls: ['./displayaccounts.component.scss']
})
export class DisplayaccountsComponent implements OnInit {
  @Input() accounts: Array<any>;
  selectCount: number = 0;
  constructor(private as: AccountsService, private router: Router) { }

  ngOnInit() {
  }

  editAccount(index: number) {
    this.as.currentIndex = 0;
    this.as.accountList = [this.accounts[index]];
    this.router.navigateByUrl('/landing/accounts/add');
  }

  editSelectedAccounts() {
    this.accounts.forEach((element, index, arr) => {
      if (!!element.selected) {
        this.as.accountList.push(element);
        if (this.as.currentIndex == -1) {
          this.as.currentIndex = index;
        }
      }
    });
    this.router.navigateByUrl('/landing/accounts/add');
  }
  toggleSelectAccount($event) {
    if ($event.target.checked) {
      this.selectCount++;
    } else {
      this.selectCount--;
    }
  }

  toggleSelectAllAccounts($event) {
    if ($event.target.checked) {
      this.selectCount = this.accounts.length;
    } else {
      this.selectCount = 0;
    }
    this.accounts.forEach((account) => {
      account.selected = !!$event.target.checked
    });
  }
}
