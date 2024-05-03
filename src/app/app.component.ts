import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export type user = {
  id: string;
  fullName: string;
  email: string;
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styleUrl: './app.component.css',
})
export class AppComponent {}
