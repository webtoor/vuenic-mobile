import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-setting-detail',
  templateUrl: './setting-detail.page.html',
  styleUrls: ['./setting-detail.page.scss'],
})
export class SettingDetailPage implements OnInit {
  password = null;
  message;
  statusSandi
  constructor(public toastController : ToastController, public route : ActivatedRoute, public router : Router, public httpService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.message = this.router.getCurrentNavigation().extras.state.message;
      }
      if(this.message){
        this.presentToast(this.message)
      }
    });
  }

  ionViewWillEnter(){
    this.getUserInfo();
  }


  settingMyProfile(){
    this.router.navigate(["settings/setting-detail/setting-user-info"])
  }

  settingMyAddress(){
    this.router.navigate(["settings/setting-detail/setting-address"])
  }

  settingPassword(){
    let navigationExtras: NavigationExtras = {
      state : {
       statusPWD : this.password
      }
    };
    this.router.navigate(["settings/setting-detail/setting-password"], navigationExtras)
  }

  getUserInfo(){
    this.httpService.GetRequest('user-info').subscribe(res => {
      //console.log(res);
      if (res.status == 200) {
        if (res.data.password) {
          this.statusSandi = "Ubah"
          this.password = "update-password"
        }else{
          this.password = "set-password"
          this.statusSandi = "Atur"
        }
      }
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
