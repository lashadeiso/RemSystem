import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageStatusComponent } from './pages/page-status/page-status.component';
import { PageUserDetailsComponent } from './pages/page-user-details/page-user-details.component';
import { PageUsersListComponent } from './pages/page-users-list/page-users-list.component';

const routes: Routes = [
  { path: '', component: PageCategoryComponent },
  { path: 'status', component: PageStatusComponent },
  { path: 'details', component: PageUserDetailsComponent },
  { path: 'users', component: PageUsersListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
