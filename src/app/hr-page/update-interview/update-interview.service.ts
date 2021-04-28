import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateInterviewService {
  constructor(private httpClient: HttpClient) {}
  baseSendMailURL = 'http://localhost:8080/common/';

  updateInterviewDetails(params: any) {
    console.log(params);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.post(
      this.baseSendMailURL + 'updateInterviewDetails',
      {
        name: params.cname,
        emailId: params.emailId,
        // interviewersName: params.interviewers,
        interviewerName: params.interviewerName,
        interviewersEmailId: params.interviewersEmailId,
        meetLink: params.meetLink,
        date: params.date,
        time: params.time,
        shortLink: params.shortLink,
      },
      { headers: headers }
    );
  }
}
