import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-conf-device-sensor',
  templateUrl: './conf-device-sensor.page.html',
  styleUrls: ['./conf-device-sensor.page.scss'],
})
export class ConfDeviceSensorPage implements OnInit {
  project_device_id
  apiDevKey;
  userProjectID;
  constructor(public router: Router,public httpService: AuthService, public route : ActivatedRoute,) { 
    this.project_device_id = this.route.snapshot.paramMap.get('project_device_id');
  }

  ngOnInit() {
    const params = JSON.parse(localStorage.getItem('vuenic-dev-key'));
    //console.log(params)
    for(var j=0; j < params.length; j++){
      if(params[j]["id"] == this.project_device_id){
        //console.log(params[j]["id"])
        this.userProjectID = params[j]["user_project_id"]
        this.apiDevKey = params[j]["key"]
      }
    }

  }

  editDeviceSensor(){
    this.router.navigate(["tabs/dashboard/conf-device-sensor/" + this.project_device_id + "/edit-device-sensor/" + this.project_device_id])
  }

  linkDocAPI(){
    window.open("https://documenter.getpostman.com/view/2465660/T17AjAcd?version=latest");
  }

  copyTextButton(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  deleteDevice(){
    let navigationExtras: NavigationExtras = {
      state: {
       funcStatus : "deleteDevice",
       projectDeviceID : this.project_device_id,
       userProjectID : this.userProjectID
      }
    };
    this.router.navigate(['/delete-confirm'], navigationExtras)
  }

}
