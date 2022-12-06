import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/shared/models/status.model';
import { HttpStatusService } from 'src/app/shared/services/http-status.service';

@Component({
  selector: 'app-page-status',
  templateUrl: './page-status.component.html',
  styleUrls: ['./page-status.component.css'],
})
export class PageStatusComponent implements OnInit, OnDestroy {
  statusList: Status[] = [];
  pageSlice: Status[] = [];
  inputValue!: string;
  showModal: boolean = false;
  itemSubscription$ = new Subscription();
  clickUpdateBTN: boolean = false;
  updateValue!: string;
  currentUpdateItemId!: number;
  startIndex = 0;
  endIndex = 4;

  constructor(private http: HttpStatusService) {}
  ngOnInit() {
    this.http.getAllStatus().subscribe((res) => {
      if (res) {
        this.statusList = res;
        this.pageSlice = this.statusList.slice(this.startIndex, this.endIndex);
      }
    });

    this.itemSubscription$ = this.http.statusItem$.subscribe((res) => {
      if (res) {
        this.statusList = res;
        this.pageSlice = this.statusList.slice(
          this.startIndex,
          this.startIndex + this.endIndex
        );
      }
    });
  }

  onAddStatus(addStatusValue: HTMLInputElement) {
    this.http.addStatus(addStatusValue.value);
    this.showModal = !this.showModal;
    addStatusValue.value = '';
  }

  onInputValue(event: string) {
    this.inputValue = event;
  }

  onShowModal() {
    this.showModal = !this.showModal;
    this.clickUpdateBTN = false;
  }
  onShowModalSubscriber(event: boolean) {
    this.showModal = event;
  }
  ngOnDestroy(): void {
    this.itemSubscription$.unsubscribe();
  }

  onDeleteStatus(id: number) {
    this.http.deleteStatus(id).subscribe();
  }
  onUpdateStatus(item: Status) {
    this.onShowModal();
    this.updateValue = item.name;
    this.clickUpdateBTN = true;
    this.currentUpdateItemId = item.id;
  }

  //--ემიტერები
  onStartIndexEmitter(event: number) {
    this.startIndex = event;
  }
  onEndIndexEmitter(event: number) {
    this.endIndex = event;
  }
  onPageSliceEmitter(event: Status[]) {
    this.pageSlice = event;
  }
}
