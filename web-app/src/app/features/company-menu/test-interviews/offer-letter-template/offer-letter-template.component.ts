import { CommonModule } from "@angular/common";
import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import {
  getDocument,
  PDFDocumentProxy,
  PDFPageProxy,
  GlobalWorkerOptions,
} from "pdfjs-dist";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PdfViewerModule } from "ng2-pdf-viewer";
import * as pdfjsLib from "pdfjs-dist";
import { PdfGenerateService } from "src/app/services/pdf-generate-service/pdf-generate-service";

@Component({
  selector: "app-offer-letter-template",
  standalone: true,
  imports: [SharedModule, CommonModule, AMGModules, PdfViewerModule],
  templateUrl: "./offer-letter-template.component.html",
  styleUrl: "./offer-letter-template.component.css",
})
export class OfferLetterTemplateComponent {
  public currentPage: number = 1;
  public numPages: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pdfSrc: string },
    private dialogRef: MatDialogRef<OfferLetterTemplateComponent>,
    private pdfGenerateService: PdfGenerateService
  ) {}

  ngOnInit(): void {
    this.loadPdf();
  }

  private loadPdf(): void {
    this.pdfGenerateService
      .loadPdf(this.data.pdfSrc)
      .then((pdfDoc) => {
        this.numPages = pdfDoc.numPages;
        this.renderPage(this.currentPage);
      })
      .catch((error) => {
        console.error("Error loading PDF:", error);
      });
  }

  private renderPage(pageNum: number): void {
    this.pdfGenerateService.renderPage(pageNum, "pdf-canvas");
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.numPages) {
      this.currentPage++;
      this.renderPage(this.currentPage);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
