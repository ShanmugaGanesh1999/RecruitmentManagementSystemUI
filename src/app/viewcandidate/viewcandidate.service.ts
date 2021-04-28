import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewcandidateService {
  constructor(private httpClient: HttpClient) {}

  getCandidateById(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      'http://localhost:8080/candidates/getCandidatesById?id=' + id,
      {
        headers: headers,
      }
    );
  }

  getInterviewByCandidateId(candidateId: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      'http://localhost:8080/interview/getInterviewByCandidateId?candidateId=' +
        candidateId,
      { headers: headers }
    );
  }

  getInterviewerById(interviewerId: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(
      'http://localhost:8080/interviewer/getInterviewerById?id=' +
        interviewerId,
      { headers: headers }
    );
  }
}
