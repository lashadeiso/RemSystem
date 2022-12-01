import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { HttpUsersService } from 'src/app/shared/services/http-users.service';

// import { AfterViewInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { PeriodicElement } from 'src/app/shared/models/test.model';

@Component({
  selector: 'app-page-users-list',
  templateUrl: './page-users-list.component.html',
  styleUrls: ['./page-users-list.component.css'],
})
export class PageUsersListComponent implements OnInit, OnDestroy {
  usersList!: User[];
  userItem$ = new Subscription();
  inputValue!: string;

  constructor(private http: HttpUsersService) {}
  ngOnInit(): void {
    this.http.getAllUsers().subscribe((res) => {
      if (res) {
        this.usersList = res;
        console.log(this.usersList);
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

  onInputValue(event: string) {
    this.inputValue = event;
  }
}
