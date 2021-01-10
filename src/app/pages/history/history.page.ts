import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Col } from 'src/app/interfaces/col';
import { Game } from 'src/app/interfaces/game';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  matrix:Array<Array<Col>>;
  game: Game;
  constructor(private activatedRouter: ActivatedRoute,
    private storage: StorageServiceService,
    private router: Router) { }

  ngOnInit() {
    this.checkRouter();
  }


  checkRouter(){
    this.activatedRouter.queryParams.subscribe(params => {
      this.game = JSON.parse(params['playingame']);
      console.log(this.game);
    })
  }
}
