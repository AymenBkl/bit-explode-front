import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {

  currentLink: string;
  @Input('type') type: string;
  @Input('name') name:string;
  constructor(private router: Router,
              private modalController: ModalController,
              public platform: Platform) { }

  ngOnInit() {
    this.getCurrentRoute();
  }


  getCurrentRoute() {
    if (!this.type || (this.type && this.type != 'modal')) {
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.currentLink = val.url.split('/')[1].split('?')[0]
        }
      });
    }
    else {
      this.currentLink = this.name;
    }

  }

  close(){
    this.modalController.dismiss();
  }

}
