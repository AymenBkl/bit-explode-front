import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  currentHash:string;
  games: any;
  constructor() { }


   checkHash(hash: string) : any{
    const gameHash =  localStorage.getItem(hash);
    if (gameHash != null && gameHash != undefined){
      this.currentHash = hash;
      this.games = JSON.parse(gameHash);
      return gameHash
    }

    else {
      this.currentHash = '';
      this.games = null;
      return false
    }
  }

  async saveHash(hash: string){
    this.currentHash = hash;
    await localStorage.setItem(hash,JSON.stringify({}));
  }

  async saveGame(game: Game) {
    this.games[game.gameId] = game;
    await localStorage.setItem(this.currentHash,JSON.stringify(this.games));
  }

  async saveActiveHash(hash: string){
    this.currentHash = hash;
    await localStorage.setItem('currentHash',hash);
  }

  getCurrentHash(){
    this.currentHash = localStorage.getItem('currentHash');
    return this.currentHash;
  }
}
