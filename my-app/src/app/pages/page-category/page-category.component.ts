import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { HttpCategoryService } from 'src/app/shared/services/http-category.service';

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
  clickUpdateBTN: boolean = false;
  updateValue!: string;
  currentUpdateItemId!: number;
  startIndex = 0;
  endIndex = 4;

  constructor(private http: HttpCategoryService) {}
  ngOnInit() {
    this.http.getAllCategory().subscribe((res) => {
      if (res) {
        this.categoriesList = res;
        this.pageSlice = this.categoriesList.slice(
          this.startIndex,
          this.endIndex
        );
      }
    });

    this.itemSubscription$ = this.http.categoryItem$.subscribe((res) => {
      if (res) {
        this.categoriesList = res;
        this.pageSlice = this.categoriesList.slice(
          this.startIndex,
          this.startIndex + this.endIndex
        );
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
    this.clickUpdateBTN = false;
  }
  onShowModalSubscriber(event: boolean) {
    this.showModal = event;
  }
  ngOnDestroy(): void {
    this.itemSubscription$.unsubscribe();
  }

  onDeleteCategory(id: number) {
    this.http.deleteCategory(id).subscribe();
  }
  onUpdateCategory(item: Category) {
    this.onShowMoadl();
    this.updateValue = item.name;
    this.clickUpdateBTN = true;
    this.currentUpdateItemId = item.id;
  }

  //--???????????????????????????
  onStartIndexEmitter(event: number) {
    this.startIndex = event;
  }
  onEndIndexEmitter(event: number) {
    this.endIndex = event;
  }
  onPageSliceEmitter(event: Category[]) {
    this.pageSlice = event;
  }
}
