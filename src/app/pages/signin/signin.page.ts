import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { EventsService } from '../../services/events.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

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
  socialToken;
  socialProvider;
  showPassword = false;
  passwordToggleIcon = "eye";
  constructor(public route : ActivatedRoute, private authSocial: SocialAuthService, public events: EventsService, public loading: LoaderService, public toastController: ToastController, public menu: MenuController, private formBuilder: FormBuilder, public authService: AuthService, public router : Router) { 
    this.menu.enable(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });  
  }

  ionViewDidEnter(){
    const check = JSON.parse(localStorage.getItem('vuenic-pwa'));
    if(check){
      this.router.navigate(["tabs/dashboard"])
    }
  }

  signInWithGithub(){
    window.location.href='https://github.com/login/oauth/authorize?scope=user%20email&client_id=e9a252050722608e005f&redirect_uri=https://apps.vuenic.com/auth/github/callback';
  }

  signInWithGoogle(): void {
    this.authSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authSocial.authState.subscribe(data => {
      console.log(data)
      this.socialToken = data.idToken
      this.socialProvider = "GOOGLE";
      this.postSocialAuth(data)
    }); 
  }

  postSocialAuth(data){
    //console.log(data.email)
    this.socialLogin.email = data.email;
    this.socialLogin.fullname = data.name;
    this.socialLogin.provider = this.socialProvider;
    this.socialLogin.social_id = data.id.toString();
    this.socialLogin.token = this.socialToken;

    //console.log(this.socialLogin)
    this.loading.present();
    this.authService.Postlogin(this.socialLogin, 'social-login').subscribe(res => {
      //console.log(res)
      if(res.access_token) {
        localStorage.setItem('vuenic-pwa', JSON.stringify(res));
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
        localStorage.setItem('vuenic-pwa', JSON.stringify(res));
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
