import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Inject, Output } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { InterviewRoundsAPIService } from "./api-add-rounds-modal";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { TestRoundsApiService } from "../TestRoundsApiService";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

function uniqueNameValidator(
  existingNames: string[],
  currentName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value?.trim().toLowerCase();
    // Only validate if the name has changed and is a duplicate
    if (name && name !== currentName && existingNames.includes(name)) {
      return { duplicateName: true };
    }
    return null;
  };
}

@Component({
  selector: "app-add-rounds-modal",
  standalone: true,
  imports: [
    MatDialogModule,
    AMGModules,
    SharedModule,
    CommonModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: "./add-rounds-modal.component.html",
  styleUrl: "./add-rounds-modal.component.css",
})
export class AddRoundsModalComponent {
  UserRoleId: number;
  selectedPriority: string = "";
  roundId: number;
  roundAddEditForm: FormGroup;
  existingRoundNames: string[] = [];
  jobPostingId: number;
  companyId: number = 0;
  sessionCampusId: number;
  sessionCompanyId: number;
  @Output() roundsUpdated = new EventEmitter<void>();
  constructor(
    private apiInterviewRounds: InterviewRoundsAPIService,
    public dialogRef: MatDialogRef<AddRoundsModalComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private testRoundsApiService: TestRoundsApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.sessionCompanyId = storedCompanyId ? parseInt(storedCompanyId) : 0;
    const storedCampusId = sessionStorage.getItem("CampusId");
    this.sessionCampusId = storedCampusId ? parseInt(storedCampusId) : 0;

    this.roundId = this.data?.roundsId;
    this.jobPostingId = this.data?.JobPostingId;
    console.log("Modal data", data);
    this.roundAddEditForm = this.fb.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log("Params", params.get("jobId"));
    });

    if (this.roundId) {
      this.getRoundsById(this.roundId);
    }
    this.testRoundsApiService.GetAllRounds(this.jobPostingId).subscribe({
      next: (response) => {
        this.existingRoundNames = response.value.map((round: any) =>
          round.Name.trim().toLowerCase()
        );
        const currentName =
          this.roundAddEditForm.get("Name")?.value?.trim().toLowerCase() || "";
        this.roundAddEditForm
          .get("Name")
          ?.setValidators([
            Validators.required,
            uniqueNameValidator(this.existingRoundNames, currentName),
          ]);
        this.roundAddEditForm.get("Name")?.updateValueAndValidity();
      },
      error: (error) => {
        console.error("Error fetching existing rounds:", error);
      },
    });
  }

  RoundDataById = new MatTableDataSource<Jobinterviewround>([]);

  getRoundsById(id: number) {
    this.testRoundsApiService.GetRoundsById(id).subscribe({
      next: (response) => {
        const data: any = response.value;
        console.log("rounds by id", data);
        this.roundAddEditForm.patchValue({
          Name: data[0].Name,
          Description: data[0].Description,
          startDate: data[0].Event.EventStartDateTime
            ? new Date(data[0].Event.EventStartDateTime.split("T")[0])
            : this.roundAddEditForm.value.startDate,
          endDate: data[0].Event.EventEndDateTime
            ? new Date(data[0].Event.EventEndDateTime.split("T")[0])
            : this.roundAddEditForm.value.endDate,
          startTime: data[0].Event.EventStartDateTime
            ? new Date(data[0].Event.EventStartDateTime).getHours() +
              ":" +
              new Date(data[0].Event.EventStartDateTime).getMinutes()
            : this.roundAddEditForm.value.startTime,
          endTime: data[0].Event.EventEndDateTime
            ? new Date(data[0].Event.EventEndDateTime).getHours() +
              ":" +
              new Date(data[0].Event.EventStartDateTime).getMinutes()
            : this.roundAddEditForm.value.endTime,
        });
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
  async getInterviewRounds() {
    this.apiInterviewRounds.getInterviewRounds().subscribe({
      next: () => {},
      error: () => {
        console.error("error 404");
      },
    });
  }
  async onSubmit() {
    if (this.roundAddEditForm.invalid) {
      this.sweetAlertService.error("All fields are required.");
      return;
    }
    // const companyData: Partial<interviewRounds> = this.roundAddEditForm.value;

    const isUpdate = !!this.roundId;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this round?`
    );
    const companyData: {
      Name: string;
      Description: string;
      startDate: any;
      endDate: any;
      startTime: any;
      endTime: any;
    } = this.roundAddEditForm.value;
    if (this.roundAddEditForm.valid && confirmed) {
      const formData = this.roundAddEditForm.value;
      const combineDateAndTime = (
        date: Date | null,
        time: string | null
      ): string | null => {
        if (!date || !time) return null;

        const [hours, minutes] = time.split(":").map(Number);
        const combinedDate = new Date(date);
        combinedDate.setHours(hours || 0, minutes || 0, 0, 0);

        return combinedDate.toISOString();
      };

      const startDateTime = combineDateAndTime(
        formData.startDate,
        formData.startTime
      );
      const endDateTime = combineDateAndTime(
        formData.endDate,
        formData.endTime
      );
      if (this.roundAddEditForm.valid) {
        const companydatum: any = {
          Id: this.roundId ?? 0,
          JobPostingId: this.jobPostingId ?? "",
          Name: companyData.Name ?? "",
          Description: companyData.Description ?? "",
        };
        console.log("Round", companydatum);
        this.dialogRef.close({ data: companydatum });
        const calendarEvent = {
          EventStartDateTime: startDateTime,
          EventEndDateTime: endDateTime,
          EventType: companydatum.Name,
          EventDescription: companydatum.Description,
          JobInterviewRoundId: this.roundId || null,
          OrgId: this.sessionCampusId,
          CompanyId: this.sessionCompanyId,
          IsDeleted: 0,
        };
        this.testRoundsApiService.saveCalendarEvent(calendarEvent).subscribe({
          next: (response) => {
            console.log("Interview Round saved successfully:", response);
            const eventId = response.id;
            companydatum.EventId = eventId;
            this.apiInterviewRounds
              .addInterviewRounds(companydatum.Id, companydatum)
              .subscribe({
                next: (roundResponse) => {
                  console.log(
                    "JobInterviewRound saved successfully:",
                    roundResponse
                  );
                  this.roundsUpdated.emit();
                  this.dialogRef.close({ data: roundResponse });
                },
                error: (error) => {
                  console.error("Error saving JobInterviewRound:", error);
                },
              });
          },
          error: (error) => {
            console.error("Error saving Calendarevent:", error);
          },
        });
      }
    }
  }
  handleResetRounds(): void {
    this.roundAddEditForm.reset({
      Name: "",
      Description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
  }
}
