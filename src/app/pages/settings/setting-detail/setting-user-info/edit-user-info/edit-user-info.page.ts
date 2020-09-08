import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.page.html',
  styleUrls: ['./edit-user-info.page.scss'],
})
export class EditUserInfoPage implements OnInit {
  EditUserInfoForm: FormGroup;
  formName;
  formType;
  labelName;
  userInfoType;
  userInfoParams;
  submitted = false;
  dateNow;
  constructor(private formBuilder: FormBuilder, public route : ActivatedRoute, public router: Router, public httpService: AuthService) { 
   
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userInfoType = this.router.getCurrentNavigation().extras.state.userInfoType;
        this.userInfoParams = this.router.getCurrentNavigation().extras.state.userInfoParams;
      }

      switch (this.userInfoType) {
        case 1:
            this.labelName = "Nama Lengkap"
            this.formName = "fullname"
            this.formType = "text";
            this.EditUserInfoForm = this.formBuilder.group({
              'fullname' : [this.userInfoParams, [Validators.required]],
            });
            break;
        case 2:
            this.labelName = "Tanggal Lahir";
            this.formName = "dateofbirth";
            let now = new Date();
            this.dateNow = formatDate(now,"yyyy-MM-dd", "en");
            this.EditUserInfoForm = this.formBuilder.group({
              'dateofbirth' : [this.userInfoParams, [Validators.required]],
            });
            break;
        case 3:
            this.labelName = "Jenis Kelamin";
            this.formName = "gender";
            this.EditUserInfoForm = this.formBuilder.group({
              'gender' : [this.userInfoParams, [Validators.required]],
            });
            break;
        case 4:
            this.labelName = "Email";
            this.formName = "email";
            this.formType = "email";
            this.EditUserInfoForm = this.formBuilder.group({
              'email' : [this.userInfoParams, [Validators.required, Validators.email]],
            });
            break;
        case 5:
            this.labelName = "Nomor Ponsel";
            this.formName = "phonenumber";
            this.formType = "number";
            this.EditUserInfoForm = this.formBuilder.group({
              'phonenumber' : [this.userInfoParams, [Validators.required]],
            });
            break;
        default:
          this.labelName = "Nama Lengkap"
          this.formName = "fullname"
          this.formType = "text";
          this.EditUserInfoForm = this.formBuilder.group({
            'fullname' : [null, [Validators.required]],
          });
          break;            
      }    
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.EditUserInfoForm.invalid) {
        return;
    }

    if(this.EditUserInfoForm.value.dateofbirth !== ""){
      this.EditUserInfoForm.patchValue({
        dateofbirth : formatDate(this.EditUserInfoForm.value.dateofbirth,'yyyy-MM-dd', 'en'),
      })
    }
    console.log(this.EditUserInfoForm.value)
    this.httpService.PutRequest(this.EditUserInfoForm.value, 'user-info').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          state: {
            refreshPage: 1,
          }
        };
        this.router.navigate(['/settings/setting-detail/setting-user-info'], navigationExtras);
      }
    });
  }

  get f() { return this.EditUserInfoForm.controls; }

}
