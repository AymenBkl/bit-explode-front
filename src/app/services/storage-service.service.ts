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
    await localStorage.setItem('currentHash',JSON.stringify(hash));
  }

  getCurrentHash(){
    this.currentHash = JSON.parse(localStorage.getItem('currentHash'));
    return this.currentHash;
  }
}
