import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setting-address',
  templateUrl: './setting-address.page.html',
  styleUrls: ['./setting-address.page.scss'],
})
export class SettingAddressPage implements OnInit {
  refreshPage = 0
  userAddress;
  constructor(public router : Router, public route : ActivatedRoute, public httpService: AuthService, public alertController : AlertController) {
    this.listUserAddress()
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.refreshPage = parseInt(this.router.getCurrentNavigation().extras.state.refreshPage);
      }
      if(this.refreshPage == 1){
        console.log("Refresh Page")
        this.listUserAddress()
      }
      this.refreshPage = 0;
    });
  }

  ionViewDidLeave(){
    this.refreshPage = 0;
  }

  listUserAddress(){
    this.httpService.GetRequest('list-user-address').subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.userAddress = res.data
        }
      });
  }

  addMyAddress(){
    this.router.navigate(["settings/setting-detail/setting-address/add-address"])
  }

  editMyAddress(user_address_id){
    this.router.navigate(["settings/setting-detail/setting-address/edit-address/" + user_address_id])
  }

  async deleteMyAddress(user_address_id, address_label){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hello!',
      message: 'Apa kamu yakin untuk hapus alamat <b>' + address_label + '</b>?',
      buttons: [
        {
          text: 'GAK JADI',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Gak Jadi');
          }
        }, {
          text: 'YAKIN',
          handler: () => {
            this.httpService.deleteRequest('user-address/' + user_address_id).subscribe(res => {
            console.log(res);
              if(res.status == 200){
                this.listUserAddress()
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
