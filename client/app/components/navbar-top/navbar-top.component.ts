import { Component, OnInit } from "@angular/core";
import { AuthenicationControl } from "../../shared/authenication/AuthenicationControl";
import { Router } from "@angular/router";
import { JsonWebToken } from "../../../../shared/interfaces/IJsonWebToken";
import { RefreshTokenService } from "../../shared/services/refresh-token.service";

@Component({
  selector: "app-navbar-top",
  templateUrl: "./navbar-top.component.html",
  styleUrls: ["./navbar-top.component.css"],
  providers: []
})
export class NavbarTopComponent implements OnInit {
  constructor(
    public authControl: AuthenicationControl,
    private router: Router,
    private refreshTokenService: RefreshTokenService
  ) {}

  ngOnInit() {
    if (this.authControl.isTheUserAuthenicated()) {
      this.refreshTokenService.refreshToken().subscribe(response => {
        this.authControl.storeJsonWebToken(response.token);
      });
    }
  }

  public toggleNavigateToUserDashboardClick(): void {
    const token: JsonWebToken = this.authControl.getDecodedToken();
    if (token !== null) {
      this.router.navigate(["../../dashboard/user", { id: token.id }, { outlets: { dashboard: ["home"] } } ]);
    }
  }

  public toggleLogOutUser(): void {
    this.authControl.removeJsonWebToken();
    this.router.navigate([""]);
  }
}
