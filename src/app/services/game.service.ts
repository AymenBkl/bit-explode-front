import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GameResponse } from '../interfaces/gameResponse';
import { Game } from '../interfaces/game';
import { ColClickResponse } from '../interfaces/colClickResponse';
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

  clickCol(gameHash: string, gameId: string, indexRow: number, indexCol: number) {
    return new Promise((resolve,reject) => {
      this.httpClient.post<ColClickResponse>(environment.url + 'game/clickcel', {gameHash: gameHash, gameId: gameId, rowIndex: indexRow,colIndex: indexCol})
      .subscribe(gameResponse => {
        if (gameResponse.status == 200 && gameResponse.success){
          resolve(this.proceccGameResponseSuccess(gameResponse.msg,null));
        }
      })
    })
  }

  proceccGameResponseSuccess(msg: string,game: Game) {
    if (game == null) {
      if (msg == 'YOU HAVE CLICK RIGHT CELL'){
        console.log('cel');
      }
  
      else if (msg == 'YOU HAVE CLICK MINE CELL') {
        console.log('mine');
      }
    }
    else {
      if (msg == 'YOUR GAME HAS BEEN CREATED') {
        console.log("create");
        return game;
      }
    }
    
    
  }
}
