import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { AddCandidateService } from './add-candidate.service';
import { ViewcandidateService } from 'src/app/viewcandidate/viewcandidate.service';
import { DatePipe } from '@angular/common';
import { UpdateCandidateComponent } from 'src/app/update-candidate/update-candidate.component';
import { UpdateInterviewComponent } from '../update-interview/update-interview.component';

@Component({
  selector: 'app-add-candidate,date-pipe',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
})
export class AddCandidateComponent implements OnInit {
  submitted: boolean = false;
  addResume: boolean = false;
  shortLink: string = '';
  file: any;
  success: boolean = false;
  isEdit: any;
  candidateDetails: any = [];
  interviewDetails: any = [];
  interviewers: any = [];
  interviewersName: any = [];
  interviewersEmail: any = [];
  selected: any = [];
  resume: any;
  click = false;

  cname = new FormControl('');
  emailId = new FormControl('', [Validators.required, Validators.email]);
  mobileNo = new FormControl('');
  organization = new FormControl('');
  domain = new FormControl('');
  addCandidateForm: FormGroup;
  // interviewers = new FormControl();
  interviewersEmailId = new FormControl();
  meetLink = new FormControl();
  date = new FormControl();
  time = new FormControl();
  saveBtn: boolean = true;

  // interviewersList: string[] = ['Swetha', 'Karthik', 'Sriram', 'Giridhar'];
  // interviewersEmailIdList: string[] = [
  //   'swetha@gmail.com',
  //   'karthik@gmail.com',
  //   'harshenic@gmail.com',
  //   'harsheni.17cs@kct.ac.in',
  // ];
  interviewersEmailIdList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCandidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService,
    private addCandidateService: AddCandidateService,
    public viewcandidateservice: ViewcandidateService,
    private _fb: FormBuilder,
    public datepipe: DatePipe,
    private dialog: MatDialog
  ) {
    this.addCandidateForm = new FormGroup({
      cname: this.cname,
      emailId: this.emailId,
      mobileNo: this.mobileNo,
      organization: this.organization,
      domain: this.domain,
      // interviewers: this.interviewers,
      interviewersEmailId: this.interviewersEmailId,
      meetLink: this.meetLink,
      date: this.date,
      time: this.time,
    });

    this.getAllInterviewers();
  }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    //console.log(this.isEdit);
    if (this.isEdit === true) {
      this.cname.setValue(this.data.details.name);
      this.emailId.setValue(this.data.details.emailId);
      this.meetLink.setValue(this.data.details.meetLink);
      this.date.setValue(
        this.datepipe.transform(this.data.details.timing, 'yyyy-MM-dd')
      );
      this.time.setValue(
        this.datepipe.transform(this.data.details.timing, 'HH:mm')
      );
      this.getDetails(this.data.details.candidateId);
      this.interviewers = this.data.details.interviewerId;
    }
  }

  get f() {
    return this.addCandidateForm.controls;
  }

  onClickUpdateCandidate() {
    this.dialog.open(UpdateCandidateComponent, {
      data: {
        intr: this.data,
      },
      panelClass: 'main-background',
    });
  }
  onChange(event: any) {
    this.addResume = true;
    this.file = event.target.files[0];
    // this.onUpload();
  }

  onUpload() {
    // //console.log(this.file);
    this.addCandidateService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof event === 'object') {
          this.success = true;
          this.shortLink = event.link;
          //console.log('shortLink', this.shortLink);
          //console.log('event', event);
        }
      },
      (error: any) => {
        //console.log(error.message);
      }
    );
  }

  getAllInterviewers() {
    try {
      this.appService.loadingEnable = true;
      this.addCandidateService.getAllInterviewers().subscribe(
        (data: any) => {
          // //console.log(data.data);
          this.appService.loadingEnable = false;
          let count = data.count;
          let count1 = 0;
          for (let i = 0; i < count; i++) {
            if (data.data[i].emailId != 'hr.augusta@gmail.com') {
              this.interviewersEmailIdList.push(data.data[i].emailId);
              count1 += 1;
            }
            //console.log(data.data[i].emailId);
          }
        },
        (error) => {
          //console.log(error);
        }
      );
    } catch (error) {
      //console.log(error.message);
    }
  }

  onClickSave() {
    this.appService.loadingEnable = true;
    if (this.isEdit) {
      //console.log('edit');
      if (this.click === true) {
        this.resume = this.shortLink;
        //console.log(this.resume);
      } else {
        this.resume = this.candidateDetails.resume;
        //console.log(this.resume);
      }
      this.addCandidateService
        .updateCandidate({
          id: this.data.details.candidateId,
          cname: this.cname.value,
          emailId: this.emailId.value,
          mobileNo: this.mobileNo.value,
          organization: this.organization.value,
          domain: this.domain.value,
          resume: this.resume,
        })
        .subscribe(
          (data: any) => {
            this.interviewersEmailId = this.interviewersEmailId.value.toString();
            //console.log(this.interviewersEmailId);
            this.addCandidateService
              .getInterviewByInterviewerEmailId({
                interviewersEmailId: this.interviewersEmailId,
              })
              .subscribe(
                (data: any) => {
                  var interEmailId = data.interviewerId;
                  //console.log(interEmailId);
                  var dateAndTime = this.date.value + ' ' + this.time.value;
                  var timing = new Date(dateAndTime);
                  var dateTime = timing.toISOString();
                  this.addCandidateService
                    .updateInterview({
                      id: this.data.details._id,
                      meetLink: this.meetLink.value,
                      timing: dateTime,
                      interviewerId: interEmailId,
                      candidateId: this.data.details.candidateId,
                    })
                    .subscribe(
                      (data: any) => {
                        alert('Successfully updated!');
                        this.dialog.open(UpdateInterviewComponent, {
                          data: {
                            candidateDetails: this.candidateDetails,
                            meetLink: this.meetLink.value,
                            interviewersName: this.interviewersName,
                            interviewersEmail: this.interviewersEmail,
                            date: this.date.value,
                            time: this.time.value,
                          },
                          panelClass: 'main-background',
                        });
                        this.appService.loadingEnable = false;
                      },
                      (error: any) => {
                        //console.log(error.message);
                      }
                    );
                },
                (error: any) => {
                  //console.log(error.message);
                }
              );
          },
          (error: any) => {
            //console.log(error.message);
          }
        );
    } else {
      this.submitted = true;
      // stop here if form is invalid
      if (this.addCandidateForm.invalid || !this.addResume) {
        alert('Please enter all details');
        this.appService.loadingEnable = false;
        return;
      }
      if (this.success == false) {
        return;
      }
      // //console.log(
      //   'Name',
      //   this.cname.value,
      //   'emailId',
      //   this.emailId.value,
      //   'Mobile Number',
      //   this.mobileNo.value,
      //   'organization',
      //   this.organization.value,
      //   'domain',
      //   this.domain.value,
      //   'interviewers',
      //   // this.interviewers.value,
      //   // 'interviewersEmailId',
      //   this.interviewersEmailId.value,
      //   'meetLink',
      //   this.meetLink.value,
      //   'date',
      //   this.date.value,
      //   'time',
      //   this.time.value
      // );

      this.interviewersEmailId = this.interviewersEmailId.value.toString();
      // this.interviewers = this.interviewers.value.toString();
      this.addCandidateService
        .getInterviewByInterviewerEmailId({
          interviewersEmailId: this.interviewersEmailId,
          // interviewers: this.interviewers,
        })
        .subscribe(
          (data: any) => {
            //console.log('Data: ', data.interviewerId);
            var interEmailId = data.interviewerId;
            var interviewerName = data.interviewerName.toString();
            this.addCandidateService
              .createCandidate({
                cname: this.cname.value,
                emailId: this.emailId.value,
                mobileNo: this.mobileNo.value,
                organization: this.organization.value,
                domain: this.domain.value,
                shortLink: this.shortLink,
              })
              .subscribe(
                (data: any) => {
                  //console.log('Data: ', data.data._id);
                  var dateAndTime = this.date.value + ' ' + this.time.value;
                  var hours: any = moment(dateAndTime).hour(hours);
                  var hours: any = moment(dateAndTime).hour(hours).format('hh');
                  var minute: any = moment(dateAndTime).minutes(minutes);
                  var minutes: any = moment(dateAndTime)
                    .minutes(minute)
                    .format('mm');
                  hours = hours % 12 || 12;
                  var fixedTiming = hours + ':' + minutes;
                  var timing = new Date(dateAndTime);
                  var dateTime = timing.toISOString();
                  var AmPmTime: any = dateTime.replace(
                    /^[^:]*([0-2]\d).*$/,
                    '$1'
                  );
                  if (AmPmTime >= 18) {
                    var AmorPm = 'AM';
                  } else {
                    var AmorPm = 'PM';
                  }
                  var candiId = data.data._id;
                  var params = {
                    candiId: candiId,
                    interEmailId: interEmailId.toString(),
                    meetLink: this.meetLink.value,
                    dateTime: dateTime,
                  };
                  this.addCandidateService.createInterview(params).subscribe(
                    (data: any) => {
                      //console.log('Data: ', data);
                      this.addCandidateService
                        .sendMail({
                          cname: this.cname.value,
                          emailId: this.emailId.value,
                          candiId: candiId,
                          // interviewers: this.interviewers,
                          interviewerName: interviewerName,
                          interviewersEmailId: this.interviewersEmailId,
                          meetLink: this.meetLink.value,
                          date: this.date.value,
                          time: fixedTiming + ' ' + AmorPm,
                          shortLink: this.shortLink,
                        })
                        .subscribe(
                          (data: any) => {
                            //console.log(data);
                            alert('Email sent successfully');
                            location.reload();
                            this.appService.loadingEnable = false;
                          },
                          (error) => {
                            //console.log(error);
                          }
                        );
                    },
                    (error) => {
                      //console.log(error.message);
                    }
                  );
                },
                (error) => {
                  //console.log(error.message);
                  alert('Candidate already added');
                  this.appService.loadingEnable = false;
                }
              );
          },
          (error) => {
            //console.log(error.message);
          }
        );
    }
  }

  getDetails(data: any) {
    this.viewcandidateservice.getCandidateById(data).subscribe(
      (result: any) => {
        this.candidateDetails = result.data[0];
        this.organization.setValue(this.candidateDetails.organization);
        this.domain.setValue(this.candidateDetails.domain);
        this.mobileNo.setValue(this.candidateDetails.mobileNo);
        this.getInterviewerDetails(this.interviewers);
        if (
          this.candidateDetails.status == 'Finished' ||
          this.candidateDetails.status == 'Selected' ||
          this.candidateDetails.status == 'Rejected'
        ) {
          this.saveBtn = false;
        }
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
          this.selected = this.interviewersEmail;
        },
        (error: any) => {
          alert("Can't fetch details of interviewer");
        }
      );
    }
  }
}
