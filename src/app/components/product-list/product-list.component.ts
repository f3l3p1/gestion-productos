import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedStatus: string = ''; 
  searchQuery: string = ''; 
  editingProduct: Product | null = null; 

  constructor(private productService: ProductService) {
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredProducts = this.products
      .filter(product =>
        this.searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
      )
      .filter(product => this.selectedStatus === '' || product.status === this.selectedStatus);
  }

  deleteProduct(id: number) {
    if (confirm('¿Eliminar producto?')) {
      this.productService.deleteProduct(id);
    }
  }

  filterProducts(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus = target.value;
    this.applyFilters();
  }

  filterByName(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.applyFilters();
  }

  updateStatus(product: Product, event: Event) {
    const target = event.target as HTMLSelectElement;
    this.productService.updateProductStatus(product.id, target.value as 'inicial' | 'pendiente' | 'completado');
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }

  saveEdit() {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct);
      this.editingProduct = null;
    }
  }

  cancelEdit() {
    this.editingProduct = null;
  }
}
