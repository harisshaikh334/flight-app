import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { API_KEY } from '../constant';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loading : any;
  constructor(public httpClient: HttpClient, public loadingCtrl: LoadingController) {

  }
  getService(url, year?) {
    return new Promise((resolve, reject) => {
      url = url+"?api_key="+API_KEY;
      if (year) {
        url = url+"&Year="+year
      }
      this.httpClient.get(url).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    }) 
  }

  async showLoader () {
    this.loading =await this.loadingCtrl.create({
      message:'Please wait..'
    });
  
    this.loading.present();
  }
  hideLoad() {
    this.loading.dismiss();
  }
}
