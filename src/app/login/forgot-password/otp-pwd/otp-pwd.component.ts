import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-otp-pwd',
  templateUrl: './otp-pwd.component.html',
  styleUrls: ['./otp-pwd.component.css'],
})
export class OtpPwdComponent implements OnInit {
  oneTimePwd = new FormControl('');
  password = new FormControl('');
  otpPassword: FormGroup;

  constructor(private appService: AppService) {
    this.otpPassword = new FormGroup({
      password: this.password,
      oneTimePwd: this.oneTimePwd,
    });
  }

  ngOnInit(): void {}
  openDialog() {
    this.appService.loadingEnable = true;
    let otp = this.oneTimePwd.value;
    let pwd = this.password.value;
    if (otp && pwd) {
      this.appService.otpVerify(otp).subscribe(
        (data: any) => {
          this.appService.loadingEnable = false;
          if (data.data == 1) {
            this.appService.loadingEnable = true;
            alert(`Your OTP is verified`);
            let mail = localStorage.getItem('email');
            this.appService.resetPwd(mail, pwd).subscribe(
              (data: any) => {
                this.appService.loadingEnable = false;
                alert(`Your account password is Updated!`);
                localStorage.removeItem('email');
              },
              (err: any) => {
                console.log(err);
                this.appService.loadingEnable = false;
              }
            );
          } else {
            this.appService.loadingEnable = false;
            alert(`Account password not updated!`);
          }
        },
        (err: any) => {
          console.log(err);
          alert(`Please enter correct OTP!`);
          this.appService.loadingEnable = false;
        }
      );
    } else {
      this.appService.loadingEnable = false;
      alert('Enter OTP and New password');
    }
  }
}
