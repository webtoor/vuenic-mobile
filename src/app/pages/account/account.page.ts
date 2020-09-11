import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  fullName : String
  info
  deviceInfo
  deviceTotal  = 0;
  constructor(public router : Router, public httpService: AuthService) { }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('vuenic-android'));
    this.fullName = token["fullname"]
    this.getProjectDeviceInfo()
  }

  getProjectDeviceInfo(){
    this.httpService.GetRequest('account-project-device').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.info = res.data
        this.deviceInfo = res.data[0].project_device
        if(this.info.length > 0){
          for(let i=0; i<this.info.length; i++){
            if(this.info[i].project_device){
              this.deviceTotal = this.deviceTotal +  parseInt(this.info[i].project_device.length);
            }
          }
        }
      }
    });
  }

  myProfile(){
    this.router.navigate(["settings"])
  }
}
