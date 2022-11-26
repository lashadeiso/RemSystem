import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-contains',
  templateUrl: './filter-contains.component.html',
  styleUrls: ['./filter-contains.component.css'],
})
export class FilterContainsComponent implements OnInit {
  inputValue!: string;
  @Output() filterValueEmmitter = new EventEmitter<string>();
  ngOnInit() {}
  onFilterValueEmit() {
    this.filterValueEmmitter.emit(this.inputValue);
  }
}
