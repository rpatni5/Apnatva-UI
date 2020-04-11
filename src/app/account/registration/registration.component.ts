import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  model: any = {};
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }  
    
} 
