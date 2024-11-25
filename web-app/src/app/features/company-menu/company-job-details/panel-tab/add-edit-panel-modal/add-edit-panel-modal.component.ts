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
import { PanelTabComponent } from "../panel-tab.component";
import { TestRoundsComponent } from "../../test-rounds/test-rounds.component";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { TestRoundsApiService } from "../../test-rounds/TestRoundsApiService";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { PanelAPIService } from "../panel.apiservice";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Jobinterviewpanel } from "src/app/services/types/Jobinterviewpanel";

@Component({
  selector: "app-add-edit-panel-modal",
  standalone: true,
  imports: [
    MatDialogModule,
    AMGModules,
    SharedModule,
    CommonModule,
    PanelTabComponent,
    TestRoundsComponent,
  ],

  templateUrl: "./add-edit-panel-modal.component.html",
  styleUrl: "./add-edit-panel-modal.component.css",
})
export class AddEditPanelModalComponent {
  UserRoleId: number;
  panelId: number | null = null;
  //HiringRound: any;
  panelAddEditForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEditPanelModalComponent>,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private router: Router,
    private apiPanelRounds: PanelAPIService,
    private fb: FormBuilder,

    private testRoundsApiService: TestRoundsApiService,
    @Inject(MAT_DIALOG_DATA) public PanelId: any
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    this.panelAddEditForm = this.fb.group({
      PanelName: "",
      Description: "",
      Designation: "",
    });
     this.panelId = this.PanelId;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("roundId");
      this.panelId = id !== null ? +id : null;
      if (this.panelId) {
      }
    });
    if (this.PanelId != 0) this.getRoundsById(this.PanelId);
  }
  RoundDataSource: Jobinterviewround[] = [];

  GetAllRounds = () => {
    this.testRoundsApiService.GetAllRounds().subscribe({
      next: (response) => {
        const data: Jobinterviewround[] = response.value;
        console.log("rounds", data);
        this.RoundDataSource = data;
        console.log(this.RoundDataSource);
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  };

  getRoundsById(id: number | null) {
    this.apiPanelRounds.GetPanelDataById(id).subscribe({
      next: (response) => {
        const data: any = response.value;
        this.panelAddEditForm.patchValue({
          PanelName: data[0].PanelName,
          Description: data[0].Description,
          Designation: data[0].Designation,
        });
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  }

  async onSubmit() {
    const companyData: Partial<Jobinterviewpanel> = this.panelAddEditForm.value;
    const isUpdate = !!this.panelId;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this company?`
    );

    if (confirmed) {
      const companydatum: any = {
        Id: this.panelId ?? 0,
        JobPostingId: 1,
        PanelName: companyData.PanelName ?? "",
        Description: companyData.Description ?? "",
        Designation: companyData.Designation ?? "",
      };
      this.apiPanelRounds.AddUpdatePanel(this.panelId, companydatum).subscribe({
        next: (response: { success: boolean; message: any }) => {
          console.log(response);
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.router.navigate(["company-job-details/add-edit-jobPosting/0"]);
            this.onClose();
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
  onClose(): void {
    this.dialogRef.close();
  }
}
