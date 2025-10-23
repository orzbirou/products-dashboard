import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientTestingModule]
    }).compileComponents();

    const fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search query', () => {
    expect(component.searchQuery()).toBe('');
  });

  it('should initialize with no selected category', () => {
    expect(component.selectedCategoryId()).toBeNull();
  });

  it('should initialize with loading state', () => {
    expect(component.loading()).toBe(true);
  });

  it('should initialize with no error', () => {
    expect(component.error()).toBeNull();
  });

  it('should filter products by search query', () => {
    
    component.products.set([
      { id: 1, name: 'מוצר ראשון', price: 10, barcode: '123456', imageUrl: 'image1.jpg', category_id: 1 },
      { id: 2, name: 'מוצר שני', price: 20, barcode: '789012', imageUrl: 'image2.jpg', category_id: 2 }
    ]);

    
    component.searchQuery.set('ראשון');
    const filteredProducts = component.filteredProducts();
    
    expect(filteredProducts.length).toBe(1);
    expect(filteredProducts[0].name).toBe('מוצר ראשון');
  });

  it('should filter products by barcode', () => {
    
    component.products.set([
      { id: 1, name: 'מוצר ראשון', price: 10, barcode: '123456', imageUrl: 'image1.jpg', category_id: 1 },
      { id: 2, name: 'מוצר שני', price: 20, barcode: '789012', imageUrl: 'image2.jpg', category_id: 2 }
    ]);

    
    component.searchQuery.set('123456');
    const filteredProducts = component.filteredProducts();
    
    expect(filteredProducts.length).toBe(1);
    expect(filteredProducts[0].barcode).toBe('123456');
  });

  it('should filter products by category', () => {
    
    component.products.set([
      { id: 1, name: 'מוצר ראשון', price: 10, barcode: '123456', imageUrl: 'image1.jpg', category_id: 1 },
      { id: 2, name: 'מוצר שני', price: 20, barcode: '789012', imageUrl: 'image2.jpg', category_id: 2 },
      { id: 3, name: 'מוצר שלישי', price: 15, barcode: '345678', imageUrl: 'image3.jpg', category_id: 1 }
    ]);

    
    component.selectedCategoryId.set(1);
    const filteredProducts = component.filteredProducts();
    
    expect(filteredProducts.length).toBe(2);
    filteredProducts.forEach(product => {
      expect(product.category_id).toBe(1);
    });
  });

  it('should return correct total count', () => {
    
    component.products.set([
      { id: 1, name: 'מוצר ראשון', price: 10, barcode: '123456', imageUrl: 'image1.jpg', category_id: 1 },
      { id: 2, name: 'מוצר שני', price: 20, barcode: '789012', imageUrl: 'image2.jpg', category_id: 2 }
    ]);

    expect(component.totalCount()).toBe(2);
  });

  it('should handle empty search results', () => {
    
    component.products.set([
      { id: 1, name: 'מוצר ראשון', price: 10, barcode: '123456', imageUrl: 'image1.jpg', category_id: 1 }
    ]);

    
    component.searchQuery.set('לא קיים');
    const filteredProducts = component.filteredProducts();
    
    expect(filteredProducts.length).toBe(0);
    expect(component.totalCount()).toBe(0);
  });
});
