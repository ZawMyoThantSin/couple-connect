import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getDefaultAppConfig } from '../../appConfig';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userProfileSource = new BehaviorSubject<User | null>(null);
  userProfile$ = this.userProfileSource.asObservable();

  updateUserState(user: User): void {
    this.userProfileSource.next(user);
  }
  private BASE_URL = `${getDefaultAppConfig().backendHost}/api/v1/users`;

  constructor(private http: HttpClient) { }

  public setUpProfile(data: any, id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Add Bearer Token
    });

    return this.http.patch(`${this.BASE_URL}/${id}/profile/setup`, data, { headers });
  }

  public getProfile(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Add Bearer Token
    });

    return this.http.get<User>(`${this.BASE_URL}/profile`, { headers });
  }

  getImageUrl(imagePath: string): string {
    return `${getDefaultAppConfig().backendHost}${imagePath}`;
  }
}
