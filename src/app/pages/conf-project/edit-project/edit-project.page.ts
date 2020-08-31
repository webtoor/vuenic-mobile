import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.page.html',
  styleUrls: ['./edit-project.page.scss'],
})
export class EditProjectPage implements OnInit {
  EditUserProjectForm : FormGroup;
  user_project_id;
  submitted = false;
  projects;
  project_types;
  commodities;
  commodity_types;
  project_typesIsEnabled = true;
  commoditiesIsEnabled = true;
  commodity_typesIsEnabled = true;
  placeHDCommodity = "Pilih Komoditas"
  placeHDCommodityType = "Pilih Jenis Komoditas"
  commodityHidden = false;
  commodityTypeHidden = false;
  constructor(public router: Router, private formBuilder: FormBuilder, public httpService: AuthService, public route : ActivatedRoute) { 
    this.user_project_id = this.route.snapshot.paramMap.get('user_project_id');
    this.EditUserProjectForm = this.formBuilder.group({
      'user_project_id' : [parseInt(this.user_project_id), [Validators.required]],
      'project_name' : [null, [Validators.required]],
      'project_id' : [null, [Validators.required]],
      'project_type_id' : [null, Validators.required],
      'commodity_id' : [null],
      'commodity_type_id' : [null],
    });
  }

  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.getProject()
    this.getUserProject()
  }

  onSubmit() {
    this.submitted = true;
    if (this.EditUserProjectForm.invalid) {
        return;
    }
    console.log(this.EditUserProjectForm.value)
    this.httpService.PutRequest(this.EditUserProjectForm.value, 'user-project').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          state : {
            refreshPage: 1,
            userProjectID : this.user_project_id
          }
        };
        this.router.navigate(['/tabs/dashboard'], navigationExtras);
      }
    });
  }

  get f() { return this.EditUserProjectForm.controls; }

  getUserProject(){
    this.httpService.GetRequest('user-project/' + this.user_project_id).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        console.log("true")
        this.EditUserProjectForm.patchValue({
          'project_name' : res['data']['project_name'],
          'project_id' : res['data']['project_id'],
          'project_type_id' : res['data']['project_type_id'],
          'commodity_id' : res['data']['commodity_id'],
          'commodity_type_id' : res['data']['commodity_type_id'],
        }) 
      }
    });
  }

  getProject(){
    this.httpService.GetRequest('project').subscribe(res => {
      //console.log(res);
      if(res.status == 200){
        this.projects = res.data
      }
    });
  }

  getProjectType(event){
    console.log("event.detail.value")
    let project_id = event.detail.value
    this.project_typesIsEnabled = true;
    this.commoditiesIsEnabled = true;
    this.commodity_typesIsEnabled = true;
    this.EditUserProjectForm.get('project_type_id').reset();
    this.EditUserProjectForm.get('commodity_id').reset();
    this.EditUserProjectForm.get('commodity_type_id').reset();
    if(event.detail.value == 5){
      this.commodityHidden = true;
      this.commodityTypeHidden = true;
      this.placeHDCommodity = "-"
      this.placeHDCommodityType = "-"
    }else{
      this.commodityHidden = false;
      this.commodityTypeHidden = false;
      this.placeHDCommodity = "Pilih Komoditas"
      this.placeHDCommodityType = "Pilih Jenis Komoditas"
    }
    this.httpService.GetRequest('project-type/' + project_id).subscribe(res => {
      //console.log(res);
      if(res.status == 200){
       
        this.project_typesIsEnabled = false;
        this.project_types = res.data
      }
    });
  }

  getCommodity(event){
    console.log(event.detail.value)
    this.commoditiesIsEnabled = true;
    this.commodity_typesIsEnabled = true;
    let project_type_id = event.detail.value
    this.EditUserProjectForm.get('commodity_id').reset();
    if(project_type_id){
      this.httpService.GetRequest('commodity/' + project_type_id).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          if(res.data.length > 0){
            this.commodityHidden = false;
            this.placeHDCommodity = "Pilih Komoditas"
            this.commoditiesIsEnabled = false;
            this.commodities = res.data
          }else{
            this.commodityHidden = true;
            this.commodityTypeHidden = true;
            this.placeHDCommodity = "-"
            this.placeHDCommodityType = "-"
            this.commoditiesIsEnabled = true;
          }
        }
      });
    }
  }

  getCommodityType(event){
    console.log(event.detail.value)
    this.commodity_typesIsEnabled = true;
    let commodity_id = event.detail.value
    this.EditUserProjectForm.get('commodity_type_id').reset();
    if(commodity_id){
      this.httpService.GetRequest('commodity-type/' + commodity_id).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          if(res.data.length > 0){
            this.commodityTypeHidden = false;
            this.commodity_typesIsEnabled = false;
            this.placeHDCommodityType = "Pilih Jenis Komoditas"
            this.commodity_types = res.data
          }else{
            this.commodityTypeHidden = true;
            this.commodity_typesIsEnabled = true;
            this.placeHDCommodityType = "-"
          }
         
        }
      });
    }
  }

}
