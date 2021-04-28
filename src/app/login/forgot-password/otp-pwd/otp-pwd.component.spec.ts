import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpPwdComponent } from './otp-pwd.component';

describe('OtpPwdComponent', () => {
  let component: OtpPwdComponent;
  let fixture: ComponentFixture<OtpPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
