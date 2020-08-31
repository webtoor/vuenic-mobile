import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
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
   /*  {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    } */
  ];
  public labels = []//['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events:EventsService
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
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
