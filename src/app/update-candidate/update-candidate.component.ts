import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HrPageService } from '../hr-page/hr-page.service';

@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.css'],
})
export class UpdateCandidateComponent implements OnInit {
  feedbackForm: FormGroup;
  rating: Number = 0;
  candidateId: String = '';
  message: String = '';
  candidateEmailId: String = '';
  status: String = '';
  ratingSlider = new FormControl('');
  feedbackList: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<UpdateCandidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hrPageService: HrPageService
  ) {
    this.feedbackForm = new FormGroup({
      ratingSlider: this.ratingSlider,
    });
  }

  ngOnInit(): void {
    this.candidateEmailId = this.data.intr.details.emailId;
    this.candidateId = this.data.intr.details.candidateId;
    this.status = this.data.intr.details.status;
    this.hrPageService.getFeedbackByIntId(this.data.intr.details._id).subscribe(
      (data: any) => {
        let feed = data.data[0].feedbacks,
          count = data.data[0].count,
          avg = 0,
          tot = 0,
          feedArr = [];
        for (let i of feed) {
          tot += i.rating;
          feedArr.push([i.feedback, i.name]);
        }
        avg = Number((tot / count).toFixed(2));
        this.ratingSlider.setValue(avg);
        this.rating = avg;
        this.feedbackList = feedArr;
      },
      (err) => console.log(err)
    );
  }
  onSelect() {
    console.log(this.rating);
    this.message =
      `<h2>Congratulations!</h2><br> You are selected for the next round.<br>` +
      `<p>Your interview Feedbacks :</p>
      ${feedStr(this.feedbackList)}` +
      '<span>Your interview avg. rating :</span> ' +
      this.rating +
      `<br>` +
      `<p>For the next round HR will intimate you soon!</p>` +
      `<br><span>From </span>` +
      `<span>Augusta Hitech Software Solution</span>` +
      `<a href='#'>Augusta Hitech Software Solution</a>`;

    if (this.status === 'Finished') {
      this.hrPageService
        .updateCandidateStatusById(this.candidateId, 'Selected')
        .subscribe(
          (data: any) => {
            this.hrPageService
              .sendMail(this.candidateEmailId, this.message)
              .subscribe(
                (data: any) => {
                  console.log(data);
                },
                (err) => console.log(err)
              );
            alert('Mailed candidate regarding his/her result: Selected!');
            window.location.reload();
          },
          (err) => console.log(err)
        );
    } else {
      alert('This feature is not available!');
    }
  }
  onReject() {
    this.message =
      `<h2>Sorry!</h2><br> You are not selected, Try next time.<br>` +
      `<p>Your interview Feedbacks :</p>
      ${feedStr(this.feedbackList)}` +
      '<span>Your interview avg. rating :</span> ' +
      this.rating +
      `<br>` +
      `<p>For the next round HR will intimate you soon!</p>` +
      `<br><span>From </span>` +
      `<span>Augusta Hitech Software Solution</span>` +
      `<a href='#'>Augusta Hitech Software Solution</a>`;

    if (this.status === 'Finished') {
      this.hrPageService
        .updateCandidateStatusById(this.candidateId, 'Rejected')
        .subscribe(
          (data: any) => {
            this.hrPageService
              .sendMail(this.candidateEmailId, this.message)
              .subscribe(
                (data: any) => {
                  console.log(data);
                },
                (err) => console.log(err)
              );
            alert('Mailed candidate regarding his/her result: Rejected!');
            window.location.reload();
          },
          (err) => console.log(err)
        );
    } else {
      alert('This feature is not available!');
    }
  }
}

function feedStr(arr: any) {
  let str = '<ul>';
  for (let i of arr) {
    str += `<li>` + i[0] + '</li>';
  }
  return str + '</ul>';
}
