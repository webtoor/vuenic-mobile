import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {

  constructor(public menu: MenuController, public router : Router) {
    this.menu.enable(false);

   }

  ngOnInit() {
  }
  
  goToDashboard(){
    this.router.navigate(["tabs/dashboard"])
  }

}
