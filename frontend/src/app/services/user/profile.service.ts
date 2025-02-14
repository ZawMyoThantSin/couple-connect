import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDefaultAppConfig } from '../../appConfig';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private BASE_URL = `${getDefaultAppConfig().backendHost}/api/v1/users`;

  constructor(private http: HttpClient) { }

  public setUpProfile(data: any, id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Add Bearer Token
    });

    return this.http.patch(`${this.BASE_URL}/${id}/profile/setup`, data, { headers });
  }
}
