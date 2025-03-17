import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      status: ['inicial']
    });
  }

  submit() {
    if (this.productForm.valid) {
      const newProduct: Product = { id: Date.now(), ...this.productForm.value };
      this.productService.addProduct(newProduct);
      this.productForm.reset({ status: 'inicial' });
    }
  }
}
