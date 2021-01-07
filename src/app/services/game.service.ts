import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GameResponse } from '../interfaces/gameResponse';
import { Game } from '../interfaces/game';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient : HttpClient) { }

  createGame(gameHash: string, game: Game) {
    return new Promise((resolve,reject) => {
      this.httpClient.post<GameResponse>(environment.url + 'game/creategame', {gameHash: gameHash,game: game})
      .subscribe(gameResponse => {
        if (gameResponse.status == 200 && gameResponse.success){
          resolve(this.proceccGameResponseSuccess(gameResponse.msg,gameResponse.game));
        }
      })
    })
    
  }

  proceccGameResponseSuccess(msg: string,game: Game) {
    if (msg == 'YOU HAVE CLICK RIGHT CELL'){
      console.log('cel');
    }

    else if (msg == 'YOU HAVE CLICK MINE CELL') {
      console.log('mine');
    }
    else if (msg == 'YOUR GAME HAS BEEN CREATED') {
      console.log("create");
      return game;
    }
  }
}
