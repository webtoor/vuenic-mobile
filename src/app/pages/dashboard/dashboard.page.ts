import { Component, OnInit, NgZone } from '@angular/core';
import { UserProjectService } from '../../services/user-project.service';
import { MenuController } from '@ionic/angular';
import { DeviceSensorService } from '../../services/device-sensor.service';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  subscription: Subscription
  projectID;
  projectName : String;
  commodityName : String;
  commodityTypeName : String;
  project: String;
  projectType : String;
  projectDevice : Number;
  projectLocation;
  deviceSegment;
  segmentDefault;
  deviceSensor; 
  refreshPage = 0;
  user_project_id = 0;
  deviceLast = 0;
  alive = true;
  backButton = 0;
  devicePosition = 0
  constructor(public route : ActivatedRoute, public router: Router, public menu: MenuController, public httpService : UserProjectService, public httpDeviceSensor : DeviceSensorService, private _ngZone: NgZone) {
    this.menu.enable(true);
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.refreshPage = parseInt(this.router.getCurrentNavigation().extras.state.refreshPage);
        this.backButton = parseInt(this.router.getCurrentNavigation().extras.state.backButton);
        this.user_project_id = parseInt(this.router.getCurrentNavigation().extras.state.userProjectID);
        this.deviceLast = parseInt(this.router.getCurrentNavigation().extras.state.deviceLast);
        this.devicePosition = this.router.getCurrentNavigation().extras.state.devicePosition;
      }
    
      if(this.refreshPage == 1){
        if(this.user_project_id !== 0){
          if(this.devicePosition !== 0){
            this.projectDevice = null
          }
          this.deviceSegment = [] 
          this.ionViewWillEnter()
        }
        //console.log("RefreshPage", this.user_project_id)
        this.getUserProject()
      }

      if(this.backButton === 1){
        //console.log("backButton")
        this.ionViewWillEnter()
      }
    
    });
    this.getUserProject()
  }
  

  ionViewWillEnter(){
    console.log("ionViewWillEnter")
    //console.log(this.projectName, this.projectDevice)
    if(this.projectName && this.projectDevice){
      this.alive = true;
      this.setInterval()
    }
  }

  ionViewWillLeave(){
    console.log("ionViewWillLeave")
    this.alive = false;
    this.refreshPage = 0;
    this.user_project_id = this.user_project_id
  }

 

  getUserProject(){
    this.httpService.getUserProject('user-project-loc/' + this.user_project_id).subscribe(res => {
      //console.log(res);
      if((res.status == 200) && (Object.keys(res.data).length > 0)){
        this.projectID = res.data.id;
        this.projectName = res.data.project_name;
        this.project = res.data.project.name;
        this.projectType = res.data.project_type.name;
        if(res.data.commodity){
          this.commodityName = res.data.commodity.name;
        }
        if(res.data.commodity_type){
          this.commodityTypeName = res.data.commodity_type.name;
        }
        this.projectLocation = res.data.project_location;

        if(res.data.project_device){
          localStorage.setItem('vuenic-dev-key-android', JSON.stringify(res.data.project_device));
          this.projectDevice = res.data.project_device.length;
          this.deviceSegment = res.data.project_device;

          if(this.deviceLast === 1 && this.devicePosition === null){
            // Add Device - Last Device 
            //console.log("1", this.deviceLast, this.devicePosition)
            this.segmentDefault = res.data.project_device[res.data.project_device.length - 1]["id"]
          }else if(this.deviceLast === 0 && this.devicePosition !== 0 && this.devicePosition !== null){
            // Delete Sensor 
            //console.log("2", this.deviceLast, this.devicePosition)
            this.segmentDefault = this.devicePosition
          }else{
            // Delete Device or Default
            //console.log("3", this.deviceLast, this.devicePosition)
            this.segmentDefault = res.data.project_device[0]["id"]
          }
          this.getSensorData(this.segmentDefault);
        }
      }
    });
  }

  segmentChanged(value){
    //console.log('segmentChanged')
   //console.log(value)
    this.alive = false;
    this.segmentDefault = value
    this.getSensorData(this.segmentDefault);
    this.setInterval();
  }

  setInterval(){
    //console.log("Activate Interval")
    const intervallTimer = interval(1000 * 15);
    this.subscription = intervallTimer.pipe(takeWhile(() => this.alive)).subscribe(val => this.getSensorData(this.segmentDefault));
  }

  getSensorData(device_id){
    this.httpDeviceSensor.getDeviceSensor('device-sensor/'+ device_id).subscribe(res => {
     console.log(res.data);
      if(res.status == 200){
        this.deviceSensor = res.data
        if((this.deviceSensor.length == 0) || (this.deviceSensor[0]["data_sensor"] == null)){
          console.log('sensor-false')
          this.alive = false;
        }else{
          console.log('sensor-true')
          this.alive = true;
        }
       /*  this._ngZone.run(() => {      
         
       }); */
      }else{
        this.alive = false;
      }
    });
  }

  createProject(){
    this.router.navigate(["create-project"])
  }

  createDeviceSensor(projectID){
    //console.log(projectID)
    this.router.navigate(["create-device-sensor/" + projectID])
  }

  addSensor(projectDeviceID){
    //console.log(projectDeviceID)
    let arrSensor = []
    for (let item of this.deviceSensor) {
     arrSensor.push(item.sensor_id)
    }
    let navigationExtras: NavigationExtras = {
      queryParams : arrSensor,
      state : {
       userProjectID : this.projectID
      }
    };
    this.router.navigate(["add-sensor/" + projectDeviceID], navigationExtras)
  }

  settingUserProject(ProjectID){
    this.ionViewWillLeave()
    //console.log(ProjectID)
    this.router.navigate(["conf-project/" + ProjectID])
  }

  settingDeviceSensor(deviceID){
    //console.log(deviceID)
    this.router.navigate(["tabs/dashboard/conf-device-sensor/" + deviceID])
  }

  listProject(){
    this.ionViewWillLeave()
    this.router.navigate(["list-project"])
  }

  chart(projectID, sensorID){
    this.ionViewWillLeave()
    this.router.navigate(["/chart/" + projectID + "/" + sensorID])
  }

  tableSensor(projectID, sensorID){
    this.ionViewWillLeave()
    this.router.navigate(["/table-sensor/" + projectID + "/" + sensorID + "/" + this.projectID])
  }
}
