import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  categoryList!: any;

  getData(): Observable<any> {
    return this.http.get('http://localhost:8000/categoryList').pipe(
      tap((res) => {
        this.categoryList = res;
      })
    );
  }
}
