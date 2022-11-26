import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from '../app-routing.module';
import { FilterContainsComponent } from './components/filter-contains/filter-contains.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const Shared = [MatPaginatorModule, Ng2SearchPipeModule];

@NgModule({
  declarations: [NavigationComponent, FilterContainsComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule, [...Shared]],
  exports: [
    NavigationComponent,
    HttpClientModule,
    FilterContainsComponent,
    [...Shared],
  ],
})
export class SharedModule {}
