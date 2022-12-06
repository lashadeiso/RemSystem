import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpCategoryService } from 'src/app/shared/services/http-category.service';

@Component({
  selector: 'app-page-category-modal',
  templateUrl: './page-category-modal.component.html',
  styleUrls: ['./page-category-modal.component.css'],
})
export class PageCategoryModalComponent {
  @Input() showModal!: boolean;
  @Output() showModalEmitter = new EventEmitter<boolean>();
  @Input() clickUpdateButton: boolean = false;
  @Input() clickUpdateBTN: boolean = false;
  @Input() updateValue!: string;
  @Input() currentUpdateItemId!: number;
  constructor(private http: HttpCategoryService) {}

  onShowMoadl() {
    this.showModal = !this.showModal;
    this.showModalEmitter.emit(this.showModal);
  }
  onAddCategory(addCategoryValue: HTMLInputElement) {
    this.http.addCategory(addCategoryValue.value);
    this.showModal = !this.showModal;
    this.showModalEmitter.emit(this.showModal);
    addCategoryValue.value = '';
  }
  getInputData(): any {
    if (this.clickUpdateBTN) {
      return this.updateValue;
    } else {
      return '';
    }
  }

  onUpdateCategory(addCategoryValue: HTMLInputElement) {
    this.http
      .updateCategory(addCategoryValue.value, this.currentUpdateItemId)
      .subscribe((res) => {
        if (res) {
          this.showModal = !this.showModal;
          this.showModalEmitter.emit(this.showModal);
        }
      });
  }
}
