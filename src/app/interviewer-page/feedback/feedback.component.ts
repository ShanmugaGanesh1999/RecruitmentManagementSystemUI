import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  updateFeedback: boolean = false;
  closedFeedback: boolean = false;
  feedback = new FormControl('');
  feedbackForm: FormGroup;
  ratingSlider = new FormControl('');
  email: string = '';
  intrId: string = '';
  intData: any;
  constructor(
    public dialogRef: MatDialogRef<FeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
  ) {
    this.feedbackForm = new FormGroup({
      feedback: this.feedback,
      ratingSlider: this.ratingSlider,
    });
  }

  ngOnInit(): void {
    this.getDetails(this.data);
    if (this.data[0].status === 'Pending...') {
      this.closedFeedback = true;
    }
  }

  getDetails(data: any) {
    this.appService.loadingEnable = true;
    this.intData = data[0];
    this.email = data[1];
    this.appService.getInterviewerIdByEmailId(this.email).subscribe(
      (data: any) => {
        this.intrId = data.interviewerEmailId;
        this.appService
          .getFeedbackByIntAndIntrId(this.intData._id, this.intrId)
          .subscribe(
            (data: any) => {
              if (data.data !== null) {
                this.updateFeedback = true;
                this.feedback.setValue(data.data.feedback);
                this.ratingSlider.setValue(data.data.rating);
                alert('Feedback already written!!');
              }
            },
            (err) => console.log(err)
          );
      },
      (err) => console.log(err)
    );
    this.appService.loadingEnable = false;
  }

  onSubmit() {
    this.appService.loadingEnable = true;
    let params = {
      interviewId: this.intData._id,
      interviewerId: this.intrId,
      feedback: this.feedback.value,
      rating: this.ratingSlider.value,
    };
    if (!this.updateFeedback) {
      this.appService.createFeedback(params).subscribe(
        (data: any) => {
          window.location.reload();
          alert('Feedback registed successfully!');
        },
        (err) => console.log(err)
      );
    } else {
      this.appService.updateFeedbackByintIdAndIntrId(params).subscribe(
        (data: any) => {
          alert('Feedback updated successfully!!');
        },
        (err) => console.log(err)
      );
    }
    this.appService.loadingEnable = false;
  }
}
