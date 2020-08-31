import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router, ActivatedRoute, NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-create-device-sensor',
  templateUrl: './create-device-sensor.page.html',
  styleUrls: ['./create-device-sensor.page.scss'],
})
export class CreateDeviceSensorPage implements OnInit {
  createDevSensorForm: FormGroup;
  devices;
  sensors;
  submitted = false;
  user_project_id;
  constructor(public route : ActivatedRoute, public router : Router, public loading: LoaderService, private formBuilder: FormBuilder, public httpService: AuthService) {
    this.user_project_id = this.route.snapshot.paramMap.get('user_project_id');
    this.createDevSensorForm = this.formBuilder.group({
      'user_project_id' : [null, [Validators.required]],
      'device_id' : [null, [Validators.required]],
      'sensor_id' : [null, [Validators.required]],
    });
   }

  ngOnInit() {
    this.createDevSensorForm.patchValue({
      user_project_id : parseInt(this.user_project_id)
    })
    this.getDevice()
    this.getSensor()
  }

  onSubmit() {
    this.submitted = true;
    if (this.createDevSensorForm.invalid) {
        return;
    }
    console.log(this.createDevSensorForm.value)
    this.loading.present();
    this.httpService.PostRequest(this.createDevSensorForm.value, 'device-sensor').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          state : {
            refreshPage: 1,
            devicePosition : null,
            deviceLast : 1,
            userProjectID : this.user_project_id
          }
        };
        this.router.navigate(['/tabs/dashboard'], navigationExtras);
        this.loading.dismiss();
      }
    });
  }

  getDevice(){
    this.httpService.GetRequest('device').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.devices = res.data
      }
    });
  }

  getSensor(){
    this.httpService.GetRequest('sensor').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.sensors = res.data
      }
    });
  }

}
