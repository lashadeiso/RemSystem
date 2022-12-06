import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpStatusService } from 'src/app/shared/services/http-status.service';

@Component({
  selector: 'app-page-status-modal',
  templateUrl: './page-status-modal.component.html',
  styleUrls: ['./page-status-modal.component.css'],
})
export class PageStatusModalComponent {
  @Input() showModal!: boolean;
  @Output() showModalEmitter = new EventEmitter<boolean>();
  @Input() clickUpdateButton: boolean = false;
  @Input() clickUpdateBTN: boolean = false;
  @Input() updateValue!: string;
  @Input() currentUpdateItemId!: number;

  constructor(private http: HttpStatusService) {}

  onShowMoadl() {
    this.showModal = !this.showModal;
    this.showModalEmitter.emit(this.showModal);
  }
  onAddStatus(addStatusValue: HTMLInputElement) {
    console.log(333);
    this.http.addStatus(addStatusValue.value);
    this.showModal = !this.showModal;
    this.showModalEmitter.emit(this.showModal);
    addStatusValue.value = '';
  }
  getInputData(): any {
    if (this.clickUpdateBTN) {
      return this.updateValue;
    } else {
      return '';
    }
  }

  onUpdateStatus(addStatusValue: HTMLInputElement) {
    this.http
      .updateStatus(addStatusValue.value, this.currentUpdateItemId)
      .subscribe((res) => {
        if (res) {
          this.showModal = !this.showModal;
          this.showModalEmitter.emit(this.showModal);
        }
      });
  }
}
