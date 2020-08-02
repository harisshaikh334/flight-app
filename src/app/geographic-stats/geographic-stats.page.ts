import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FLIGHT_FIND_BY_LOCATION, FLIGHT_INFORMATION_GEOG } from '../constant';
// import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'app-geographic-stats',
  templateUrl: './geographic-stats.page.html',
  styleUrls: ['./geographic-stats.page.scss'],
})
export class GeographicStatsPage implements OnInit {

  constructor(public apiSer: ApiService) { }
  dataSel:string = 'flight_information_geog';
  apiUrl:string = '';
  dataList = [];
  ngOnInit() {
    this.getDataFromApi();
  }
  /**
   * Fetch data from api
   */
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
  /**
   * Open google map
   * @param lat latitude
   * @param long longitude
   */
  openLatLong(lat, long) {
    
    window.open('https://www.google.com/maps/search/?api=1&query='+lat+','+long);
  }
  onDataChange() {
    this.getDataFromApi();
  }

}
