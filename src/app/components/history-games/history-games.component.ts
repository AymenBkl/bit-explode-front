import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-history-games',
  templateUrl: './history-games.component.html',
  styleUrls: ['./history-games.component.scss'],
})
export class HistoryGamesComponent implements OnInit {

  @Input('gameHash') gameHash: string;
  @Input('historyGames') historyGames: Game[];
  constructor(private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {}


  goToHistoryPage(game:Game){
    this.router.navigate(['/history'], {
      relativeTo: this.activatedRouter,
      queryParams: {
        url: this.gameHash,
        playingame: JSON.stringify(game)
      },
      queryParamsHandling: 'merge',
    });
  }

}
