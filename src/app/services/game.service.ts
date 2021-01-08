import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GameResponse } from '../interfaces/gameResponse';
import { Game } from '../interfaces/game';
import { ColClickResponse } from '../interfaces/colClickResponse';
import { ClickCel } from '../interfaces/clickCel';
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
      .subscribe(colResponse => {
        console.log(colResponse);
        if (colResponse.status == 200 && colResponse.success){
          resolve(this.proccesClickCelResponseSuccess(colResponse.msg,colResponse.response));
        }
      })
    })
  }

  proceccGameResponseSuccess(msg: string,game: Game) {
    if (msg == 'YOUR GAME HAS BEEN CREATED') {
      console.log("create");
      return game;
    }
  }

  proccesClickCelResponseSuccess(msg: string, response: ClickCel) {
    if (msg == 'YOU HAVE CLICK RIGHT CELL'){
      return {color: response.color,userClick: response.userClick};
    }

    else if (msg == 'YOU HAVE CLICK MINE CELL') {
      return {color: response.color,userClick: response.userClick,indexMines: response.indexMines};
    }
  }
}
