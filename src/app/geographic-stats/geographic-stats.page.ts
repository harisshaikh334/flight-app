import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FLIGHT_FIND_BY_LOCATION, FLIGHT_INFORMATION_GEOG } from '../constant';
import { LaunchNavigator } from 'plugins/uk.co.workingedge.phonegap.plugin.launchnavigator/uk.co.workingedge.phonegap.plugin.launchnavigator';

@Component({
  selector: 'app-geographic-stats',
  templateUrl: './geographic-stats.page.html',
  styleUrls: ['./geographic-stats.page.scss'],
})
export class GeographicStatsPage implements OnInit {

  constructor(public apiSer: ApiService, public launchNavigator: LaunchNavigator) { }
  dataSel:string = 'flight_information_geog';
  apiUrl:string = '';
  dataList = [];
  ngOnInit() {
    this.getDataFromApi();
  }
  getDataFromApi () {
    if (this.dataSel == 'flight_information_geog') {
      this.apiUrl = FLIGHT_INFORMATION_GEOG;
    } else {
      this.apiUrl = FLIGHT_FIND_BY_LOCATION;
    }
    this.apiSer.showLoader();
    this.apiSer.getService(this.apiUrl).then((data:any) => {
      console.log('api data ',data);
      this.apiSer.hideLoad();
      this.dataList = data;
    }, (err) => {
     this.apiSer.hideLoad();
      console.log('api err ',err);
    })

  }
  openLatLong(lat, long) {
    let options = {
      app:this.launchNavigator.APP.GOOGLE_MAPS
    }
    this.launchNavigator.navigate([lat, long], options);
  }
  onDataChange() {
    this.getDataFromApi();
  }

}
