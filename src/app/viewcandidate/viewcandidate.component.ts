import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { ViewcandidateService } from './viewcandidate.service';

@Component({
  selector: 'app-viewcandidate',
  templateUrl: './viewcandidate.component.html',
  styleUrls: ['./viewcandidate.component.css'],
})
export class ViewcandidateComponent implements OnInit {
  candidateDetails: any = [];
  interviewDetails: any = [];
  interviewers: any = [];
  interviewersName: any = [];
  interviewersEmail: any = [];

  constructor(
    public dialogRef: MatDialogRef<ViewcandidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public viewcandidateservice: ViewcandidateService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getDetails(this.data);
    }, 0);
  }

  getDetails(data: any) {
    this.appService.loadingEnable = true;
    this.viewcandidateservice.getCandidateById(data).subscribe(
      (result: any) => {
        this.candidateDetails = result.data[0];
        this.viewcandidateservice.getInterviewByCandidateId(data).subscribe(
          (details: any) => {
            this.interviewDetails = details.data;
            this.interviewers = details.data.interviewerId;
            this.getInterviewerDetails(this.interviewers);
          },
          (error) => {
            alert("Can't fetch details of interview");
          }
        );
      },
      (error) => {
        alert("Can't fetch details of candidate");
      }
    );
  }

  getInterviewerDetails(interviewers: any) {
    for (let i = 0; i < interviewers.length; i++) {
      this.viewcandidateservice.getInterviewerById(interviewers[i]).subscribe(
        (result: any) => {
          this.interviewersName.push(result.data[0].name);
          this.interviewersEmail.push(result.data[0].emailId);
          this.appService.loadingEnable = false;
        },
        (error: any) => {
          alert("Can't fetch details of interviewer");
        }
      );
    }
  }
}
