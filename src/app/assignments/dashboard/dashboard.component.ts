import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chartData: any;
  dataSource: any;
  dateValue : Date;
  constructor() { }

  ngOnInit(): void {
    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#FFC107'
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#03A9F4'
          }
      ]
  };

  this.dataSource = {
    labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "Company1",
        backgroundColor: "blue",
        data: [25, 30, 60, 50, 80, 90]
      },
      {
        label: "Company2",
        backgroundColor: "green",
        data: [45, 33, 70, 72, 95]
      }
    ]
  };

  }

  
}
