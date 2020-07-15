import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api/products?size=100';

  constructor(private httpClient: HttpClient) {}

  getProductList(): Observable<Product[]> {
    let getProductsHeaders = new HttpHeaders();

    getProductsHeaders.append('Content-Type', 'application/json');
    getProductsHeaders.append('Accept', 'application/json');
    getProductsHeaders.append('Origin', 'http://localhost:3000');

    return this.httpClient
      .get<GetResponse>(this.baseUrl, {
        headers: getProductsHeaders,
      })
      .pipe(map((response) => response._embedded.products));
  }
}

export interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
