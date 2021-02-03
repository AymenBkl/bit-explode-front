import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Col } from 'src/app/interfaces/col';
import { EncryptedData } from 'src/app/interfaces/encryptedData';
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
  colClick: {col:Col,indexRow: number, indexCol: number,data:EncryptedData,mines: string }[] = [];
  constructor(private activatedRouter: ActivatedRoute,
    private storage: StorageServiceService,
    private router: Router) { }

  ngOnInit() {
    this.checkRouter();
  }


  checkRouter(){
    this.activatedRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (!this.game){
          this.game = JSON.parse(this.router.getCurrentNavigation().extras.state.playingame);
          this.clickCols();
        }
        
      }
    });
  }

  clickCols(){
    this.colClick = [];
    this.game.matrix.map((row,indexRow) => {
      row.map((col,indexCol) => {
        if (col.clicked && col.color == 'green'){
          this.colClick.push({col:col,indexRow:indexRow,indexCol:indexCol,data:null,mines:null});
        }
        else if (col.clicked && col.color == 'red') {
          this.colClick.push({col:null,indexRow:indexRow,indexCol:indexCol,data:this.game.data,mines:null});
        }
      })
    })
  }
}
