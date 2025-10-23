// Defines what a product looks like - all the data we store for each item
export interface Product {
  id: number;          // Unique number to identify this product
  category_id: number; // Which category this product belongs to
  name: string;        // Product name that users see
  price: number;       // How much this product costs
  barcode: string;     // Product barcode for scanning/searching
  imageUrl: string;    // Path to the product's picture
}
