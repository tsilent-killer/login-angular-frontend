import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData:any;
  ID:any;
  Images:any;

  user: any;

  constructor(
    private http : HttpClient,
    private route: ActivatedRoute,
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit called...')
    console.log('showing localstorage...',localStorage)
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.user = userData[0];

    this.route.queryParams.subscribe((params)=>{
      console.log(params);
      this.ID=params["ID"];
      console.log(this.ID);
    })    
    this.getDataFromAPI();
    console.log(this.userData); 

  }

  getDataFromAPI(){
    return this._api.getTypeRequest(`profile/${this.user.id}` ).subscribe((response: any)=>{
      // console.log('Response is:'+JSON.stringify(response));
      this.userData=JSON.parse(JSON.stringify(response)).data[0];
      console.log('fetched userdata...', this.userData);
    },(error: any)=>{
      console.error(error);
    })
  }

  uploadImg(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.Images=file;
      console.log(this.Images)
    }
    const formData = new FormData();
    formData.append("image",this.Images);
    console.log(formData);
    return this._api.postTypeRequest(`profile/upload/${this.user.id}`, formData).subscribe((res: any)=>{
      console.log(res);
      this._router.navigate(['/profile',this.user.id]);
    },(error)=>{
      console.error(error);
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
