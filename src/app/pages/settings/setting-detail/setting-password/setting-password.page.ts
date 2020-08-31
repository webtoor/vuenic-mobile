import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-setting-password',
  templateUrl: './setting-password.page.html',
  styleUrls: ['./setting-password.page.scss'],
})
export class SettingPasswordPage implements OnInit {
  userInfo
  settingPasswordForm: FormGroup;
  submitted;
  statusPWD;
  setPWD;
  stateMessage;
  urlPath : String;
  showOldPassword = false;
  passwordOldToggleIcon = "eye";
  showNewPassword = false;
  passwordNewToggleIcon = "eye";
  showPassword = false;
  passwordToggleIcon = "eye";
  constructor(public toastController : ToastController, private formBuilder: FormBuilder, public route : ActivatedRoute, public router : Router, public loading: LoaderService, public httpService: AuthService) {
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.statusPWD = this.router.getCurrentNavigation().extras.state.statusPWD;
      }

      console.log(this.statusPWD)

      switch (this.statusPWD) {
        case "update-password":
          this.setPWD = 0
          this.stateMessage = "Kata Sandi berhasil diubah"
          this.urlPath = "password"
          this.settingPasswordForm = this.formBuilder.group({
            'old_password' : [null, [Validators.required]],
            'new_password' : [null, [Validators.required]],
          });
            break;
        case "set-password":
          this.setPWD = 1
          this.urlPath = "set-password"
          this.stateMessage = "Anda berhasil set password"
          this.settingPasswordForm = this.formBuilder.group({
            'password' : [null, [Validators.required]],
          });
            break;
        default:
          this.setPWD = 1;
          this.urlPath = "set-password"
          this.stateMessage = "Anda berhasil set password"
          this.settingPasswordForm = this.formBuilder.group({
            'password' : [null, [Validators.required]],
          });
          break;            
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.settingPasswordForm.invalid) {
        return;
    }

    console.log(this.settingPasswordForm.value)
    this.httpService.PutRequest(this.settingPasswordForm.value, this.urlPath).subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          state: {
            message: this.stateMessage,
          }
        };
        this.router.navigate(['/settings/setting-detail'], navigationExtras);
      }else{
        this.presentToast(res.message)
      }
    });
   
  }

  get f() { return this.settingPasswordForm.controls; }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  toggleOldPassword():void{
    this.showOldPassword = !this.showOldPassword
    if(this.passwordOldToggleIcon == "eye"){
      this.passwordOldToggleIcon = "eye-off";
    }else{
      this.passwordOldToggleIcon = "eye";
    }
  }

  toggleNewPassword():void{
    this.showNewPassword = !this.showNewPassword
    if(this.passwordNewToggleIcon == "eye"){
      this.passwordNewToggleIcon = "eye-off";
    }else{
      this.passwordNewToggleIcon = "eye";
    }
  }

  togglePassword():void{
    this.showPassword = !this.showPassword
    if(this.passwordToggleIcon == "eye"){
      this.passwordToggleIcon = "eye-off";
    }else{
      this.passwordToggleIcon = "eye";
    }
  }
}
