import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {ProductsInterface} from "../models/products-interface";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly serverJson = '/assets/products.json';
  // @ts-ignore
  constructor(private httpClient: HttpClient){}

  listarProdutos(): Observable<ProductsInterface>{
   return this.httpClient.get<ProductsInterface>(this.serverJson);
  }


}
