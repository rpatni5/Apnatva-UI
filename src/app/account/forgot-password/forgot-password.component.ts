/// <reference path="../../admin/helper/helper.service.ts" />
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { HelperService } from '../../admin/helper/helper.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  model: any = {};
  loading = false;
  isVerificationCodeSent: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private helperService: HelperService) { }

  ngOnInit() {
    // reset login status
    this.loginService.logout();
  }
  onKeydown(event) {
    //this.errormessage = 'hmm';
  }
  onGetVerificationClick() {
    this.GetVerificationCodeByEmail(this.model.username);
    this.isVerificationCodeSent = true;
  }
  onSubmitClick() {
    this.ResetPassword();
  }
  login() {
    this.loading = true;
    this.loginService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        if (data && data.status != -1) {
          // login successful if there's a jwt token in the response
          localStorage.setItem('currentUser', JSON.stringify(data.data));
          this.router.navigateByUrl("/admin/allgroup");
        } else {
          this.helperService.error(data.message,"0");
        }
        this.loading = false;
      }
      ,
      error => {
        this.helperService.error("Please enter username and password","0");
        this.loading = false;
      }
      );
  }

  GetVerificationCodeByEmail(username: string) {
    this.loginService.emailVerificationCodeForForgotPassword(username).subscribe(
      res => {
        this.helperService.error(res.message, "0");
      });
  }


  ResetPassword() {
    if (this.model.newPassword != this.model.retypePassword) {
      this.helperService.error("Password does not match", "0");

    }
    else {
      this.loginService.resetPassword(this.model).subscribe(
        res => {
          if (res.status == 0) {
            this.helperService.success(res.message, "0");;
            setTimeout(
              () => {
                this.router.navigateByUrl("/account/login");
              }, 3000)
          }
          else if (res.status == -1) {
            this.helperService.error(res.message, "0");;

          }


        });
    }
  }
}
