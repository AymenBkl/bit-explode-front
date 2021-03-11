import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';
import { Hash } from '../interfaces/hash';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  currentHash: Hash;
  currentGame: any;
  constructor() { }

  async saveActiveHash(hash: Hash){
    this.currentHash = hash;
    console.log('hash',this.currentHash);
    await localStorage.setItem('currentHash',JSON.stringify(hash));
  }

  getCurrentHash(){
    this.currentHash = JSON.parse(localStorage.getItem('currentHash'));
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
