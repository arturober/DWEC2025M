import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  signal
} from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductItem } from '../product-item/product-item';
import { ProductsService } from '../services/products-service';
import { debounce, form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'products-page',
  imports: [ProductItem, FormField],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {
  showImage = signal(true);
  search = signal('');
  searchField = form(this.search, schema => {
    debounce(schema, 600)
  });

  #productsService = inject(ProductsService);
  productsResource = this.#productsService.getProductsResource(this.search);

  products = linkedSignal(() =>
    this.productsResource.hasValue() ? this.productsResource.value().products : [],
  );

  toggleImage() {
    this.showImage.update((show) => !show);
  }

  deleteProduct(product: Product) {
    this.products.update((products) => products.filter((p) => p !== product));
  }
}
