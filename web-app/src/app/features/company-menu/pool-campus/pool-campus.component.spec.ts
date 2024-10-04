import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolCampusComponent } from './pool-campus.component';

describe('PoolCampusComponent', () => {
  let component: PoolCampusComponent;
  let fixture: ComponentFixture<PoolCampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoolCampusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
