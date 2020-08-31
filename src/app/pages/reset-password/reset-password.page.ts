import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPWDForm: FormGroup;
  resetCodeForm: FormGroup;
  setPasswordForm: FormGroup;

  submitted;
  resetPassword = true
  verifyEmail = false
  setPassword = false
  email;
  showPassword = false;
  passwordToggleIcon = "eye";
  showConfirmPassword = false;
  passwordConfirmToggleIcon = "eye";

  constructor(public router: Router, public toastController : ToastController, private formBuilder: FormBuilder, public httpService : AuthService) { }

  ngOnInit() {
    this.resetPWDForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
    });
    this.resetCodeForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'code' : [null, [Validators.required]],
    });
    this.setPasswordForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, [Validators.required]],
      'confirmation_password' : [null, [Validators.required]],
    });
  }

  togglePassword():void{
    this.showPassword = !this.showPassword
    if(this.passwordToggleIcon == "eye"){
      this.passwordToggleIcon = "eye-off";
    }else{
      this.passwordToggleIcon = "eye";
    }
  }

  toggleConfirmPassword():void{
    this.showConfirmPassword = !this.showConfirmPassword
    if(this.passwordConfirmToggleIcon == "eye"){
      this.passwordConfirmToggleIcon = "eye-off";
    }else{
      this.passwordConfirmToggleIcon = "eye";
    }
  }

  checkEmail() {
    this.submitted = true;
    if (this.resetPWDForm.invalid) {
        return;
    }
    console.log(this.resetPWDForm.value)
    this.httpService.PostRequest(this.resetPWDForm.value, 'reset-password').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        this.resetPassword = false
        this.verifyEmail = true
        this.email = res.email
        this.resetCodeForm.patchValue({
          'email' : res['email'],
        }) 

      }else{
        this.presentToast(res.message)
      }
  
    });
  }
  
  get f() { return this.resetPWDForm.controls; }

  submitCheckCode() {
    this.submitted = true;
    if (this.resetCodeForm.invalid) {
        return;
    }
    console.log(this.resetCodeForm.value)
    this.httpService.PostRequest(this.resetCodeForm.value, 'verify-code-pwd').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        this.email = res.email  
        this.setPasswordForm.patchValue({
          'email' : res['email'],
        }) 
        this.resetPassword = false
        this.verifyEmail = false
        this.setPassword = true
        
      }else{
        this.presentToast(res.message)
      }
  
    });
  }
  
  get g() { return this.resetCodeForm.controls; }

  submitSetPassword() {
    this.submitted = true;
    if (this.setPasswordForm.invalid) {
        return;
    }
    console.log(this.setPasswordForm.value)
    this.httpService.PutRequest(this.setPasswordForm.value, 'reset-password').subscribe(res => {
      console.log(res)
      if(res.status == 200){  
        this.presentToast("Berhasil memperbarui password, Silakan Masuk kembali")
        this.router.navigate(['/signin'], {replaceUrl : true})

      }else{
        this.presentToast(res.message)
      }
  
    });
  }
  
  get h() { return this.resetCodeForm.controls; }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
