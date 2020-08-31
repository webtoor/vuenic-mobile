import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-setting-user-info',
  templateUrl: './setting-user-info.page.html',
  styleUrls: ['./setting-user-info.page.scss'],
})
export class SettingUserInfoPage implements OnInit {
  infoUser
  refreshPage = 0
  constructor(public route : ActivatedRoute, public router : Router, public loading: LoaderService, public httpService: AuthService) {
  }
  ngOnInit() {
    this.getInfoAccount()
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.refreshPage = parseInt(this.router.getCurrentNavigation().extras.state.refreshPage);
      }
      if(this.refreshPage == 1){
        console.log("Refresh Page")
        this.getInfoAccount()
      }
      this.refreshPage = 0;
    });
  }

  getInfoAccount(){

    this.httpService.GetRequest('user-info').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.infoUser = res.data
      }
    });
  }

  editUserInfo(type, params){
    let navigationExtras: NavigationExtras = {
      state: {
        userInfoType : type,
        userInfoParams : params
      }
    };
    this.router.navigate(['/settings/setting-detail/setting-user-info/edit-user-info'], navigationExtras);
  }

}
