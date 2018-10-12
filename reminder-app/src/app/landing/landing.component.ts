import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  showMenu: boolean = true;
  r: Router;
  constructor(private _auth: AuthService, private router: Router) {
    this.r = router;
  }

  ngOnInit() {
    // this._auth.isLoggedIn();
    // this.r.navigateByUrl("/landing/accounts");
  }
}
