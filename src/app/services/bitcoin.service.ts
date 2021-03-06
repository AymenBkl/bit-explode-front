import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private httpClient: HttpClient) { }


  getNewAddress(hashId: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post<any>(environment.url + 'bitcoin/getnewaddress', { hashId: hashId })
        .subscribe(newAddressResponse => {
          console.log(newAddressResponse);

          if (newAddressResponse.status == 200 && newAddressResponse.success) {
          }
        }, err => {
          reject(err);
        })
    })
  }
}
