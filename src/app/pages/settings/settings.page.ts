import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(public router : Router, public navCtrl : NavController) { }

  ngOnInit() {
  }

  settingDetail(){
    this.router.navigate(["settings/setting-detail"])
  }

  signOut(){
    localStorage.clear();
    let navigationExtras: NavigationExtras = {
      state : {
        clear : 1
      }
    };
    this.navCtrl.navigateRoot('/signin', navigationExtras)
  }
}
