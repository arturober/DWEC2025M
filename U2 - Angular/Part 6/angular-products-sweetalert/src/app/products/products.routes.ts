import { Routes } from '@angular/router';
import { leavePageGuard } from '../guards/leave-page-guard';
import { numericIdGuard } from '../guards/numeric-id-guard';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products-page/products-page').then((m) => m.ProductsPage),
    title: 'Productos | Angular Products',
  },
  {
    path: 'add',
    loadComponent: () => import('./product-form/product-form').then((m) => m.ProductForm),
    title: 'Añadir producto | Angular Products',
    canDeactivate: [leavePageGuard],
  },
  {
    path: ':id',
    loadComponent: () => import('./product-detail/product-detail').then((m) => m.ProductDetail),
    title: 'Detalle producto | Angular Products',
    canActivate: [numericIdGuard],
  },
];
