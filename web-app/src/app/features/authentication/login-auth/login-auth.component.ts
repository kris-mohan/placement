import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { SharedModule } from "src/app/shared/shared.module";
import { EligibleStudentsListApiService } from "../../placement-cell/placement-cell/eligible-students-list/EligibleStudentsListApiService";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";
import { Template } from "src/app/services/types/Template";

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
  RoleId: any;
  errorMessage: string = "";
  storedUserRoleId: string = "";
  isPasswordVisible: boolean = false;
  showOtpPopup: boolean = false;
  enteredOtp: string = "";
  storedOtp: string = "";
  studentEmail: string = "";
  showEmailPopup: boolean = false;
  newPassword: string = "";
  confirmNewPassword: string = "";
  showResetPasswordPopup: boolean = false;
  isNewPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  templateCategories: TemplateCategory[] = [];
  templates: Template[] = [];
  selectedTemplate: { Subject: string; Body: string } | null = null;
  templateSubject: string = "";
  templateBody: string = "";
  constructor(
    private apiService: ApiHttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eligibleStudentsListApiService: EligibleStudentsListApiService
  ) {}

  // loginModel = {
  //   UserName: this.UserName,
  //   Password: this.Password,
  //   RoleId: this.RoleId,
  // };

  onClickSignIn(form: any) {
    if (form.valid) {
      const loginModel = {
        userName: this.UserName,
        password: this.Password,
        RoleId: this.RoleId,
      };

      this.apiService
        // .loginpost("http://20.219.120.124:92/WeatherForecast/login", loginModel)
        //.loginpost("http://localhost:5056/WeatherForecast/login", loginModel)
        .loginpost("https://localhost:44304/WeatherForecast/login", loginModel)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            if (response.accessToken && response.refreshToken) {
              sessionStorage.setItem("authToken", response.accessToken);
              sessionStorage.setItem("refreshToken", response.refreshToken);
              sessionStorage.setItem("userRoleId", response.userRoleId);
              sessionStorage.setItem("userName", response.userName);
              sessionStorage.setItem("collegeName", response.collegeName);
              sessionStorage.setItem("CampusId", response.campusId);
              sessionStorage.setItem("CompanyId", response.companyId);
              sessionStorage.setItem("StudentId", response.studentId);
              sessionStorage.setItem("LoginId", response.id);
              sessionStorage.setItem("otp", response.otp);
              const storedUserRoleId = sessionStorage.getItem("userRoleId");
              this.storedUserRoleId = storedUserRoleId!;

              if (this.storedUserRoleId === "1") {
                this.router.navigate(["/placement-dashboard"]);
              } else if (this.storedUserRoleId === "2") {
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
  onForgotPassword() {
    this.showEmailPopup = true;
  }

  closeEmailPopup() {
    this.showEmailPopup = false;
    this.studentEmail = "";
  }

  generateOTP(): string {
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["resetPassword"]) {
        this.getTemplate();
        if (this.selectedTemplate) {
          const otp = this.generateOTP();
          this.sendOTPEmail(otp);
          this.storedOtp = otp;
          this.showOtpPopup = true;
          this.showResetPasswordPopup = false;
        } else {
          const interval = setInterval(() => {
            if (this.selectedTemplate) {
              clearInterval(interval);
              const otp = this.generateOTP();
              this.sendOTPEmail(otp);
              this.storedOtp = otp;
              this.showOtpPopup = true;
              this.showResetPasswordPopup = false;
            }
          }, 100);
        }
      }
    });
  }

  getTemplate = () => {
    this.eligibleStudentsListApiService.GetTemplate().subscribe({
      next: (response) => {
        this.templateCategories = response.value;
        this.templates = response.value.flatMap(
          (category) => category.Templates
        );
        this.selectedTemplate = this.templates[0] || null;
        if (this.selectedTemplate) {
          this.templateSubject = this.selectedTemplate.Subject;
          this.templateBody = this.selectedTemplate.Body;
        }
        console.log("Template Categories:", this.templateCategories);
        console.log("Templates:", this.templates);
        console.log("Selected Template:", this.selectedTemplate);
      },
      error: (error) => {
        console.error("Error fetching templates", error);
      },
    });
  };

  sendOTPEmail(otp: string) {
    const currentDate = new Date();
    if (!this.selectedTemplate) {
      this.getTemplate();
    }
    const customizedBody = `${this.templateBody}
    <strong>OTP for Password Reset:</strong> ${otp}`;

    const email = {
      To: this.UserName,
      Cc: this.UserName,
      Bcc: "",
      Subject: this.templateSubject,
      Body: customizedBody,
      SentAt: currentDate,
    };
    this.eligibleStudentsListApiService.SendOfferLetter(email).subscribe({
      next: (response: any) => {
        console.log("OTP sent successfully to");
      },
      error: (error: any) => {
        this.errorMessage = "Failed to send OTP: " + error.message;
      },
    });
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onVerifyOtp(otpForm: any) {
    if (otpForm.valid) {
      if (this.enteredOtp === this.storedOtp) {
        this.showOtpPopup = false;
        this.showResetPasswordPopup = true;
        this.enteredOtp = "";
      } else {
        this.errorMessage = "Invalid OTP. Please try again.";
      }
    } else {
      this.errorMessage = "Please enter the OTP.";
    }
  }
  onSendOtp(emailForm: any) {
    if (emailForm.valid) {
      const otp = this.generateOTP();
      this.sendOTPEmail(otp);
      this.storedOtp = otp;
      this.showEmailPopup = false;
      this.showOtpPopup = true;
      this.studentEmail = "";
    } else {
      this.errorMessage = "Please provide a valid email.";
    }
  }
  closeOtpPopup() {
    this.showOtpPopup = false;
    this.errorMessage = "";
    this.enteredOtp = "";
  }
  resetPassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }
    const studentId = sessionStorage.getItem("StudentId");
    if (!studentId) {
      this.errorMessage = "Student ID not found. Please log in again.";
      return;
    }
    const resetModel = {
      email: this.studentEmail,
      newPassword: this.newPassword,
    };
    this.eligibleStudentsListApiService
      .getStudentLoginDetails(Number(studentId))
      .subscribe({
        next: (response) => {
          const loginDetails = response.value[0];

          if (loginDetails) {
            const updatedLoginDetails = {
              ...loginDetails,
              Password: this.newPassword,
            };
            this.eligibleStudentsListApiService
              .updateStudentLoginDetails(loginDetails.Id, updatedLoginDetails)
              .subscribe({
                next: () => {
                  alert("Password reset successful!");
                  this.showResetPasswordPopup = false;
                  this.newPassword = "";
                  this.confirmNewPassword = "";
                  this.errorMessage = "";
                },
                error: (error) => {
                  this.errorMessage =
                    "Failed to reset password: " + error.message;
                },
              });
          }
        },
        error: (error) => {
          this.errorMessage = "Error fetching login details: " + error.message;
        },
      });
  }
  cancelReset() {
    this.showResetPasswordPopup = false;
    this.newPassword = "";
    this.confirmNewPassword = "";
  }
  toggleNewPasswordVisibility() {
    this.isNewPasswordVisible = !this.isNewPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}
