import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { EventsService } from '../../services/events.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class SigninPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  socialLogin = {
    email: '',
    fullname: '',
    provider: '',
    social_id: '',
    token: ''
  }
  showPassword = false;
  passwordToggleIcon = "eye";
  constructor(public route : ActivatedRoute, public events: EventsService, public loading: LoaderService, public toastController: ToastController, public menu: MenuController, private formBuilder: FormBuilder, public authService: AuthService, public router : Router) { 
    this.menu.enable(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });  
  }

  ionViewDidEnter(){
    const check = JSON.parse(localStorage.getItem('vuenic-android'));
    if(check){
      this.router.navigate(["tabs/dashboard"])
    }
  }

  async signInWithGoogle() {
    let googleUser = await Plugins.GoogleAuth.signIn();
    this.socialLogin.email = googleUser.email;
    this.socialLogin.fullname = googleUser.displayName;
    this.socialLogin.provider = "GOOGLE"
    this.socialLogin.social_id = googleUser.id.toString();
    this.socialLogin.token = googleUser.authentication.idToken;
    console.log(this.socialLogin)
    console.log(googleUser)
    this.postSocialAuth();
   }

  postSocialAuth(){
    //console.log(this.socialLogin)
    this.loading.present();
    this.authService.Postlogin(this.socialLogin, 'social-login').subscribe(res => {
      //console.log(res)
      if(res.access_token) {
        localStorage.setItem('vuenic-android', JSON.stringify(res));
        this.events.publish('email', res.email);
        this.router.navigate(['/tabs/dashboard'], {replaceUrl: true});
        this.loading.dismiss();
      }else if(res.error){
        this.presentToast('Invalid Token',);
        this.loading.dismiss();
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    //console.log(this.loginForm.value)
    this.loading.present();
    this.authService.Postlogin(this.loginForm.value, 'signin').subscribe(res => {
      //console.log(res)
      if(res.access_token) {
        localStorage.setItem('vuenic-android', JSON.stringify(res));
        this.events.publish('email', res.email);
        this.router.navigate(['/tabs/dashboard'], {replaceUrl: true});
        this.loading.dismiss();
      }else if(res.error){
        this.presentToast('Anda memasukkan Email dan Password yang salah. Isi dengan data yang benar dan coba lagi',);
        this.loading.dismiss();
      }
    });
  }
  
  get f() { return this.loginForm.controls; }
  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  signupPage(){
    this.router.navigate(['/signup'])
  }

  resetPWD(){
    this.router.navigate(['/reset-password'])
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
