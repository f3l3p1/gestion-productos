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
  editingProduct: Product | null = null; // ✅ Para edición completa

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  // 🔹 Cargar productos desde el servicio
  loadProducts() {
    this.products = this.productService.getProducts();
    this.applyFilters();
  }

  // 🔹 Aplicar filtros de búsqueda y estado
  applyFilters() {
    this.filteredProducts = this.products
      .filter(product =>
        this.searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(this.searchQuery.toLowerCase())) // ✅ Filtrar por nombre y descripción
      )
      .filter(product => this.selectedStatus === '' || product.status === this.selectedStatus);
  }

  // 🔹 Eliminar producto
  deleteProduct(id: number) {
    if (confirm('¿Eliminar producto?')) {
      this.productService.deleteProduct(id);
      this.loadProducts();
    }
  }

  // 🔹 Filtrar productos por estado
  filterProducts(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus = target.value;
    this.applyFilters();
  }

  // 🔹 Filtrar productos por búsqueda (nombre + descripción)
  filterByName(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.applyFilters();
  }

  // 🔹 Cambiar estado del producto
  updateStatus(product: Product, event: Event) {
    const target = event.target as HTMLSelectElement;
    this.productService.updateProductStatus(product.id, target.value as 'inicial' | 'pendiente' | 'completado');
    this.loadProducts();
  }

  // ✅ Habilitar edición completa
  editProduct(product: Product) {
    this.editingProduct = { ...product }; // Clona el producto para evitar cambios en tiempo real
  }

  // ✅ Guardar cambios de edición
  saveEdit() {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct);
      this.editingProduct = null;
      this.loadProducts();
    }
  }

  // ✅ Cancelar edición
  cancelEdit() {
    this.editingProduct = null;
  }
}
