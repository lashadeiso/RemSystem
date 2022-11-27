import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from '../app-routing.module';
import { FilterContainsComponent } from './components/filter-contains/filter-contains.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaginationComponent } from './components/pagination/pagination.component';

const Shared = [MatPaginatorModule, Ng2SearchPipeModule];

@NgModule({
  declarations: [
    NavigationComponent,
    FilterContainsComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, AppRoutingModule, FormsModule, [...Shared]],
  exports: [
    NavigationComponent,
    HttpClientModule,
    FilterContainsComponent,
    PaginationComponent,
    [...Shared],
  ],
})
export class SharedModule {}
