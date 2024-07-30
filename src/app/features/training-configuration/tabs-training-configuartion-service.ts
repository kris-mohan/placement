// tab.service.ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TabsTrainingConfigurationService {
  private activeTabIndexKey = "activeTabTrainingConfigIndex";

  setActiveTab(index: number): void {
    sessionStorage.setItem(this.activeTabIndexKey, index.toString());
  }

  getActiveTab(): number {
    const index = sessionStorage.getItem(this.activeTabIndexKey);
    return index !== null ? +index : 0;
  }
}
