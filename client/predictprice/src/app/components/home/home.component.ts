import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  area: number = 1000;
  bhk: number = 2;
  bathrooms: number = 2;
  location: string = '';
  estimatedPrice!: number;
  locations!: [];
 
  constructor(private http: HttpClient , private router: Router, private cookieService: CookieService) { }
  

  ngOnInit(): void {
    const token = this.cookieService.get('token'); // Assuming your token is stored with the key 'token'

  if (!token) {
    this.router.navigate(['/login']); // Redirect to the login page
  }
    this.getLocationNames();
  }

  getBathValue(): number {
    const uiBathrooms = document.getElementsByName("uiBathrooms");
    for (let i = 0; i < uiBathrooms.length; i++) {
      const checkbox = uiBathrooms[i] as HTMLInputElement;
      if (checkbox.checked) {
        return parseInt(checkbox.value);
      }
    }
    return -1; // Invalid Value
  }
  
  getBHKValue(): number {
    const uiBHK = document.getElementsByName("uiBHK");
    for (let i = 0; i < uiBHK.length; i++) {
      const checkbox = uiBHK[i] as HTMLInputElement;
      if (checkbox.checked) {
        return parseInt(checkbox.value);
      }
    }
    return -1; // Invalid Value
  }
  

  onClickedEstimatePrice(): void {
    console.log("Estimate price button clicked");
    console.log(this.area, this.bhk, this.bathrooms, this.location);

    const url = "http://localhost:5000/predict_home_price";
    this.http.post<any>(url, {
      total_sqft: parseFloat(this.area.toString()),
      size: this.bhk.toString(),
      bath: this.bathrooms.toString(),
      location: this.location
    }).subscribe(data => {
      this.estimatedPrice = data.estimated_price;
    });
  }

  getLocationNames(): void {
    const url = "http://localhost:5000/get_location_names";
    this.http.get<any>(url).subscribe(data => {
      this.locations = data.locations;
      console.log(this.locations)
      // this.location = ''; 
      // for (let i = 0; i < locations.length; i++) {
      //   if (i === 0) {
      //     this.location = locations[i];
      //   }
      // }
    });
  }
}
