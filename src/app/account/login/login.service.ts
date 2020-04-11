import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppGlobals } from '../../shared/app.global';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(AppGlobals.baseAPIUrl + 'api/Token', { username: username, password: password }, { headers: { 'Content-Type': 'application/json' } })
      .map(user => {
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  emailVerificationCodeForForgotPassword(username: string) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //unable to send AuthToken because current is null. How to handle this situation
    return this.http.post<any>(AppGlobals.baseAPIUrl + 'api/Token/getVerificationCodeForForgotPassword',
      { username: username }, { headers: { 'Content-Type': 'application/json' } }
    )
      .map(res => {
        return res;
      });
  }

  resetPassword(loginModel:any) {
    //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //var body = { Password: loginModel.newPassword, ModifyBy: currentUser.Id };
    var body ={ email: loginModel.username, emailVerificationCode: loginModel.emailVerificationCode, newPassword: loginModel.newPassword }; 
    return this.http.post<any>(AppGlobals.baseAPIUrl + 'api/Token/resetPassword',body,{ headers: { 'Content-Type': 'application/json' }
    })
      .map(res => {
        return res;
      });
  }

  emailVerificationCodeForActivation(username: string) { 
    return this.http.post<any>(AppGlobals.baseAPIUrl + 'api/Token/getVerificationCodeForActivation',
      { username: username }, { headers: { 'Content-Type': 'application/json' } }
    )
      .map(res => {
        return res;
      });
  }

  activateUser(loginModel: any) {
    var body = { email: loginModel.username, emailVerificationCode: loginModel.emailVerificationCode, mobileVerificationCode: loginModel.mobileVerificationCode, newPassword: loginModel.newPassword };
    return this.http.post<any>(AppGlobals.baseAPIUrl + 'api/Token/activateUserAndResetPassword', body, {
      headers: { 'Content-Type': 'application/json' }
    })
      .map(res => {
        return res;
      });
  }
}
