import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddCandidateService {
  constructor(private httpClient: HttpClient) {}
  baseCandidateURL = 'http://localhost:8080/candidates/';
  baseInterviewerURL = 'http://localhost:8080/interviewer/';
  baseInterviewURL = 'http://localhost:8080/interview/';
  baseSendMailURL = 'http://localhost:8080/common/';
  baseFileLinkUrl = 'https://file.io';

  createCandidate(params: any) {
    console.log(params);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.post(
      this.baseCandidateURL + 'createCandidate',
      {
        name: params.cname,
        emailId: params.emailId,
        mobileNo: params.mobileNo,
        organization: params.organization,
        domain: params.domain,
        resume: params.shortLink,
      },
      { headers: headers }
    );
  }

  getInterviewByInterviewerEmailId(params: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.post(
      this.baseInterviewerURL + 'getInterviewByInterviewerEmailId',
      {
        emailId: params.interviewersEmailId,
        name: params.interviewers,
      },
      { headers: headers }
    );
  }

  createInterview(params: any) {
    console.log(params);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.post(
      this.baseInterviewURL + 'createInterview',
      {
        interviewerId: params.interEmailId,
        candidateId: params.candiId,
        meetLink: params.meetLink,
        timing: params.dateTime,
      },
      { headers: headers }
    );
  }

  sendMail(params: any) {
    console.log(params);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.post(
      this.baseSendMailURL + 'sendMail',
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

  getAllInterviewers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.get(this.baseInterviewerURL + 'getAllInterviewers', {
      headers: headers,
    });
  }

  upload(file: any): Observable<any> {
    const form = new FormData();
    form.append('file', file, file.name);
    console.log(form);
    return this.httpClient.post(this.baseFileLinkUrl, form);
  }

  updateCandidate(params: any) {
    console.log(params);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.put(
      this.baseCandidateURL + 'updateCandidateById',
      {
        id: params.id,
        name: params.cname,
        emailId: params.emailId,
        mobileNo: params.mobileNo,
        organization: params.organization,
        domain: params.domain,
        resume: params.resume,
      },
      { headers: headers }
    );
  }

  updateInterview(params: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token + '');
    return this.httpClient.put(
      this.baseInterviewURL + 'updateInterviewById',
      {
        id: params.id,
        meetLink: params.meetLink,
        timing: params.timing,
        interviewerId: params.interviewerId,
        candidateId: params.candidateId,
      },
      { headers: headers }
    );
  }
}
