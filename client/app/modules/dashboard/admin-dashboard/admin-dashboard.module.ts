import { AdminDashboardComponent } from "./admin-dashboard.component";
import { AdminDashboardHomeComponent } from "./components/admin-dashboard-home/admin-dashboard-home.component";
import { AdminDashboardRouting } from "./admin-dashboard.routing";
import { AuthenicationControl } from "../../../shared/authenication/AuthenicationControl";
import { SharedModule } from "../../../shared/modules/shared.module";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        AdminDashboardRouting,
        ReactiveFormsModule,
        CommonModule,
        SharedModule
    ],
    declarations: [
        AdminDashboardComponent,
        AdminDashboardHomeComponent,
    ],
    providers: [
        AuthenicationControl,
    ]
})
export class AdminDashboardLazyModule { }
