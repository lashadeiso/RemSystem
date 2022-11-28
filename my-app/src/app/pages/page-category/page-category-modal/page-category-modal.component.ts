import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-category-modal',
  templateUrl: './page-category-modal.component.html',
  styleUrls: ['./page-category-modal.component.css'],
})
export class PageCategoryModalComponent {
  @Input() showModal!: boolean;
  @Output() showModalEmitter = new EventEmitter<boolean>();
  @Input() clickUpdateButton = false;
  @Input() clickUpdateBTN: boolean = false;
  @Input() updateValue!: string;
  @Input() currentUpdateItemId!: number;
  constructor(private http: HttpService) {}

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
          Swal.fire('Updated successfully!');
        }
      });
  }
}
