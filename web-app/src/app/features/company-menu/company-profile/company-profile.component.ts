import { Component, signal } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MatTableDataSource } from '@angular/material/table';
import {
  Companydatum,
  PostCompanydatum,
} from 'src/app/services/types/Companydatum';
import { CompanyProfileApiService } from './CompanyProfileApiService';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Companyindustry } from 'src/app/services/types/Companyindustry';
import { Jobposting } from 'src/app/services/types/Jobposting';
import { SweetAlertService } from 'src/app/services/sweet-alert-service/sweet-alert-service';

@Component({
  selector: "app-company-profile",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./company-profile.component.html",
  styleUrl: "./company-profile.component.css",
})
export class CompanyProfileComponent {
  addEditCompanyProfile: FormGroup;
  initialFormValues: any;
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
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private apiService: CompanyProfileApiService,
    private sweetAlertService: SweetAlertService,
    private route: ActivatedRoute
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.sessionCompanyId = storedCompanyId ? parseInt(storedCompanyId) : 0;

    this.addEditCompanyProfile = this.fb.group({
      Url: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      Gstnumber: ['', [Validators.required]],
      ContactPerson: ['', [Validators.required]],
      AddressLine1: ['', [Validators.required]],
      City: ['', [Validators.required]],
      State: ['', [Validators.required]],
      ZipCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      Country: ['', [Validators.required]],
      ParentCompanyId: [null],
      IsDeleted: [false],
      IsActive: [true],
      DateOfRegistration: [null, [Validators.required]],
      CompanySize: [null, [Validators.required, Validators.min(1)]],
      LogoPath: [''],
      About: [''],
      HeadQuarters: [''],
      VideoPath: [''],
      PresentationPath: [''],
      DocumentPath: [''],
      AudioPath: [''],
    });
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

  async onSubmit() {
    const companyData: Partial<Companydatum> = this.addEditCompanyProfile.value;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? 'update' : 'add';
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this company?`
    );

    if (confirmed) {
      const companydatum: PostCompanydatum = {
        Id: this.Id ?? 0,
        Url: companyData.Url ?? '',
        Name: companyData.Name ?? '',
        Email: companyData.Email ?? '',
        Address: companyData.Address ?? '',
        PhoneNumber: companyData.PhoneNumber ?? '',
        Gstnumber: companyData.Gstnumber ?? '',
        ContactPerson: companyData.ContactPerson ?? '',
        AddressLine1: '',
        City: companyData.City ?? '',
        State: companyData.State ?? '',
        ZipCode: companyData.ZipCode ?? '',
        Country: companyData.Country ?? '',
        ParentCompanyId: 0,
        IsDeleted: 0,
        IsActive: 0,
        DateOfRegistration: companyData.DateOfRegistration ?? null,
        CompanySize: companyData.CompanySize ?? 0,
        LogoPath: companyData.LogoPath ?? '',
        About: companyData.About ?? '',
        HeadQuarters: companyData.HeadQuarters ?? '',
        VideoPath: companyData.VideoPath ?? '',
        PresentationPath: companyData.PresentationPath ?? '',
        DocumentPath: companyData.DocumentPath ?? '',
        AudioPath: companyData.AudioPath ?? '',
        UserRoleId: 0,
        Password: '',
      };
      this.apiService.addUpdateCompany(this.Id, companydatum).subscribe({
        next: (response: any) => {
          const { success, message } = response as {
            success: boolean;
            message: any;
          };
          if (success) {
            this.sweetAlertService.success(message);
            this.router.navigate(['/company-profile']);
          } else {
            this.sweetAlertService.error(message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error('An unexpected error occurred.');
        },
      });
    }
  }
}
