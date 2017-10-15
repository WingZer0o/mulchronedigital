import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { DashboardRouting } from "./dashboard.routing";
import { AuthenicationControl } from "../../shared/authenication/AuthenicationControl";
import { ClientAuthGuard } from "../../shared/authenication/ClientAuthGuard";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { UserDashboardHomeComponent } from "./user-dashboard/components/user-dashboard-home/user-dashboard-home.component";
import { UserDashboardService } from "../../shared/services/user-dashboard.service";
import { UserDashboardChangePasswordComponent } from "./user-dashboard/components/user-dashboard-change-password/user-dashboard-change-password.component";
import { UserDashboardChangeUsernameComponent } from "./user-dashboard/components/user-dashboard-change-username/user-dashboard-change-username.component";

@NgModule({
  imports: [
    DashboardRouting,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [
    AdminDashboardComponent,
    UserDashboardComponent,
    UserDashboardHomeComponent,
    UserDashboardChangePasswordComponent,
    UserDashboardChangeUsernameComponent
  ],
  providers: [
    ClientAuthGuard,
    AuthenicationControl,
    UserDashboardService
  ]
})
export class DashboardLazyModule { }

