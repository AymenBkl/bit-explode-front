import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  currentHash:string;
  currentGame: any;
  constructor() { }


   checkHash(hash: string) : any{
    const gameHash =  localStorage.getItem(hash);
    if (gameHash != null && gameHash != undefined){
      this.currentHash = hash;
      return gameHash
    }

    else {
      this.currentHash = '';
      return false
    }
  }

  async saveHash(hash: string){
    this.currentHash = hash;
    await localStorage.setItem(hash,JSON.stringify({}));
  }



  async saveActiveHash(hash: string){
    this.currentHash = hash;
    await localStorage.setItem('currentHash',hash);
  }

  getCurrentHash(){
    this.currentHash = localStorage.getItem('currentHash');
    return this.currentHash;
  }

  async saveCurrentGame(gameId: string) {
    this.currentGame = localStorage.setItem('currentGame',gameId);
    return this.currentGame;
  }

  getCurrentGame() {
    this.currentGame = localStorage.getItem('currentGame');
    return this.currentGame;
  }
}
