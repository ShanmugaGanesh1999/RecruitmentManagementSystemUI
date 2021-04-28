import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InterviewerPageService {
  constructor(private httpClient: HttpClient) {}
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('x-access-token', this.token + '');
  baseInterviewerURL = 'http://localhost:8080/interviewer/';
  baseInterviewURL = 'http://localhost:8080/interview/';

  getDetailsByInterviewerEmailId(params: any) {
    // console.log(params);
    return this.httpClient.post(
      this.baseInterviewerURL + 'getDetailsByInterviewerEmailId',
      { emailId: params },
      { headers: this.headers }
    );
  }

  getDetailsByInterviewerId(params: any) {
    // console.log(params.limit);
    return this.httpClient.post(
      this.baseInterviewURL + 'getDetailsByInterviewerId',
      {
        interviewerId: params.id,
        skip: params.skip,
        searchText: params.searchText,
        limit: params.limit,
      },
      { headers: this.headers }
    );
  }
}
