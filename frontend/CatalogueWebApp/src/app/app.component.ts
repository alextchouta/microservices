import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "./authentification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'CatalogueWebApp';

  constructor(private authService:AuthentificationService) {
  }

  ngOnInit(): void
  {
    this.authService.loadToken();
  }

  isAdmin()
  {
    return this.authService.isAdmin();
  }

  isUser()
  {
    return this.authService.isUser();
  }

  isAuthenticated()
  {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logOut();
  }
}
