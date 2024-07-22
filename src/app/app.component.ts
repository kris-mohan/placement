import { Component, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { CommonModule } from "@angular/common";
import { RouterModule, ROUTES } from "@angular/router";
import { AuthenticationService } from "./core/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { LayoutComponent } from "./shared/layout/layout.component";
import { ConfirmDialogComponent } from "./shared/confirm-dialog/confirm-dialog.component";
import { ContentPlaceholderAnimationComponent } from "./shared/content-placeholder-animation/content-placeholder-animation.component";
import { FlexLayoutModule } from "@angular/flex-layout";

import { CustomMaterialModule } from "../app/custom-material/custom-material.module";
import { LimitToPipe } from "./shared/pipes/limit-to.pipe";
import { LocalDatePipe } from "./shared/pipes/local-date.pipe";
import { YesNoPipe } from "./shared/pipes/yes-no.pipe";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    FormsModule,
    AMGModules,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    RouterModule,
    LayoutComponent,
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    CustomMaterialModule,
    FlexLayoutModule,
  ],
  templateUrl: "./app.component.html",
  providers: [AuthenticationService, HttpClient],
})
export class AppComponent {}
