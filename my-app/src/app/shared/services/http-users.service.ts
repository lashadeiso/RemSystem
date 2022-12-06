import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class HttpUsersService {
  usersList: any;
  userItem$ = new Subject<User>();
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users`).pipe(
      tap((res) => {
        if (res) {
          this.usersList = res;
        }
      })
    );
  }

  deleteUser(id: number) {
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
        return this.http
          .delete(`${environment.baseUrl}/users/${id}`)
          .pipe(
            tap((res) => {
              if (res) {
                let index = this.usersList
                  .map((item: any) => item.id)
                  .indexOf(id);
                this.usersList.splice(index, 1);
                this.userItem$.next(this.usersList);
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              }
            })
          )
          .subscribe();
      } else return;
    });
  }

  addUser(userItem: User): Observable<any> {
    let headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http
      .post(`${environment.baseUrl}/users`, userItem, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          if (res) {
            Swal.fire('Good job!', 'Added successfully!', 'success');
          }
        })
      );
  }

  updateUserItem(userId: number, userItem: User): Observable<any> {
    let apiUrl: string = `${environment.baseUrl}/users/${userId}`;
    let headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.put(apiUrl, userItem, { headers: headers }).pipe(
      tap((res) => {
        if (res) {
          Swal.fire('Good job!', 'Added successfully!', 'success');
        }
      })
    );
  }

  getUserById(userId: number): Observable<any> {
    let apiUrl: string = `${environment.baseUrl}/users/${userId}`;
    return this.http.get(apiUrl);
  }
}
