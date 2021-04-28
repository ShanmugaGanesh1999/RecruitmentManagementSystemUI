import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-sign-up-otp',
  templateUrl: './sign-up-otp.component.html',
  styleUrls: ['./sign-up-otp.component.css'],
})
export class SignUpOtpComponent implements OnInit {
  otp = new FormControl('');

  signUpOtpForm: FormGroup;
  constructor(private appService: AppService) {
    this.signUpOtpForm = new FormGroup({
      otp: this.otp,
    });
  }

  ngOnInit(): void {}

  onVerifyOtp() {
    this.appService.loadingEnable = true;
    let otp = this.otp.value;
    if (otp) {
      this.appService.otpVerify(otp).subscribe(
        (data: any) => {
          this.appService.loadingEnable = false;
          if (data.data == 1) {
            this.appService.loadingEnable = true;
            alert(`Your OTP is verified`);
            let params = {
              name: localStorage.getItem('name'),
              email: localStorage.getItem('email'),
              pwd: localStorage.getItem('password'),
            };
            this.appService.createIntr(params).subscribe(
              (data: any) => {
                this.appService.loadingEnable = false;
                alert(`Your account is Activated!`);
              },
              (err: any) => {
                console.log(err);
                alert('Error occured when Creating Account!');
                this.appService.loadingEnable = false;
              }
            );
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('password');
          } else {
            this.appService.loadingEnable = false;
            alert(`Please enter correct OTP!`);
          }
        },
        (err: any) => {
          console.log(err);
          alert('Error occured when Checking OTP!');
          this.appService.loadingEnable = false;
        }
      );
    } else {
      this.appService.loadingEnable = false;
      alert('Enter OTP');
    }
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.onVerifyOtp();
    }
  }
}
