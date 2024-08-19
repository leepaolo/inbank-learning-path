import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserProfileDataService } from './components/user-profile-management/services/user-profile-data.service';
import UserProfileComponent from './components/user-profile-management/user-profile/user-profile.component';
import { API_BASE_URL, environment } from '../../api-config';

@Component({
  selector: 'lee-root',
  standalone: true,
  imports: [RouterOutlet, UserProfileComponent],
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    UserProfileDataService,
  ],
  template: `
    <lee-user-profile>
      <router-outlet></router-outlet>
    </lee-user-profile>
  `,
})
export class AppComponent {}
