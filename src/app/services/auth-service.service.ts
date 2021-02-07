import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient: HttpClient) { }

  saveToken(token: string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  checkJWT() {
    return new Promise((resolve,reject) => {
      const token = this.getToken();
      if (token){
        console.log(token);
        this.httpClient.get<AuthResponse>(environment.url + 'auth/checkJWT')
        .subscribe(response => {
          console.log(response);
          if (response.token === 'TOKEN VALID' && response.status === 200){
            this.saveToken('token');
            resolve(true);
          }
          else {
            this.removeToken();
            resolve(false);
          }
        }, err => {
          console.log(err);
          reject(err);
          this.removeToken();
        });
      }
    else {
      resolve(false);
      this.removeToken();
    }
    })
  }
}
