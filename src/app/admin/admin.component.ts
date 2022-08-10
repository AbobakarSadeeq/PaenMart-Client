import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from './admin.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // chart data
  @ViewChild("chart") chart: ChartComponent;
  chartOptions: Partial<ChartOptions> | any;

  subscription: Subscription;
  dashboardDetails: any
  getStyleFromNav: string = null;
  lastFiveShippedData: any[] = [];
  userDetails: any;


  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {

    // Chart Data
    this.gettingChartMonthlyData();
    this.dashboardDetailData();
    this.fiveLastShippedData();

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    if (localStorage.getItem("token")) {
      this.subscription = this._adminService.userData.subscribe((data: any) => {
        this.userDetails = data
      })

    }

  }


  gettingChartMonthlyData() {
    this.subscription = this._adminService.chartMonthData().subscribe((monthlyData: any) => {
      // Chart Data
      this.chartOptions = {
        series: [
          {
            name: "Inflation",
            data: monthlyData
          }
        ],

        chart: {
          toolbar: {
            show: true,
            tools: {
              download: false
            }
          },
          height: 350,
          type: "bar",

        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top" // top, center, bottom

            }
          }
        },
        dataLabels: {
          enabled: true,

          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },


        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          position: "top",
          labels: {
            offsetY: -18
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true,
            offsetY: -35
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,

          }
        },
        title: {
          text: "Monthly Orders",
          offsetY: 320,
          align: "center",
          style: {
            color: "#444"
          }
        }
      }
    });
  }

  dashboardDetailData() {
    this.subscription = this._adminService.getDashboardData().subscribe((data: any) => {
      this.dashboardDetails = data;
    })
  }

  fiveLastShippedData() {
    this.subscription = this._adminService.getLastFiveShippedOrders().subscribe((data: any) => {
      this.lastFiveShippedData = data;
    })
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}



