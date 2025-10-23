import { Component, computed, effect, inject, signal, untracked, ViewChild, ElementRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductCardComponent } from '../product-card/product-card.component';
import { forkJoin } from 'rxjs';

// Main dashboard that shows all products with search and category filtering
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, ProductCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Inject services using Angular's new inject() function
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  
  // Get reference to the category tabs container for scrolling
  @ViewChild('tabsContainer') tabsContainer!: ElementRef<HTMLDivElement>;

  // Store all data in signals for reactive updates
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  
  // User input for filtering
  searchQuery = signal('');
  selectedCategoryId = signal<number | null>(null);
  // Automatically filter products when search or category changes
  filteredProducts = computed(() => {
    const searchTerm = this.searchQuery().toLowerCase().trim();
    const categoryFilter = this.selectedCategoryId();

    return this.products().filter(product => {
      // Check if product name or barcode matches the search
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm) ||
        product.barcode.includes(searchTerm);
      
      // Check if product belongs to selected category (or show all if none selected)
      const matchesCategory = !categoryFilter || product.category_id === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  });

  // Count how many products match current filters
  totalCount = computed(() => this.filteredProducts().length);

  displayedProducts = this.filteredProducts;

  constructor() {
    // Load both products and categories at the same time when component starts
    forkJoin({
      products: this.productService.getProducts(),
      categories: this.productService.getCategories()
    }).subscribe({
      next: (data) => {
        // Save the loaded data and stop showing loading spinner
        this.products.set(data.products);
        this.categories.set(data.categories);
        this.loading.set(false);
      },
      error: () => {
        // Show error message if data fails to load
        this.error.set('Failed to load data.');
        this.loading.set(false);
      }
    });
  }

  // Add a product to the shopping cart
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  // Scroll the category tabs left or right when there are too many to fit
  scrollTabs(direction: 'left' | 'right') {
    if (this.tabsContainer) {
      const container = this.tabsContainer.nativeElement;
      const scrollAmount = 200; // How far to scroll each time
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      // Smooth scroll to the new position
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  }
}
