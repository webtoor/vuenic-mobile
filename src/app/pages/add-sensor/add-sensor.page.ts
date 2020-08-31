import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.page.html',
  styleUrls: ['./add-sensor.page.scss'],
})
export class AddSensorPage implements OnInit {
  addSensorForm : FormGroup
  useSensor;
  sensors;
  submitted;
  projectDeviceID;
  userProjectID;
  constructor(public loading: LoaderService, public httpService: AuthService, public route : ActivatedRoute, public router : Router, private formBuilder: FormBuilder) {
    this.projectDeviceID = this.route.snapshot.paramMap.get('projectDeviceID');
    this.addSensorForm = this.formBuilder.group({
      'project_device_id' : parseInt(this.projectDeviceID),
      'sensor_id' : [null, [Validators.required]],
    });
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.useSensor = Object.values(params).map(function(v){return +v})
      if (this.router.getCurrentNavigation().extras.state) {
        this.userProjectID = parseInt(this.router.getCurrentNavigation().extras.state.userProjectID);
      }
    });
    this.getSensor()
  }
  
  getSensor(){
    this.httpService.GetRequest('sensor').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.sensors = res.data.filter(item => !this.useSensor.includes(item.id))
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addSensorForm.invalid) {
        return;
    }
    console.log(this.addSensorForm.value)
    this.loading.present();
    this.httpService.PostRequest(this.addSensorForm.value, 'sensor').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          state : {
            refreshPage: 1,
            deviceLast : 1,
            userProjectID : this.userProjectID
          }
        };
        this.router.navigate(['/tabs/dashboard'], navigationExtras);
        this.loading.dismiss();
      }
    });
  }

}
