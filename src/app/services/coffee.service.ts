import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(private http: HttpClient) { }

  getCoffeeProducts(): Observable<Product[]> {
    const sizeOfData = 50;
    const url = `https://random-data-api.com/api/coffee/random_coffee?size=${sizeOfData}`;
    return this.http.get<Product[]>(url);

  }
}
