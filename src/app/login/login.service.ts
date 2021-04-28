import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}
  baseUrl = 'http://localhost:8080/interviewer/';

  loginApi(emailId: any, password: any) {
    return this.httpClient.post(this.baseUrl + 'login', {
      emailId: emailId,
      password: password,
    });
  }
}
