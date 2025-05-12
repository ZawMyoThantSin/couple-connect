import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralPurposeService {

  constructor(private router: Router) { }

  public logout(){
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }
}
