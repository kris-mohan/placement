import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompanyAPIService } from 'src/app/features/company-configuration/company-config/companies/api.companies';
import { Router } from '@angular/router';
import {
  Companydatum,
  PostCompanydatum,
} from 'src/app/services/types/Companydatum';
import { Industry } from 'src/app/services/types/Industry';
import { SweetAlertService } from 'src/app/services/sweet-alert-service/sweet-alert-service';
import { Jobposting } from 'src/app/services/types/Jobposting';
import { Companyindustry } from 'src/app/services/types/Companyindustry';
// import { LiveAnnouncer } from "@angular/cdk/a11y";

type Sector = {
  Name: string;
};

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    MatChipsModule,
    FlexLayoutModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  addEditCompanyProfile: FormGroup;
  formData: FormGroup;
  Id: number | null = null;
  addOnBlur: boolean = false;
  showAllSectors = false;
  UserRoleId: number;
  sessionCompanyId: number;
  IndustryNames = signal<Industry[]>([]);
  sectorChips = signal<Sector[]>([]);
  CompanyProfileData = signal<Companydatum[]>([]);
  JobPostingData = signal<Jobposting[]>([]);
  CompanyIndustriesData = signal<Companyindustry[]>([]);

  types: string[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: CompanyAPIService,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<EditProfileComponent>
  ) {
    this.formData = this.fb.group({
      sector: [''],
      overview: [''],
    });

    const storedUserRoleId = sessionStorage.getItem('userRoleId');
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const storedCompanyId = sessionStorage.getItem('CompanyId');
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
  ngOnInit(): void {
    this.loadInitialData();
    this.initializeForm();
    this.getCompanyIndustries();
    this.getCompanyProfileById(this.sessionCompanyId);
  }
  initializeForm(): void {}

  // removeSectorChips(sector: string): void {
  //   console.log("hiii");
  //   const updatedSectors = this.sectorChips.filter((x) => x !== sector);
  //   this.sectorChips = updatedSectors;
  // }

  remove(sector: Sector): void {
    this.sectorChips.update((sectors) => {
      const index = sectors.indexOf(sector);
      if (index < 0) {
        return sectors;
      }

      sectors.splice(index, 1);
      return [...sectors];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.sectorChips.update((sectors) => [...sectors, { Name: value }]);
    }
    event.input.value = '';
  }

  loadInitialData(): void {
    // this.sectorChips.update(() => {
    //   return [
    //     {
    //       Id: 1,
    //       Name: 'Internet',
    //     },
    //     {
    //       Id: 2,
    //       Name: 'Saas',
    //     },
    //     {
    //       Id: 3,
    //       Name: 'Software Product',
    //     },
    //     {
    //       Id: 4,
    //       Name: 'Unicorn',
    //     },
    //     {
    //       Id: 5,
    //       Name: 'Private',
    //     },
    //     {
    //       Id: 6,
    //       Name: 'Startup',
    //     },
    //   ];
    // });
    // this.types = ['Private', 'Public', 'Other'];
  }

  async getCompanyIndustries() {
    this.apiService.getCompanyIndustry().subscribe({
      next: (industry) => {
        this.sectorChips.set(
          industry.value.map((item: { Type: string }) => ({ Name: item.Type }))
        );
        console.log('Industry', this.sectorChips());
      },
      error: (err) => console.error('Error fetching industries', err),
    });
  }

  getCompanyProfileById(id: number): void {
    this.apiService.getCompanyDataById(id).subscribe({
      next: (companyProfile) => {
        const data: Companydatum[] = companyProfile.value;
        this.CompanyProfileData.set(data);
        this.JobPostingData.set(data[0].Jobpostings);
        this.CompanyIndustriesData.set(data[0].Companyindustries);
        console.log('Company Profile:', this.CompanyIndustriesData());
        console.log('edit profile:', this.CompanyProfileData());
      },

      error: (error) => {
        console.error('Error fetching Company Data', error);
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
