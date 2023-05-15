import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean | undefined;

  constructor (private _http:HttpClient, private router: Router) {
    
  }
  errorMessage:string|null = null;
  signupForm!: FormGroup;
    ngOnInit(): void {
      this.signupForm = new FormGroup({

        Fname: new FormControl(null, Validators.required),
        Lname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        mobile: new FormControl(null, Validators.required),
        dob: new FormControl(null, Validators.required),

      });
      
    
    }
    
    signup(signupForm: any){
      this.submitted = true;

      if(this.signupForm.invalid) { return}

      else { 
        
        this._http.post('http://localhost:5500/signup', this.signupForm.value).subscribe((res: any) => {
          
          this.router.navigate(['/login']);

        }, (err: { error: { msg: string | null; }; }) => {
          this.errorMessage = err.error.msg;
          
          this.signupForm.reset();
          
        });
      }
    }
    

}