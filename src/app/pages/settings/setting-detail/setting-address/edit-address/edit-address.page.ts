import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  editUserAddressForm : FormGroup;
  user_address_id;
  provinces;
  cities;
  districts;
  submitted = false;
  kotaIsEnabled = true;
  kecamatanIsEnabled = true;
  constructor(public formBuilder : FormBuilder, public router : Router, public route : ActivatedRoute, public httpService: AuthService) {
    this.user_address_id = this.route.snapshot.paramMap.get('user_address_id');
    this.editUserAddressForm = this.formBuilder.group({
      'user_address_id' : [parseInt(this.user_address_id), [Validators.required]],
      'address_label' : [null, [Validators.required]],
      'address' : [null, [Validators.required]],
      'province_id' : [null, [Validators.required]],
      'city_id' : [{
        value: null,
      }, Validators.required],
      'districts_id' : [{
        value: null,
      }, Validators.required],
      'postal_code' : [null],
    });
   }

  ngOnInit() {
    console.log("yes")
    this.getProvince()
    this.getUserAddress()
  }

  onSubmit() {
    this.submitted = true;
    if (this.editUserAddressForm.invalid) {
        return;
    }
    console.log(this.editUserAddressForm.value)
    this.httpService.PutRequest(this.editUserAddressForm.value, 'user-address').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          state: {
            refreshPage: 1,
          }
        };
        this.router.navigate(['/settings/setting-detail/setting-address'], navigationExtras);
      }
    });
  }

  get f() { return this.editUserAddressForm.controls; }


  getUserAddress(){
    this.httpService.GetRequest('user-address/' + this.user_address_id).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        if(res.data.postal_code != 0){
        this.editUserAddressForm.patchValue({
          'address_label' : res['data']['address_label'],
          'address' : res['data']['address'],
          'province_id' : res['data']['province_id'],
          'city_id' : res['data']['city_id'],
          'districts_id' : res['data']['districts_id'],
          'postal_code' : res['data']['postal_code'],
        }) 
      }else{
        this.editUserAddressForm.patchValue({
          'address_label' : res['data']['address_label'],
          'address' : res['data']['address'],
          'province_id' : res['data']['province_id'],
          'city_id' : res['data']['city_id'],
          'districts_id' : res['data']['districts_id'],
          'postal_code' : null,
        }) 
      }
      }
    });
  }

  getProvince(){
    this.httpService.GetRequest('province').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.provinces = res.data
      }
    });
  }

  getCity(event){
    //this.loading.present();
    this.kotaIsEnabled = true;
    this.kecamatanIsEnabled = true;
    this.cities = null;
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
