import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AppService } from '../app.service';
import { HrPageService } from '../hr-page/hr-page.service';
import { ViewcandidateComponent } from '../viewcandidate/viewcandidate.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { InterviewerPageService } from './interviewer-page.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-interviewer-page',
  templateUrl: './interviewer-page.component.html',
  styleUrls: ['./interviewer-page.component.css'],
})
export class InterviewerPageComponent implements OnInit {
  interviewerSearchForm: FormGroup;
  searchInput = new FormControl('');
  searchTerm$ = new Subject<string>();
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pagePosition = 0;
  displayedColumns: string[] = [
    'name',
    'emailId',
    'meetLink',
    'timing',
    'status',
    'view',
  ];
  email: string = '';
  interEmailId: string = '';
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  constructor(
    private hrPageService: HrPageService,
    private router: Router,
    private dialog: MatDialog,
    public appService: AppService,
    private interviewerPageService: InterviewerPageService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['emailId'];
    });
    let token = localStorage.getItem('token'),
      who = localStorage.getItem('who');
    if (!token || who !== 'Intr') {
      this.router.navigate(['login']);
    }
    this.route.queryParams.subscribe((params) => {
      this.interEmailId = params['emailId'];
      this.getDetailsByInterviewerEmailId(this.interEmailId);
    });
    this.interviewerSearchForm = new FormGroup({
      searchInput: this.searchInput,
    });

    this.hrPageService
      .getAllInterviewsByCandidates1()
      .subscribe((data: any) => {
        for (let d of data.data) {
          this.hrPageService.getFeedbackByIntId(d._id).subscribe(
            (data1: any) => {
              // console.log(d.interviewerId.length, data1.data[0].count);
              if (data1.data[0] !== undefined) {
                if (
                  d.interviewerId.length == data1.data[0].count &&
                  d.status == 'Pending...'
                ) {
                  this.hrPageService
                    .updateCandidateStatusById(d.candidateId, 'Finished')
                    .subscribe(
                      (data2: any) => {
                        alert(
                          `Interview for Candidate: ${data2.data.name} was updated!`
                        );
                      },
                      (err) => console.log(err)
                    );
                }
              }
            },
            (err) => console.log(err)
          );
        }
      });
  }

  ngOnInit(): void {
    this.searchEventListener(this.searchTerm$);
  }

  getDetailsByInterviewerEmailId(interEmailId: any) {
    try {
      // this.appService.loadingEnable = true;
      this.interviewerPageService
        .getDetailsByInterviewerEmailId(interEmailId)
        .subscribe(
          (data: any) => {
            var id = data.interviewerEmailId;
            this.interviewerPageService
              .getDetailsByInterviewerId({
                searchText: this.searchInput.value
                  ? this.searchInput.value
                  : '',
                skip: this.pagePosition,
                limit: this.pageSize,
                id: id,
              })
              .subscribe(
                (data: any) => {
                  this.dataSource = new MatTableDataSource<PeriodicElement>(
                    data.data
                  );
                  // this.appService.loadingEnable = false;
                  this.length = data.totalLength;
                },
                (error) => {
                  alert(error.message);
                }
              );
          },
          (error) => {
            console.log(error.message);
          }
        );
    } catch (error) {
      console.log(error.message);
    }
  }

  onClickLogout() {
    try {
      this.appService.loadingEnable = true;
      this.hrPageService.logout(localStorage.getItem('token')).subscribe(
        (data) => {
          localStorage.clear();
          alert('Successfully Logged Out. Redirecting to login page...');
          setTimeout(() => {
            this.appService.loadingEnable = false;
          }, 200);
          this.router.navigate(['login']);
        },
        (error) => {
          this.appService.loadingEnable = false;
          alert(error.message);
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  onClickViewCandidate(data: any) {
    this.dialog.open(ViewcandidateComponent, {
      data: data,
      panelClass: 'main-background',
    });
  }

  openMeet(link: any) {
    // window.location.href = `https://meet.google.com/${link}`; //open link in same page
    window.open(`https://meet.google.com/${link}`, '_blank'); //open link on new blank page
  }

  onClickFeedback(data: any) {
    this.dialog.open(FeedbackComponent, {
      data: [data, this.email],
      panelClass: 'main-background',
    });
  }

  searchEventListener(searchTerms: Observable<string>) {
    searchTerms
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          // console.log('term', term);
          this.route.queryParams.subscribe((params) => {
            var interEmailId = params['emailId'];
            this.getDetailsByInterviewerEmailId(interEmailId);
          });
          return term;
        } catch (error) {
          console.log(error.message);
          return null;
        }
      })
      .subscribe(
        (term: any) => {
          // console.log(term);
          // this.pagePosition = 0;
          // this.pageSize = 1;
          // this.getAllCandidates();
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  onClickClose() {
    this.searchInput.setValue('');
    this.route.queryParams.subscribe((params) => {
      var interEmailId = params['emailId'];
      this.getDetailsByInterviewerEmailId(interEmailId);
    });
  }

  searchText = '';

  onClickPaginator(event: any) {
    // console.log('event', event);
    this.pagePosition = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.route.queryParams.subscribe((params) => {
      var interEmailId = params['emailId'];
      this.getDetailsByInterviewerEmailId(interEmailId);
    });
  }
}
export interface PeriodicElement {
  name: string;
  email: string;
  meetLink: string;
  timing: Date;
}
