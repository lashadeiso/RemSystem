import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterByService {
  filterByEmail: boolean = false;
  filterByFirstName: boolean = false;
  filterByLastName: boolean = false;
  filterByPrivateNumber: boolean = false;
  filterByCategory: boolean = false;
  filterByStatus: boolean = false;
  filterByDate: boolean = false;

  constructor() {}
}
