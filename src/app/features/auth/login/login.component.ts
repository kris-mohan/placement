import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { CommonModule } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { AppComponent } from "src/app/app.component";
import { PasswordResetComponent } from "../password-reset/password-reset.component";
import { PasswordResetRequestComponent } from "../password-reset-request/password-reset-request.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    AMGModules,
    SharedModule,
    AppComponent,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PasswordResetRequestComponent,
    PasswordResetComponent,
    CommonModule,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  loading!: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle("placements - Login");
    this.authenticationService.logout();
    this.createForm();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem("savedUserEmail");

    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(savedUserEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl("", Validators.required),
      rememberMe: new UntypedFormControl(savedUserEmail !== null),
    });
  }

  login() {
    const email = this.loginForm.get("email")?.value;
    const password = this.loginForm.get("password")?.value;
    const rememberMe = this.loginForm.get("rememberMe")?.value;

    this.loading = true;
    this.authenticationService.login(email.toLowerCase(), password).subscribe(
      (data) => {
        if (rememberMe) {
          localStorage.setItem("savedUserEmail", email);
        } else {
          localStorage.removeItem("savedUserEmail");
        }
        this.router.navigate(["/"]);
      },
      (error) => {
        this.notificationService.openSnackBar(error.error);
        this.loading = false;
      }
    );
  }

  resetPassword() {
    this.router.navigate(["/auth/password-reset-request"]);
  }
}
