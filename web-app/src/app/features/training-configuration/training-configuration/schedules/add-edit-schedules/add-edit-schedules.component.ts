import { Component } from "@angular/core";
import { ODataResponse } from "../schedules.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TabService } from "src/app/features/company-configuration/tabs-service";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { TrainerScheduleAPIService } from "../api.schedules";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { TrainingCourseAPIService } from "../../courses/api.course";
import { TrainerAPIService } from "../../trainers/api.trainer";
import { Trainingcourse } from "../../courses/courses-module";
import { Trainer } from "../../trainers/trainers-module";
import { Trainerschedule } from "../schedules-module";
import { companyTableList } from "src/app/features/company-configuration/company-config/companies/companies-model";
import { CompanyAPIService } from "src/app/features/company-configuration/company-config/companies/api.companies";

@Component({
  selector: "app-add-edit-schedules",
  standalone: true,
  imports: [
    AMGModules,
    SharedModule,
    CommonModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: "./add-edit-schedules.component.html",
  styleUrl: "./add-edit-schedules.component.css",
})
export class AddEditSchedulesComponent {
  companies: companyTableList[] = [];
  courses: Trainingcourse[] = [];
  trainers: Trainer[] = [];
  addEditScheduleForm: FormGroup;
  Id: number | null = null;
  initialFormValues: any;
  scheduleTypes: string[] = ["Online", "Offline", "Remote", "In-Person"];
  schedule: string[] = ["1st half", "2nd half", "3rd half", "4th half"];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private apiTrainerScheduleService: TrainerScheduleAPIService,
    private apiCompanyService: CompanyAPIService,
    private apiTrainingCourseService: TrainingCourseAPIService,
    private apiTrainerService: TrainerAPIService
  ) {
    this.addEditScheduleForm = this.fb.group({
      CompanyId: null,
      SchoolId: null,
      CourseId: null,
      StartDate: "",
      EndDate: "",
      TrainerId: null,
      ScheduleType: "",
      StudentId: null,
    });
  }

  ngOnInit(): void {
    this.getTrainerScheduleById();
    this.companyData();
    this.trainersCourseData();
    //this.trainersData();
  }
  onReset() {
    this.addEditScheduleForm.reset(this.initialFormValues);
  }

  companyData(): void {
    this.apiCompanyService.loadCompanyData().subscribe({
      next: (response: ODataResponse<companyTableList>) => {
        this.companies = response.value;
        console.log("Company Data Loaded:", response);
      },
      error: (error) => {
        console.error("Error loading companies", error);
      },
    });
  }

  trainersCourseData(): void {
    this.apiTrainingCourseService.loadTrainingCourseData().subscribe({
      next: (Response: ODataResponse<Trainingcourse>) => {
        this.courses = Response.value;
      },
      error: (error) => {
        console.error("Error loading courses", error);
      },
    });
  }

  // trainersData(): void {
  //   this.apiTrainerService.loadTrainerData().subscribe({
  //     next: (Response: ODataResponse<Trainer>) => {
  //       this.trainers = Response.value;
  //     },
  //     error: (error) => {
  //       console.error("Error loading trainers", error);
  //     },
  //   });
  // }

  getTrainerScheduleById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiTrainerScheduleService
          .getTrainerScheduleDataById(this.Id)
          .subscribe({
            next: (response: ODataResponse<any>) => {
              const TrainerSchedule = response.value[0];
              if (TrainerSchedule) {
                this.addEditScheduleForm.patchValue(TrainerSchedule);
                this.initialFormValues = this.addEditScheduleForm.value;
              }
            },
            error: (error) => {
              console.error(
                `Error fetching Trainer Schedule data by ${this.Id}`,
                error
              );
            },
          });
      }
    });
  }

  async onSubmit(): Promise<void> {
    const formValues = this.addEditScheduleForm.value;
    const startTime = this.extractTime("StartTimePicker");
    const endTime = this.extractTime("EndTimePicker");

    const startDateTimeString = this.combineDateTime(
      formValues.StartDate,
      startTime
    );
    const endDateTimeString = this.combineDateTime(formValues.EndDate, endTime);

    if (!startDateTimeString || !endDateTimeString) {
      console.error("Failed to combine date and time");
      return;
    }

    console.log("Start DateTime String:", startDateTimeString);
    console.log("End DateTime String:", endDateTimeString);

    const startDateTime = new Date(startDateTimeString);
    const endDateTime = new Date(endDateTimeString);

    const TrainerSchedule: Partial<Trainerschedule> = {
      CompanyId: formValues.CompanyId,
      SchoolId: formValues.SchoolId,
      CourseId: formValues.CourseId,
      StartDate: startDateTimeString,
      EndDate: endDateTimeString,
      TrainerId: formValues.TrainerId,
      ScheduleType: formValues.ScheduleType,
      StudentId: formValues.StudentId,
    };
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this Trainer Schedule?`
    );

    if (confirmed) {
      this.apiTrainerScheduleService
        .addUpdateTrainerSchedule(this.Id, TrainerSchedule)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              this.router.navigate(["/training-configuration"]);
              this.sweetAlertService.success(response.message);
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

  combineDateTime(
    dateString: string,
    time: { hours: number; minutes: number } | null
  ): string | null {
    // Convert the date string to a Date object
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", dateString);
      return null;
    }

    if (time === null) {
      console.error("Time is null");
      return null;
    }

    const { hours, minutes } = time;

    // Set hours and minutes to the date object
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0); // Assuming you want to set seconds to 00

    // Format the final date and time to YYYY-MM-DDTHH:mm:ss
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hour}:${minute}:${second}z`;
  }

  extractTime(pickerId: string): { hours: number; minutes: number } | null {
    const timeElement: HTMLInputElement = document.getElementById(
      pickerId
    ) as HTMLInputElement;
    if (!timeElement) {
      console.error(`Element with id "${pickerId}" not found.`);
      return null;
    }

    const timeString = timeElement.value;
    const timeRegex = /^\s*(\d{1,2})\s*:\s*(\d{2})\s*(AM|PM)?\s*$/i;
    const match = timeRegex.exec(timeString);

    if (!match) {
      console.error(`Invalid time format: ${timeString}`);
      return null;
    }

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3] ? match[3].toUpperCase() : null;

    // Convert to 24-hour format
    if (period) {
      if (period === "PM" && hours < 12) {
        hours += 12;
      }
      if (period === "AM" && hours === 12) {
        hours = 0; // Midnight case
      }
    } else if (hours === 12) {
      hours = 0; // Noon case if no AM/PM specified
    }

    return { hours, minutes };
  }
}
