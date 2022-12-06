import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class HttpCategoryService {
  constructor(private http: HttpClient) {}
  categoryList: any = [];
  categoryItem$ = new Subject<Category[]>();

  getAllCategory(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/categories`).pipe(
      tap((res) => {
        if (res) {
          this.categoryList = res;
        }
      })
    );
  }

  addCategory(name: string): void {
    this.http
      .post(`${environment.baseUrl}/categories`, { name })
      .pipe(
        tap((res) => {
          if (res) {
            this.categoryList.push(res);
            this.categoryItem$.next(this.categoryList);
            Swal.fire('Good job!', 'Added successfully!', 'success');
          }
        })
      )
      .subscribe();
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/categories/${id}`).pipe(
      tap((res) => {
        if (res) {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {
            if (result.isConfirmed) {
              let index = this.categoryList
                .map((item: any) => item.id)
                .indexOf(id);
              this.categoryList.splice(index, 1);
              this.categoryItem$.next(this.categoryList);
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
          });
        }
      })
    );
  }

  updateCategory(updateValue: string, ItemId: number) {
    return this.http
      .put(`${environment.baseUrl}/categories/${ItemId}`, {
        id: ItemId,
        name: updateValue,
      })
      .pipe(
        tap(() => {
          let index = this.categoryList
            .map((item: Category) => item.id)
            .indexOf(ItemId);
          this.categoryList[index].name = updateValue;
          this.categoryItem$.next(this.categoryList);
          Swal.fire('Updated successfully!');
        })
      );
  }
}
