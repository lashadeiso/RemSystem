import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

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

  addCategory(categoryName: string) {
    this.http
      .post(`${environment.baseUrl}/categories`, { categoryName })
      .pipe(
        tap((res) => {
          if (res) {
            this.categoryList.push(res);
            this.categoryItem$.next(this.categoryList);
          }
        })
      )
      .subscribe();
  }
}
