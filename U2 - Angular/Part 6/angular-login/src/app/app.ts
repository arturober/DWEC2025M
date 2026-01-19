import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleLogin } from './google-login/google-login';

@Component({
  selector: 'app-root',
  imports: [GoogleLogin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-login');

  loggedGoogle(resp: google.accounts.id.CredentialResponse) {
    // Envia esto tu API
    console.log(resp.credential);
  }
}
