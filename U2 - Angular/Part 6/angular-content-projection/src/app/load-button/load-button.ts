import { Component, input } from '@angular/core';

@Component({
  selector: 'load-button',
  imports: [],
  templateUrl: './load-button.html',
  styleUrl: './load-button.css',
})
export class LoadButton {
  colorClass = input('bg-blue-500');
  loading = input(false);

}
