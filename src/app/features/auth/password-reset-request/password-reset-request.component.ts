import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";

import { NotificationService } from "src/app/core/services/notification.service";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { CommonModule } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  selector: "app-password-reset-request",
  templateUrl: "./password-reset-request.component.html",
  styleUrls: ["./password-reset-request.component.css"],
})
export class PasswordResetRequestComponent implements OnInit {
  private email!: string;
  form!: UntypedFormGroup;
  loading!: boolean;

  constructor(
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.setTitle("placements - Password Reset Request");

    this.form = new UntypedFormGroup({
      email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
      ]),
    });

    this.form.get("email")?.valueChanges.subscribe((val: string) => {
      this.email = val.toLowerCase();
    });
  }

  resetPassword() {
    this.loading = true;
    this.authService.passwordResetRequest(this.email).subscribe(
      (results) => {
        this.router.navigate(["/auth/login"]);
        this.notificationService.openSnackBar(
          "Password verification mail has been sent to your email address."
        );
      },
      (error) => {
        this.loading = false;
        this.notificationService.openSnackBar(error.error);
      }
    );
  }

  cancel() {
    this.router.navigate(["/"]);
  }
}
