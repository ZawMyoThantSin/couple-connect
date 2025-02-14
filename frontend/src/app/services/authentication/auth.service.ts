import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getDefaultAppConfig } from '../../appConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserId = new BehaviorSubject<number | null>(null);
  userId$ = this.loggedInUserId.asObservable();

  private BASE_URL = getDefaultAppConfig().backendHost;

  constructor(private http: HttpClient) { }

  updateUserId(id: number): void {
    this.loggedInUserId.next(id);
  }

  login(data:User):Observable<any>{
    const header = new HttpHeaders({'Content-Type':'application/json'})
    return this.http.post(`${this.BASE_URL}/login`,data , { headers:header});
  }

  signup(data:User):Observable<any>{
    const header = new HttpHeaders({'Content-Type':'application/json'})
    return this.http.post(`${this.BASE_URL}/signup`,data , { headers:header});
  }
}
