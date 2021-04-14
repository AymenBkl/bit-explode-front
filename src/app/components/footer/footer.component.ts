import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { complaintForm, makeComplaintForm } from 'src/app/functions/handlers';
import { Hash } from 'src/app/interfaces/hash';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { ComplaintComponent } from '../modals/complaint/complaint.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  gameHash: Hash;
  constructor(private router: Router,
              private storageService: StorageServiceService,
              private modalCntrl: ModalController) { }

  ngOnInit() {
    this.getHash();
  }

  getHash() {
    this.gameHash = this.storageService.getCurrentHash();
  }

  goTo(router: string){
    this.router.navigate([router]);
  }

  async makeComplaint() {
    makeComplaintForm({hashId:this.gameHash._id},this.modalCntrl);
  }

}
