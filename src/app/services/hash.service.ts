import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hash } from '../interfaces/hash';
import { environment } from 'src/environments/environment';
import { HashResponse } from '../interfaces/HashResponse';
import { AuthServiceService } from './auth-service.service';
import { Complaint } from '../interfaces/complaint';
import { ComplaintResponse } from '../interfaces/complaintResponse';

@Injectable({
  providedIn: 'root'
})
export class HashService {
  constructor(private httpClient: HttpClient,
              private authService: AuthServiceService) { }

  checkHash(hashId: string) {
    return new Promise((resolve,reject) => {
      this.httpClient.get<HashResponse>(environment.url + 'hash/checkHash?hashId=' + hashId)
      .subscribe(hashResponse => {
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

  createHash() {
    return new Promise((resolve,reject) => {
      this.httpClient.post<HashResponse>(environment.url + 'hash/createHash',{})
      .subscribe(hashResponse => {
        console.log(hashResponse);
        if (hashResponse.status == 200 && hashResponse.success){
          this.authService.saveToken(hashResponse.msg);
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

  makeComplaint(complaint: Complaint) {
    return new Promise((resolve,reject) => {
      this.httpClient.post<HashResponse>(environment.url + 'hash/createcomplaint',{complaint:complaint})
      .subscribe(hashResponse => {
        console.log(hashResponse);
        if (hashResponse.status == 200 && hashResponse.success){
          resolve(true);
        }
        else if (hashResponse.status != 200 && !hashResponse.success){
          resolve(false);
        }
      },err => {
        reject(err);
      })
    })
  }


  complaints(hashId:string) {
    return new Promise((resolve,reject) => {
      this.httpClient.get<ComplaintResponse>(environment.url + 'hash/complaints?hashId=' + hashId)
      .subscribe(complaintResponse => {
        if (complaintResponse.status == 200 && complaintResponse.success){
          resolve(complaintResponse.complaints);
        }
        else if (complaintResponse.status == 404 && !complaintResponse.success){
          resolve({status:'NOT FOUND'});
        }
        else {
          resolve(false);
        }
      },err => {
        reject(err);
      })
    })
  }


}
