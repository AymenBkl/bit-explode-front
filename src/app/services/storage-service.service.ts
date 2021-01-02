import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }


   checkHash(hash: string) : any{
    const gameHash =  localStorage.getItem(hash);
    if (gameHash != null && gameHash != undefined){
      return gameHash
    }

    else {
      return false
    }
  }

  async saveHash(hash: string){
    await localStorage.setItem(hash,JSON.stringify({}));
  }

  async saveGame(gameHash:string ,game: Game,games: any) {
    games[game.gameId] = game;
    await localStorage.setItem(gameHash,JSON.stringify(games));
  }
}
