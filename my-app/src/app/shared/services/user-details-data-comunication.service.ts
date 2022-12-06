import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsDataComunicationService {
  clickEditBTN!: boolean;
  userItem!: User;

  constructor() {}
}
