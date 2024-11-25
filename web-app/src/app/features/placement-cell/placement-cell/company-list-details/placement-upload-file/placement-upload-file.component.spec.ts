import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PlacementUploadFileComponent } from "./placement-upload-file.component";

describe("PlacementUploadFileComponent", () => {
  let component: PlacementUploadFileComponent;
  let fixture: ComponentFixture<PlacementUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementUploadFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlacementUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
