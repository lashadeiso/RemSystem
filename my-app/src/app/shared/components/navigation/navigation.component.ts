import { Component } from '@angular/core';
import { UserDetailsDataComunicationService } from '../../services/user-details-data-comunication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(private userDetailsService: UserDetailsDataComunicationService) {}
  onDetails() {
    this.userDetailsService.clickEditBTN = false;
  }
}
