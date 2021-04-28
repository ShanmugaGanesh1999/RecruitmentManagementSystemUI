import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartType, Row } from 'angular-google-charts';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  title = 'Ratings of each organisation';
  type = ChartType.LineChart;
  graphData: any[] = [];
  columnNames = ['Organisation', 'Ratings'];
  options = {
    hAxis: {
      title: 'Organisation',
    },
    vAxis: {
      title: 'Ratings',
    },
    pointSize: 5,
  };
  width = 650;
  height = 500;
  constructor(
    public dialogRef: MatDialogRef<AnalyticsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    let d = [],
      unique;
    for (let i of this.data) {
      d.push(i[0]);
    }
    unique = [...new Set(d)];

    let p = [];
    for (let i of unique) {
      let arr = [];
      for (let j of this.data) {
        if (i == j[0]) {
          arr.push(j[1]);
        }
      }
      p.push([i, arr]);
    }

    let finalResult = [];
    for (let i of p) {
      let sum = 0,
        count = 0;
      for (let j of i[1]) {
        sum += j;
        count++;
      }
      finalResult.push([i[0], sum / count]);
    }
    this.graphData = finalResult;
  }
}
