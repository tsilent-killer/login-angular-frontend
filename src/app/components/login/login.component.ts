import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: string = ""
  constructor(
    private _api: ApiService, 
    private _auth: AuthService, 
    private _router:Router
  ) { }

  ngOnInit() {
    console.log('ngOnInit called...login status: ' + this.isLogin)
    this.isUserLogin(); 

  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);

    this._api.postTypeRequest('login', form.value).subscribe((res: any) => {
      if (res.status) { 
        console.log(res)
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this._auth.setDataInLocalStorage('token', res.token);  
        this._router.navigate(['']);
      } else { 
        
      }
    }, err => {
      this.errorMessage = err['error'].message;
    });
  }

  isUserLogin(){
    console.log('isUserLogin called...' + this._auth.getUserDetails())
    if(this._auth.getUserDetails() !== null){
        this.isLogin = true;
    }
  }

  logout(){
    this._auth.clearStorage()
    this._router.navigate(['']);
  }
}
