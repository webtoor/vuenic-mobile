import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.page.html',
  styleUrls: ['./list-project.page.scss'],
})
export class ListProjectPage implements OnInit {
  listUserProject
  constructor(public httpService: AuthService, public router : Router) { }

  ngOnInit() {
    this.getListUserProject()
  }
  
  backButton(){
    let navigationExtras: NavigationExtras = {
      replaceUrl: true,
      state: {
        backButton: 1,
      }
    };
    this.router.navigate(['/tabs/dashboard'], navigationExtras);
  }

  getListUserProject(){
    this.httpService.GetRequest('list-user-project').subscribe(res => {
      console.log(res);
      if(res.status == 200){
      this.listUserProject = res["data"]
      }
    });
  }

  showUserProject(user_project_id){
    console.log(user_project_id)
    let navigationExtras: NavigationExtras = {
      replaceUrl: true,
      state: {
        refreshPage: 1,
        devicePosition : null,
        deviceLast : 0,
        userProjectID : user_project_id
      }
    };
    this.router.navigate(['/tabs/dashboard'], navigationExtras); 
  }

  createProject(){
    this.router.navigate(["/create-project"])
  }

  settingUserProject(ProjectID){
    console.log(ProjectID)
    this.router.navigate(["/conf-project/" + ProjectID])
  }
}
