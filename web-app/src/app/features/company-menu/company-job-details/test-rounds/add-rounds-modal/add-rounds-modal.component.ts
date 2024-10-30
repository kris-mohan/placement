import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { companyTableList } from "src/app/features/company-configuration/company-config/companies/companies-model";
import { SharedModule } from "src/app/shared/shared.module";
import { InterviewRoundsAPIService } from "./api-add-rounds-modal";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { TestRoundsApiService } from "../TestRoundsApiService";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { interviewRounds } from "./add-rounds-modal.model";

@Component({
  selector: "app-add-rounds-modal",
  standalone: true,
  imports: [MatDialogModule, AMGModules, SharedModule, CommonModule],
  templateUrl: "./add-rounds-modal.component.html",
  styleUrl: "./add-rounds-modal.component.css",
})
export class AddRoundsModalComponent {
  UserRoleId: number;
  selectedPriority: string = "";
  roundId: number;
  roundAddEditForm: FormGroup;
  jobPostingId: number;

  constructor(
    private apiInterviewRounds: InterviewRoundsAPIService,
    public dialogRef: MatDialogRef<AddRoundsModalComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private testRoundsApiService: TestRoundsApiService,
    @Inject(MAT_DIALOG_DATA) public RoundId: any,
    private fb: FormBuilder
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    this.roundId = this.RoundId;
    this.jobPostingId = this.RoundId;

    this.roundAddEditForm = this.fb.group({
      Name: "",
      Description: "",
      Priority: "",
      startDate: null,
      endDate: null,
    });
  }

  ngOnInit(): void {
    this.getRoundsById(this.RoundId);

    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get("roundsId");
    //   this.roundId = id !== null ? +id : null;
    //   if (this.roundId) {
    //     const technology = HIRING_ROUNDS_DATA.find(
    //       (t) => t.roundId === this.roundId
    //     );
    //     // if (technology) {
    //     //   this.addEditTrainerForm.patchValue(technology);
    //     // }
    //   }
    // });
  }

  RoundDataById = new MatTableDataSource<Jobinterviewround>([]);

  getRoundsById(id: number) {
    this.testRoundsApiService.GetRoundsById(id).subscribe({
      next: (response) => {
        const data: any = response.value;
        console.log("rounds by id", data);

        // const preFilledPriority = [
        //   { value: "1", viewValue: String(data[0].Priority) },
        // ];

        const selectedPriority = String(data[0].Priority);

        // console.log(preFilledPriority);
        // console.log(this.Priority);
        this.roundAddEditForm.patchValue({
          Name: data[0].Name,
          Description: data[0].Description,
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null,
          Priority: selectedPriority,
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

  // Priority = [
  //   { value: "1", viewValue: "1" },
  //   { value: "2", viewValue: "2" },
  //   { value: "3", viewValue: "3" },
  //   { value: "4", viewValue: "4" },
  //   { value: "5", viewValue: "5" },
  //   { value: "6", viewValue: "6" },
  //   { value: "7", viewValue: "7" },
  //   { value: "8", viewValue: "8" },
  //   { value: "9", viewValue: "9" },
  // ];

  // onPriorityChange(event: any) {
  //   this.selectedPriority = event.value;
  //   console.log("Selected Priority:", this.selectedPriority);
  // }

  async getInterviewRounds() {
    this.apiInterviewRounds.getInterviewRounds().subscribe({
      next: () => {},
      error: () => {
        console.error("error 404");
      },
    });
  }
  async onSubmit() {
    const companyData: Partial<interviewRounds> = this.roundAddEditForm.value;
    const isUpdate = !!this.roundId;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this company?`
    );

    if (confirmed) {
      const companydatum: any = {
        Id: this.roundId ?? 0,
        // JobPostingId: this.jobPostingId ?? "",
        Name: companyData.Name ?? "",
        Description: companyData.Description ?? "",
        Priority: companyData.Priority ?? "",
      };
      this.apiInterviewRounds
        .addInterviewRounds(this.roundId, companydatum)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              this.sweetAlertService.success(response.message);
              this.router.navigate([
                "/company-job-details/add-edit-jobPosting/",
              ]);
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
}
