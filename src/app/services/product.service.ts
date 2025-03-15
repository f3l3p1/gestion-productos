import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = new BehaviorSubject<Product[]>(this.loadProducts());
  products$ = this.products.asObservable();

  private loadProducts(): Product[] {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  private saveProducts(products: Product[]) {
    localStorage.setItem('products', JSON.stringify(products));
    this.products.next(products);
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
}
