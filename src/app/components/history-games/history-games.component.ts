import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.router.navigate(['/history'], {
      relativeTo: this.activatedRouter,
      queryParams: {
        url: this.gameHash.hashId,
        playingame: JSON.stringify(game)
      },
      queryParamsHandling: 'merge',
    });
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
  }

}
