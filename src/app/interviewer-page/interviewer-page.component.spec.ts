import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerPageComponent } from './interviewer-page.component';

describe('InterviewerPageComponent', () => {
  let component: InterviewerPageComponent;
  let fixture: ComponentFixture<InterviewerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
