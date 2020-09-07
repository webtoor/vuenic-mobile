import { Component, ViewChild } from '@angular/core';

import { IonRouterOutlet, Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EventsService } from './services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  public selectedIndex = 0;
  emailShow :string;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/tabs/dashboard',
      icon: 'calendar'
    },
    {
      title: 'Akun',
      url: '/tabs/account',
      icon: 'person-circle'
    },
    {
      title: 'About',
      url: '/tabs/about',
      icon: 'information-circle'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events:EventsService,
    private alertCtrl: AlertController,
    private router: Router,
  ) {
    const token = JSON.parse(localStorage.getItem('vuenic-pwa'));
    if(token){
      this.emailShow = token.email;
    }
    this.events.subscribe('email', (email) => {
      this.emailShow = email;
      console.log(this.emailShow);
    });
    this.initializeApp();

    this.platform.backButton.subscribe(() => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/signin' || this.router.url === '/tabs/dashboard') {
        this.presentAlertConfirm()
      } else {
        this.routerOutlet.pop();
      }
    });
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Exit App',
      message: 'Apakah kamu ingin menutup aplikasi?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp()
          }
        }
      ]
    });

    await alert.present();
  }
}
