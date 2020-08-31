import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public host : string = "http://localhost:8080"
  public token : string;
  private username: any;
  private roles: Array<string>;
  constructor(private http:HttpClient) { }

  login(data)
  {
    return this.http.post(this.host+"/login", data, {observe:'response'});
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    this.parseToken();
  }

  // pour ca il faut installer le package "npm install @auth0/angular-jwt --save"
  private parseToken() {
    let jwtHelper = new JwtHelperService();
    let decodedToken = jwtHelper.decodeToken(this.token);
    this.username = decodedToken.sub;
    this.roles = decodedToken.roles
    console.log("username" + " " + this.username);
    console.log("roles" + " " + this.roles);
    console.log("IsAdmin" + " " + this.isAdmin())
  }

  isAdmin()
  {
    return this.roles.indexOf('ADMIN')>=0;
  }

  isUser()
  {
    return this.roles.indexOf('USER')>=0;
  }

  isAuthenticated()
  {
    return this.roles && (this.isUser() || this.isAdmin());
  }

  loadToken() {
    this.token = localStorage.getItem('token');
    this.parseToken();
  }

  logOut()
  {
    localStorage.removeItem('token');
    this.initCredentials();
  }

  initCredentials()
  {
    this.token=undefined;
    this.username=undefined;
    this.roles=undefined;
  }
}
