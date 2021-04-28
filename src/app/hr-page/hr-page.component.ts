import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HrPageService } from './hr-page.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { AppService } from '../app.service';
import { ViewcandidateComponent } from '../viewcandidate/viewcandidate.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AnalyticsComponent } from './analytics/analytics.component';

@Component({
  selector: 'app-hr-page',
  templateUrl: './hr-page.component.html',
  styleUrls: ['./hr-page.component.css'],
})
export class HrPageComponent implements OnInit {
  candidateSearchForm: FormGroup;
  searchInput = new FormControl('');
  searchTerm$ = new Subject<string>();
  graphSendData: boolean = true;
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
  graphData: any[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  isEdit = false;
  details: any = [];
  constructor(
    private hrPageService: HrPageService,
    private router: Router,
    private dialog: MatDialog,
    public appService: AppService
  ) {
    let token = localStorage.getItem('token'),
      who = localStorage.getItem('who');
    if (!token || who !== 'Hr') {
      this.router.navigate(['login']);
    }
    this.candidateSearchForm = new FormGroup({
      searchInput: this.searchInput,
    });
    this.getAllCandidates();
  }

  ngOnInit(): void {
    this.searchEventListener(this.searchTerm$);
  }

  getAllCandidates() {
    try {
      if (this.graphSendData) {
        this.hrPageService
          .getAllInterviewsByCandidates1()
          .subscribe((data: any) => {
            for (let d of data.data) {
              let arr: any[] = [];
              arr.push(d.organization);
              this.hrPageService.getFeedbackByIntId(d._id).subscribe(
                (data1: any) => {
                  if (data1.data[0] !== undefined) {
                    let avg = 0;
                    for (let j of data1.data[0].feedbacks) {
                      avg += j.rating;
                    }
                    arr.push(Number((avg / data1.data[0].count).toFixed(2)));
                    this.graphData.push(arr);
                  }
                },
                (err) => console.log('aabbcc', err)
              );
            }
          });
        this.graphSendData = false;
      }

      this.hrPageService
        .getAllInterviewsByCandidates({
          searchText: this.searchInput.value ? this.searchInput.value : '',
          skip: this.pagePosition,
          limit: this.pageSize,
        })
        .subscribe(
          (data: any) => {
            // console.log('data', JSON.stringify(data, null, 4));
            for (let d of data.data) {
              this.hrPageService.getFeedbackByIntId(d._id).subscribe(
                (data1: any) => {
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
                            this.getAllCandidates();
                          },
                          (err) => console.log('ff', err)
                        );
                    }
                  }
                },
                (err) => {
                  console.log('eee', err.message);
                  // alert(err.message);
                }
              );
            }
            this.dataSource = new MatTableDataSource<PeriodicElement>(
              data.data
            );
            this.details = data.data;
            this.length = data.totalLength;
          },
          (error) => {
            // console.log('qq', error.message);
            alert('Incorrect candidate name');
          }
        );
    } catch (error) {
      console.log('ss', error.message);
      // alert(error.message);
    }
  }

  openMeet(link: any) {
    // window.location.href = `https://meet.google.com/${link}`; //open link in same page
    window.open(`https://meet.google.com/${link}`, '_blank'); //open link on new blank page
  }

  onClickLogout() {
    try {
      this.appService.loadingEnable = true;
      this.hrPageService.logout(localStorage.getItem('token')).subscribe(
        (data) => {
          localStorage.clear();
          // console.log(data);
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
      console.log('789', error.message);
    }
  }

  onClickAddCandidate() {
    this.dialog.open(AddCandidateComponent, {
      data: {
        details: [],
        isEdit: false,
      },
      panelClass: 'main-background',
    });
  }

  onClickViewCandidate(data: any) {
    this.dialog.open(ViewcandidateComponent, {
      data: data,
      panelClass: 'main-background',
    });
  }

  onClickEditCandidate(candidate: any) {
    this.dialog.open(AddCandidateComponent, {
      data: {
        details: candidate,
        isEdit: true,
      },
      panelClass: 'main-background',
    });
  }

  searchEventListener(searchTerms: Observable<string>) {
    searchTerms
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          // console.log('term', term);
          this.getAllCandidates();
          return term;
        } catch (error) {
          console.log('123', error.message);
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
          console.log('456', err);
        }
      );
  }

  onClickClose() {
    this.searchInput.setValue('');
    this.getAllCandidates();
  }

  searchText = '';

  onClickPaginator(event: any) {
    // console.log('event', event);
    this.pagePosition = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.getAllCandidates();
  }
  onClickAnalytics() {
    this.dialog.open(AnalyticsComponent, {
      data: this.graphData,
    });
  }
}

export interface PeriodicElement {
  name: string;
  email: string;
  meetLink: string;
  timing: Date;
  status: String;
}
