import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../models/product';

// A card that displays one product with its image, name, price, and add to cart button
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe], // For formatting the price as currency
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  // The product data to display (comes from parent component)
  @Input() product!: Product;
  
  // Event to tell parent component when user clicks "add to cart"
  @Output() productSelected = new EventEmitter<Product>();
}
