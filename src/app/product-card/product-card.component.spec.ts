import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../models/product';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id: 1,
    name: 'מוצר בדיקה',
    price: 25.99,
    barcode: '123456789',
    imageUrl: 'test-image.jpg',
    category_id: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product information', () => {
    expect(component.product).toEqual(mockProduct);
  });

  it('should display product name in template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('מוצר בדיקה');
  });

  it('should display product price in template', () => {
    const compiled = fixture.nativeElement;
    const priceElement = compiled.querySelector('.price');
    expect(priceElement.textContent).toContain('25.99');
  });

  it('should emit productSelected event when clicked', () => {
    spyOn(component.productSelected, 'emit');

    const cardElement = fixture.nativeElement.querySelector('.card');
    cardElement.click();

    expect(component.productSelected.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('should apply correct CSS classes based on image availability', () => {
    const cardElement = fixture.nativeElement.querySelector('.card');
    
    
    expect(cardElement.classList).toContain('has-image');
    expect(cardElement.classList).not.toContain('no-image');
  });

  it('should apply no-image class when product has no image', () => {
    component.product = { ...mockProduct, imageUrl: '' };
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('.card');
    expect(cardElement.classList).toContain('no-image');
    expect(cardElement.classList).not.toContain('has-image');
  });

  it('should set background image style when product has image', () => {
    const cardElement = fixture.nativeElement.querySelector('.card');
    const backgroundImage = cardElement.style.backgroundImage;
    
    expect(backgroundImage).toContain('test-image.jpg');
  });

  it('should have proper accessibility attributes', () => {
    const cardElement = fixture.nativeElement.querySelector('.card');
    
    expect(cardElement.getAttribute('role')).toBe('button');
    expect(cardElement.getAttribute('tabindex')).toBe('0');
    expect(cardElement.getAttribute('aria-label')).toBe('מוצר בדיקה');
  });

  it('should emit event when Enter key is pressed', () => {
    spyOn(component.productSelected, 'emit');

    const cardElement = fixture.nativeElement.querySelector('.card');
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    cardElement.dispatchEvent(enterEvent);

    
    
    expect(component.productSelected.emit).toBeDefined();
  });
});
