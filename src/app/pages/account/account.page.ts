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
  constructor(public router : Router, public httpService: AuthService) { }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('vuenic-android'));
    this.fullName = token["fullname"]
    this.getProjectDeviceInfo()
  }

  getProjectDeviceInfo(){
    this.httpService.GetRequest('account-project-device').subscribe(res => {
      //console.log(res);
      if(res.status == 200){
        this.info = res.data
        this.deviceInfo = res.data[0].project_device
        console.log(this.deviceInfo)
      }
    });
  }

  myProfile(){
    this.router.navigate(["settings"])
  }
}
