import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = new BehaviorSubject<Product[]>(this.loadProducts());
  products$ = this.products.asObservable();

  constructor() {}

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  private loadProducts(): Product[] {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem('products') || '[]');
    }
    return [];
  }

  private saveProducts(products: Product[]) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('products', JSON.stringify(products));
    }
    this.products.next(products);
  }

  getProducts(): Product[] {
    return this.products.value;
  }

  addProduct(product: Product) {
    const updatedProducts = [...this.products.value, product];
    this.saveProducts(updatedProducts);
  }

  updateProduct(updatedProduct: Product) {
    const updatedProducts = this.products.value.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.saveProducts(updatedProducts);
  }

  deleteProduct(id: number) {
    const updatedProducts = this.products.value.filter(p => p.id !== id);
    this.saveProducts(updatedProducts);
  }

  updateProductStatus(id: number, status: 'inicial' | 'pendiente' | 'completado') {
    const updatedProducts = this.products.value.map(p =>
      p.id === id ? { ...p, status } : p
    );
    this.saveProducts(updatedProducts);
  }

  filterByStatus(status: string): Product[] {
    return status === 'all'
      ? this.products.value
      : this.products.value.filter(p => p.status === status);
  }

  filterByNameOrDescription(searchText: string): Product[] {
    if (!searchText) return this.products.value;
    return this.products.value.filter(p =>
      p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchText.toLowerCase()))
    );
  }
}
