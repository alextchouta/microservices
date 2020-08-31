import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  private categories: any;
  private mode:string='list'
  private currentCategorie: any;

  constructor(private catalogueService:CatalogueService) { }

  ngOnInit() {
    this.ongetAllCategories();
  }

  ongetAllCategories()
  {
    this.catalogueService.getAllCategories().subscribe(categories =>{
      this.categories = categories;
    },error => {
      console.log(error)
    })
  }

  onDeleteCategorie(categorie: any) {
    let c = confirm("Etes vous sure de vouloir sure");
    if (!c) return;
    this.catalogueService.deleteRessource(categorie._links.self.href).subscribe(response =>{
        this.ongetAllCategories();
    },error => {
      console.log(error);
    });
  }

  onAddNewCategorie() {
    this.mode = 'new-cat';
  }

  onSaveCategorie(value: any) {
    let url = this.catalogueService.host+"/categories"
    this.catalogueService.postRessource(url,value).subscribe(response =>{
      this.mode = 'list'
      this.ongetAllCategories();
    }, error => {
      console.log(error);
    });
  }

  onEditCategorie(categorie: any) {
    this.catalogueService.getRessource(categorie._links.self.href).subscribe(categorie =>{
      this.currentCategorie = categorie;
      console.log("currentCategorie" + " " + this.currentCategorie);
      this.mode = 'edit-cat';
    })
  }

  onUpdateCategorie(value: any) {
    let url = this.currentCategorie._links.self.href;
    this.catalogueService.putRessource(url,value).subscribe(response =>{
      this.mode = 'list'
      this.ongetAllCategories();
    }, error => {
      console.log(error);
    });
  }
}
