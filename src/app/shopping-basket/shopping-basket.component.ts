import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartService } from "../services/cart.service";

// Shopping cart sidebar that shows all items in the cart and total price
@Component({
  selector: "app-shopping-basket",
  standalone: true,
  imports: [CommonModule], // For *ngFor and other common directives
  templateUrl: "./shopping-basket.component.html",
  styleUrls: ["./shopping-basket.component.scss"],
})
export class ShoppingBasketComponent {
  // Get access to the cart service to display cart data
  cartService = inject(CartService);

  // Handle checkout - show total price and empty the cart
  checkout() {
    alert(`Checkout - Total: ₪${this.cartService.totalPrice()}`);
    this.cartService.clearCart(); // Empty the cart after checkout
  }
}
