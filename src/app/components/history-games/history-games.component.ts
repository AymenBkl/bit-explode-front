import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Game } from 'src/app/interfaces/game';
import { Hash } from 'src/app/interfaces/hash';
import { HistoryService } from 'src/app/services/history.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-history-games',
  templateUrl: './history-games.component.html',
  styleUrls: ['./history-games.component.scss'],
})
export class HistoryGamesComponent implements OnInit {

  historyGames: Game[];
  gameHash: Hash;
  constructor(private router: Router,
              private activatedRouter: ActivatedRoute,
              private historyService: HistoryService,
              private storageService: StorageServiceService) { }

  ngOnInit() {
    this.gameHash = this.storageService.getCurrentHash();
    this.getAllHistory();
  }


  goToHistoryPage(game:Game){
    let navigationExtras: NavigationExtras = { state: { url: this.gameHash.hashId,playingame:JSON.stringify(game) } };
    this.router.navigate(['/history'], navigationExtras);
  }

  getAllHistory() {
    this.historyService.getAllHistory(this.gameHash.hashId)
      .then((result: any) => {
        console.log(result);
        if (result && result != false){
          console.log("here");
          this.historyGames = result.games;
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

}
