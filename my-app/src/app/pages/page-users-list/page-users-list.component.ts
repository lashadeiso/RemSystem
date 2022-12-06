import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { FilterByService } from 'src/app/shared/services/filter-by.service';
import { HttpUsersService } from 'src/app/shared/services/http-users.service';
import { UserDetailsDataComunicationService } from 'src/app/shared/services/user-details-data-comunication.service';

@Component({
  selector: 'app-page-users-list',
  templateUrl: './page-users-list.component.html',
  styleUrls: ['./page-users-list.component.css'],
})
export class PageUsersListComponent implements OnInit, OnDestroy {
  usersList!: User[];
  userItem$ = new Subscription();

  emailValue!: string;
  firstNameValue!: string;
  lastNameValue!: string;
  privateNumberValue!: string;
  categoryValue!: string;
  statusValue!: string;

  searchValue!: string;

  clickEditBTN: boolean = false;

  constructor(
    private http: HttpUsersService,
    private filterBy: FilterByService,
    private router: Router,
    private UserDetailsService: UserDetailsDataComunicationService
  ) {}
  ngOnInit(): void {
    this.http.getAllUsers().subscribe((res) => {
      if (res) {
        this.usersList = res;
      }
    });

    this.userItem$ = this.http.userItem$.subscribe((res: any) => {
      if (res) {
        this.usersList = res;
      }
    });
  }

  onDeleteUser(id: number) {
    this.http.deleteUser(id).subscribe();
  }
  ngOnDestroy(): void {
    this.userItem$.unsubscribe();
  }

  onInputFocus(searchInput: HTMLInputElement) {
    if (searchInput.id == 'byEmail') {
      this.searchValue = searchInput.value;
      this.filterBy.filterByEmail = true;
      this.filterBy.filterByFirstName = false;
      this.filterBy.filterByFirstName = false;
      this.filterBy.filterByPrivateNumber = false;
    }
    if (searchInput.id == 'byFirstName') {
      this.searchValue = searchInput.value;
      this.filterBy.filterByFirstName = true;
      this.filterBy.filterByEmail = false;
      this.filterBy.filterByLastName = false;
      this.filterBy.filterByPrivateNumber = false;
      this.filterBy.filterByCategory = false;
      this.filterBy.filterByStatus = false;
    }
    if (searchInput.id == 'byLastName') {
      this.searchValue = searchInput.value;
      this.filterBy.filterByLastName = true;
      this.filterBy.filterByEmail = false;
      this.filterBy.filterByFirstName = false;
      this.filterBy.filterByPrivateNumber = false;
      this.filterBy.filterByCategory = false;
      this.filterBy.filterByStatus = false;
    }
    if (searchInput.id == 'byPrivateNumber') {
      this.filterBy.filterByPrivateNumber = true;
      this.filterBy.filterByLastName = false;
      this.filterBy.filterByEmail = false;
      this.filterBy.filterByFirstName = false;
      this.filterBy.filterByCategory = false;
      this.filterBy.filterByStatus = false;
    }
    if (searchInput.id == 'byCategory') {
      this.filterBy.filterByCategory = true;
      this.filterBy.filterByStatus = false;
      this.filterBy.filterByPrivateNumber = false;
      this.filterBy.filterByLastName = false;
      this.filterBy.filterByEmail = false;
      this.filterBy.filterByFirstName = false;
    }
    if (searchInput.id == 'byStatus') {
      this.filterBy.filterByStatus = true;
      this.filterBy.filterByPrivateNumber = false;
      this.filterBy.filterByLastName = false;
      this.filterBy.filterByEmail = false;
      this.filterBy.filterByFirstName = false;
      this.filterBy.filterByCategory = false;
    }
  }

  onPrivateNumberSearch() {
    this.searchValue = this.privateNumberValue;
  }
  onCategorySearch() {
    this.searchValue = this.categoryValue;
  }
  onStatusSearch() {
    this.searchValue = this.statusValue;
  }
  onShowAll() {
    this.searchValue = '';
    this.emailValue = '';
    this.firstNameValue = '';
    this.lastNameValue = '';
    this.privateNumberValue = '';
    this.categoryValue = '';
    this.statusValue = '';
  }

  onUserEdit(item: User) {
    this.clickEditBTN = true;
    this.UserDetailsService.clickEditBTN = this.clickEditBTN;
    this.UserDetailsService.userItem = item;
    this.router.navigate(['/details']);
  }

  onAddUser() {
    this.clickEditBTN = false;
    this.UserDetailsService.clickEditBTN = this.clickEditBTN;
    this.router.navigate(['/details']);
  }
}
