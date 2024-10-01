import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilemanagementDashboardComponent } from './profilemanagement-dashboard.component';

describe('ProfilemanagementDashboardComponent', () => {
  let component: ProfilemanagementDashboardComponent;
  let fixture: ComponentFixture<ProfilemanagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilemanagementDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilemanagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
