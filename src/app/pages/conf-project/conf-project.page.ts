import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conf-project',
  templateUrl: './conf-project.page.html',
  styleUrls: ['./conf-project.page.scss'],
})
export class ConfProjectPage implements OnInit {
  user_project_id;

  constructor(public router: Router, public httpService: AuthService, public route : ActivatedRoute) { 
    this.user_project_id = this.route.snapshot.paramMap.get('user_project_id');
  }

  ngOnInit() {
   
  }

  editLocation(){
    this.router.navigate(["/conf-project/" + this.user_project_id + "/edit-location/" + this.user_project_id])
  }

  editUserProject(){
    this.router.navigate(["/conf-project/" + this.user_project_id + "/edit-project/" + this.user_project_id])
  }

  createDeviceSensor(){
    //console.log(projectID)
    this.router.navigate(["create-device-sensor/" + this.user_project_id])
  }
}
