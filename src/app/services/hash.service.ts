import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hash } from 'crypto';
import { environment } from 'src/environments/environment';
import { HashResponse } from '../interfaces/HashResponse';

@Injectable({
  providedIn: 'root'
})
export class HashService {
  constructor(private httpClient: HttpClient) { }

  checkHash(hashId: string) {
    return new Promise((resolve,reject) => {
      this.httpClient.get<HashResponse>(environment.url + 'hash/checkHash?hashId=' + hashId)
      .subscribe(hashResponse => {
        if (hashResponse.status == 200 && hashResponse.success){
          resolve(this.proccessHashResponse(hashResponse.msg,hashResponse.hash));
        }
      })
    })
  }

  proccessHashResponse(msg: string,hash: Hash){
    if (msg == 'YOUR CURRENT HASH'){
      console.log("true");
      console.log(hash);
    }
  }
}
