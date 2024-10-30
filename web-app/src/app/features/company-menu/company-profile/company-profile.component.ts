import { Component, signal } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { MatTableDataSource } from "@angular/material/table";
import { Companydatum } from "src/app/services/types/Companydatum";
import { CompanyProfileApiService } from "./CompanyProfileApiService";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ActivatedRoute } from "@angular/router";
import { Companyindustry } from "src/app/services/types/Companyindustry";
import { Jobposting } from "src/app/services/types/Jobposting";

@Component({
  selector: "app-company-profile",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./company-profile.component.html",
  styleUrl: "./company-profile.component.css",
})
export class CompanyProfileComponent {
  companyData!: Companydatum;
  companyID: string = "";
  UserRoleId: number;
  sessionCompanyId: number;
  Id: number | null = null;
  dataSource = new MatTableDataSource<Companydatum>([]);
  CompanyProfileData = signal<Companydatum[]>([]);
  JobPostingData = signal<Jobposting[]>([]);
  CompanyIndustriesData = signal<Companyindustry[]>([]);

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiService: CompanyProfileApiService,
    private route: ActivatedRoute
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.sessionCompanyId = storedCompanyId ? parseInt(storedCompanyId) : 0;
  }

  openEditCompanyProfile() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: "65vw",
    });
    dialogRef.afterClosed();
  }

  ngOnInit() {
    this.getCompanyProfileById(this.sessionCompanyId);
  }

  // getCompanyProfileById = (id: number) => {
  //   this.apiService.GetCompanyProfileById(id).subscribe({
  //     next: (response) => {
  //       const data: Companydatum[] = response.value;
  //       this.companyData = data[0]; // assuming you get a single company profile
  //       console.log('Company Data:', this.companyData);
  //     },
  //     error: (error) => {
  //       console.log('Error fetching company profile: ', error);
  //     },
  //   });
  // };

  getCompanyProfileById(id: number): void {
    this.apiService.GetCompanyProfileById(id).subscribe({
      next: (companyProfile) => {
        const data: Companydatum[] = companyProfile.value;
        this.CompanyProfileData.set(data);
        this.JobPostingData.set(data[0].Jobpostings);
        this.CompanyIndustriesData.set(data[0].Companyindustries);
        console.log("Company Profile:", this.CompanyIndustriesData());
        console.log("Company:", this.CompanyProfileData());
      },

      error: (error) => {
        console.error("Error fetching Company Data", error);
      },
    });
  }
}
