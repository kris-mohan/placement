// tab.service.ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TabService {
  private activeTabIndexKey = "activeTabCompanyConfiguartionIndex";

  setActiveTab(index: number): void {
    sessionStorage.setItem(this.activeTabIndexKey, index.toString());
  }

  getActiveTab(): number {
    const index = sessionStorage.getItem(this.activeTabIndexKey);
    return index !== null ? +index : 0;
  }
}
