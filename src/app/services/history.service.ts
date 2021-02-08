import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HashResponse } from '../interfaces/HashResponse';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private httpClient: HttpClient) { }

  getAllHistory(hashId: string) {
    return new Promise((resolve,reject) => {
      this.httpClient.get<HashResponse>(environment.url + 'history/getallhistory?hashId=' + hashId)
      .subscribe(hashResponse => {
        console.log(hashResponse);
        if (hashResponse.status == 200 && hashResponse.success){
          resolve(hashResponse.hash);
        }
        else if (hashResponse.status == 404 && !hashResponse.success){
          resolve(false);
        }
      },err => {
        reject(err);
      })
    })
  }
}
