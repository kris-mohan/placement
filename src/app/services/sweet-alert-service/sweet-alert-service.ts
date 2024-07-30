import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class SweetAlertService {
  constructor() {}

  success(message: string) {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      confirmButtonText: "OK",
    });
  }

  error(message: string) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      confirmButtonText: "OK",
    });
  }

  warning(message: string) {
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: message,
      confirmButtonText: "OK",
    });
  }

  info(message: string) {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: message,
      confirmButtonText: "OK",
    });
  }

  confirmDelete(message: string): Promise<boolean> {
    return Swal.fire({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => result.isConfirmed);
  }
}
