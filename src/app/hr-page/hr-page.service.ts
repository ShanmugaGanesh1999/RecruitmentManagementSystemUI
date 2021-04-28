import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HrPageService {
  constructor(private httpClient: HttpClient) {}

  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('x-access-token', this.token + '');

  baseInterviewURL = 'http://localhost:8080/interview/';
  baseInterviewerURL = 'http://localhost:8080/interviewer/';
  feedbackURL = 'http://localhost:8080/feedback/';
  candidatesURL = 'http://localhost:8080/candidates/';
  comUrl = 'http://localhost:8080/common/';

  getAllInterviewsByCandidates1() {
    return this.httpClient.get(
      this.baseInterviewURL + 'getAllInterviewsByCandidates1',
      { headers: this.headers }
    );
  }

  getAllInterviewsByCandidates(params: any) {
    return this.httpClient.get(
      this.baseInterviewURL +
        'getAllInterviewsByCandidates?skip=' +
        params.skip +
        '&limit=' +
        params.limit +
        '&searchText=' +
        params.searchText,
      { headers: this.headers }
    );
  }

  getFeedbackByIntId(intr: any) {
    return this.httpClient.get(
      this.feedbackURL + 'getFeedbackByIntId/?intId=' + intr,
      {
        headers: this.headers,
      }
    );
  }

  sendMail(email: any, msg: any) {
    return this.httpClient.post(
      this.comUrl + `notifyCandidate/?emailId=${email}&message=${msg}`,
      {},
      {
        headers: this.headers,
      }
    );
  }

  updateCandidateStatusById(intr: any, status: any) {
    return this.httpClient.put(
      this.candidatesURL + 'updateCandidateStatusById',
      {
        id: intr,
        status: status,
      },
      {
        headers: this.headers,
      }
    );
  }

  logout(params: any) {
    return this.httpClient.post(
      this.baseInterviewerURL + 'logout',
      { params },
      { headers: this.headers }
    );
  }
}
