import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product';
import { Category } from '../models/category';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'מוצר ראשון',
      price: 15.50,
      barcode: '111111111',
      imageUrl: 'image1.jpg',
      category_id: 1
    },
    {
      id: 2,
      name: 'מוצר שני',
      price: 29.90,
      barcode: '222222222',
      imageUrl: 'image2.jpg',
      category_id: 2
    }
  ];

  const mockCategories: Category[] = [
    {
      id: 1,
      name: 'קטגוריה ראשונה'
    },
    {
      id: 2,
      name: 'קטגוריה שנייה'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from assets/products.json', () => {
    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
      expect(products.length).toBe(2);
      expect(products[0].name).toBe('מוצר ראשון');
      expect(products[1].name).toBe('מוצר שני');
    });

    const req = httpMock.expectOne('assets/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch categories from assets/categories.json', () => {
    service.getCategories().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
      expect(categories.length).toBe(2);
      expect(categories[0].name).toBe('קטגוריה ראשונה');
      expect(categories[1].name).toBe('קטגוריה שנייה');
    });

    const req = httpMock.expectOne('assets/categories.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should handle products HTTP error gracefully', () => {
    const errorMessage = 'Network error';

    service.getProducts().subscribe({
      next: () => fail('Expected error, but got success'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne('assets/products.json');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should handle categories HTTP error gracefully', () => {
    const errorMessage = 'Network error';

    service.getCategories().subscribe({
      next: () => fail('Expected error, but got success'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });

    const req = httpMock.expectOne('assets/categories.json');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should return observables that can be subscribed to multiple times', () => {
    let callCount = 0;

    
    service.getProducts().subscribe(() => {
      callCount++;
    });

    
    const req1 = httpMock.expectOne('assets/products.json');
    req1.flush(mockProducts);

    
    service.getProducts().subscribe(() => {
      callCount++;
    });

    
    const req2 = httpMock.expectOne('assets/products.json');
    req2.flush(mockProducts);

    expect(callCount).toBe(2);
  });

  it('should correctly parse product data structure', () => {
    service.getProducts().subscribe(products => {
      const product = products[0];
      
      
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.barcode).toBeDefined();
      expect(product.imageUrl).toBeDefined();
      expect(product.category_id).toBeDefined();
      
      
      expect(typeof product.id).toBe('number');
      expect(typeof product.name).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.barcode).toBe('string');
      expect(typeof product.imageUrl).toBe('string');
      expect(typeof product.category_id).toBe('number');
    });

    const req = httpMock.expectOne('assets/products.json');
    req.flush(mockProducts);
  });

  it('should correctly parse category data structure', () => {
    service.getCategories().subscribe(categories => {
      const category = categories[0];
      
      
      expect(category.id).toBeDefined();
      expect(category.name).toBeDefined();
      
      
      expect(typeof category.id).toBe('number');
      expect(typeof category.name).toBe('string');
    });

    const req = httpMock.expectOne('assets/categories.json');
    req.flush(mockCategories);
  });

  it('should handle empty products array', () => {
    service.getProducts().subscribe(products => {
      expect(products).toEqual([]);
      expect(products.length).toBe(0);
    });

    const req = httpMock.expectOne('assets/products.json');
    req.flush([]);
  });

  it('should handle empty categories array', () => {
    service.getCategories().subscribe(categories => {
      expect(categories).toEqual([]);
      expect(categories.length).toBe(0);
    });

    const req = httpMock.expectOne('assets/categories.json');
    req.flush([]);
  });
});
