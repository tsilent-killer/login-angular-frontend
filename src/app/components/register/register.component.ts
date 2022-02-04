import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLogin: boolean = false;
  errorMessage: string = "";

  constructor(
    private _api: ApiService, 
    private _auth: AuthService, 
    private _router: Router
  ) { }

  ngOnInit() {

    this.isUserLogin(); 

  }


  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);

    this._api.postTypeRequest('register', form.value).subscribe((res: any) => {
      if (res.status) { 
        console.log(res)
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this._auth.setDataInLocalStorage('token', res.token);  
        this._router.navigate(['login']);
      } else { 
        console.log(res)
        alert(res.msg)
      }
    }, err => {
      this.errorMessage = err['error'].message;
    });
  }

  isUserLogin(){
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }

}
