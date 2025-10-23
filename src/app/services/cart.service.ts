import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product';

// What each item in the shopping cart looks like
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number; // How many of this item the user wants
  imageUrl: string;
  barcode: string;
}

// Service that manages the shopping cart - what items are in it, quantities, etc.
@Injectable({
  providedIn: 'root' // Available throughout the entire app
})
export class CartService {
  // Store cart items in a signal for reactive updates
  private cartItems = signal<CartItem[]>([]);
  
  // Read-only version for components to use (they can't accidentally change it)
  items = this.cartItems.asReadonly();
  
  // Automatically calculate total price whenever cart changes
  totalPrice = computed(() => 
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  // Automatically count total number of items in cart
  itemCount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  // Add a product to the cart (or increase quantity if already there)
  addToCart(product: Product) {
    // Check if this product is already in the cart
    const existingItem = this.cartItems().find(item => item.id === product.id);
    
    if (existingItem) {
      // Product already in cart - just increase the quantity by 1
      this.cartItems.update(items => 
        items.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // New product - add it to the cart with quantity 1
      this.cartItems.update(items => [...items, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        barcode: product.barcode
      }]);
    }
  }

  // Remove an item completely from the cart
  removeItem(id: number) {
    this.cartItems.update(items => items.filter(item => item.id !== id));
  }

  // Empty the entire cart
  clearCart() {
    this.cartItems.set([]);
  }
}