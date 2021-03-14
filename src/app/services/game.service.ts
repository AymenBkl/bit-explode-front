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

  createGame(gameHash: string, game: Game,addressId: string) {
      return new Promise((resolve,reject) => {
        if (addressId != null && addressId != ''){
          
          this.httpClient.post<GameResponse>(environment.url + 'game/creategame', {gameHash: gameHash,game: game,addressId: addressId})
          .subscribe(gameResponse => {
            console.log(gameResponse);
            if (gameResponse.status == 200 && gameResponse.success){
              resolve(this.proceccGameResponseSuccess(gameResponse.msg,gameResponse.game));
            }
          },err => {
            reject(err);
          })
    }
    else {
      resolve({status: false,type:'addressId'});
    }
  })
    
  }

  clickCol(gameHash: string, gameId: string,addressId:string, indexRow: number, indexCol: number,val: number) {
    return new Promise((resolve,reject) => {
      this.httpClient.post<ColClickResponse>(environment.url + 'game/clickcel', {gameHash: gameHash, gameId: gameId, rowIndex: indexRow,colIndex: indexCol,value: val,addressId: addressId})
      .subscribe(colResponse => {
        console.log(colResponse);
        if (colResponse.status == 200 && colResponse.success){
          resolve(this.proccesClickCelResponseSuccess(colResponse.msg,colResponse.response));
        }
      },err => {
        reject(err);
      })
    })
  }

  checkGame(gameHash: string) {
    return new Promise((resolve,reject) => {
      this.httpClient.post<CheckGameResponse>(environment.url + 'game/checkgame', {gameHash: gameHash})
      .subscribe(checkGameResponse => {
        console.log(checkGameResponse);
        if (checkGameResponse.status == 200 && checkGameResponse.success){
          resolve(this.proccesCheckGameResponseSuccess(checkGameResponse.msg,checkGameResponse.game));
        }
      },err => {
        reject(err);
      })
    })
  }

  cashOut(gameHash:string,addressId: string) {
    return new Promise((resolve,reject) => {
      if (addressId != null && addressId != ''){
        this.httpClient.post<ColClickResponse>(environment.url + 'game/cashout', {gameHash: gameHash,addressId:addressId})
        .subscribe(cashOutGameResponse => {
          console.log(cashOutGameResponse);
          if (cashOutGameResponse.status == 200 && cashOutGameResponse.success){
            resolve(this.proccesClickCelResponseSuccess(cashOutGameResponse.msg,cashOutGameResponse.response));
  
          }
        },err => {
          reject(err);
        })
      }
      else {
        resolve({status: false,type:'addressId'});
      }
    })
  }



  proceccGameResponseSuccess(msg: string,game: Game) {
    console.log(msg);
    if (msg == 'YOUR GAME HAS BEEN CREATED') {
      console.log("create");
      return game;
    }
    else if (msg == 'YOU ALREADY HAVE A GAME'){
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
    else if (msg == 'YOU WON THE GAME' || msg == 'YOU WITHDRAW THE GAME') {
      return {color: response.color,userClick: response.userClick,indexMines: response.indexMines,data:response.data,mines:response.mines};
    }
    
    else if (msg == 'This cell is already clicked') {
      return {color: response.color,userClick: response.userClick,value:response.value};
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
