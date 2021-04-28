import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HrPageComponent } from './hr-page/hr-page.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddCandidateComponent } from './hr-page/add-candidate/add-candidate.component';
import { AlertsModule } from 'angular-alert-module';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { SignUpOtpComponent } from './sign-up-otp/sign-up-otp.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFileUploadModule } from 'mat-file-upload';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { OtpPwdComponent } from './login/forgot-password/otp-pwd/otp-pwd.component';
import { ViewcandidateComponent } from './viewcandidate/viewcandidate.component';
import { InterviewerPageComponent } from './interviewer-page/interviewer-page.component';
import { FeedbackComponent } from './interviewer-page/feedback/feedback.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';
import { AnalyticsComponent } from './hr-page/analytics/analytics.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatListModule } from '@angular/material/list';
import { UpdateInterviewComponent } from './hr-page/update-interview/update-interview.component';
@NgModule({
  declarations: [
    AppComponent,
    AddCandidateComponent,
    LoginComponent,
    HrPageComponent,
    SignupComponent,
    SignUpOtpComponent,
    ForgotPasswordComponent,
    OtpPwdComponent,
    ViewcandidateComponent,
    InterviewerPageComponent,
    FeedbackComponent,
    UpdateCandidateComponent,
    AnalyticsComponent,
    UpdateInterviewComponent,
  ],
  entryComponents: [
    SignupComponent,
    SignUpOtpComponent,
    ViewcandidateComponent,
    UpdateCandidateComponent,
    UpdateInterviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatCardModule,
    GoogleChartsModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatListModule,
    MatSliderModule,
    AlertsModule.forRoot(),
    MatFileUploadModule,
    MatPaginatorModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DatePipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
