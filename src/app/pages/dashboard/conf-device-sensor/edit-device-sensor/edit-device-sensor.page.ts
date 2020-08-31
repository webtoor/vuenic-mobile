import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-device-sensor',
  templateUrl: './edit-device-sensor.page.html',
  styleUrls: ['./edit-device-sensor.page.scss'],
})
export class EditDeviceSensorPage implements OnInit {
  editDevSensorForm: FormGroup;
  devices;
  sensors;
  sensor_array;
  project_device_id;
  submitted = false;
  constructor(public formBuilder: FormBuilder, public router: Router,public httpService: AuthService, public route : ActivatedRoute) { 
    this.project_device_id = this.route.snapshot.paramMap.get('project_device_id');
    this.editDevSensorForm = this.formBuilder.group({
      'project_device_id' : [parseInt(this.project_device_id), [Validators.required]],
      'device_id' : [null, [Validators.required]],
      'sensor_id' : [null, [Validators.required]],
    });
  }
  ngOnInit() {
    this.getDevice()
    this.getSensor()
    this.getProjectDevice();
  }

  onSubmit() {
    this.submitted = true;
    if (this.editDevSensorForm.invalid) {
        return;
    }
    console.log(this.editDevSensorForm.value)
    /* this.httpService.PostRequest(this.EditUserProjectForm.value, 'create-project').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          queryParams: {
            refreshPage: 1,
          }
        };
        this.router.navigate(['/tabs/dashboard'], navigationExtras);
        this.loading.dismiss();
      }
    }); */
  }

  getProjectDevice(){
    this.httpService.GetRequest('project-device/' + this.project_device_id).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.sensor_array = []
        for(var j=0; j < res['data']['device_sensor'].length; j++){
          this.sensor_array.push(res['data']['device_sensor'][j]['sensor_id'])
        }
        this.editDevSensorForm.patchValue({
          'device_id' : res['data']['device_id'],
          'sensor_id' : this.sensor_array,
        }) 
        console.log(this.sensor_array)
      }
    });
  }

  getDevice(){
    this.httpService.GetRequest('device').subscribe(res => {
      //console.log(res);
      if(res.status == 200){
        this.devices = res.data
      }
    });
  }

  getSensor(){
    this.httpService.GetRequest('sensor').subscribe(res => {
      //console.log(res);
      if(res.status == 200){
        this.sensors = res.data
      }
    });
  }

}
