import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthentificationService,
              private  router: Router) { }

  ngOnInit() {
  }

  onLogin(value: any) {
    this.authenticationService.login(value).subscribe( response =>{
      let token = response.headers.get('Authorization');
      console.log("Token" + " " + token);
      this.authenticationService.saveToken(token);
      this.router.navigateByUrl("/");
    })
  }


}
