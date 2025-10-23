import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

// Service that handles loading product and category data from JSON files
@Injectable({ providedIn: 'root' }) // Available throughout the entire app
export class ProductService {
  private http = inject(HttpClient);
  
  // Load all products from the JSON file in assets folder
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products.json');
  }

  // Load all categories from the JSON file in assets folder
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/categories.json');
  }
}
