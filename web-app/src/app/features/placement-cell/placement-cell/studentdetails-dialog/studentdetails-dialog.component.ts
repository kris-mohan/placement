import { Component, Inject, signal } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { MatTableDataSource } from "@angular/material/table";
import { Tblstudent } from "src/app/services/types/Tblstudent";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { StudentDetailsDialogApiService } from "./studentDetailsApiService";
import { Studentacademic } from "src/app/services/types/Studentacademic";
import { StudentSemesterMark } from "src/app/services/types/StudentSemesterMark";
import { StudentSkill } from "src/app/services/types/StudentSkill";
import { GetDate } from "src/app/core/helper/DateHelper";
import { CommonModule } from "@angular/common";
import { JobStatus } from "src/app/services/common-dropdowns/JobStatus";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";

@Component({
  selector: "app-studentdetails-dialog",
  standalone: true,
  imports: [AMGModules, CommonModule],
  templateUrl: "./studentdetails-dialog.component.html",
  styleUrl: "./studentdetails-dialog.component.css",
})
export class StudentdetailsDialogComponent {
  studentById: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) private studentId: number,
    private studentDetailsApiService: StudentDetailsDialogApiService,
    private dialog: MatDialog,
    private sweetAlertService: SweetAlertService
  ) {
    this.studentById = studentId;
  }
  studentData = signal<Tblstudent[]>([]);
  studentAcademicsData = signal<Studentacademic[]>([]);
  studentSemesterMarksData = signal<StudentSemesterMark[]>([]);
  JobStatus: string[] = JobStatus;
  studentSkillsData = new MatTableDataSource<{
    skillType: string;
    skills: string;
  }>([]);
  statusData = new MatTableDataSource<{
    companyName: string;
    status: string;
    interviewDate: string;
  }>([]);

  studentSemWiseMarksData = new MatTableDataSource<{
    id: number;
    semesterName: string;
    sgpa: number;
    actions: string;
    status?: string;
  }>();

  class12thMarksData = new MatTableDataSource<{
    id: number;
    semesterName: string;
    sgpa: number;
  }>();

  class10thMarksData = new MatTableDataSource<{
    id: number;
    semesterName: string;
    sgpa: number;
  }>();

  displayedSkillsColumns: string[] = ["skillType", "skills"];

  displayedStatusColumns: string[] = [
    "companyName",
    "jobRole",
    "status",
    "interviewDate",
  ];
  displayedSemesterColumns: string[] = [
    "semesterName",
    "sgpa",
    "actions",
    "document",
  ];
  fileUrl: string = "";
  fileType: string = ""; // This can be 'image' or 'pdf' based on the file type
  fileName: string = "";

  ngOnInit(): void {
    this.getStudentDetails();
    this.getStudentSkills();
    this.getstatusData();
    this.getSemesterData();
  }

  getStudentDetails = () => {
    this.studentDetailsApiService
      .GetStudentDetailsById(this.studentById)
      .subscribe({
        next: (response) => {
          const data: Tblstudent[] = response.value;
          console.log("Response Data", data);
          this.studentData.set(data);
          this.studentAcademicsData.set(data[0].Studentacademics);
          this.studentSemesterMarksData.set(
            this.studentAcademicsData()[0].StudentSemesterMarks
          );
          console.log(this.studentSemesterMarksData());
        },
        error: (error) => {
          console.error("Error fetching Student details:", error);
        },
      });
  };

  getStudentSkills = () => {
    this.studentDetailsApiService
      .GetStudentSkillsByStudentId(this.studentById)
      .subscribe({
        next: (response) => {
          const data: StudentSkill[] = response.value;
          const groupedData: { [key: string]: string[] } = {};
          data.forEach((item) => {
            const skillTypeName = item.Skill?.SkillType?.Name || "";
            const skillName = item.Skill?.Name || "";
            if (!groupedData[skillTypeName]) {
              groupedData[skillTypeName] = [];
            }
            groupedData[skillTypeName].push(skillName);
          });
          this.studentSkillsData.data = Object.keys(groupedData).map((key) => ({
            skillType: key,
            skills: groupedData[key].join(", "),
          }));
          console.log(this.studentSkillsData);
        },
        error: (error) => {
          console.error("Error fetching Student details:", error);
        },
      });
  };

  getstatusData = () => {
    this.studentDetailsApiService
      .GetCompanyDetails(this.studentById)
      .subscribe({
        next: (response) => {
          const formattedData = response.value.map((item: any) => {
            const driveDate = item.JobPosting?.DriveDate;
            const interviewDate = driveDate ? GetDate(new Date(driveDate)) : "";

            return {
              companyName: item.JobPosting?.Company?.Name || "",
              jobRole: item.JobPosting?.JobRole || "",
              status: item.Status?.Name || "",
              interviewDate,
            };
          });
          this.statusData.data = formattedData;
        },
        error: (error) => {
          console.error("Error fetching status data:", error);
        },
      });
  };
  getSemesterData = () => {
    this.studentDetailsApiService.GetSemesterData(this.studentById).subscribe({
      next: (response) => {
        console.log(response);
        const data = response.value.flatMap((item: any) =>
          (item.StudentSemesterMarks || []).map((mark: any) => ({
            id: mark.Id,
            semesterName: `Sem ${mark.Semester || 0}`,
            sgpa: mark.Sgpa || 0,
            actions: "",
            status: "",
          }))
        );
        console.log("Data Source:", this.studentSemWiseMarksData.data);
        let class12thDataSet = {
          id: response.value[0].Id,
          semesterName: "12th",
          sgpa: response.value[0].TwelthMarks,
          actions: "",
          status: "",
        };
        const class12thData: {
          id: number;
          semesterName: string;
          sgpa: number;
        }[] = [];
        class12thData.push(class12thDataSet);

        let class10thDataset = {
          id: response.value[0].Id,
          semesterName: "10th",
          sgpa: response.value[0].TenthMarks,
          actions: "",
        };
        const class10thData: {
          id: number;
          semesterName: string;
          sgpa: number;
        }[] = [];
        class10thData.push(class10thDataset);

        this.studentSemWiseMarksData.data = data;
        this.class12thMarksData.data = class12thData;
        this.class10thMarksData.data = class10thData;
        console.log("Mapped Semester Data:", data);
        console.log("class 12th marks Data:", class12thData);
        console.log("class 10th marks Data:", class10thData);
      },
      error: (error) => {
        console.error("Error fetching status data:", error);
      },
    });
  };

  getDocumentsFilePath = (id: number, tab: number) => {
    console.log(id);
    let parentType = "";
    const parentId = id;
    //change to dynamic
    if (tab === 1) {
      parentType = "std_sem_marks";
    } else if (tab === 2) {
      parentType = "std_academics_twelth";
    } else {
      parentType = "std_academics_tenth";
    }
    console.log(parentType, parentId);
    this.studentDetailsApiService
      .GetDocumentsFilePath(parentType, parentId)
      .subscribe({
        next: (response) => {
          const data = response.value;
          console.log(data);
          try {
            const filePath = data[0].FilePath; //change to dynamic
            this.getDocument(filePath);
          } catch {
            this.sweetAlertService.warning(
              "The selected document has not been uploaded."
            );
          }
        },
        error: (error) => {
          console.log(error);
          this.sweetAlertService.warning(
            "The selected document has not been uploaded."
          );
        },
      });
  };

  getDocument = (FilePath: string) => {
    this.studentDetailsApiService.openDocuments(FilePath).subscribe(
      (response: Blob) => {
        // Get the file content type (MIME type) from the response headers
        // const contentType = response.type;

        // Set a default MIME type if the extension is not recognized
        let contentType = "application/octet-stream";

        const fileName = FilePath.split("/").pop() || "";
        const fileExtension = fileName.split(".").pop()?.toLowerCase();

        // Set content type based on the file extension
        switch (fileExtension) {
          case "jpg":
          case "jpeg":
            contentType = "image/jpeg";
            break;
          case "png":
            contentType = "image/png";
            break;
          case "gif":
            contentType = "image/gif";
            break;
          case "pdf":
            contentType = "application/pdf";
            break;
          case "txt":
            contentType = "text/plain";
            break;
          // Add more cases here for other file types if necessary
          default:
            contentType = "application/octet-stream"; // Default to binary if unknown
            break;
        }

        // Create a URL for the file blob to display it
        const fileUrl = URL.createObjectURL(
          new Blob([response], { type: contentType })
        );
        console.log(fileUrl);
        console.log(contentType);
        const newTab = window.open();
        if (newTab) {
          // Check the MIME type and render it accordingly
          if (contentType.startsWith("image/")) {
            // If it's an image, use an <img> tag to render it
            newTab.document.write(`
            <html>
              <head><title>View Image</title></head>
              <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
                <img src="${fileUrl}" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
              </body>
            </html>
          `);
          } else if (contentType === "application/pdf") {
            // If it's a PDF, use an <embed> tag to display it
            newTab.document.write(`
            <html>
              <head><title>View PDF</title></head>
              <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
                <embed src="${fileUrl}" type="application/pdf" width="100%" height="100%" />
              </body>
            </html>
          `);
          } else {
            // For other file types, you can just display a message or treat them as "unknown"
            newTab.document.write(`
            <html>
              <head><title>Unknown File Type</title></head>
              <body>
                <p>Unable to display the file. Unsupported file type.</p>
              </body>
            </html>
          `);
          }
        }
        // Optionally, clean up the object URL after the file is viewed
        setTimeout(() => URL.revokeObjectURL(fileUrl), 10000);
        // this.fileUrl = fileUrl;
        // this.fileName = FilePath.split("/").pop() || "";

        // Determine file type based on MIME type
        // if (contentType.startsWith("image/")) {
        //   this.fileType = "image"; // It's an image file (JPEG, PNG, GIF, etc.)
        // } else if (contentType === "application/pdf") {
        //   this.fileType = "pdf"; // It's a PDF file
        // } else {
        //   this.fileType = "unknown"; // Unknown file type
        //   console.error("Unsupported file type:", contentType);
        // }
      },
      (error) => {
        console.error("Error downloading file:", error);
      }
    );
  };

  onApproveClick(sem: any): void {
    sem.status = "approved";
    console.log("Approved", sem);
    // alert(`Approved: ${sem.semesterName}, SGPA: ${sem.sgpa}`);
  }
  onRejectClick(sem: any): void {
    sem.status = "rejected";
    console.log("Rejected", sem);
    // alert(`Rejected: ${sem.semesterName}, SGPA: ${sem.sgpa}`);
  }
  // openDocumentInNewTab(documentUrl: string): void {
  //   if (documentUrl) {
  //     window.open(documentUrl, "_blank");
  //   } else {
  //     this.sweetAlertService.warning(
  //       "The selected document has not been uploaded."
  //     );
  //   }
  // }
}
