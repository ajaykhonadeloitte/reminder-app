import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuardService } from "./auth-guard.service";
import { LandingComponent } from "./landing/landing.component";
import { AddAccountComponent } from "./accounts/add-account/add-account.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { UploadAccountsComponent } from "./accounts/upload-accounts/upload-accounts.component";
import { AddInvoiceComponent } from "./invoices/add-invoice/add-invoice.component";
import { InvoiceComponent } from "./invoices/invoice/invoice.component";
import { InvoicesComponent } from "./invoices/invoices.component";
// import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "landing",
    component: LandingComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "accounts", component: AccountsComponent },
      { path: "accounts/add", component: AddAccountComponent },
      { path: "accounts/upload", component: UploadAccountsComponent },
      { path: "invoices", component: InvoicesComponent },
      { path: "invoices/add", component: AddInvoiceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
