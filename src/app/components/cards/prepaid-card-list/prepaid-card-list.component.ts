import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrepaidCardsService } from '../services/prepaid-cards.service';
import { UserProfileDataService } from '../../user-profile-management/services/user-profile-data.service';

import {
  IPrepaidCard,
  IPrepaidCardsResponse,
} from '../model/prepaid-card.interface';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'lee-prepaid-card-list',
  standalone: true,
  imports: [CommonModule, UpperCasePipe],
  template: `
    <div>
      <div>
        <h1>{{ pageTitle | uppercase }}</h1>
      </div>
      <br />
      <!-- CARD LIST -->
      <div>
        <h3>{{ cardDetails | uppercase }}</h3>
        <div *ngFor="let card of card$ | async">
          <h3>{{ card.circuito }} - {{ card.tipo }}</h3>
          <p>ABI: {{ card.abi }}</p>
          <p>Numero carta: {{ card.cardNumber }}</p>
          <p>Data scadenza: {{ card.expirationDate }}</p>
          <p *ngIf="card.saldoDisponibile">
            Saldo: {{ card.saldoDisponibile.importo }}
            {{ card.saldoDisponibile.divisa }}
          </p>
          <p>Stato: {{ card.statoCartaPrepagata }}</p>
          <br />
        </div>
      </div>
    </div>
  `,
})
export default class PrepaidCardListComponent implements OnInit {
  pageTitle = 'Gestione carte prepagate';
  cardDetails = 'Dettagli carte utente';
  prepaidCards: IPrepaidCard[] = [];

  private cardSubject = new BehaviorSubject<IPrepaidCard[]>([]);
  card$ = this.cardSubject.asObservable();

  constructor(
    private prepaidCardService: PrepaidCardsService,
    private userProfileService: UserProfileDataService
  ) {}

  ngOnInit(): void {
    this.prepaidCardService
      .loadPrepaidCards()
      .pipe(
        map((data: IPrepaidCardsResponse) =>
          Object.values(data.mappaCartePrepagate)
        )
      )
      .subscribe((cards) => {
        this.prepaidCards = cards;
        this.cardSubject.next(cards);
      });
  }
}
