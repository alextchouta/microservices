import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host : string = "http://localhost:8087"
  constructor(private http:HttpClient, private authService: AuthentificationService) { }

  getAllCategories(){
    return this.http.get(this.host+"/categories");
  }

  getRessource(url)
  {
    let header = new HttpHeaders({'Authorization': this.authService.token});
    return this.http.get(url,{headers:header});
  }

  onDeleteCategorie() {

  }

  deleteRessource(url: any)
  {
    let header = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    return this.http.delete(url,{headers:header});
  }

  postRessource(url: any, data:any)
  {
    let header = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    return this.http.post(url,data, {headers:header});
  }

  putRessource(url: string , data: any) {
    let header = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    return this.http.put(url,data, {headers:header});
  }

  patchRessource(url: string , data: any) {
    let header = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    return this.http.patch(url,data, {headers:header});
  }
}
