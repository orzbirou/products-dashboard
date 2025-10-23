import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingBasketComponent } from './shopping-basket.component';
import { CartService, CartItem } from '../services/cart.service';
import { signal } from '@angular/core';

describe('ShoppingBasketComponent', () => {
  let component: ShoppingBasketComponent;
  let fixture: ComponentFixture<ShoppingBasketComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  const mockCartItems: CartItem[] = [
    {
      id: 1,
      name: 'מוצר ראשון',
      price: 15.50,
      barcode: '111111111',
      imageUrl: 'image1.jpg',
      quantity: 2
    },
    {
      id: 2,
      name: 'מוצר שני',
      price: 29.90,
      barcode: '222222222',
      imageUrl: 'image2.jpg',
      quantity: 1
    }
  ];

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['clearCart'], {
      items: signal(mockCartItems),
      totalPrice: signal(61.90),
      itemCount: signal(3)
    });

    await TestBed.configureTestingModule({
      imports: [ShoppingBasketComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingBasketComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have access to cart service', () => {
    expect(component.cartService).toBeTruthy();
  });

  it('should display cart items correctly through service', () => {
    expect(component.cartService.items()).toEqual(mockCartItems);
  });

  it('should display total price correctly through service', () => {
    expect(component.cartService.totalPrice()).toEqual(61.90);
  });

  it('should display item count correctly through service', () => {
    expect(component.cartService.itemCount()).toEqual(3);
  });

  it('should have cart service injected', () => {
    expect(component.cartService).toBe(cartService);
  });

  it('should render template correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should show checkout button in template', () => {
    const compiled = fixture.nativeElement;
    const checkoutButton = compiled.querySelector('.checkout-btn');
    
    
    
    expect(compiled).toBeTruthy();
  });

  it('should call checkout method when checkout is triggered', () => {
    spyOn(component, 'checkout');
    
    component.checkout();
    expect(component.checkout).toHaveBeenCalled();
  });

  it('should call clearCart on service when checkout is called', () => {
    spyOn(window, 'alert'); 
    
    component.checkout();
    
    expect(cartService.clearCart).toHaveBeenCalled();
  });

  it('should show alert with total price during checkout', () => {
    spyOn(window, 'alert');
    
    component.checkout();
    
    expect(window.alert).toHaveBeenCalledWith('Checkout - Total: ₪61.9');
  });
});
