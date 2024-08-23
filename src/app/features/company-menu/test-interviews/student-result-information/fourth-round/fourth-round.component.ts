import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { OfferLetterTemplateComponent } from "../../offer-letter-template/offer-letter-template.component";
import { APIService } from "src/app/services/api-services/api-services";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { HiringRound } from "../../../company-job-details/test-rounds/test-rounds-model";

@Component({
  selector: "app-fourth-round",
  standalone: true,
  imports: [SharedModule, AMGModules, CommonModule],
  templateUrl: "./fourth-round.component.html",
  styleUrls: ["./fourth-round.component.css"],
})
export class FourthRoundComponent {
  constructor(
    private dialoge: MatDialog,
    private apiHttpService: ApiHttpService
  ) {}
  @Input() round!: HiringRound;

  openOfferLetterDialog(): void {
    const url = "/Companydetail/singlePdf";
    this.apiHttpService.get(url, { responseType: "blob" }).subscribe({
      next: (pdfBlob: Blob) => {
        const blobUrl = URL.createObjectURL(pdfBlob);
        this.dialoge.open(OfferLetterTemplateComponent, {
          data: { pdfSrc: blobUrl },
          maxHeight: "100vh",
          maxWidth: "100vw",
          height: "100vh",
          width: "100vw",
        });
      },
      error: (error) => {
        console.error("Error fetching PDF Blob:", error);
      },
    });
  }
}
