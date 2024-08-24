import { Injectable } from "@angular/core";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { PDFWorker } from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "../../../assets/pdf.worker.min.mjs";

@Injectable({
  providedIn: "root",
})
export class PdfGenerateService {
  private pdfDoc: PDFDocumentProxy | null = null;

  constructor() {}

  loadPdf(url: string): Promise<PDFDocumentProxy> {
    const loadingTask = pdfjsLib.getDocument({ url });
    return loadingTask.promise
      .then((pdfDoc) => {
        this.pdfDoc = pdfDoc;
        return pdfDoc;
      })
      .catch((error) => {
        console.error("Error loading PDF:", error);
        throw error;
      });
  }

  getNumPages(): number {
    return this.pdfDoc ? this.pdfDoc.numPages : 0;
  }

  renderPage(pageNum: number, canvasId: string, scale: number = 1.5): void {
    if (!this.pdfDoc) return;

    this.pdfDoc
      .getPage(pageNum)
      .then((page: PDFPageProxy) => {
        const viewport = page.getViewport({ scale });
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const context = canvas.getContext("2d");

        if (context) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext);
        } else {
          console.error("Unable to get canvas context");
        }
      })
      .catch((error) => {
        console.error("Error rendering page:", error);
      });
  }
}
