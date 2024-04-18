import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import { injectQuery } from '@tanstack/angular-query-experimental';

type user = {
  id: number;
  name: string;
  username: string;
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    @if(usersQuery.data()){ @for( user of usersQuery.data(); track user.id){
    <p>{{ user.name }}</p>
    } }
    <button (click)="usersQuery.refetch()">refetch users</button>
  `,

  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-data-fetching-with-tanstack-query';

  httpClient = inject(HttpClient);
  users: user[] = [];

  usersQuery = injectQuery((qc) => ({
    queryKey: ['users'],
    queryFn: () =>
      lastValueFrom(
        this.httpClient.get<user[]>(
          'https://jsonplaceholder.typicode.com/users'
        )
      ),
    retry: 5,
  }));
}
