import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  Roles: any = ['Admin', 'Author', 'Reader'];
  constructor() { }
  ngOnInit() {
  }
  
}