import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient

import UserProfileComponent from './components/user-profile-management/user-profile/user-profile.component';
import { API_BASE_URL, environment } from '../../api-config';
import { UserProfileDataService } from './components/user-profile-management/services/user-profile-data.service';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import PrepaidCardListComponent from './components/cards/prepaid-card-list/prepaid-card-list.component';
import { PrepaidCardsService } from './components/cards/services/prepaid-cards.service';
import PrepaidCardFiltersComponent from './components/cards/prepaid-card-fiters/prepaid-card-filters.component';

@Component({
  selector: 'lee-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserProfileComponent,
    RecentActivityComponent,
    PrepaidCardListComponent,
    PrepaidCardFiltersComponent,
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    UserProfileDataService,
    PrepaidCardsService,
  ],
  template: `
    <div class="container mx-auto px-4">
      <lee-user-profile>
        <lee-recent-activity></lee-recent-activity>
        <router-outlet></router-outlet>
      </lee-user-profile>
      <br />
      <section class="grid grid-flow-col auto-cols-max gap-12">
        <div><lee-prepaid-card-list></lee-prepaid-card-list></div>
        <div><lee-prepaid-card-filters></lee-prepaid-card-filters></div>
      </section>
    </div>
  `,
})
export class AppComponent {}
