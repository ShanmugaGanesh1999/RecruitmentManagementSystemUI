import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { OtpPwdComponent } from './otp-pwd/otp-pwd.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('');
  forgotPassword: FormGroup;
  constructor(private appService: AppService, private dialog: MatDialog) {
    this.forgotPassword = new FormGroup({
      email: this.email,
    });
  }

  ngOnInit(): void {}

  onSendOtp() {
    this.appService.loadingEnable = true;
    let email = this.email.value;
    if (email) {
      this.appService.forgotPwd(email).subscribe(
        (data: any) => {
          localStorage.setItem('email', email);
          this.appService.loadingEnable = false;
          alert(`OTP has been sent to your mail:${email}`);
          this.dialog.open(OtpPwdComponent, {
            panelClass: 'main-background',
          });
        },
        (err) => console.log(err)
      );
    } else {
      alert('Please enter email');
    }
  }
}
