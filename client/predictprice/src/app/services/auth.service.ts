import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated!: boolean;
  errorMessage: any;
  t!: string | null;
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  async login(email: string, password: string) {
   try {
    const res = await this.http.post<{ token: string }>('http://localhost:5500/signin', {email, password})
    .pipe(
      tap(({ token }) => this.setTokenInCookie(token))
    ).toPromise();
    this.isAuthenticated = true;
    console.log(this.cookieService.get('token'));
    return true;
   }catch (error:any) {
    this.errorMessage = error.error.msg;
    console.log(this.errorMessage);
    return false;
  }
  
    
}

async logout() {
  try {
    await this.deleteTokenFromCookie();
    console.log('Token removed from cookie');
  } catch (error) {
    console.error(error);
  }
}

async deleteTokenFromCookie() {
  return new Promise<void>((resolve) => {
    this.cookieService.delete('token');
    resolve();
  });
}

setTokenInCookie(token: string) {
  this.cookieService.set('token', token, new Date(Date.now() + 86400000), '/');
  }
 
}
