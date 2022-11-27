import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-page-category-modal',
  templateUrl: './page-category-modal.component.html',
  styleUrls: ['./page-category-modal.component.css'],
})
export class PageCategoryModalComponent {
  @Input() showModal!: boolean;
  @Output() showModalEmitter = new EventEmitter<boolean>();
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
}
