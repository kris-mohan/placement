import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { DialogMessageComponent } from "./dialog-message.component";

@Injectable({
  providedIn: "root",
})
export class DialogMessageService {
  constructor(private dialog: MatDialog) {}

  confirm(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      width: "auto",
      data: { message },
    });

    return dialogRef.afterClosed();
  }
}
