import Swal from "sweetalert2";

export function SuccessNotification(message: string) {
  Swal.fire({
    title: "",
    text: message,
    icon: "success",
    confirmButtonText: "Ok",
  });
}

export function ErrorNotification(message: string) {
  Swal.fire({
    title: "",
    text: message,
    icon: "error",
    confirmButtonText: "Ok",
  });
}

export function InfoNotification(message: string) {
  Swal.fire({
    title: "",
    text: message,
    icon: "info",
    confirmButtonText: "Ok",
  });
}

export function ConfirmDeletion(message: string, onConfirm: any) {
  Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
}

export function ConfirmDeletionTimesheetHours(
  message: string,
  onConfirm: any,
  onCancel: any
) {
  Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
}
