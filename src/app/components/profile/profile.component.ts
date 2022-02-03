import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit called...')
    console.log('showing localstorage...',localStorage['userData'])
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    this._api.getTypeRequest('users').subscribe((res: any) => {
      console.log(this.userData)
    })

  }

  onDelete() {
    
  }

}
