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

  user: any;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit called...')
    console.log('showing localstorage...',localStorage)
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.user = userData[0];
    
    this._api.getTypeRequest(`profile/${this.user.id}`).subscribe((res: any) => {
      console.log(this.user)
    })

  }

  onDelete(id: any) {
    console.log('deleting user...', id)
    this._api.deleteTypeRequest(`profile/${id}`).subscribe((res: any) => {
      console.log(res)
      this._auth.clearStorage()
      this._router.navigate(['']);
    })
  }

  onUpdate(id: any, data: any) {
    console.log('updating user profile...', id)
    this._api.putTypeRequest(`profile/${id}/edit`, data).subscribe((res: any) => {
      console.log(res)
    })
  }

}
