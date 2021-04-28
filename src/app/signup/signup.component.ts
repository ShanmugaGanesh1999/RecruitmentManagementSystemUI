import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { SignUpOtpComponent } from '../sign-up-otp/sign-up-otp.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name = new FormControl('');
  emailId = new FormControl('');
  password = new FormControl('');
  allowEmailDomain = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'mailfence.com',
    'protonmail.com',
    'hotmail.com',
    'icloud.com',
    'augustahitech.com',
    'augustasofsol.com',
    'fastmail.com',
    'tutanota.com',
    'posteo.net',
    'startmail.com',
    'gmx.com',
  ];
  mailAllowed: boolean = false;

  signUpForm: FormGroup;

  constructor(private dialog: MatDialog, private appService: AppService) {
    this.signUpForm = new FormGroup({
      name: this.name,
      emailId: this.emailId,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  openDialog() {
    let email = this.emailId.value;

    if (email) {
      let mail = email.split('@')[1];
      for (let i of this.allowEmailDomain) {
        if (mail === i) {
          this.mailAllowed = true;
        }
      }

      if (this.mailAllowed) {
        let name = this.name.value;
        let password = this.password.value;

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        this.appService.emailVerify(email).subscribe(
          (data: any) => {
            alert(`Your OTP is mailed to ${email}`);
            // console.log(data);
          },
          (err) => {
            // console.log(err);
            alert('Error occured while mailing to your MailId');
          }
        );
        this.dialog.open(SignUpOtpComponent, {
          panelClass: 'main-background',
        });
      } else {
        alert('Enter authorised mailId');
      }
    } else {
      alert('Enter email');
    }
  }
  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.openDialog();
    }
  }
}
