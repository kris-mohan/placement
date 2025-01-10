import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMeetingLinkComponent } from './send-meeting-link.component';

describe('SendMeetingLinkComponent', () => {
  let component: SendMeetingLinkComponent;
  let fixture: ComponentFixture<SendMeetingLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMeetingLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMeetingLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
