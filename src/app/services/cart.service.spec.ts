import { TestBed } from '@angular/core/testing';
import { CartService, CartItem } from './cart.service';
import { Product } from '../models/product';

describe('CartService', () => {
  let service: CartService;

  const mockProduct1: Product = {
    id: 1,
    name: 'מוצר ראשון',
    price: 15.50,
    barcode: '111111111',
    imageUrl: 'image1.jpg',
    category_id: 1
  };

  const mockProduct2: Product = {
    id: 2,
    name: 'מוצר שני',
    price: 29.90,
    barcode: '222222222',
    imageUrl: 'image2.jpg',
    category_id: 2
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty cart', () => {
    expect(service.items()).toEqual([]);
    expect(service.itemCount()).toBe(0);
    expect(service.totalPrice()).toBe(0);
  });

  it('should add product to cart', () => {
    service.addToCart(mockProduct1);

    const items = service.items();
    expect(items.length).toBe(1);
    expect(items[0].id).toBe(1);
    expect(items[0].name).toBe('מוצר ראשון');
    expect(items[0].price).toBe(15.50);
    expect(items[0].quantity).toBe(1);
  });

  it('should increase quantity when adding same product twice', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct1);

    const items = service.items();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });

  it('should add multiple different products', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);

    const items = service.items();
    expect(items.length).toBe(2);
    expect(items[0].id).toBe(1);
    expect(items[1].id).toBe(2);
  });

  it('should calculate total item count correctly', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);

    expect(service.itemCount()).toBe(3); 
  });

  it('should calculate total price correctly', () => {
    service.addToCart(mockProduct1); 
    service.addToCart(mockProduct1); 
    service.addToCart(mockProduct2); 

    expect(service.totalPrice()).toBe(60.90); 
  });

  it('should remove item from cart', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);

    service.removeItem(1);

    const items = service.items();
    expect(items.length).toBe(1);
    expect(items[0].id).toBe(2);
  });

  it('should not crash when removing non-existent item', () => {
    service.addToCart(mockProduct1);
    
    expect(() => service.removeItem(999)).not.toThrow();
    expect(service.items().length).toBe(1);
  });

  it('should clear all items from cart', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);

    service.clearCart();

    expect(service.items()).toEqual([]);
    expect(service.itemCount()).toBe(0);
    expect(service.totalPrice()).toBe(0);
  });

  it('should maintain correct totals after removing items', () => {
    service.addToCart(mockProduct1); 
    service.addToCart(mockProduct2); 
    service.addToCart(mockProduct1); 

    expect(service.totalPrice()).toBe(60.90);
    expect(service.itemCount()).toBe(3);

    service.removeItem(1);

    expect(service.totalPrice()).toBe(29.90);
    expect(service.itemCount()).toBe(1);
  });

  it('should convert Product to CartItem correctly', () => {
    service.addToCart(mockProduct1);

    const cartItem = service.items()[0];
    expect(cartItem.id).toBe(mockProduct1.id);
    expect(cartItem.name).toBe(mockProduct1.name);
    expect(cartItem.price).toBe(mockProduct1.price);
    expect(cartItem.imageUrl).toBe(mockProduct1.imageUrl);
    expect(cartItem.barcode).toBe(mockProduct1.barcode);
    expect(cartItem.quantity).toBe(1);
  });

  it('should update totals correctly when items change', () => {
    
    expect(service.totalPrice()).toBe(0);
    expect(service.itemCount()).toBe(0);

    
    service.addToCart(mockProduct1);
    expect(service.totalPrice()).toBe(15.50);
    expect(service.itemCount()).toBe(1);

    
    service.addToCart(mockProduct1);
    expect(service.totalPrice()).toBe(31.00);
    expect(service.itemCount()).toBe(2);

    
    service.addToCart(mockProduct2);
    expect(service.totalPrice()).toBe(60.90);
    expect(service.itemCount()).toBe(3);
  });
});
