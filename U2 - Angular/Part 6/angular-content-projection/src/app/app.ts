import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadButton } from './load-button/load-button';
import { MyModal } from './my-modal/my-modal';

@Component({
  selector: 'app-root',
  imports: [LoadButton, MyModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  loading = signal(false);
  showModal = false;

  startLoading() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 3000);
  }

}
