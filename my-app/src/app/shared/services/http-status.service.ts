import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusService {
  constructor(private http: HttpClient) {}
  statusList: any = [];
  statusItem$ = new Subject<Status[]>();

  getAllStatus(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/statuses`).pipe(
      tap((res) => {
        if (res) {
          this.statusList = res;
        }
      })
    );
  }

  addStatus(name: string): void {
    console.log(111);
    this.http
      .post(`${environment.baseUrl}/statuses`, { name })
      .pipe(
        tap((res) => {
          if (res) {
            this.statusList.push(res);
            this.statusItem$.next(this.statusList);
            Swal.fire('Good job!', 'Added successfully!', 'success');
          }
        })
      )
      .subscribe();
  }

  deleteStatus(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/statuses/${id}`).pipe(
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
              let index = this.statusList
                .map((item: any) => item.id)
                .indexOf(id);
              this.statusList.splice(index, 1);
              this.statusItem$.next(this.statusList);
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
          });
        }
      })
    );
  }

  updateStatus(updateValue: string, ItemId: number) {
    return this.http
      .put(`${environment.baseUrl}/statuses/${ItemId}`, {
        id: ItemId,
        name: updateValue,
      })
      .pipe(
        tap(() => {
          let index = this.statusList
            .map((item: Status) => item.id)
            .indexOf(ItemId);
          this.statusList[index].name = updateValue;
          this.statusItem$.next(this.statusList);
          Swal.fire('Updated successfully!');
        })
      );
  }
}
