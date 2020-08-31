import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  private products: any;

  constructor(private catalogueService: CatalogueService, private route: ActivatedRoute, private router: Router) {
    // refresh quand l url change
    router.events.subscribe(event =>{
      if (event instanceof NavigationEnd){
        let url = atob(route.snapshot.params.urlProds);
        this.getProducts(url);
      }
    });
  }

  ngOnInit() {
  }

  getProducts(url){
    this.catalogueService.getRessource(url).subscribe(products =>{
      this.products = products;
    },error => {
      console.log(error);
    })
  }

}
