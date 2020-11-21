import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENDPOINT } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  middleware = 'event/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createDevice(device){
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
    let params = device;
    return this.http.post(ENDPOINT.API_URL + 'vendors/device/create', params, { headers: headers })
    .pipe(
      tap(devices => {
        return devices;
      })
    )
  }

  updateDevice(device){
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
      let params = device;
      return this.http.put(ENDPOINT.API_URL + 'vendors/device/update', params, { headers: headers })
      .pipe(
        tap(devices => {
          return devices;
        })
      )
  }

  resetDevicePassword(device){
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
      let params = device;
      return this.http.put(ENDPOINT.API_URL + 'vendors/device/reset-password', params, { headers: headers })
      .pipe(
        tap(devices => {
          return devices;
        })
      )
  }

  deleteDevice(id) {
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
    return this.http.delete(ENDPOINT.API_URL + 'vendors/device/delete/' + id, { headers: headers })
    .pipe(
      tap(device => {
        return device;
      })
    )
  }

  getDevice(id) {
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
    return this.http.get(ENDPOINT.API_URL + 'vendors/device/' + id, { headers: headers })
    .pipe(
      tap(device => {
        return device;
      })
    )
  }

  getDevices(pagination, query = '') {
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
    return this.http.get(ENDPOINT.API_URL + 'vendors/devices/' + pagination, { headers: headers, params: { query: query }})
    .pipe(
      tap(device => {
        return device;
      })
    )
  }

  getProducts() {
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
    return this.http.get(ENDPOINT.API_URL + 'vendors/products', {headers: headers})
    .pipe(
      tap(device => {
        return device;
      })
    )
  }

  getStaffs(pagination, query = '') {
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
    return this.http.get(ENDPOINT.API_URL + 'vendors/staffs/' + pagination, { headers: headers, params: { query: query }})
    .pipe(
      tap(device => {
        return device;
      })
    )
  }

  createStaff(staff){
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
    let params = staff;
    return this.http.post(ENDPOINT.API_URL + 'vendors/staffs/create', params, {headers: headers})
    .pipe(
      tap(devices => {
        return devices;
      })
    )
  }

  getStaff(id) {
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
    return this.http.get(ENDPOINT.API_URL + 'vendors/staff/' + id, {headers: headers})
    .pipe(
      tap(device => {
        return device;
      })
    )
  }

  removeStaffRole(id){
    const headers = new HttpHeaders({
      'Authorization': this.authService.token["token_type"]+" "+this.authService.token["access_token"]
    });
    return this.http.delete(ENDPOINT.API_URL + 'vendors/staff/unassign/' + id, {headers: headers})
    .pipe(
      tap(device => {
        return device;
      })
    )
  }

  updateStaff(device){
      let params = device;
      return this.http.put(ENDPOINT.API_URL + 'vendors/staff/update', params)
      .pipe(
        tap(devices => {
          return devices;
        })
      )
  }

}
