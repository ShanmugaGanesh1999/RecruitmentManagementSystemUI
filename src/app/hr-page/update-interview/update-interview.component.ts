import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { AddCandidateComponent } from '../add-candidate/add-candidate.component';
import { UpdateInterviewService } from './update-interview.service';

@Component({
  selector: 'app-update-interview',
  templateUrl: './update-interview.component.html',
  styleUrls: ['./update-interview.component.css'],
})
export class UpdateInterviewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddCandidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private updateInterviewService: UpdateInterviewService,
    private appService: AppService
  ) {}

  ngOnInit(): void {}

  onClickYes() {
    this.appService.loadingEnable = true;

    this.updateInterviewService
      .updateInterviewDetails({
        cname: this.data.candidateDetails.name,
        emailId: this.data.candidateDetails.emailId,
        interviewerName: this.data.interviewersName,
        interviewersEmailId: this.data.interviewersEmail,
        meetLink: this.data.meetLink,
        date: this.data.date,
        time: this.data.time,
        shortLink: this.data.candidateDetails.resume,
      })
      .subscribe(
        (data: any) => {
          //console.log(data);
          alert('Email sent successfully');
          this.appService.loadingEnable = false;
          location.reload();
        },
        (error: any) => {
          //console.log(error);
        }
      );
  }
  onClickNo() {
    location.reload();
  }
}
