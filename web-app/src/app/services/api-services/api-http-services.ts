import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApiHttpService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.API_URL;

  // Generic GET method
  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.baseUrl + url, { params });
  }

  // Generic POST method
  post<T>(url: string, body: any, options?: object): Observable<T> {
    return this.http.post<T>(url, body, options);
  }

  // Generic PUT method
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  // Generic PATCH method
  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(url, body);
  }

  // Generic DELETE method
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }

  // Method to download files
  downloadFile(url: string, fileType: string): Observable<Blob> {
    return this.http.get(url, { responseType: "blob" });
  }

  // Method to handle different file types
  downloadAsFile(url: string, fileName: string, fileType: string): void {
    this.downloadFile(url, fileType).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: fileType });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = fileName;
      link.click();
    });
  }

  public loginpost(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(url, data);
  }
}
