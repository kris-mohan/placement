import { CommonModule, Location } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { CompanyAPIService } from "../../company-configuration/company-config/companies/api.companies";
import {
  companyTableList,
  Industry,
} from "../../company-configuration/company-config/companies/companies-model";
import { CompanyDetailDialogModalComponent } from "../../company-configuration/company-config/companies/company-detail-dialog-modal/company-detail-dialog-modal.component";
import { ImportCompanyDialogComponent } from "../../company-configuration/company-config/companies/import-company-dialog/import-company-dialog.component";
import { IndustryAPIService } from "../../company-configuration/company-config/industry/api.industry";
import { InterviewAdditionalFilterComponent } from "../interview/interview-additional-filter/interview-additional-filter.component";
import { provideNativeDateAdapter } from "@angular/material/core";
import { OfferManagementApiService } from "./api.offer-management";
import { JobpostingSelectedstudent } from "src/app/services/types/JobpostingSelectedstudent";
import { University } from "src/app/services/types/University";
import { Campusregistration } from "src/app/services/types/Campusregistration";
import { Jobstudentstatus } from "src/app/services/types/Jobstudentstatus";
import { Technology } from "src/app/services/types/Technology";
import { TemplatesByCategoryService } from "../../template-generator/templates-by-category/templates-by-category.service";
import { Template } from "src/app/services/types/Template";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";
import { string32 } from "pdfjs-dist/types/src/shared/util";

export interface ODataResponse<T> {
  value: T[];
}

type FilterObject = {
  Status: number;
  JobRole: number;
  DriveDate: Date;
  University: number;
  College: number;
};

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: "app-offer-management",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./offer-management.component.html",
  styleUrl: "./offer-management.component.css",
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferManagementComponent {
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService,
    private offerManagementDetailsApiService: OfferManagementApiService,
    private templatesByCategoryService: TemplatesByCategoryService
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const userCompanyId = sessionStorage.getItem("CompanyId");
    this.companyId = userCompanyId ? parseInt(userCompanyId) : 0;
  }
  universityTypes: University[] = [];
  isLoading = true;

  readonly dialog = inject(MatDialog);

  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month - 1, today.getDate())),
    end: new FormControl(new Date()),
  });
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  companyId: number;
  UserRoleId: number;
  statuses: Jobstudentstatus[] = [];
  selectedStatuses: Jobstudentstatus[] = [];
  technologies: Technology[] = [];
  selectedTechnologies: Technology[] = [];
  companies: companyTableList[] = [];
  colleges: Campusregistration[] = [];
  templateCategories: TemplateCategory[] = [];
  templates: Template[] = [];
  JobpostingSelectedstudentData = signal<JobpostingSelectedstudent[]>([]);
  filteredselectedStudents = signal<JobpostingSelectedstudent[]>([]);
  acceptedOffersCount: number = 0;
  rejectedOffersCount: number = 0;
  pendingOffersCount: number = 0;

  selectedTemplate: { Subject: string; Body: string } | null = null;
  templateSubject: string = "";
  templateBody: string = "";
  isPopupOpen: boolean = false;
  selectedOffers: JobpostingSelectedstudent[] = [];
  students: JobpostingSelectedstudent[] = [];
  isSecondPopupOpen: boolean = false;
  fileMap: { [studentId: string]: File } = {};
  searchName = new FormControl("");
  searchControl = new FormControl("");
  displayedColumns: string[] = [
    "Name",
    "Industries",
    "OpenPosition",
    "ContactPerson",
    "City",
    "Email",
    "PhoneNumber",
    "Url",
    "JD",
    "Actions",
  ];

  columns = [
    { key: "Name", label: "Name" },
    { key: "Industries", label: "Industries" },
    { key: "OpenPosition", label: "Open Position" },
    { key: "ContactPerson", label: "Contact Person" },
    { key: "City", label: "City" },
    { key: "Email", label: "Email" },
    { key: "PhoneNumber", label: "Phone Number" },
    { key: "Url", label: "URL" },
    { key: "JD", label: "JD" },
    { key: "Actions", label: "Actions" },
  ];

  industries: Industry[] = [];

  offers: JobpostingSelectedstudent[] = [];

  calculateAcceptedOffers() {
    this.acceptedOffersCount = this.offers.filter(
      (offer) => offer.HasAcceptedOffer === 1
    ).length;
  }

  calculateRejectedOffer() {
    this.rejectedOffersCount = this.offers.filter(
      (offer) => offer.HasAcceptedOffer === 0
    ).length;
  }

  calculatePendingOffer() {
    this.pendingOffersCount = this.offers.filter(
      (offer) => offer.HasAcceptedOffer === null
    ).length;
  }

  getAllOffers = () => {
    this.offerManagementDetailsApiService
      .GetAllOffers(this.companyId, this.filterObject)
      .subscribe({
        next: (response) => {
          const data: JobpostingSelectedstudent[] = response.value;
          console.log("Selected Students", data);
          this.JobpostingSelectedstudentData.set(data);
          this.isLoading = false;
          this.offers = data;
          this.calculateAcceptedOffers();
          this.calculateRejectedOffer();
          this.calculatePendingOffer();
          this.applyFilters();
        },
        error: (error) => {
          console.log("Error fetching rounds: ", error);
        },
      });
  };

  getAllUniversities = () => {
    this.offerManagementDetailsApiService.GetAllUniversities().subscribe({
      next: (response) => {
        const data: University[] = response.value;
        console.log("University Types", data);
        this.universityTypes = data;
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  };

  getAllColleges = () => {
    this.offerManagementDetailsApiService.GetAllColleges().subscribe({
      next: (response) => {
        const data: Campusregistration[] = response.value;
        console.log("College Types", data);
        if (data) this.colleges = data;
      },
    });
  };

  getAllStatuses = () => {
    this.offerManagementDetailsApiService.GetAllStatuses().subscribe({
      next: (response) => {
        const data: Jobstudentstatus[] = response.value;
        console.log("Statuses", data);
        this.statuses = data;
      },
    });
  };

  getAllTechnologies = () => {
    this.offerManagementDetailsApiService.GetAllTechnologies().subscribe({
      next: (response) => {
        const data: Technology[] = response.value;
        console.log("Technologies", data);
        this.technologies = data;
      },
    });
  };

  filterObject: FilterObject = {
    Status: 0,
    JobRole: 0,
    DriveDate: new Date(),
    University: 0,
    College: 0,
  };

  ngOnInit() {
    this.getAllOffers();
    this.getAllUniversities();

    this.getAllColleges();

    this.getAllStatuses();
    this.getTemplates();
    this.getStudentsList();
    this.getAllTechnologies();
    this.searchName.valueChanges.subscribe(() => this.applyFilters());
  }
  applyFilters() {
    const filtered = this.JobpostingSelectedstudentData().filter((student) => {
      const nameFilter = this.searchName.value?.toLowerCase() || "";
      const matchesName =
        !nameFilter ||
        `${student.Student?.FirstName ?? ""} ${student.Student?.LastName ?? ""}`
          .toLowerCase()
          .includes(nameFilter) ||
        student.JobPosting?.JobRole?.toLowerCase().includes(nameFilter);
      return matchesName;
    });
    this.filteredselectedStudents.set(filtered);
  }
  goBack(): void {
    this.location.back();
  }

  onCompanySelected(event: MatAutocompleteSelectedEvent) {
    const selectedCompanyName = event.option.value;
    const selectedCompany = this.companies.find(
      (company) => company.Name === selectedCompanyName
    );
    if (selectedCompany) {
      this.apiCompanyService
        .getCompanyDataById(selectedCompany.Id)
        .subscribe((response) => {
          const companyData = response.value[0];
          this.openCompanyModalPopup(companyData);
        });
    }
  }

  openCompanyModalPopup(company: any): void {
    this.dialog.open(CompanyDetailDialogModalComponent, {
      width: "500px",
      height: "600px",
      data: company,
    });
  }

  _filterCompanies(value: string): companyTableList[] {
    const filterValue = value.toLowerCase();
    if (filterValue.length < 2) {
      return [];
    }
    return this.companies.filter((company) =>
      company.Name.toLowerCase().includes(filterValue)
    );
  }

  openAddEditCompanyForm(id?: number) {
    if (id !== null && id !== undefined) {
      this.router.navigate(["/company-configuration/company", id]);
    } else {
      this.router.navigate(["/company-configuration/company", 0]);
    }
  }

  openJdDetails(id: number) {}

  openImportCompanyDialog() {
    this.dialog.open(ImportCompanyDialogComponent, {
      width: "500px",
      height: "600px",
    });
  }

  extractIndustriesFromCompanies(companies: any[]): Industry[] {
    const industriesSet = new Set();
    companies.forEach((company) => {
      company.Companyindustries.forEach((ci: any) => {
        industriesSet.add(ci.Industry);
      });
    });
    return Array.from(industriesSet) as Industry[];
  }

  goToInterviewStudentsDetails(id: number) {
    if (this.UserRoleId === 1 || this.UserRoleId === 2) {
      this.router.navigate(["interview/interview-students-list", id]);
    }
  }

  viewInterviewDetails(id: number) {
    console.log("View details for interview ID:", id);
  }

  openInterviewAdditionalFilter() {
    this.dialog.open(InterviewAdditionalFilterComponent, {
      width: "500px",
      height: "600px",
    });
  }

  openOfferManagement(jobPostingId: number, studentId: number, id: number) {
    this.router.navigate([
      "/offer-management/offer-management-details/",
      jobPostingId,
      studentId,
      id,
    ]);
  }
  openPopup() {
    this.isPopupOpen = true;
    this.selectedOffers = [];
    this.selectedTemplate = null;
    this.templateSubject = "";
    this.templateBody = "";
  }

  closePopup() {
    this.isPopupOpen = false;
    this.selectedOffers = [];
  }

  toggleSelection(offer: JobpostingSelectedstudent) {
    const index = this.selectedOffers.indexOf(offer);
    if (index === -1) {
      this.selectedOffers.push(offer);
    } else {
      this.selectedOffers.splice(index, 1);
    }
  }

  toggleSelectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedOffers = isChecked ? [...this.students] : [];
  }
  getStudentsList = () => {
    this.offerManagementDetailsApiService.GetStudent().subscribe({
      next: (response) => {
        const data: JobpostingSelectedstudent[] = response.value;
        console.log("Selected Students", data);
        this.isLoading = false;
        this.students = data;
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  };
  showSecondPopup() {
    if (this.selectedOffers.length === 0) {
      alert("Please select at least one student.");
      return;
    }
    this.isPopupOpen = false;
    this.isSecondPopupOpen = true;
  }

  closeSecondPopup() {
    this.isSecondPopupOpen = false;
    this.selectedTemplate = null;
    this.templateSubject = "";
    this.templateBody = "";
  }
  getTemplates = () => {
    this.offerManagementDetailsApiService.GetAllTemplateCategories().subscribe({
      next: (response) => {
        this.templateCategories = response.value;
        this.templates = response.value.flatMap(
          (category) => category.Templates
        );
        console.log("Template Categories:", this.templateCategories);
        console.log("Templates:", this.templates);
      },
      error: (error) => {
        console.error("Error fetching templates", error);
      },
    });
  };
  onTemplateChange(templateId: number): void {
    this.selectedTemplate =
      this.templates.find((template) => template.Id === templateId) || null;
    if (this.selectedTemplate) {
      this.templateSubject = this.selectedTemplate.Subject;
      this.templateBody = this.selectedTemplate.Body;
    }
  }
  // confirmAction() {
  //   console.log("Offer letter confirmed!");
  //   if (this.selectedOffers.length > 0) {
  //     const currentDate = new Date();
  //     this.selectedOffers.forEach((offer) => {
  //       const email = {
  //         To: "jhansich949@gmail.com", //offer.Student.Email,
  //         Cc: "jhansich949@gmail.com", //offer.Student.Org.Email ?? "",
  //         Bcc: "",
  //         Subject: this.templateSubject,
  //         Body: this.templateBody,
  //         SentAt: currentDate,
  //       };
  //       this.closeSecondPopup();
  //       this.offerManagementDetailsApiService.SendOfferLetter(email).subscribe({
  //         next: () => {
  //           console.log(
  //             "Offer letter sent successfully for",
  //             offer.Student.FirstName
  //           );
  //           this.offerManagementDetailsApiService
  //             .sendStudentData(offer.Student.Id, offer.JobPosting.Id)
  //             .subscribe({
  //               next: () => {
  //                 console.log("Student data updated successfully!");
  //                 const updateData = {
  //                   OfferLetterSentDate: currentDate,
  //                 };

  //                 this.offerManagementDetailsApiService
  //                   .UpdateOffer(offer.Id, updateData)
  //                   .subscribe({
  //                     next: () => {
  //                       console.log(
  //                         `OfferLetterSentDate updated successfully for student`
  //                       );
  //                     },
  //                     error: (error) => {
  //                       console.error(
  //                         `Error updating OfferLetterSentDate for student:`,
  //                         error
  //                       );
  //                     },
  //                   });
  //               },
  //               error: (error) => {
  //                 console.error(
  //                   `Error updating student data for student`,
  //                   error
  //                 );
  //               },
  //             });
  //         },
  //         error: (error) => {
  //           console.error(`Error sending offer letter for student`, error);
  //         },
  //       });
  //     });
  //   }
  // }

  onFileSelected(event: Event, offer: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileMap[offer.Student.Id] = file;
      console.log(`File selected for student ${offer.Student.Id}:`, file.name);
    }
  }
  confirmAction() {
    console.log("Offer letter confirmed!");
    const currentDate = new Date();

    if (this.selectedOffers.length > 0) {
      this.selectedOffers.forEach((offer) => {
        const file = this.fileMap[offer.Student.Id];
        const body = this.templateBody;
        const subject = this.templateSubject;

        if (file) {
          const formData = new FormData();
          const folderName = "offerLetter";
          formData.append("files", file);
          formData.append("parentType", "student");
          formData.append("parentId", offer.Student.Id.toString());
          formData.append("fileType", file.type);
          this.offerManagementDetailsApiService
            .uploadFile(formData, folderName)
            .subscribe({
              next: (response) => {
                console.log("File uploaded successfully", response);

                const documentData = {
                  FileName: response.files[0].fileName,
                  FilePath: response.files[0].filePath,
                  FileType: response.files[0].fileType,
                  ParentType: "student",
                  ParentId: offer.Student.Id,
                  IsDeleted: false,
                  CreatedDate: new Date(),
                  CreatedBy: true,
                };
                this.offerManagementDetailsApiService
                  .uploadDocument(documentData)
                  .subscribe({
                    next: () => {
                      console.log("Document saved successfully");

                      this.offerManagementDetailsApiService
                        .getDocumentByParentId(offer.Student.Id)
                        .subscribe({
                          next: (response) => {
                            console.log("API response:", response);
                            const documents = response.value;
                            if (Array.isArray(documents)) {
                              documents.sort(
                                (a: any, b: any) =>
                                  new Date(b.CreatedDate).getTime() -
                                  new Date(a.CreatedDate).getTime()
                              );
                              const studentDocument = documents.find(
                                (doc: any) =>
                                  doc.ParentType === "student" &&
                                  doc.ParentId === offer.Student.Id &&
                                  this.isDocumentCreatedToday(doc.CreatedDate)
                              );
                              if (studentDocument) {
                                console.log(
                                  "Found document for student",
                                  studentDocument
                                );
                                this.sendEmailWithAttachment(
                                  offer,
                                  currentDate,
                                  studentDocument.Id,
                                  studentDocument.FilePath,
                                  subject,
                                  body
                                );
                              } else {
                                console.error(
                                  "No document found for student with Id",
                                  offer.Student.Id
                                );
                                this.sendEmailWithAttachment(
                                  offer,
                                  currentDate,
                                  null,
                                  null,
                                  subject,
                                  body
                                );
                              }
                            } else {
                              console.error(
                                "Documents are not in the expected array format",
                                response
                              );
                            }
                          },
                          error: (error) => {
                            console.error("Error fetching document", error);
                          },
                        });
                    },
                    error: (error) => {
                      console.error("Error saving document", error);
                    },
                  });
              },
              error: (error) => {
                console.error("Error uploading file", error);
              },
            });
        } else {
          this.sendEmailWithAttachment(
            offer,
            currentDate,
            null,
            null,
            subject,
            body
          );
        }
      });
      this.closeSecondPopup();
    }
  }

  private sendEmailWithAttachment(
    offer: any,
    currentDate: Date,
    documentId: number | null,
    filePath: string | null,
    subject: string,
    body: string
  ) {
    const email = {
      To: "jhansich949@gmail.com", // offer.Student.Email,
      Cc: "jhansich949@gmail.com", //offer.Student.Org?.Email || "",
      Bcc: "",
      Subject: subject,
      Body: body,
      SentAt: currentDate,
      DocumentId: documentId,
    };

    this.offerManagementDetailsApiService.SendOfferLetter(email).subscribe({
      next: () => {
        console.log(
          "Offer letter sent successfully for",
          offer.Student.FirstName
        );
        this.offerManagementDetailsApiService
          .sendStudentData(offer.Student.Id, offer.JobPosting.Id)
          .subscribe({
            next: () => {
              console.log("Student data updated successfully!");
              const updateData = {
                OfferLetterSentDate: currentDate,
              };

              this.offerManagementDetailsApiService
                .UpdateOffer(offer.Id, updateData)
                .subscribe({
                  next: () => {
                    console.log(
                      "OfferLetterSentDate updated successfully for student"
                    );
                  },
                  error: (error) => {
                    console.error(
                      "Error updating OfferLetterSentDate for student:",
                      error
                    );
                  },
                });
            },
            error: (error) => {
              console.error("Error updating student data for student", error);
            },
          });
      },
      error: (error) => {
        console.error("Error sending offer letter for student", error);
      },
    });
  }
  isDocumentCreatedToday(createdDate: string): boolean {
    const now = new Date();
    const docDate = new Date(createdDate);
    const isSameDate =
      docDate.getFullYear() === now.getFullYear() &&
      docDate.getMonth() === now.getMonth() &&
      docDate.getDate() === now.getDate();
    const timeDifference = Math.abs(now.getTime() - docDate.getTime());
    const withinTimeRange = timeDifference <= 24 * 60 * 60 * 1000;
    return isSameDate && withinTimeRange;
  }

  exportOffers() {
    this.offerManagementDetailsApiService
      .exportOffers(this.companyId)
      .subscribe({
        next: (response: Blob) => {
          const blob = new Blob([response], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Offers.xlsx";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
        error: (error) => {
          console.error("Error exporting offers:", error);
        },
      });
  }
}
