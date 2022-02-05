import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  isLogin: boolean = false;
  errorMessage: string = "";

  user: any

  constructor(
    private _api: ApiService, 
    private _auth: AuthService, 
    private _router: Router
  ) { }

  ngOnInit() {

    this.isUserLogin(); 

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.user = userData[0];
    console.log(this.user)

  }


  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);

    this._api.putTypeRequest(`profile/${this.user.id}/edit`, form.value).subscribe((res: any) => {
      if (res.status) { 
        console.log(res)
        this._auth.clearStorage();
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

  logout(){
    this._auth.clearStorage()
    this._router.navigate(['']);
  }

}
