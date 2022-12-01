import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCategoryComponent } from './page-category/page-category.component';
import { PageStatusComponent } from './page-status/page-status.component';
import { PageUsersListComponent } from './page-users-list/page-users-list.component';
import { PageUserDetailsComponent } from './page-user-details/page-user-details.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PageCategoryModalComponent } from './page-category/page-category-modal/page-category-modal.component';
import { PageStatusModalComponent } from './page-status/page-status-modal/page-status-modal.component';
import { MatTableModule } from '@angular/material/table';

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
    PageCategoryModalComponent,
    PageStatusModalComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule, MatTableModule],
  exports: [[...Pages]],
})
export class PagesModule {}
