import { Routes } from '@angular/router';
import { UserDisplayComponent } from './user-display/user-display.component';
import { UsersListComponent } from './users-list/users-list.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: 'user/:uid',
    component: UserDisplayComponent,
  },
];
