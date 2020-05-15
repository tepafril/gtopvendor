import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENDPOINT } from '../../environments/environment';
import { tap } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  isVerified = 'false';
  token = {};
  user:any;

  roles = {
    isOwner : false,
    isStaff : false,
    isVendor: false,
  };

  constructor(
    private http: HttpClient,
    // private storage: Storage,
  ) { }


  login(phone: String, password: String) {
    return this.http.post(ENDPOINT.API_URL + 'vendors/auth/login',
      {phone: phone, password: password}
    ).pipe(
      tap(res => {
        let response = res;
        let token = {
          access_token: response["access_token"],
          token_type: response["token_type"],
          expires_at: response["expires_at"],
        };

        let roles = {
          isOwner   : response["is_owner"],
          isStaff   : response["is_staff"],
          isVendor   : response["is_vendor"],
        };

        Storage.set({
          key     : 'roles', 
          value   : JSON.stringify(roles)
        }).then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );

        Storage.set({
          key     : 'token', 
          value   : JSON.stringify(token)
        }).then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );

        Storage.set({
          key     :'user',
          value   :response["user"]
        }).then(
          () => {
            console.log('User Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.user = response["user"];
        this.token = token;
        this.isLoggedIn = true;

        this.roles["isOwner"]  = response["is_owner"];
        this.roles["isStaff"]  = response["is_staff"];
        this.roles["isVendor"]  = response["is_vendor"];
        return token;
      }),
    );
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(ENDPOINT.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        Storage.remove({
          key   :   'token'
        }).then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.isLoggedIn = false;
        this.is_owner   = false;
        this.is_staff   = false;
        this.is_vendor  = false;
        delete this.token;
        return data;
      })
    )
  }

  changePassword(password, newPassword, confirmPassword) {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(ENDPOINT.API_URL + 'auth/change-password', { headers: headers,
      params: {
      old_password: password,
      password: newPassword,
      password_confirmation: confirmPassword
    }})
    .pipe(
      tap(data => {
        Storage.remove({
          key   :   'token'
        }).then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  getRoles() {
    return Storage.get({
      key     : 'roles'
    }).then(
      data => {
        if(data.value != null) {
          this.isLoggedIn=true;
          let res = JSON.parse(data.value);
          this.roles["isOwner"]  = res.is_owner;
          this.roles["isStaff"]  = res.is_staff;
          this.roles["isVendor"]  = res.is_vendor;
        } else {
          this.isLoggedIn=false;
        }
        // this.isVerified = this.token["is_verified"];
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }

  getToken() {
    return Storage.get({
      key     : 'token'
    }).then(
      data => {
        console.log( JSON.parse(data.value) );
        if(data.value != null) {
          this.isLoggedIn=true;
          let res = JSON.parse(data.value);
          this.token["access_token"]  = res.access_token;
          this.token["token_type"]  = res.token_type;
          this.token["expires_at"]  = res.expires_at;
        } else {
          this.isLoggedIn=false;
        }
        // this.isVerified = this.token["is_verified"];
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }

  clearToken(){
    this.isLoggedIn = false;
    Storage.set({
      key     : 'token',
      value   : ""
    })
    .then(
      () => {
        console.log('Token Stored');
      },
      error => console.error('Error storing item', error)
    );
  }

  isUserVerified() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(ENDPOINT.API_URL + 'auth/is-user-verified', { headers: headers })
    .pipe(
      tap(token => {
        let tempToken:any = token;
        Storage.set({
          key     :  'token',
          value   : JSON.stringify(token)
        })
        .then(
          () => {
            // if( tempToken.is_verified != null )
            //   this.isVerified = tempToken.is_verified;
            // else
            //   this.isVerified = 'false';
            console.log('Token Stored ' + this.isVerified);
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        return token;
      })
    );
  }

  checkPassport(){
    console.log(this.token);
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(ENDPOINT.API_URL + 'vendors/auth/check-passport', { headers: headers })
    .pipe(
      tap(res => {
        let user = res;
        Storage.set({
          key : 'user',
          value : user["user"]
        }).then(
          () => {
            this.user = user["user"];
          },
          error => console.error('Error storing item', error)
        );

        return res;
      })
    )
  }






  register(token: String, password: String, confirmPassword: String, appName: String = 'gtopclient') {
    return this.http.post(ENDPOINT.API_URL + 'auth/register',
      { token : token, password: password, password_confirmation: confirmPassword, app_name: appName }
    )
  }

  verifyToken(token: String, appName: String = 'gtopclient') {
    return this.http.post(ENDPOINT.API_URL + 'auth/verify-token',
      { token : token, app_name: appName }
    )
  }


  resetPassword(token: String, password: String, confirmPassword: String, appName: String = 'gtopclient') {
    return this.http.post(ENDPOINT.API_URL + 'auth/reset-password',
      { token : token, password: password, password_confirmation: confirmPassword, app_name: appName }
    )
  }

  verifyPhone(phone: String) {
    return this.http.post(ENDPOINT.API_URL + 'auth/verify-phone',
      { phone : phone }
    )
  }

  isPhoneAvailable(phone: String) {
    return this.http.post(ENDPOINT.API_URL + 'auth/is-phone-available',
      { phone : phone }
    )
  }
}
