import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import axios from 'axios';

export type user = {
  id: string;
  fullName: string;
  email: string;
};

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <!-- {{ usersQuery.fetchStatus() }} -->
    @if(usersQuery.isLoading()){
    <h1>loading users...</h1>
    } @if(usersQuery.data()){ @for( user of usersQuery.data()?.data; track
    user.id){
    <div class="flex">
      <p>{{ user.fullName }}</p>
      <p>{{ user.email }}</p>
      <div class="flex">
        <a
          [routerLink]="'user/' + user.id"
          routerLinkActive="active"
          ariaCurrentWhenActive="page"
        >
          <button>view user</button>
        </a>
      </div>
    </div>
    } } @else if (usersQuery.error()) {
    <h2>error occured while ggetting users pls try again</h2>
    <button (click)="usersQuery.refetch()">refetch users</button>
    }
  `,
  styles: ``,
})
export class UsersListComponent {
  qc = injectQueryClient();
  usersQuery = injectQuery((qc) => ({
    queryKey: ['users'],
    queryFn: async () => await axios.get<user[]>('http://localhost:3009/users'),

    // select(data: { data: user[] }) {
    //   return data.data;
    // },
    retry: 5,
    // refetchInterval: 2000,
  }));
}

type t = {
  gx<T>(): T | null;
};

const p: t = {
  gx() {
    return null;
  },
};
