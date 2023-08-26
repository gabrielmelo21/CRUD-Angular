import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImgStorageService {
  private apiUrl = 'https://api.web3.storage';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxMjY5MjdkYkQ1OTc3NzU5MzAzRTE5NEMxRDNiNDlGMURCQkVkODMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI2NjQ3OTU3OTUsIm5hbWUiOiJBcGlUb2tlblRlc3RlIn0.y2dAYL0P0uZC6N2fslVnX6k65lODV_GzJCcIgsdi32s';

  constructor(private http: HttpClient) {}

  getImageDataByCID(cid: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get(`${this.apiUrl}/car/${cid}`,  { headers, responseType: 'blob' } );
  }
}
