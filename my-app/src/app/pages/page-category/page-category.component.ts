import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.css'],
})
export class PageCategoryComponent implements OnInit, OnDestroy {
  categoriesList: Category[] = [];
  pageSlice: Category[] = [];
  inputValue!: string;
  showModal: boolean = false;
  itemSubscription$ = new Subscription();

  constructor(private http: HttpService) {}
  ngOnInit() {
    this.http.getAllCategory().subscribe((res) => {
      if (res) {
        this.categoriesList = res;
        this.pageSlice = this.categoriesList.slice(0, 4);
      }
    });

    this.itemSubscription$ = this.http.categoryItem$.subscribe((res) => {
      if (res) {
        this.categoriesList = res;
        this.pageSlice = this.categoriesList.slice(0, 4);
      }
    });
  }

  onAddCategory(addCategoryValue: HTMLInputElement) {
    this.http.addCategory(addCategoryValue.value);
    this.showModal = !this.showModal;
    addCategoryValue.value = '';
  }

  onInputValue(event: string) {
    this.inputValue = event;
  }

  onShowMoadl() {
    this.showModal = !this.showModal;
  }
  onShowModalSubscriber(event: boolean) {
    this.showModal = event;
  }
  ngOnDestroy(): void {
    this.itemSubscription$.unsubscribe();
  }
  onPageSlice(event: any) {
    this.pageSlice = event;
  }
}
