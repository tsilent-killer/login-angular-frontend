import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  userData: any;
  userId: any;
  isLogin: boolean = false;

  public loginStatus:any;

  constructor(
    private _auth: AuthService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if(this.userData.length){
      this.isLogin = true;
    }
    this.userId = this.userData[0].id
    console.log('user Id: ', this.userData[0].id)
  }

  logout(){
    this.isLogin = false;
    this._auth.clearStorage()
    this._router.navigate(['/login']);
  }
}
