import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Title, Meta } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token!: string;

  constructor (private _http:HttpClient, private authService: AuthService, private ngZone: NgZone, private router:Router,private titleService:Title, private cookieService: CookieService) {}
  t: string | null | undefined;
  submitted = false;
  errorMessage:string|null = null;
  loginForm!: FormGroup;
 
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });

  }
  


  async login(loginForm: any){
    this.submitted = true;
    
    if(this.loginForm.invalid) {return}
    else {

      this.cookieService.deleteAll();
      if(await this.authService.login(this.loginForm.value.email, this.loginForm.value.password)){
        this.router.navigate(['/home']);
      }
      else {
        this.loginForm.reset();
      }

    }
  }

  
  
}
