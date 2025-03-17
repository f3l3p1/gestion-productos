import { Component } from '@angular/core';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductFormComponent, ProductListComponent],  // 💡 IMPORTA LOS COMPONENTES AQUÍ
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'gestión de productos';
}
