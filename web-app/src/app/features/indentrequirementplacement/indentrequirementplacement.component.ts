import { Component, signal } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormsModule,
  FormArray,
  Validators,
} from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule, Location } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { IndentForm } from "src/app/services/types/IndentForm";
import { IndentRequirementsApiService } from "../company-menu/indent-requirements/IndentRequirementsApiService";
import { MatTableDataSource } from "@angular/material/table";
import { merge, Observable } from "rxjs";
@Component({
  selector: "app-indentrequirementplacement",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    MatGridListModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: "./indentrequirementplacement.component.html",
  styleUrl: "./indentrequirementplacement.component.css",
})
export class IndentrequirementplacementComponent {
  [x: string]: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    private IndentRequirementapi: IndentRequirementsApiService
  ) {
    this.addIndentForm = this.fb.group({
      CompanyName: new FormControl("", Validators.required),
      ContactPersonDesignation: new FormControl("", Validators.required),
      Email: ["", [Validators.required, Validators.email]],

      PhoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d{10}$/), //
      ]),

      Extra1: new FormControl(""),
      IndentFormDynamicFields: this.fb.array([]),
    });
    merge(
      this.addIndentForm.get("Email")?.statusChanges as Observable<any>,
      this.addIndentForm.get("Email")?.valueChanges as Observable<any>
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    this.IndentFormDynamicFields = this.addIndentForm.get(
      "IndentFormDynamicFields"
    ) as FormArray;
    merge(
      this.addIndentForm.get("PhoneNumber")?.statusChanges as Observable<any>,
      this.addIndentForm.get("PhoneNumber")?.valueChanges as Observable<any>
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePhoneNumberErrorMessage());
  }
  errorMessage = signal("");
  phoneNumberErrorMessage = signal("");

  RoundDataSource = new MatTableDataSource<IndentForm>([]);
  RoundDataById = new MatTableDataSource<IndentForm>([]);

  addIndentForm: FormGroup;
  IndentFormDynamicFields: FormArray;
  Id: string | null = "0";

  createItemFormControl(
    Name: string | undefined,
    Value: string | undefined
  ): FormGroup {
    return this.fb.group({
      Name: new FormControl(Name, Validators.required), // Form control for requiredItem
      Value: new FormControl(Value, Validators.required), // Form control for description
    });
  }
  updateErrorMessage() {
    const emailControl = this.addIndentForm.get("Email");

    if (emailControl?.hasError("required")) {
      this.errorMessage.set("You must enter a value");
    } else if (emailControl?.hasError("email")) {
      this.errorMessage.set("Not a valid email");
    } else {
      this.errorMessage.set("");
    }
  }
  updatePhoneNumberErrorMessage() {
    const phoneControl = this.addIndentForm.get("PhoneNumber");

    if (phoneControl?.hasError("required")) {
      this.phoneNumberErrorMessage.set("You must enter a phone number");
    } else if (phoneControl?.hasError("pattern")) {
      this.phoneNumberErrorMessage.set("Not a valid phone number");
    } else {
      this.phoneNumberErrorMessage.set("");
    }
  }
  handleAddGrid(): void {
    this.IndentFormDynamicFields.push(this.createItemFormControl("", ""));
  }

  handleDeleteGrid(index: number): void {
    if (index >= 0 && this.IndentFormDynamicFields.length > 0) {
      this.IndentFormDynamicFields.removeAt(index);
    }
  }

  getAllIndent = () => {
    const indentId = this.route.snapshot.paramMap.get("id");
    console.log(indentId);
    if (indentId) {
      const id = parseInt(indentId);
      this.IndentRequirementapi.GetAllIndentsById(id).subscribe({
        next: (response) => {
          debugger;
          const data: IndentForm[] = response.value;
          this.addIndentForm.patchValue(data[0]);
          data[0]?.IndentFormDynamicFields.map((d) => {
            this.IndentFormDynamicFields.push(
              this.createItemFormControl(d.Name, d.Value)
            );
          });
          console.log(data);
        },
        error: (error) => {
          console.log("Error fetching rounds: ", error);
        },
      });
    }
  };
  ngOnInit() {
    this.getAllIndent();
    this.Id = this.route.snapshot.paramMap.get("id");
  }

  async onSubmit() {
    if (this.addIndentForm.invalid) {
      this.sweetAlertService.error("Please enter all the required field .");
      return;
    }

    debugger;
    const companyData: Partial<IndentForm> = this.addIndentForm.value;
    const isUpdate = this.Id != "0";
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this indent?`
    );

    if (confirmed) {
      const companydatum: any = {
        // Id: 0,
        CompanyName: companyData.CompanyName ?? "",
        ContactPersonDesignation: companyData.ContactPersonDesignation ?? "",
        Email: companyData.Email ?? "",
        PhoneNumber: companyData.PhoneNumber ?? "",
        IndentFormDynamicFields: companyData.IndentFormDynamicFields ?? [],
      };

      const indentId = this.Id === "0" ? null : parseInt(this.Id ?? "0");

      this.IndentRequirementapi.CreateUpdateIndent(
        indentId,
        companydatum
      ).subscribe({
        next: (response: { success: boolean; message: any }) => {
          console.log(response);
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.router.navigate(["/Indent-view-placement"]);
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error("An unexpected error occurred.");
        },
      });
    }
  }

  onSubmitDiv() {
    this.location.back();
  }
  onReset() {}

  goBack(): void {
    this.location.back();
  }
}
