import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  confirmPopOpen: boolean = false;
  public appPages = [
    {
      title: 'Accident Stats',
      url: '/folder/Inbox',
      icon: 'airplane-sharp'
    },
    {
      title: 'Geographical Stats',
      url: '/geographic-stats',
      icon: 'globe-sharp'
    }
  ];

  confirm:any;
  
  constructor(
    private platform: Platform,
    public router:Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertContr:AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString("#FFF");
      /**
       * Generate back button
       */
      this.platform.backButton.subscribeWithPriority(9999, async () => {
        if (this.router.url == '/' || this.router.url == 'folder/Inbox' || this.router.url =='' || this.router.url == '/folder/Inbox' || this.router.url == '/folder' || this.router.url == 'folder') {
          this.showExitPop();
        } else {
          this.router.navigate(['/']);
        }
      });
    });
  }
  /**
   * App exit Pop shown when user click back button on home page.
   */
  async showExitPop() {
    this.confirm = await this.alertContr.create({
      header: 'EXIT APP',
      subHeader: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.confirmPopOpen = false;
            navigator['app'].exitApp();
          }
        },
        {
          text: 'NO',
          handler: () => {
            this.confirmPopOpen = false;
          }
        }
      ]
    });
    await this.confirm.present();
    this.confirmPopOpen = true;
  }

  ngOnInit() {
   
  }
}
