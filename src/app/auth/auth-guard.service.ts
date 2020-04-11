import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) { }
  canActivate(): boolean {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) {
      this.router.navigate(['account/login']);    
      return false;
    }
    return true;
  }

  logoutUser() {
    localStorage.setItem('currentUser', null);
    this.router.navigate(['account/register']);
  }


}
