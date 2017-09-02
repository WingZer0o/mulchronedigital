import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../../shared/services/user-authenication.service";
import { ILoginUser } from "../../../shared/models/user-authenication.model";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  login: ILoginUser[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getList().subscribe((res) => {
      this.login = res;
    });
  }
}