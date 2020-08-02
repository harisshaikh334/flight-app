import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import { Label } from 'ng2-charts';
import { ApiService } from '../services/api.service';
import { AGG_STATE_OF_OPERATOR, AGG_STATE_OF_OCC, FLAT_BY_STATE_OCC } from '../constant';

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
  constructor(private activatedRoute: ActivatedRoute, public apiSer: ApiService) { }

  getDataFromApi() {
    this.apiUrl = this.getUrl();
    this.apiSer.showLoader();
    this.apiSer.getService(this.apiUrl, this.yearSel).then((data:any) => {
      console.log('api data ',data);
      this.apiSer.hideLoad();
      // data.forEach(element => {
      //   this.barChartLabels.push(element.Year);
      //   this.barChartData[0].data.push(element.Accidents);
      // });
      this.dataList = data;
    }, (err) => {
     this.apiSer.hideLoad();
      console.log('api err ',err);
    })
  }

  ngOnInit() {
    var currentYear = new Date().getFullYear();
    for (let i = 2008; i <= currentYear ; i++) {
      this.yearList.push(i);
    }
   
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
