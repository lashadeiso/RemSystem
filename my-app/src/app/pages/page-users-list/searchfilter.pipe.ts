import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FilterByService } from 'src/app/shared/services/filter-by.service';

@Pipe({
  name: 'searchfilter',
})
export class SearchfilterPipe implements PipeTransform {
  constructor(private filterBy: FilterByService) {}

  transform(usersList: User[], searchValue: string): any {
    if (!usersList || !searchValue) {
      return usersList;
    }

    if (this.filterBy.filterByEmail) {
      return usersList.filter((item) => {
        return item.mail
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      });
    }
    if (this.filterBy.filterByFirstName) {
      return usersList.filter((item) => {
        return item.firstName
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      });
    }
    if (this.filterBy.filterByLastName) {
      return usersList.filter((item) => {
        return item.lastName
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      });
    }

    if (this.filterBy.filterByPrivateNumber) {
      return usersList.filter((item) => {
        return item.privateNumber == Number(searchValue);
      });
    }
    if (this.filterBy.filterByCategory) {
      return usersList.filter((item) => {
        return item.category == searchValue;
      });
    }
    if (this.filterBy.filterByStatus) {
      return usersList.filter((item) => {
        return item.status == searchValue;
      });
    }
  }
}
