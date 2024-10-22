import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { companyTableList } from "src/app/features/company-configuration/company-config/companies/companies-model";
import { SharedModule } from "src/app/shared/shared.module";
import { HIRING_ROUNDS_DATA } from "../test-rounds.component";
import { InterviewRoundsAPIService } from "./api-add-rounds-modal";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { TestRoundsApiService } from "../TestRoundsApiService";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup } from "@angular/forms";

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

  constructor(
    private apiInterviewRounds: InterviewRoundsAPIService,
    public dialogRef: MatDialogRef<AddRoundsModalComponent>,
    private route: ActivatedRoute,
    private testRoundsApiService: TestRoundsApiService,
    @Inject(MAT_DIALOG_DATA) public RoundId: any,
    private fb: FormBuilder
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    this.roundId = this.RoundId;

    this.roundAddEditForm = this.fb.group({
      Name: "",
      Description: "",
      Priority: "",
      startDate: null,
      endDate: null,
    });
  }

  ngOnInit(): void {
    console.log("API call", this.RoundId);
    this.getRoundsById(this.RoundId);
    console.log("Returned");

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
}
