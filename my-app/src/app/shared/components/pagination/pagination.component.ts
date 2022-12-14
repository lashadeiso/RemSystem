import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() itemsList: any[] = [];
  pageSlice: any[] = [];
  @Output() startIndexEmitter = new EventEmitter<number>();
  @Output() endIndexEmitter = new EventEmitter<number>();
  @Output() pageSliceEmitter = new EventEmitter<any[]>();

  constructor() {}
  ngOnInit(): void {
    this.pageSlice = this.itemsList.slice(0, 4);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.itemsList.length) {
      endIndex = this.itemsList.length;
    }
    this.pageSlice = this.itemsList.slice(startIndex, endIndex);

    //--ემიტერები
    this.startIndexEmitter.emit(startIndex);
    this.endIndexEmitter.emit(endIndex);
    this.pageSliceEmitter.emit(this.pageSlice);
  }
}
