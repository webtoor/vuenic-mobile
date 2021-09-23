import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, Platform } from '@ionic/angular';

const { NativeMarket } = Plugins;

interface AppUpdate {
  data: {
    name: any;
    configs: {
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
  }
}

@Injectable({
  providedIn: 'root'
})

export class UpdateService {
  versionInfo = 'https://api.vuenic.com/v1/version-info';
  maintenanceInfo = 'https://api.vuenic.com/v1/maintenance-info'

  constructor(private http: HttpClient,
    private alertCtrl: AlertController,
    private appVersion: AppVersion,
    private iab: InAppBrowser,
    private plt: Platform) { }

  async checkForMaintenance() {
    this.http.get(this.maintenanceInfo).subscribe(async (info: AppUpdate) => {
      const data = JSON.parse(`${info.data.configs}`)
      if (data.enabled) {
        this.presentAlert(data.msg.title, data.msg.msg)
      }
    });
  }

  async checkForUpdate() {
    this.http.get(this.versionInfo).subscribe(async (info: AppUpdate) => {
      //console.log(JSON.parse(`${info.data.configs}`))
      const data = JSON.parse(`${info.data.configs}`)
      //console.log(data.majorMsg.msg)
      const versionNumber = await this.appVersion.getVersionNumber()
      // 1.0.3
      const splittedVersion = versionNumber.split('.')
      const serverVersion = data.current.split('.');

      if (serverVersion[0] > splittedVersion[0]) {
        this.presentAlert(data.majorMsg.title, data.majorMsg.msg, data.majorMsg.btn)
      } else if (serverVersion[1] > splittedVersion[1]) {
        this.presentAlert(data.minorMsg.title, data.minorMsg.msg, data.minorMsg.btn)
      } else if (serverVersion[2] > splittedVersion[2]) {
        this.presentAlert(data.minorMsg2.title, data.minorMsg2.msg, data.minorMsg2.btn)
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
