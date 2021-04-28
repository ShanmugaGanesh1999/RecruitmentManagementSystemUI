import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailId = new FormControl(
    '',
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  );
  password = new FormControl('');

  loginForm: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private appService: AppService
  ) {
    this.loginForm = new FormGroup({
      emailId: this.emailId,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(SignupComponent, {
      panelClass: 'main-background',
    });
  }

  onClickLogin() {
    this.appService.loadingEnable = true;
    var emailId = this.emailId.value;
    var password = this.password.value;
    // console.log('email', emailId, 'password', password);
    if (emailId !== '' && password !== '') {
      this.loginService.loginApi(emailId, password).subscribe(
        (data: any) => {
          this.appService.loadingEnable = false;
          // console.log('data', JSON.stringify(data));
          localStorage.setItem('token', data.token);
          if (emailId === 'hr.augusta@gmail.com' && password === 'Admin') {
            localStorage.setItem('who', 'Hr');
            this.router.navigate(['hr-page'], {
              queryParams: { emailId: data.data.emailId },
            });
          } else {
            localStorage.setItem('who', 'Intr');
            this.router.navigate(['interviewer-page'], {
              queryParams: { emailId: data.data.emailId },
            });
          }
          alert('Logged in successfully.');
        },
        (error: any) => {
          console.log(error.message);
          this.appService.loadingEnable = false;
          alert('Invalid emailId or password');
        }
      );
    } else {
      alert('Enter email and password');
    }
  }

  openForgot() {
    this.dialog.open(ForgotPasswordComponent);
  }
  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.onClickLogin();
    }
  }
}
