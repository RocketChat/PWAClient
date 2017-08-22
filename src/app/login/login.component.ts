import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../shared/websocket/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SocialLoginService } from '.././shared/SocialLogin/social-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginObs;
  private channelObs;
  private accesstoken;

  ac_token: any;

  constructor(private _ws: WebsocketService, private router: Router,
    private _socialLogin: SocialLoginService, private snackBar: MdSnackBar,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        console.log('loging params:' + params);
        // this.accesstoken = params['#access_token'];
      });
    console.log('logging accestoken:' + this.accesstoken);
  }
  logIn(username: string, password: string) {
    console.log(username, password);
    this.loginObs = this._ws.signIn(username, password).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open(data, 'Ok', {
          duration: 2000
        });
        if (data === 'Logging In..') {
          this.router.navigate(['/app']);
        }
      },
      (err) => console.error(err),
      () => console.log('Login completed')
    );
  }

  getChannels(time: number) {
    this.channelObs = this._ws.listChannels(time).subscribe(
      (data) => console.log(data),
      (err) => console.error(err),
      () => console.log('completed fetching channels')
    );
  }

  socialLogin() {
    console.log('Github Login Clicked');
    this._socialLogin.login();
  }
}

