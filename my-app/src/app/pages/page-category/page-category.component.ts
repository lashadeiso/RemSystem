import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.css'],
})
export class PageCategoryComponent implements OnInit {
  categoryList: string[] = [];
  pageSlice: string[] = [];
  inputValue!: string;

  constructor(private http: HttpService) {}
  ngOnInit() {
    this.http.getData().subscribe((res) => {
      if (res) {
        this.categoryList = this.http.categoryList;
        this.pageSlice = this.categoryList.slice(0, 4);
      }
    });
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.categoryList.length) {
      endIndex = this.categoryList.length;
    }
    this.pageSlice = this.categoryList.slice(startIndex, endIndex);
  }
  onInputValue(event: string) {
    this.inputValue = event;
  }
}
