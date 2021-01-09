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
        console.log(hashResponse);
        if (hashResponse.status == 200 && hashResponse.success){
          resolve(hashResponse.hash);
        }
        else if (hashResponse.status == 404 && !hashResponse.success){
          resolve(false);
        }
      })
    })
  }

  createHash() {
    return new Promise((resolve,reject) => {
      this.httpClient.post<HashResponse>(environment.url + 'hash/createHash',{})
      .subscribe(hashResponse => {
        console.log(hashResponse);
        if (hashResponse.status == 200 && hashResponse.success){
          resolve(hashResponse.hash);
        }
        else if (hashResponse.status == 404 && !hashResponse.success){
          resolve(false);
        }
      })
    })
  }

}
