import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  currentHash:string;
  currentGame: any;
  constructor() { }

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

  removeActiveGame() {
    this.currentGame = null;
    return localStorage.removeItem('currentGame');
  }
}
