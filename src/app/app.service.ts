import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}
  loadingEnable = false;
  comUrl = 'common/';
  intrUrl = 'interviewer/';
  feedUrl = 'feedback/';
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('x-access-token', this.token + '');
  emailVerify(email: any) {
    return this.httpClient.post(this.comUrl + `emailOtp?emailId=${email}`, {});
  }

  otpVerify(otp: any) {
    return this.httpClient.post(this.comUrl + `verifyOtp?otp=${otp}`, {});
  }

  createIntr(params: any) {
    return this.httpClient.post(this.intrUrl + `createInterviewer`, {
      name: params.name,
      emailId: params.email,
      password: params.pwd,
    });
  }
  getFeedbackByIntAndIntrId(intId: any, intrId: any) {
    return this.httpClient.get(
      this.feedUrl +
        `getFeedbackByIntAndIntrId/?intId=${intId}&intrId=${intrId}`,
      { headers: this.headers }
    );
  }

  updateFeedbackByintIdAndIntrId(params: any) {
    return this.httpClient.put(
      this.feedUrl + `updateFeedbackByintIdAndIntrId`,
      {
        interviewId: params.interviewId,
        interviewerId: params.interviewerId,
        feedback: params.feedback,
        rating: params.rating,
      },
      { headers: this.headers }
    );
  }

  createFeedback(params: any) {
    return this.httpClient.post(
      this.feedUrl + `createFeedback`,
      {
        interviewId: params.interviewId,
        interviewerId: params.interviewerId,
        feedback: params.feedback,
        rating: params.rating,
      },
      { headers: this.headers }
    );
  }

  forgotPwd(email: any) {
    return this.httpClient.post(this.comUrl + `forgotPwd?emailId=${email}`, {});
  }

  resetPwd(email: any, pwd: any) {
    return this.httpClient.post(
      this.intrUrl + `resetPwd?emailId=${email}&pwd=${pwd}`,
      {}
    );
  }

  getInterviewerIdByEmailId(email: any) {
    return this.httpClient.post(
      this.intrUrl + `getDetailsByInterviewerEmailId`,
      { emailId: email },
      { headers: this.headers }
    );
  }
}
