import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient

import UserProfileComponent from './components/user-profile-management/user-profile/user-profile.component';
import { API_BASE_URL, environment } from '../../api-config';
import { UserProfileDataService } from './components/user-profile-management/services/user-profile-data.service';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';

@Component({
  selector: 'lee-root',
  standalone: true,
  imports: [RouterOutlet, UserProfileComponent, RecentActivityComponent],
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    UserProfileDataService,
  ],
  template: `
    <lee-user-profile>
      <lee-recent-activity></lee-recent-activity>
      <router-outlet></router-outlet>
    </lee-user-profile>
  `,
})
export class AppComponent {}
