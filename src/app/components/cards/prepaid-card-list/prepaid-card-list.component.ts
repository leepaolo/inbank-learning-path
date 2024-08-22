import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrepaidCardsService } from '../services/prepaid-cards.service';
import { UserProfileDataService } from '../../user-profile-management/services/user-profile-data.service';
import { UppercasePipe } from '../../../shared/pipes/uppercase.pipe';
import {
  IPrepaidCard,
  IPrepaidCardsResponse,
} from '../model/prepaid-card.interface';

@Component({
  selector: 'lee-prepaid-card-list',
  standalone: true,
  imports: [CommonModule, UppercasePipe],
  template: `
    <div>
      <br />
      <h1>{{ cardPageTitle | uppercase }}</h1>
      <div></div>
      <h3>{{ cardDetails }}</h3>
      <div *ngFor="let card of prepaidCards">
        <h3>{{ card.circuito }} - {{ card.tipo }}</h3>
        <p>ABI: {{ card.abi }}</p>
        <p *ngIf="card.saldoDisponibile">
          Saldo: {{ card.saldoDisponibile.importo }}
          {{ card.saldoDisponibile.divisa }}
        </p>
        <p>Stato: {{ card.statoCartaPrepagata }}</p>
        <br />
      </div>
    </div>
  `,
})
export default class PrepaidCardListComponent implements OnInit {
  cardPageTitle = 'Gestione carte prepagate';
  cardDetails = 'Dettagli carte utente';
  prepaidCards: IPrepaidCard[] = [];

  constructor(
    private prepaidCardService: PrepaidCardsService,
    private userProfileService: UserProfileDataService
  ) {}

  ngOnInit(): void {
    this.prepaidCardService.loadPrepaidCards().subscribe((data: any) => {
      this.prepaidCards = Object.values(data.mappaCartePrepagate);
    });
  }
}
