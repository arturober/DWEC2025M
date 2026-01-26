import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form, FormField, min, minLength, required, validate } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../guards/leave-page-guard';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64-directive';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'product-form',
  imports: [EncodeBase64Directive, FormField],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm implements CanComponentDeactivate {
  newProduct = signal<Product>({
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0,
  });

  productForm = form(this.newProduct, (schema) => {
    required(schema.description, { message: 'Description cannot be empty' });
    required(schema.available, { message: 'Available date cannot be empty' });
    required(schema.imageUrl);
    required(schema.price, { message: 'Price cannot be empty' });
    minLength(schema.description, 5, {
      message: (context) => `You must enter at least ${5 - context.value().length} characters more`,
    });
    min(schema.price, 1, { message: 'Price must be at least 1' });
    validate(schema.available, ({value}) => {
      const today = new Date().toISOString().slice(0, 10);
      if(value() && value() < today) {
        return {
          kind: 'minDate',
          message: 'Date can\'t be before today'
        }
      }
      return null;
    });
  });

  imageField = form(signal(''), field => {
    required(field, { message: 'You must choose an image file' });
  });

  saved = false;

  #productsService = inject(ProductsService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  addProduct(event: Event) {
    event.preventDefault();
    this.#productsService
      .insertProduct(this.newProduct())
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.#router.navigate(['/products']);
        this.saved = true;
      });
  }

  canDeactivate() {
    if (this.saved || !this.productForm().dirty()) {
      return true;
    } else {
      return confirm('Are you sure you want to leave this page?');
    }
  }
}
