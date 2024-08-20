import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface RecentActivity {
  date: string;
  description: string;
}

@Component({
  selector: 'lee-recent-activity',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="activities.length > 0">
      <br />
      <h2>Attività Recente</h2>
      <ul>
        <li *ngFor="let activity of activities">
          <strong>{{ activity.date }}</strong
          >: {{ activity.description }}
        </li>
      </ul>
    </div>
  `,
})
export class RecentActivityComponent implements OnInit {
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
