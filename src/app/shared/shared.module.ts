import { Component, NgModule } from "@angular/core";
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CustomMaterialModule } from "../custom-material/custom-material.module";
import { LimitToPipe } from "./pipes/limit-to.pipe";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ContentPlaceholderAnimationComponent } from "./content-placeholder-animation/content-placeholder-animation.component";
import { LocalDatePipe } from "./pipes/local-date.pipe";
import { YesNoPipe } from "./pipes/yes-no.pipe";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { LayoutModule } from "@angular/cdk/layout";
@NgModule({
  imports: [
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AMGModules,
    LayoutModule,
    // RouterOutlet,
    // RouterLink,
    // RouterLinkActive,
  ],
  declarations: [
    //ConfirmDialogComponent,
    // ContentPlaceholderAnimationComponent,
    LimitToPipe,
    LocalDatePipe,
    YesNoPipe,
  ],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    LimitToPipe,
    //ConfirmDialogComponent,
    // ContentPlaceholderAnimationComponent,
    LocalDatePipe,
    YesNoPipe,
    AMGModules,
    LayoutModule,
    // RouterOutlet,
    // RouterLink,
    // RouterLinkActive,
  ],
})
export class SharedModule {}
