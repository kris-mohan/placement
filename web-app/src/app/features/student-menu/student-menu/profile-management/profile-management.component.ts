import { CommonModule, Location, NgPlural } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatSelectChange } from "@angular/material/select";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatChipInputEvent } from "@angular/material/chips";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Semester } from "src/app/services/common-dropdowns/SemesterName";
import { TenthScoreType } from "src/app/services/common-dropdowns/TenthScoreType";
import { TwelfthScoreType } from "src/app/services/common-dropdowns/TwelfthScoreType";
import { SemesterScoreType } from "src/app/services/common-dropdowns/SemesterScoreType";
import { BloodGroup } from "src/app/services/common-dropdowns/BloodGroup";
import { Course } from "src/app/services/types/Course";
import { StudentProfileApiService } from "./StudentProfileApiService";
import { Stream } from "src/app/services/types/Stream";
import { Batch } from "src/app/services/types/Batch";
import { TenthBoardName } from "src/app/services/common-dropdowns/TenthBoard";
import { TwelfthBoardName } from "src/app/services/common-dropdowns/TwelfthBoard";
import { SkillType } from "src/app/services/types/SkillType";
import { Observable, of } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { Skill } from "src/app/services/types/Skill";
import {
  PatchTblStudent,
  PostTblstudent,
  Tblstudent,
} from "src/app/services/types/Tblstudent";
import { ActivatedRoute } from "@angular/router";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import {
  PatchStudentAcademic,
  Studentacademic,
} from "src/app/services/types/Studentacademic";
import { StudentSemesterMark } from "src/app/services/types/StudentSemesterMark";
import { DateTime } from "luxon";
import { Year } from "src/app/services/common-dropdowns/Year";

@Component({
  selector: "app-profile-management",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./profile-management.component.html",
  styleUrl: "./profile-management.component.css",
})
export class ProfileManagementComponent {
  selectedPhoto: string | ArrayBuffer | null | undefined = null;
  selectedProfilePhoto: File[] = [];
  selectedSkillTypeIds: number[] = [];
  selectedSkillIds: number[] = [];

  selectedSemester: string = "";
  selectedBoard: string = "";
  selectedScore: string = "";
  selectedCourse: string = "";
  selectedPuScore: string = "";
  selectedSemScore: string = "";
  selectedBlood: string = "";
  semesters = [{ score: "", type: "", file: null }];
  showSemester = false;
  fileError: string | null = null;
  studentProfileForm: FormGroup;
  studentEducationForm: FormGroup;
  studentSkillsForm: FormGroup;
  allSemesters = [{ semester: "", scoreType: "", score: "", file: null }];
  Semester: string[] = Semester;
  TenthScoreType: string[] = TenthScoreType;
  TwelfthScoreType: string[] = TwelfthScoreType;
  SemesterScoreType: string[] = SemesterScoreType;
  TenthBoardNames: string[] = TenthBoardName;
  TwelfthBoardNames: string[] = TwelfthBoardName;
  BloodGroup: string[] = BloodGroup;
  Courses = signal<Course[]>([]);
  Streams = signal<Stream[]>([]);
  Batches = signal<Batch[]>([]);
  SkillTypes: SkillType[] = [];
  SkillsNames = signal<Skill[]>([]);
  SkillTypeControl = new FormControl();
  searchSkillType: string = "";
  selectedSkillTypes = signal<number[]>([]);
  filteredSkillTypes = signal<SkillType[]>([]);
  filteredCompany: Observable<any[]> = of([]);
  studentId: number;
  Id: number;
  studentAcademicId: number = 0;
  semesterData: StudentSemesterMark[] = [];
  sessionStudentId: number | null;
  yearDropDownValues: string[] = Year;
  semesterDropDownValues: string[] = Semester;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private studentApiService: StudentProfileApiService,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService
  ) {
    const storedStudentId = sessionStorage.getItem("CompanyId");
    this.sessionStudentId = storedStudentId ? parseInt(storedStudentId) : 0;

    this.studentProfileForm = this.fb.group({
      FirstName: ["", [Validators.required]],
      LastName: [""],
      BatchId: [{ value: "", disabled: true }, [Validators.required]],
      AadharCardNumber: ["", [Validators.required]],
      DateOfBirth: ["", [Validators.required]],
      BloodGroup: ["", [Validators.required]],
      PermanentAddress: ["", [Validators.required]],
      CurrentAddress: [""],
      Email: [{ value: "", disabled: true }, [Validators.required]],
      PhoneNumber: ["", [Validators.required]],
      FatherName: ["", [Validators.required]],
      FatherPhoneNumber: ["", [Validators.required]],
      MotherName: ["", [Validators.required]],
      MotherPhoneNumber: ["", [Validators.required]],
      RollNo: [{ value: "", disabled: true }, [Validators.required]],
      CourseId: [{ value: "", disabled: true }, [Validators.required]],
      StreamId: [{ value: "", disabled: true }, [Validators.required]],
      profilePhoto: [null],
    });
    this.studentEducationForm = this.fb.group({
      TenthSchoolName: ["", [Validators.required]],
      TenthBoard: ["", [Validators.required]],
      TenthMarks: ["", [Validators.required]],
      TenthPassedOutYear: ["", [Validators.required]],
      TenthFile: [null],
      TwelfthSchoolName: ["", [Validators.required]],
      TwelfthBoard: ["", [Validators.required]],
      TwelfthMarks: ["", [Validators.required]],
      TwelfthPassedOutYear: ["", [Validators.required]],
      TwelfthFile: [null],
      semester1: this.createSemesterGroup(),
      semester2: this.createSemesterGroup(),
      semester3: this.createSemesterGroup(),
      semester4: this.createSemesterGroup(),
      semester5: this.createSemesterGroup(),
      semester6: this.createSemesterGroup(),
      semester7: this.createSemesterGroup(),
      semester8: this.createSemesterGroup(),
      semestersAll: this.fb.array([]),
    });
    this.studentSkillsForm = this.fb.group({
      fields: this.fb.array([]),
      LinkedInLink: [""],
      Achievement: [""],
      Project: [""],
      Internship: [""],
      // fields: this.fb.array([]), // Initialize with an empty FormArray
    });
    this.fields = this.studentSkillsForm.get("fields") as FormArray; // initialize fields form array
    const id = this.route.snapshot.paramMap.get("id");
    this.studentId = id ? parseInt(id) : 0;
    this.Id = id ? parseInt(id) : 0;
  }
  fields: FormArray;

  get semestersAll(): FormArray {
    return this.studentEducationForm.get("semestersAll") as FormArray;
  }

  addSemester(): void {
    this.semestersAll.push(this.createSemesterGroup());
  }

  removeSemester(index: number): void {
    this.semestersAll.removeAt(index);
  }

  createSemesterGroup() {
    return this.fb.group({
      sgpa: [],
      closedBacklogs: [0],
      liveBacklogs: [0],
      file: [null],
      Semester: "",
      Year: null,
    });
  }

  onFileSelectedDegree(event: any, index: number): void {
    const selectedFile = event.target.files[0];
    const semesterFormGroup = this.semestersAll.at(index) as FormGroup;
    semesterFormGroup.patchValue({
      file: selectedFile,
    });
  }

  onFileSelected10th(event: any): void {
    const selectedFile = event.target.files[0];
    this.studentEducationForm.patchValue({
      TenthFile: selectedFile,
    });
  }
  onFileSelected12th(event: any): void {
    const selectedFile = event.target.files[0];
    this.studentEducationForm.patchValue({
      TwelfthFile: selectedFile,
    });
  }

  getStudentEducationDetails = () => {
    this.studentApiService
      .GetStudentEducationDetails(this.studentId)
      .subscribe({
        next: (student) => {
          const data: Studentacademic[] = student.value;
          console.log(data);

          if (data[0]) {
            // Access StudentSemesterMarks directly
            this.semesterData = data[0]?.StudentSemesterMarks;
            console.log(this.semesterData); // Log all semester data
            this.studentAcademicId = data[0].Id;

            // If you want to iterate through the semesters and log each
            const studentDetails = data[0];

            // Patch the main student education details fields
            if (studentDetails) {
              this.studentEducationForm.patchValue({
                TenthSchoolName: studentDetails.TenthSchoolName || "",
                TenthBoard: studentDetails.TenthBoard || "",
                TenthMarks: studentDetails.TenthMarks || "",
                TenthPassedOutYear: studentDetails.TenthPassedOutYear || "",
                TwelfthSchoolName: studentDetails.TwelthSchoolName || "",
                TwelfthBoard: studentDetails.TwelthBoard || "",
                TwelfthMarks: studentDetails.TwelthMarks || "",
                TwelfthPassedOutYear: studentDetails.TwelthPassedOutYear || "",
              });

              this.studentSkillsForm.patchValue({
                LinkedInLink: studentDetails.LinkedinLink || "",
                Achievement: studentDetails.Achievements || "",
                Project: studentDetails.Projects || "",
                Internship: studentDetails.Internship || "",
              });

              // If you have file or other fields to patch, do so here as needed
              // Example for Tenth and Twelfth file:
              // this.studentEducationForm.patchValue({
              //   TenthFile: studentDetails.TenthFile || null,
              //   TwelfthFile: studentDetails.TwelfthFile || null,
              // });
            }

            this.semesterData.forEach((semester) => {
              console.log(
                `Semester ${semester.Semester}: SGPA = ${semester.Sgpa}`
              );
              const semesterKey = `semester${semester.Semester}`;
              if (this.studentEducationForm.get(semesterKey)) {
                this.studentEducationForm.get(semesterKey)?.patchValue({
                  sgpa: semester.Sgpa,
                  closedBacklogs: semester.ClosedBacklogs,
                  liveBacklogs: semester.LiveBacklogs,
                  // file: semester.MarkaPercentage,
                });
                console.log(`Patched data for ${semesterKey}:`, {
                  sgpa: semester.Sgpa,
                  closedBacklogs: semester.ClosedBacklogs,
                  liveBacklogs: semester.LiveBacklogs,
                  // file: semester.MarkaPercentage,
                });
              }
            });
          }
        },
      });
  };

  readonly techSkill = signal(["java", "c++", "c"]);
  readonly SoftSkill = signal([
    "Communication skill",
    "Leadership skill",
    "Team management",
  ]);
  readonly ExtracurricularActivities = signal(["sports", "music", "dance"]);
  readonly Language = signal(["English", "Hindi", "Tamil"]);

  announcer = inject(LiveAnnouncer);

  ngOnInit() {
    this.getStudentDataById();
    this.getStudentEducationDetails();

    this.GetAllBatchName();
    this.GetAllStreamName();
    this.GetAllCourseName();

    this.GetPassedOutYear();
    this.GetAllSkillTypes();
    this.fields.push(this.createSkillFormControl());
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileError = null;
    } else {
      this.fileError = "Please select a file.";
    }
  }

  onSkillTypeChange(event: any, index: number) {
    // Get selected skill type Id

    const selectedSkillTypeId = event.value;
    this.GetAllSkills(selectedSkillTypeId);

    const selectedSkillTypes = [...this.selectedSkillTypes()];
    selectedSkillTypes[index] = selectedSkillTypeId;

    this.selectedSkillTypes.set(selectedSkillTypes);

    this.updateFilteredSkillTypes();

    this.clearSkillsForField(index);

    console.log("onSkillTypeChange:", this.filteredSkillTypes());

    // Filter skills based on selected skill type
    // const skillsForSelectedType = this.SkillsList.filter(
    //   (skill) => skill.SkillTypeId === selectedSkillTypeId
    // );

    // // Update filtered skills for the current field
    // this.filteredSkills[index] = skillsForSelectedType;

    // // Reset skills array for the current field
    // const skillsControl = (this.studentSkillsForm.get("fields") as FormArray)
    //   .at(index)
    //   .get("skills");
    // skillsControl?.setValue([]);
  }

  updateFilteredSkillTypes() {
    const selectedIds = this.selectedSkillTypes(); // Get current selected skill types
    this.filteredSkillTypes.set(
      this.SkillTypes.filter((skillType) => !selectedIds.includes(skillType.Id))
    );
  }

  clearSkillsForField(index: number) {
    // console.log("index", index);
    // const skillsControl = (this.studentSkillsForm.get("fields") as FormArray)
    //   .at(index)
    //   .get("skills");
    // skillsControl?.setValue([]); // Clear the selected skills for this field
    // this.fields[index].skills = [];
  }

  getYear(index: number): number {
    return Math.ceil(index / 2); // Calculates the year based on the semester
  }

  addDulpicateSemester() {
    this.allSemesters.push({
      semester: "",
      scoreType: "",
      score: "",
      file: null,
    });
  }

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedPhoto = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // removeSemester(index: number) {
  //   if (this.allSemesters.length > 1) {
  //     this.allSemesters.splice(index, 1);
  //   } else {
  //     alert("At least one semester is required.");
  //   }
  // }

  // addSemester() {
  //   this.semesters.push({ score: "", type: "", file: null });
  // }

  onSemesterChange(event: any) {
    this.selectedSemester = event.value;
    console.log("Selected semester:", this.selectedSemester);
  }

  onBoardChange(event: any) {
    this.selectedBoard = event.value;
    console.log("Selected Board:", this.selectedBoard);
  }

  onScoreChange(event: any) {
    this.selectedScore = event.value;
    console.log("Selected Score:", this.selectedScore);
  }

  onCourseChange(event: any) {
    this.selectedCourse = event.value;
    console.log("Selected course:", this.selectedCourse);
  }

  onPuScoreChange(event: any) {
    this.selectedPuScore = event.value;
    console.log("Selected puscore:", this.selectedPuScore);
  }

  onSemScoreChange(event: any) {
    this.selectedSemScore = event.value;
    console.log("Selected semscore:", this.selectedSemScore);
  }

  onBloodChange(event: any) {
    this.selectedBlood = event.value;
    console.log("Selected Blood:", this.selectedBlood);
  }

  removeTemplateKeyword(keyword: string) {
    this.techSkill.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from template form`);
      return [...keywords];
    });
  }

  addTemplateKeyword(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    if (value) {
      this.techSkill.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to template form`);
    }

    event.chipInput!.clear();
  }

  removeSoftSkill(keyword: string) {
    this.SoftSkill.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from template form`);
      return [...keywords];
    });
  }

  addSoftSkill(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    if (value) {
      this.SoftSkill.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to template form`);
    }

    event.chipInput!.clear();
  }

  removeExtracurricularActivities(keyword: string) {
    this.ExtracurricularActivities.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from template form`);
      return [...keywords];
    });
  }

  addExtracurricularActivities(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our keyword
    if (value) {
      this.ExtracurricularActivities.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to template form`);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeLanguage(keyword: string) {
    this.Language.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from template form`);
      return [...keywords];
    });
  }

  addLanguage(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    if (value) {
      this.Language.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to template form`);
    }
    event.chipInput!.clear();
  }

  GetPassedOutYear = () => {
    this.studentApiService.GetAllBatches().subscribe({
      next: (batch) => {
        const data: Batch[] = batch.value;
        this.Batches.set(data);
        // console.log('course:', data);
      },
    });
  };

  GetAllCourseName = () => {
    this.studentApiService.GetAllCourse().subscribe({
      next: (course) => {
        const data: Course[] = course.value;
        this.Courses.set(data);
        console.log("course:", data);
      },
    });
  };

  GetAllStreamName = () => {
    this.studentApiService.GetAllStream().subscribe({
      next: (course) => {
        const data: Stream[] = course.value;
        this.Streams.set(data);
        console.log("stream:", data);
      },
    });
  };

  GetAllBatchName = () => {
    this.studentApiService.GetAllBatches().subscribe({
      next: (course) => {
        const data: Batch[] = course.value;
        this.Batches.set(data);
        console.log("batch:", data);
      },
    });
  };

  GetAllSkillTypes = () => {
    this.studentApiService.GetAllSkillTypes().subscribe({
      next: (course) => {
        const data: SkillType[] = course.value;
        this.SkillTypes = data;
        this.filteredSkillTypes.set(this.SkillTypes);
        console.log("skillType:", data);
      },
    });
  };

  GetAllSkills = (id: number) => {
    this.studentApiService.GetAllSkills(id).subscribe({
      next: (skills) => {
        const data: SkillType[] = skills.value;
        console.log(skills.value);
        this.SkillsNames.set(data);
        console.log("SkillsNames:", data);
      },
    });
  };

  // onSkillTypeChange(event: any, index: number) {
  //   // Get selected skill type Id
  //   const selectedSkillTypeId = event.value;

  //   // Filter skills based on selected skill type
  //   const skillsForSelectedType = this.SkillsList.filter(
  //     (skill) => skill.SkillTypeId === selectedSkillTypeId
  //   );

  //   // Update filtered skills for the current field
  //   this.filteredSkills[index] = skillsForSelectedType;

  //   // Reset skills array for the current field
  //   const skillsControl = (this.studentSkillsForm.get("fields") as FormArray)
  //     .at(index)
  //     .get("skills");
  //   skillsControl?.setValue([]);
  // }

  getStudentDataById = () => {
    this.studentApiService.GetStudentDataById(this.studentId).subscribe({
      next: (student) => {
        const data: Tblstudent[] = student.value;
        console.log(data);
        if (data) {
          const flattenedData = {
            ...data[0],
            StreamId: data[0].Studentacademics[0].StreamId,
            CourseId: data[0].Studentacademics[0].CourseId,
          };
          console.log(flattenedData);
          this.studentProfileForm.patchValue(flattenedData);
        }
      },
    });
  };

  SaveStudentDetails(tab: number, studentData: PatchTblStudent) {
    this.studentApiService
      .SaveStudentDetails(tab, this.studentId, studentData)
      .subscribe({
        next: (response: { success: boolean; message: any }) => {
          console.log(response);
          if (response.success) {
            this.sweetAlertService.success(response.message);
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error("An unexpected error occurred:");
        },
      });
  }

  goBack(): void {
    this.location.back();
  }

  async onSave(tab: number) {
    if (tab === 1) {
      if (this.studentProfileForm.valid) {
        const confirmed = await this.sweetAlertService.confirm(
          `Do you want to save your details?`
        );
        console.log(this.studentProfileForm);
        if (confirmed) {
          const studentData = {
            FirstName: this.studentProfileForm.value.FirstName,
            LastName: this.studentProfileForm.value.LastName,
            MiddleName: this.studentProfileForm.value.MiddleName,
            DateOfBirth: this.studentProfileForm.value.DateOfBirth,
            BloodGroup: this.studentProfileForm.value.BloodGroup,
            PhoneNumber: this.studentProfileForm.value.PhoneNumber,
            Email: this.studentProfileForm.value.Email,
            AadharCardNumber: this.studentProfileForm.value.AadharCardNumber,
            PermanentAddress: this.studentProfileForm.value.PermanentAddress,
            FatherName: this.studentProfileForm.value.FatherName,
            FatherPhoneNumber: this.studentProfileForm.value.FatherPhoneNumber,
            MotherName: this.studentProfileForm.value.MotherName,
            MotherPhoneNumber: this.studentProfileForm.value.MotherPhoneNumber,
            BatchId: this.studentProfileForm.value.BatchId,
            RollNo: this.studentProfileForm.value.RollNo,
            Studentacademics: [
              {
                StudentId: this.studentId,
                CourseId: this.studentProfileForm.value.CourseId,
                StreamId: this.studentProfileForm.value.StreamId,
              },
            ],
          };
          console.log(studentData);
          this.SaveStudentDetails(tab, studentData);
          this.uploadProfilePic();
        }
      }
    }
    if (tab === 2) {
      if (this.studentEducationForm.valid) {
        const confirmed = await this.sweetAlertService.confirm(
          `Do you want to save your details?`
        );
        if (confirmed) {
          // const semesterMarks = Array.from({ length: 8 }, (_, index) => {
          //   const semesterKey = `semester${index + 1}`;
          //   const semesterFormGroup =
          //     this.studentEducationForm.get(semesterKey);
          //   const existingSemesterData = this.semesterData.find(
          //     (semester) => semester.Semester === index + 1
          //   );

          //   if (semesterFormGroup) {
          //     return {
          //       Id: existingSemesterData?.Id || 0,
          //       Semester: index + 1,
          //       StudentAcademicId: this.studentAcademicId,
          //       Sgpa: +semesterFormGroup.value.sgpa || null,
          //       ClosedBacklogs: +semesterFormGroup.value.closedBacklogs || 0,
          //       LiveBacklogs: +semesterFormGroup.value.liveBacklogs || 0,
          //       // MarkaPercentage: semesterFormGroup.value.file || null, // Assuming file maps to MarkaPercentage
          //     };
          //   }
          //   return null;
          // }).filter((semester) => semester !== null);

          const semesterMarks = this.semestersAll.controls.map(
            (semesterFormGroup, index) => {
              const existingSemesterData = this.semesterData.find(
                (semester) => semester.Semester === index + 1
              );
              debugger;
              if (semesterFormGroup.value.file != null) {
                this.uploadDegreeCertificate(
                  semesterFormGroup.value.file,
                  `Degree Certificate Sem-wise ${semesterFormGroup.value.Year} - ${semesterFormGroup.value.Semester}`
                );
              }

              return {
                Id: existingSemesterData?.Id || 0,
                Semester: semesterFormGroup.value.Semester,
                StudentAcademicId: this.studentAcademicId,
                Sgpa: +semesterFormGroup.value.sgpa || null,
                ClosedBacklogs: +semesterFormGroup.value.closedBacklogs || 0,
                LiveBacklogs: +semesterFormGroup.value.liveBacklogs || 0,
                Year: +semesterFormGroup.value.Year,
                // MarkaPercentage: semesterFormGroup.value.file || null, // Assuming file maps to MarkaPercentage()
              };
            }
          );

          // Calculate CGPA (average of all SGPAs)
          const totalSgpa = semesterMarks.reduce(
            (acc, semester) => acc + (semester.Sgpa || 0),
            0
          );
          const averageSgpa = totalSgpa / semesterMarks.length;
          const CGPA = averageSgpa; // Store the average as CGPA
          console.log("CGPA", CGPA);
          const studentEducationData: PatchStudentAcademic = {
            Id: this.studentAcademicId,
            TenthMarks: +this.studentEducationForm.value.TenthMarks || null,
            TwelthMarks: +this.studentEducationForm.value.TwelfthMarks || null,
            TenthBoard: this.studentEducationForm.value.TenthBoard,
            TwelthBoard: this.studentEducationForm.value.TwelfthBoard,
            TenthPassedOutYear:
              +this.studentEducationForm.value.TenthPassedOutYear || null,
            TwelthPassedOutYear:
              +this.studentEducationForm.value.TwelfthPassedOutYear || null,
            TenthSchoolName: this.studentEducationForm.value.TenthSchoolName,
            TwelthSchoolName: this.studentEducationForm.value.TwelfthSchoolName,
            StudentSemesterMarks: semesterMarks,
            Cgpa: CGPA,
          };
          if (this.studentEducationForm.value.TenthFile != null) {
            this.uploadDegreeCertificate(
              this.studentEducationForm.value.TenthFile,
              `Tenth File`
            );
          }

          if (this.studentEducationForm.value.TwelfthFile) {
            this.uploadDegreeCertificate(
              this.studentEducationForm.value.TwelfthFile,
              `Tweleth File`
            );
          }
          console.log(studentEducationData);

          this.SaveEducationDetails(
            this.studentAcademicId,
            studentEducationData
          );
        }
      }
    }

    if (tab === 3) {
      debugger;
      console.log(this.studentSkillsForm.value, "skills Form");
      this;
      if (this.studentSkillsForm.valid) {
        const confirmed = await this.sweetAlertService.confirm(
          `Do you want to save your details?`
        );

        if (confirmed) {
          var skillids = this.studentSkillsForm.value.fields?.flatMap(
            (f: any) => {
              f.skills.flatMap((s: any) => {
                var studentSkill = {
                  Id: 0,
                  StudentId: this.Id,
                  SkillId: s,
                };
                this.studentApiService
                  .saveStudentSkills(studentSkill)
                  .subscribe({
                    next: (response: { success: boolean; message: any }) => {
                      console.log(response);
                      // if (response.success) {
                      //   this.sweetAlertService.success(response.message);
                      // } else {
                      //   this.sweetAlertService.error(response.message);
                      // }
                      return response;
                    },
                    error: (error) => {
                      // this.sweetAlertService.error(
                      //   "An unexpected error occurred:"
                      // );
                      return error;
                    },
                  });
              });
            }
          );
          const studentEducationData: Partial<PatchStudentAcademic> = {
            Id: this.studentAcademicId,
            LinkedinLink: this.studentSkillsForm.value.LinkedInLink,
            Achievements: this.studentSkillsForm.value.Achievement,
            Projects: this.studentSkillsForm.value.Project,
            Internship: this.studentSkillsForm.value.Internship,
          };

          this.SaveEducationDetails(
            this.studentAcademicId,
            studentEducationData
          );
        }
      }
    }
  }

  SaveEducationDetails(id: number, studentData: PatchStudentAcademic) {
    this.studentApiService
      .addUpdateStudentEducationDetails(id, studentData)
      .subscribe({
        next: (response: { success: boolean; message: any }) => {
          console.log(response);
          if (response.success) {
            this.sweetAlertService.success(response.message);
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error("An unexpected error occurred:");
        },
      });
  }

  uploadProfilePic() {
    if (this.selectedProfilePhoto.length > 0) {
      const formData = new FormData();
      formData.append("files", this.selectedProfilePhoto[0]);

      this.studentApiService.uploadDocument(formData).subscribe({
        next: (response) => {
          if (response.success && response.files) {
            response.files.flatMap((f: any) => {
              try {
                const doc = {
                  id: 0,
                  fileName: f.fileName,
                  filePath: f.filePath,
                  fileType: "Image",
                  parentType: "student",
                  parentId: this.Id,
                  isDeleted: true,
                  createdDate: DateTime.now(),
                  createdBy: true,
                };

                this.studentApiService.saveDocumentDetails(doc).subscribe({
                  next: (response: { success: boolean; message: any }) => {
                    if (response.success) {
                      console.log(response.success, "success");
                    } else {
                    }
                  },
                  error: (error) => {},
                });
              } catch (e) {
                console.log(e);
              }
            });
          }
        },
        error: (error) => {
          console.error("Error uploading documents:", error);
        },
      });
    } else {
      console.log("No files selected.");
    }
  }

  // fields: any[] = [{ id: 1 }];

  // fields: { skillType: string; skills: string[] }[] = [
  //   {
  //     skillType: "",
  //     skills: [],
  //   },
  // ];
  createSkillFormControl(): FormGroup {
    return this.fb.group({
      skillType: new FormControl(""), // Form control for requiredItem
      skills: new FormControl([]), // Form control for description
    });
  }
  addField() {
    // Add a new FormGroup to the FormArray
    // const newField = this.fb.group({
    //   skillType: "", // Skill Type initially empty
    //   skills: [], // Empty skill list for the new field
    // });
    // this.fields.push(newField); // Push the new field to the form array

    // this.fields.push({
    //   skillType: "", // Skill Type initially empty
    //   skills: [], // Empty skill list for the new field
    // });

    this.fields.push(this.createSkillFormControl());

    // this.fields.push({ id: this.fields.length + 1 });
  }

  removeField(index: number) {
    if (index >= 0 && this.fields.length > 0) {
      this.fields.removeAt(index);
    }
  }

  async onSubmit() {
    //   const studentProfile: Partial<PostTblstudent> =
    //     this.studentProfileForm.value;
    //   const isUpdate = !!this.Id;
    //   const actionText = isUpdate ? "update" : "add";
    //   const confirmed = await this.sweetAlertService.confirm(
    //     `Do you want to ${actionText} your Profile?`
    //   );
    //   if (confirmed) {
    //     const studentProfileData: PostTblstudent = {
    //       Id: this.sessionStudentId ?? 0,
    //       // OrgId: studentProfile.OrgId ?? 0,
    //       FirstName: studentProfile.FirstName ?? "",
    //       MiddleName: studentProfile.MiddleName ?? "",
    //       LastName: studentProfile.LastName ?? "",
    //       BatchId: studentProfile.BatchId ?? 0,
    //       AadharCardNumber: studentProfile.AadharCardNumber ?? "",
    //       PermanentAddress: studentProfile.PermanentAddress ?? "",
    //       CurrentAddress: studentProfile.CurrentAddress ?? "",
    //       Email: studentProfile.Email ?? "",
    //       PhoneNumber: studentProfile.PhoneNumber ?? "",
    //       FatherName: studentProfile.FatherName ?? "",
    //       FatherPhoneNumber: studentProfile.FatherPhoneNumber ?? "",
    //       MotherName: studentProfile.MotherName ?? "",
    //       MotherPhoneNumber: studentProfile.MotherPhoneNumber ?? "",
    //       DateOfBirth: studentProfile.DateOfBirth ?? null,
    //       RollNo: studentProfile.RollNo ?? "",
    //       BloodGroup: studentProfile.BloodGroup ?? "",
    //       Pannumber: studentProfile.Pannumber ?? "",
    //       skills: studentProfile.skills ?? "",
    //       Batch: {
    //         Id: studentProfile.Batch?.Id ?? 0,
    //         Name: studentProfile.Batch?.Name ?? "",
    //       },
    //       Studentacademics: {
    //         StudentId: this.sessionStudentId ?? 0,
    //         CourseId: studentProfile.Studentacademics?.CourseId ?? 0,
    //         StreamId: studentProfile.Studentacademics?.StreamId ?? 0,
    //         Cgpa: studentProfile.Studentacademics?.Cgpa ?? 0,
    //         TenthMarks: studentProfile.Studentacademics?.TenthMarks ?? 0,
    //         TwelthMarks: studentProfile.Studentacademics?.TwelthMarks ?? 0,
    //         TenthBoard: studentProfile.Studentacademics?.TenthBoard ?? "",
    //         TwelthBoard: studentProfile.Studentacademics?.TwelthBoard ?? "",
    //         TenthPassedOutYear:
    //           studentProfile.Studentacademics?.TenthPassedOutYear ?? 0,
    //         TwelthPassedOutYear:
    //           studentProfile.Studentacademics?.TwelthPassedOutYear ?? 0,
    //         TenthSchoolName:
    //           studentProfile.Studentacademics?.TenthSchoolName ?? "",
    //         TwelthSchoolName:
    //           studentProfile.Studentacademics?.TwelthSchoolName ?? "",
    //         DiplomaCollegeName:
    //           studentProfile.Studentacademics?.DiplomaCollegeName ?? "",
    //         StudentSemesterMarks:
    //           studentProfile.Studentacademics?.StudentSemesterMarks?.map(
    //             (mark) => ({
    //               StudentAcademicId: mark.StudentAcademicId ?? 0,
    //               Semester: mark.Semester ?? 0,
    //               Sgpa: mark.Sgpa ?? 0.0,
    //             })
    //           ) ?? [],
    //       },
    //       StudentSkills:
    //         studentProfile.StudentSkills?.map((skill) => ({
    //           SkillId: skill.SkillId ?? 0,
    //           StudentId: this.sessionStudentId ?? 0,
    //         })) ?? [],
    //     };
    //     try {
    //       if (isUpdate) {
    //         await this.studentApiService.addUpdateCompany(
    //           this.Id,
    //           studentProfileData
    //         );
    //       } else {
    //         await this.studentApiService.addUpdateCompany(
    //           this.Id,
    //           studentProfileData
    //         );
    //       }
    //       this.sweetAlertService.success(
    //         `${
    //           actionText.charAt(0).toUpperCase() + actionText.slice(1)
    //         } successful!`
    //       );
    //     } catch (error) {
    //       this.sweetAlertService.error(
    //         "An error occurred while saving the profile. Please try again."
    //       );
    //     }
    //   }
  }

  // get selectedSkillTypes(): string {
  //   const selected = this.SkillTypeControl.value;

  //   return Array.isArray(selected) ? selected.join(', ') : '';
  // }

  // resetSkillTypeSelection() {
  //   this.SkillTypeControl.reset();
  //   this.searchSkillType = '';
  //   this.filteredSkillTypes = this.SkillTypes();
  //   this.dataSource1.data = this.filteredSkillTypes;
  // }

  // showLocationResults() {
  //   const selectedCities = this.SkillTypeControl.value;
  //   if (selectedCities && selectedCities.length > 0) {
  //     this.filteredSkillTypes = this.SkillTypes().filter((skill) =>
  //       selectedCities.includes(skill.Name)
  //     );
  //   } else {
  //     this.filteredSkillTypes = this.SkillTypes();
  //   }

  //   this.dataSource1.data = this.filteredSkillTypes;
  // }

  // filterSkillTypes(search: string) {
  //   const filterValue = search.toLowerCase();

  //   const filteredList = this.SkillTypes().filter(
  //     (skill) =>
  //       skill && skill.Name && skill.Name.toLowerCase().includes(filterValue)
  //   );

  //   const selectedSkillTypes = this.SkillTypeControl.value || [];
  //   this.filteredSkillTypes = [
  //     ...selectedSkillTypes
  //       .map((name: any) =>
  //         this.SkillTypes().find((skill) => skill && skill.Name === name)
  //       )
  //       .filter(Boolean),
  //     ...filteredList.filter(
  //       (skill) => skill && !selectedSkillTypes.includes(skill.Name)
  //     ),
  //   ];
  // }

  // onSkillTypeDropdownOpen() {
  //   this.filterSkillTypes(this.searchSkillType);
  // }

  onProfilePhotoSelected(event: any): void {
    this.selectedProfilePhoto = Array.from(event.target.files);
  }
  uploadDegreeCertificate(DegreeFile: any, fileType: string) {
    debugger;
    const formData = new FormData();
    formData.append("files", DegreeFile);

    this.studentApiService.uploadDocument(formData).subscribe({
      next: (response) => {
        if (response.success && response.files) {
          response.files.flatMap((f: any) => {
            try {
              const doc = {
                id: 0,
                fileName: f.fileName,
                filePath: f.filePath,
                fileType: fileType,
                parentType: "student",
                parentId: this.Id,
                isDeleted: true,
                createdDate: DateTime.now(),
                createdBy: true,
              };

              this.studentApiService.saveDocumentDetails(doc).subscribe({
                next: (response: { success: boolean; message: any }) => {
                  if (response.success) {
                    console.log(response.success, "success");
                  } else {
                  }
                },
                error: (error) => {},
              });
            } catch (e) {
              console.log(e);
            }
          });
        }
      },
      error: (error) => {
        console.error("Error uploading documents:", error);
      },
    });
  }
}
