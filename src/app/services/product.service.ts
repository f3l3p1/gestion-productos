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

  // ✅ Método corregido: Obtener lista de productos
  getProducts(): Product[] {
    return this.products.value;
  }

  addProduct(product: Product) {
    const products = [...this.products.value, product];
    this.saveProducts(products);
  }

  updateProduct(updatedProduct: Product) {
    const products = this.products.value.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.saveProducts(products);
  }

  deleteProduct(id: number) {
    const products = this.products.value.filter(p => p.id !== id);
    this.saveProducts(products);
  }

  // ✅ Método para actualizar estado del producto
  updateProductStatus(id: number, status: 'inicial' | 'pendiente' | 'completado') {
    const products = this.products.value.map(p =>
      p.id === id ? { ...p, status } : p
    );
    this.saveProducts(products);
  }
}
