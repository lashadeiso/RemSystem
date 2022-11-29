import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  categoryList!: any;
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

  addCategory(categoryName: string): void {
    console.log(this.categoryList);
    this.http
      .post(`${environment.baseUrl}/categories`, { categoryName })
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

  deleteCAtegory(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/categories/${id}`).pipe(
      tap((res) => {
        if (res) {
          let index = this.categoryList.map((item: any) => item.id).indexOf(id);
          this.categoryList.splice(index, 1);
          this.categoryItem$.next(this.categoryList);
        }
      })
    );
  }

  updateCategory(updateValue: string, ItemId: number) {
    return this.http
      .put(`${environment.baseUrl}/categories/${ItemId}`, {
        id: ItemId,
        categoryName: updateValue,
      })
      .pipe(
        tap(() => {
          let index = this.categoryList
            .map((item: Category) => item.id)
            .indexOf(ItemId);
          this.categoryList[index].categoryName = updateValue;
          this.categoryItem$.next(this.categoryList);
        })
      );
  }
}
