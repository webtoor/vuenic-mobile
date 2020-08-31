import { Component, ViewChild, ElementRef } from "@angular/core";
import { Chart } from 'chart.js';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage {
  @ViewChild('barChart', {static: true}) barChart : ElementRef;
  bars: any;
  colorArray: any;
  constructor(public router : Router) { }

  ionViewDidEnter() {
    this.createBarChart();
  }

  backButton(){
    let navigationExtras: NavigationExtras = {
      replaceUrl: true,
      state: {
        backButton: 1,
      }
    };
    this.router.navigate(['/tabs/dashboard'], navigationExtras);
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
          labels: ['1', '2', '3', '4', '5', '6', '7'],
          datasets: [
              {
                  label: 'Kelembaban',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  //pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  //pointRadius: 1,
                  pointHitRadius: 10,
                  data: [65, 59, 80, 81, 56, 55, 40],
                  spanGaps: false,
              }
          ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
