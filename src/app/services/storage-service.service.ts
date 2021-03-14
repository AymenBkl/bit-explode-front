import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';
import { Hash } from '../interfaces/hash';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  async saveActiveHash(hash: Hash){
    await localStorage.setItem('currentHash',JSON.stringify(hash));
  }

  getCurrentHash(){
    let  currentHash : Hash = JSON.parse(localStorage.getItem('currentHash'));
    return currentHash;
  }

  getAddressId() {
    let  currentHash : Hash = JSON.parse(localStorage.getItem('currentHash'));
    if (currentHash.address && currentHash.address._id){
      return currentHash.address._id;
    }
    else {
      return '';
    }
  }
}
