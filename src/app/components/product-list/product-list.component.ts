import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  products$; // Declarar sin inicializar todavía

  constructor(private productService: ProductService) {
    this.products$ = this.productService.products$; // Inicializar dentro del constructor
  }

  deleteProduct(id: number) {
    if (confirm('¿Eliminar producto?')) {
      this.productService.deleteProduct(id);
    }
  }
} 
