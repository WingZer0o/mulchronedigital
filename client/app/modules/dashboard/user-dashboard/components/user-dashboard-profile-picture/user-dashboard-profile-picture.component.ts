import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { UserDashboardService } from "../../../../../shared/services/user-dashboard.service";
import { UserDashboardEmitter } from "../../../../../shared/services/user-dashboard-emitter.service";

@Component({
  selector: "app-user-dashboard-profile-picture",
  templateUrl: "./user-dashboard-profile-picture.component.html",
  styleUrls: ["./user-dashboard-profile-picture.component.css"]
})

export class UserDashboardProfilePictureComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(
    private userDashboardService: UserDashboardService,
    private userDashboardEmitter: UserDashboardEmitter
  ) { }

  ngOnInit() { }

  public toggleUploadImage(): void {
    const fileBrowser = this.fileInput.nativeElement;
    // TODO: check for common picture file extensions.
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      this.userDashboardService.changeUserProfileImage(formData).subscribe(response => {
          if (response.status) {
            this.userDashboardEmitter.emitChange("Update user information on dashboard");
          }
      });
    }
  }
}
