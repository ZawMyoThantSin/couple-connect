import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  decodeToken(token: string): string {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token', error);
      return 'null';
    }
  }
  getUserId(token: string): any {
    try {
      const decodedToken:any = jwtDecode(token);
      return decodedToken.id;

    } catch (error) {
      console.error('Invalid token In jwt SErvice: ', error);
      return null;
    }
  }

  getUserRole(token: string): string {
    try {
      const decodedToken:any = jwtDecode(token);
      return decodedToken.role;

    } catch (error) {
      console.error('Invalid token In jwt Service: ', error);
      return '';
    }
  }
}
