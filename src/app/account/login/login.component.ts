import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { HelperService } from '../../admin/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private helperService: HelperService) { }

  ngOnInit() {
    // reset login status
    //this.loginService.logout();
    var user = localStorage.getItem('currentUser');
    if (user != null) {
      this.router.navigateByUrl("/admin/allgroup");
    }
  }
  onKeydown(event) {
  }
  login() {
    this.loading = true;
    //this.loginService.login(this.model.username, this.model.password)
    //  .subscribe(
    //  data => {
    //    if (data && data.status != -1) {
    //      // login successful if there's a jwt token in the response
    //      localStorage.setItem('currentUser', JSON.stringify(data.data));
    //      this.router.navigateByUrl("/admin/allgroup");
    //    } else {
    //      this.helperService.error(data.message, "0");
    //    }
    //    this.loading = false;
    //  }
      //,
      //error => {
      //  this.helperService.error("Please enter username and password","0");
      //  this.loading = false;
      //}
      //);
  }

}
