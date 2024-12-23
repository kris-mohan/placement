import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private refreshGroupsSource = new Subject<void>();
  refreshGroups$ = this.refreshGroupsSource.asObservable();

  // Method to trigger refresh
  triggerGroupRefresh() {
    this.refreshGroupsSource.next();
  }
}
