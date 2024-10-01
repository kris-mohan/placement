import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<string[]>([]);
  private notificationCountSubject = new BehaviorSubject<number>(0);

  notifications$ = this.notificationsSubject.asObservable();
  notificationCount$ = this.notificationCountSubject.asObservable();

  addNotification(componentName: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = [...currentNotifications, componentName];
    this.notificationsSubject.next(updatedNotifications);
    this.notificationCountSubject.next(updatedNotifications.length);
  }

  clearNotifications(): void {
    this.notificationsSubject.next([]);
    this.notificationCountSubject.next(0);
  }
}
