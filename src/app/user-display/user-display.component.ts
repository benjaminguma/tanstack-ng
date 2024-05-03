import { Component, Input, inject } from '@angular/core';
import { user } from '../app.component';
import axios from 'axios';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-display',
  standalone: true,
  imports: [],
  template: `
    @if (userQuery.data()) {
    <div class="grid">
      <h1>{{ userQuery.data()?.fullName }}</h1>
      <h2>{{ userQuery.data()?.email }}</h2>
      <div class="">
        <button (click)="handleDeleteUser()">
          {{ deleteUserMutation.isPending() ? 'loading...' : 'delete user' }}
        </button>
      </div>
    </div>
    }
  `,
  styles: ``,
})
export class UserDisplayComponent {
  @Input() uid: string = '';

  private _router = inject(Router);

  userQuery = injectQuery((qc) => ({
    queryKey: ['users', this.uid],
    queryFn: async ({ queryKey }) =>
      (await axios.get<user>(`http://localhost:3009/users/${queryKey[1]}`))
        .data,
    retry: 5,
    staleTime: 10000,
    refetchOnMount: true,
  }));

  deleteUserMutation = injectMutation((qc) => ({
    onSuccess: async (data) => {
      alert('successfully delete user 0');
      await qc.invalidateQueries({
        queryKey: ['users'],
      });
      await this._router.navigate(['/'], {
        replaceUrl: true,
      });
    },
    // onError() {
    //   console.log('error occured pls try again');
    // },
    mutationFn: (userId: string) =>
      axios.delete(`http://localhost:3009/users/${userId}`),
  }));

  async handleDeleteUser() {
    const user = this.userQuery.data();
    if (!user) {
      return;
    }
    const id = user.id;
    try {
      await this.deleteUserMutation.mutateAsync(id);
      alert('user deleted successfully 1');
    } catch (error) {
      console.log('error occured pls try again 1');
    }
  }
}
