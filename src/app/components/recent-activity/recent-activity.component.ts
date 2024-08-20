import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormatDatePipe } from '../../shared/pipes/format-date.pipe';

interface RecentActivity {
  date: string;
  description: string;
}

@Component({
  selector: 'lee-recent-activity',
  standalone: true,
  imports: [CommonModule, FormatDatePipe, UpperCasePipe],
  template: `
    <div *ngIf="activities.length > 0">
      <br />
      <h2>{{ pageTitle | uppercase }}</h2>
      <ul>
        <li *ngFor="let activity of activities">
          <strong>{{ activity.date | formatDate : 'mediumDate' }}</strong
          >: {{ activity.description }}
        </li>
      </ul>
    </div>
  `,
})
export class RecentActivityComponent implements OnInit {
  pageTitle = 'Attività Recente';
  activities: RecentActivity[] = [];

  ngOnInit(): void {
    this.loadRecentActivities();
  }

  loadRecentActivities() {
    // Simuliamo il recupero dei dati, in un'app reale si userebbe HttpClient per chiamare un'API
    this.activities = [
      { date: '2024-08-01', description: 'Accesso al conto online' },
      { date: '2024-07-30', description: 'Pagamento con carta di credito' },
      { date: '2024-07-28', description: 'Modifica del profilo utente' },
    ];
  }
}
