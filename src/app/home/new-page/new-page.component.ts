import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Interface} from "../models/interface";
import {ProductsInterface} from "../models/products-interface";
import {ProductsService} from "../services/products.service";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {
  products$:  Observable<ProductsInterface[]>;


  constructor(private instanciaProducts: ProductsService) {
// Not recommended, but can be used as a quick fix
    this.products$ = instanciaProducts.listarProdutos().pipe(
      map((response: Object) => response as ProductsInterface[])
    );

  }

}
