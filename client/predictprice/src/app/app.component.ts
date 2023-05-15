import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'predictprice';

  constructor(private router: Router, private cookieService: CookieService) { }
  isTokenExists(): boolean {
    const token = this.cookieService.get('token'); // Assuming your token is stored with the key 'token'
    return !!token; // Return true if token exists, false otherwise
  }
  logout(): void {
    // Remove the token from cookies
    this.cookieService.delete('token'); // Assuming your token is stored with the key 'token'
  
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
