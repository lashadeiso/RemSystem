import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCategoryComponent } from './page-category/page-category.component';
import { PageStatusComponent } from './page-status/page-status.component';
import { PageUsersListComponent } from './page-users-list/page-users-list.component';
import { PageUserDetailsComponent } from './page-user-details/page-user-details.component';
import { SharedModule } from '../shared/shared.module';

const Pages = [
  PageCategoryComponent,
  PageStatusComponent,
  PageUsersListComponent,
  PageUserDetailsComponent,
];

@NgModule({
  declarations: [
    PageCategoryComponent,
    PageStatusComponent,
    PageUsersListComponent,
    PageUserDetailsComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [...Pages],
})
export class PagesModule {}
