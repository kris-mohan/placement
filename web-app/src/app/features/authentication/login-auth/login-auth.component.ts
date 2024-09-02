import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Route, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { APIService } from "src/app/services/api-services/api-services";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-login-auth",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule, FlexLayoutModule],
  templateUrl: "./login-auth.component.html",
  styleUrl: "./login-auth.component.css",
})
export class LoginAuthComponent {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  isPasswordVisible: boolean = false;
  constructor(private apiService: ApiHttpService, private router: Router) {}

  loginModel = {
    userName: this.username,
    password: this.password,
  };

  onClickSignIn(form: any) {
    if (form.valid) {
      const loginModel = {
        userName: this.username,
        password: this.password,
      };

      this.apiService
        .loginpost("https://localhost:44304/WeatherForecast/login", loginModel)
        .subscribe({
          next: (response: any) => {
            sessionStorage.setItem("authToken", response.accessToken);
            sessionStorage.setItem("refreshToken", response.refreshToken);
            this.router.navigate(["/dashboard"]);
          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = "Login failed: " + error.error;
          },
        });
    } else {
      this.errorMessage = "Please fill out the form correctly.";
    }
  }

  refreshAccessToken() {
    const refreshTokenModel = {
      refreshToken: sessionStorage.getItem("refreshToken"),
    };

    this.apiService
      .post("/WeatherForecast/RefreshToken", refreshTokenModel)
      .subscribe({
        next: (response: any) => {
          sessionStorage.setItem("authToken", response.accessToken);
          sessionStorage.setItem("refreshToken", response.refreshToken);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = "Token refresh failed: " + error.error;
        },
      });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
