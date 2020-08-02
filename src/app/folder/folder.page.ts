import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AGG_STATE_OF_OPERATOR, AGG_STATE_OF_OCC, FLAT_BY_STATE_OCC, CHART_COLOR } from '../constant';
declare var Chart:any;
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  yearSel:any = '';
  yearList = [];
  dataList = [];
  showLoader:boolean = false;
  dataSel:String = 'agg_state_occ';
  apiUrl:any;
  segmentData:string = 'data';
  barChartLabels = [];
  barChartData = [];
  bgColor= [];
  constructor(private activatedRoute: ActivatedRoute, public apiSer: ApiService) { }
  /**
   * Fetch data from api
   */
  getDataFromApi() {
    this.apiUrl = this.getUrl();
    this.apiSer.showLoader();
    this.apiSer.getService(this.apiUrl, this.yearSel).then((data:any) => {
    
      this.apiSer.hideLoad();
      this.barChartLabels = [];
      this.barChartData =[];
      this.bgColor = [];
      let dataObj = {};
      data.forEach((element, key) => {
        /**
         * Set Chart data
         */
        if (this.dataSel == 'agg_state_occ' || this.dataSel == 'agg_state_operator') {
          this.barChartLabels.push(element.Year);
          this.barChartData.push(element.Accidents);
          this.bgColor.push(CHART_COLOR[key])
        } else {
          if (dataObj[element.Year]) {
            dataObj[element.Year]+= element.Accidents;
          } else {
            dataObj[element.Year] =element.Accidents;
          }
        }
      });
      if (dataObj) {
        let i = 0;
        for (const key in dataObj) {
            this.barChartLabels.push(key);
            this.barChartData.push(dataObj[key]);
            this.bgColor.push(CHART_COLOR[i])
            i++;
        }
      }
      this.setChartData();
      this.dataList = data;
    }, (err) => {
      this.barChartLabels = [];
      this.barChartData =[];
      this.bgColor = [];
      this.apiSer.hideLoad();
    })
  }
 /**
  * Set bar chart whenever data changes
  */
  setChartData() {
    var ctx:any = document.getElementById('myChart');
    var myChart = new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
          labels: this.barChartLabels,
          datasets: [{
              label: 'Accident By Year',
              data: this.barChartData,
              backgroundColor:this.bgColor,
              borderWidth: 1
          }]
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
  ngOnInit() {
    var currentYear = new Date().getFullYear();
    for (let i = 2008; i <= currentYear ; i++) {
      this.yearList.push(i);
    }
    this.setChartData();
   
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getDataFromApi();
  }

  onDataChange() {
    this.getDataFromApi();

  }

  getUrl () {
    if (this.dataSel == 'agg_state_occ') {
      return AGG_STATE_OF_OCC;
    } else if (this.dataSel == 'agg_state_operator') {
      return AGG_STATE_OF_OPERATOR;
    } else if (this.dataSel == 'flat_state_occ') {
      return FLAT_BY_STATE_OCC;
    }
  }

  onYearChange() {
    this.getDataFromApi();
  }

}
