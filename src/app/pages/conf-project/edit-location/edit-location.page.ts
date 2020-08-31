import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
/* import { LoaderService } from 'src/app/services/loader.service'; */

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
})
export class EditLocationPage implements OnInit {
  EditProjectLocationForm : FormGroup;
  user_project_id;
  submitted = false;
  provinces : any;
  cities;
  districts;
  kotaIsEnabled = true;
  kecamatanIsEnabled = true;

  constructor(public router : Router, private _ngZone: NgZone, /* public loading: LoaderService, */ private formBuilder: FormBuilder, public httpService: AuthService, public route : ActivatedRoute) {
    this.user_project_id = this.route.snapshot.paramMap.get('user_project_id');
    this.EditProjectLocationForm = this.formBuilder.group({
      'project_location_id' : [null, [Validators.required]],
      'address' : [null, [Validators.required]],
      'province_id' : [null, [Validators.required]],
      'city_id' : [null, Validators.required],
      'districts_id' : [null, Validators.required]
    });
   }

  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.getProvince()
    this.getUserProject()
  }

  onSubmit() {
    this.submitted = true;
    if (this.EditProjectLocationForm.invalid) {
        return;
    }
    console.log(this.EditProjectLocationForm.value)
    this.httpService.PutRequest(this.EditProjectLocationForm.value, 'project-location').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          state: {
            refreshPage: 1,
            userProjectID : this.user_project_id
          }
        };
        this.router.navigate(['/tabs/dashboard'], navigationExtras);
      }
    });
  }

  get f() { return this.EditProjectLocationForm.controls; }


  getUserProject(){
    //this.loading.present();
    this.httpService.GetRequest('project-location/' + this.user_project_id).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.EditProjectLocationForm.patchValue({
          'project_location_id' : res['data']['id'],
          'address' : res['data']['address'],
          'province_id' : res['data']['province_id'],
          'city_id' : res['data']['city_id'],
          'districts_id' : res['data']['districts_id'],
        }) 
      }
      //this.loading.dismiss();
    });
  }

  getProvince(){
    //this.loading.present();
    this.httpService.GetRequest('province').subscribe(res => {
      //console.log(res);
      if(res.status == 200){
          this.provinces = res.data
      }
      //this.loading.dismiss();
    });
  }

  getCity(event){
    //this.loading.present();
    this.kotaIsEnabled = true;
    this.kecamatanIsEnabled = true;
    this.cities = null;
    this.EditProjectLocationForm.get('city_id').reset();
    this.EditProjectLocationForm.get('districts_id').reset();
    this.httpService.GetRequest('city/'+ event.detail.value).subscribe(res => {
      //console.log(res);
      if(res.status == 200){
          this.kotaIsEnabled = false;
          this.cities = res.data
      }
      //this.loading.dismiss();
    });
  }

  getDistricts(event){
    //this.loading.present();
    this.kecamatanIsEnabled = true;
    this.districts = null;
    let city_id = event.detail.value
    this.EditProjectLocationForm.get('districts_id').reset();
    if(city_id){
      this.httpService.GetRequest('district/'+ event.detail.value).subscribe(res => {
        //console.log(res);
        if(res.status == 200){
          this.kecamatanIsEnabled = false;
          this.districts = res.data
        }
        //this.loading.present();
      });
    }
  }
}
