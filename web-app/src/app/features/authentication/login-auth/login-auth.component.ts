import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Route, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { APIService } from "src/app/services/api-services/api-services";
import { SharedModule } from "src/app/shared/shared.module";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-login-auth",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule, FlexLayoutModule],
  templateUrl: "./login-auth.component.html",
  styleUrl: "./login-auth.component.css",
})
export class LoginAuthComponent {
  UserName: string = "";
  Password: string = "";
  UserType: string = "";
  errorMessage: string = "";
  storedUserType: string = "";
  isPasswordVisible: boolean = false;
  constructor(private apiService: ApiHttpService, private router: Router) {}

  loginModel = {
    UserName: this.UserName,
    Password: this.Password,
    UserType: this.UserType,
  };

  onClickSignIn(form: any) {
    if (form.valid) {
      const loginModel = {
        userName: this.UserName,
        password: this.Password,
        userType: this.UserType,
      };

      this.apiService
        //.loginpost("http://20.219.120.124:92/WeatherForecast/login", loginModel)
        //.loginpost("http://localhost:5056/WeatherForecast/login", loginModel)
        .loginpost("https://localhost:44304/WeatherForecast/login", loginModel)
        .subscribe({
          next: (response: any) => {
            if (response.accessToken && response.refreshToken) {
              sessionStorage.setItem("authToken", response.accessToken);
              sessionStorage.setItem("refreshToken", response.refreshToken);
              sessionStorage.setItem("userType", response.userType);
              sessionStorage.setItem("userName", response.userName);
              sessionStorage.setItem("collegeName", response.collegeName);

              const storedUserType = sessionStorage.getItem("userType");
              this.storedUserType = storedUserType!;

              if (this.storedUserType === "1") {
                this.router.navigate(["/placement-dashboard"]);
              } else if (this.storedUserType === "2") {
                this.router.navigate(["/company-dashboard"]);
              } else {
                this.router.navigate(["/student-dashboard"]);
              }
            }
          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = error.error.message;
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
