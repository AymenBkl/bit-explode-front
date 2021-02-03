import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GameResponse } from '../interfaces/gameResponse';
import { Game } from '../interfaces/game';
import { ColClickResponse } from '../interfaces/colClickResponse';
import { ClickCel } from '../interfaces/clickCel';
import { CheckGameResponse } from '../interfaces/checkGameResponse';
import { Col } from '../interfaces/col';
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

  clickCol(gameHash: string, gameId: string, indexRow: number, indexCol: number,val: number) {
    return new Promise((resolve,reject) => {
      this.httpClient.post<ColClickResponse>(environment.url + 'game/clickcel', {gameHash: gameHash, gameId: gameId, rowIndex: indexRow,colIndex: indexCol,value: val})
      .subscribe(colResponse => {
        console.log(colResponse);
        if (colResponse.status == 200 && colResponse.success){
          resolve(this.proccesClickCelResponseSuccess(colResponse.msg,colResponse.response));
        }
      })
    })
  }

  checkGame(gameHash: string, gameId: string) {
    console.log("here",gameHash,gameId);
    return new Promise((resolve,reject) => {
      this.httpClient.post<CheckGameResponse>(environment.url + 'game/checkgame', {gameHash: gameHash, gameId: gameId})
      .subscribe(checkGameResponse => {
        console.log(checkGameResponse);
        if (checkGameResponse.status == 200 && checkGameResponse.success){
          resolve(this.proccesCheckGameResponseSuccess(checkGameResponse.msg,checkGameResponse.game));
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
      return {color: response.color,userClick: response.userClick,indexMines: response.indexMines,data:response.data,mines:response.mines};
    }
  }

  proccesCheckGameResponseSuccess(msg: string,game: {game: Game, activeIndex : [{col:Col,indexRow: number, indexCol: number }]}) {
    if (msg == 'YOU HAVE A GAME'){
      return game;
    }

    else if (msg == 'YOU HAVE NO GAME') {
      return game;
    }
  }
}
