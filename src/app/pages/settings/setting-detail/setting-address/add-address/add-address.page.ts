import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  addUserAddressForm : FormGroup;
  submitted = false;
  provinces;
  cities;
  districts;
  constructor(public router : Router, private formBuilder: FormBuilder, public httpService: AuthService) { 
    this.addUserAddressForm = this.formBuilder.group({
      'address_label' : [null, [Validators.required]],
      'address' : [null, [Validators.required]],
      'province_id' : [null, [Validators.required]],
      'city_id' : [{
        value: null,
        disabled : true
      }, Validators.required],
      'districts_id' : [{
        value: null,
        disabled : true
      }, Validators.required],
      'postal_code' : [null],
    });
  }

  ngOnInit() {
    this.getProvince()
  }

  onSubmit() {
    this.submitted = true;
    if (this.addUserAddressForm.invalid) {
        return;
    }
    console.log(this.addUserAddressForm.value)
    this.httpService.PostRequest(this.addUserAddressForm.value, 'user-address').subscribe(res => {
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

  get f() { return this.addUserAddressForm.controls; }


  getProvince(){
    this.httpService.GetRequest('province').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.provinces = res.data
      }
    });
  }

  getCity(event){
    this.addUserAddressForm.get('city_id').reset();
    this.addUserAddressForm.get('districts_id').reset();
    this.httpService.GetRequest('city/'+ event.detail.value).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.addUserAddressForm.get('city_id').enable();
        this.cities = res.data
      }
    });
  }

  getDistricts(event){
    let city_id = event.detail.value
    this.addUserAddressForm.get('districts_id').reset();
    if(city_id){
      this.httpService.GetRequest('district/'+ event.detail.value).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.addUserAddressForm.get('districts_id').enable();
          this.districts = res.data
        }
      });
    }
  }

  

}
