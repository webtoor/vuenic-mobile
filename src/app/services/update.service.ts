import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, Platform } from '@ionic/angular';

const { NativeMarket } = Plugins;

interface AppUpdate {
  current: string;
  enabled: boolean;
  msg?: {
    title: string;
    msg: string;
    btn: string;
  };
  majorMsg?: {
    title: string;
    msg: string;
    btn: string
  };
  minorMsg?: {
    title: string;
    msg: string;
    btn: string
  }

}

@Injectable({
  providedIn: 'root'
})

export class UpdateService {
  updateExample = 'https://cors-anywhere.herokuapp.com/https://devdactic.fra1.digitaloceanspaces.com/tutorial/version.json';
  maintenanceExample = 'https://cors-anywhere.herokuapp.com/https://devdactic.fra1.digitaloceanspaces.com/tutorial/maintenance.json'

  constructor(private http: HttpClient,
    private alertCtrl: AlertController,
    private appVersion: AppVersion,
    private iab: InAppBrowser,
    private plt: Platform) { }

  async checkForUpdate() {
    this.http.get(this.updateExample).subscribe(async (info: AppUpdate) => {
      console.log("result: ", info)
      if (!info.enabled) {
        this.presentAlert(info.msg.title, info.msg.msg)
      } else {
        const versionNumber = await this.appVersion.getVersionNumber()
        // 1.0.3
        const splittedVersion = versionNumber.split('.')
        const serverVersion = info.current.split('.');

        if (serverVersion[0] > splittedVersion[0]) {
          this.presentAlert(info.majorMsg.title, info.majorMsg.msg, info.majorMsg.btn)
        } else if (serverVersion[1] > splittedVersion[1]) {
          this.presentAlert(info.minorMsg.title, info.minorMsg.msg, info.minorMsg.btn)
        } else if (serverVersion[2] > splittedVersion[2]) {
          this.presentAlert(info.minorMsg.title, info.minorMsg.msg, info.minorMsg.btn)
        }
      }
    });
  }

  openAppstoreEntry() {
    console.log("OPEN ME")
    if (this.plt.is('android')) {
      NativeMarket.openStoreListing({
        appId: 'com.vuenic'
      });
    }
  }

  async presentAlert(header: string, message: string, buttonText = '', allowClose = false) {
    const buttons = [];

    if (buttonText != '') {
      buttons.push({
        text: buttonText,
        handler: () => {
          this.openAppstoreEntry()
        }
      });

    }

    if (allowClose) {
      buttons.push({
        text: 'Close',
        role: 'cancel'
      })
    }
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons,
      backdropDismiss: allowClose
    });
    await alert.present();
  }
}
