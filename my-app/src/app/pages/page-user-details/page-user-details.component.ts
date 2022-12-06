import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { Status } from 'src/app/shared/models/status.model';
import { User } from 'src/app/shared/models/user.model';
import { HttpCategoryService } from 'src/app/shared/services/http-category.service';
import { HttpStatusService } from 'src/app/shared/services/http-status.service';
import { HttpUsersService } from 'src/app/shared/services/http-users.service';
import { UserDetailsDataComunicationService } from 'src/app/shared/services/user-details-data-comunication.service';

@Component({
  selector: 'app-page-user-details',
  templateUrl: './page-user-details.component.html',
  styleUrls: ['./page-user-details.component.css'],
})
export class PageUserDetailsComponent implements OnInit {
  categoryList: Category[] = [];
  statusList: Status[] = [];
  itemCategory: string = '';
  itemStatus: string = '';

  clickEditBTN!: boolean;
  userItem!: User;

  @ViewChild('ourForm') userItemValues!: NgForm;

  constructor(
    private httpCategory: HttpCategoryService,
    private httpStatus: HttpStatusService,
    private httpUsers: HttpUsersService,
    private userDetailsService: UserDetailsDataComunicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.httpCategory.getAllCategory().subscribe((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
    this.httpStatus.getAllStatus().subscribe((res) => {
      if (res) {
        this.statusList = res;
      }
    });

    this.clickEditBTN = this.userDetailsService.clickEditBTN;
    this.userItem = this.userDetailsService.userItem;

    if (this.clickEditBTN) {
      this.httpUsers.getUserById(this.userItem.id).subscribe((res) => {
        if (res) {
          this.userItemValues.setValue(this.userItem);
        }
      });
    }
  }
  ngFormSubmit(item: NgForm) {
    if (this.clickEditBTN) {
      this.httpUsers.updateUserItem(item.value.id, item.value).subscribe();
    } else {
      this.httpUsers.addUser(item.value).subscribe();
    }
    item.reset();
    this.router.navigate(['/users']);
  }
}
