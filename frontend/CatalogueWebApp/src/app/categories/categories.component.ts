import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private categories: any;
  private products: any;
  private currentCategory:any

  constructor(private  catService:CatalogueService, private router:Router) { }

  ngOnInit() {
    this.catService.getAllCategories().subscribe(categories =>{
      this.categories = categories;
    },error => {
      console.log(error);
    })
  }

  onGetProducts(categorie: any) {
    let url = categorie._links.products.href;
    this.currentCategory = categorie;
    this.router.navigateByUrl("/products/"+btoa(url));
  }
}
