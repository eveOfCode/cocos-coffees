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
    return this.http.get<Product[]>("https://random-data-api.com/api/coffee/random_coffee?size=50");
  }
}
