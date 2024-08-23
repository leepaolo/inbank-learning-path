import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UppercasePipe } from '../../../shared/pipes/uppercase.pipe';
import { PrepaidCardsService } from '../services/prepaid-cards.service';
import { BehaviorSubject } from 'rxjs';
import { IPrepaidCard } from '../model/prepaid-card.interface';
import {
  CARD_STATUS_TUTTE,
  CARD_STATUS_ACTIVE,
  CARD_STATUS_BLOCKED,
} from '../constants/prepaid-cards.constants';

@Component({
  selector: 'lee-prepaid-card-filters',
  standalone: true,
  imports: [CommonModule, UppercasePipe],
  template: `
    <h1>{{ pageTitle | uppercase }}</h1>
    <div>
      <select
        class="select select-accent w-full max-w-xs"
        (change)="filterCards($event)"
      >
        <option disabled selected>Select cards</option>
        <option [value]="CARD_STATUS_TUTTE">Tutte le carte</option>
        <option [value]="CARD_STATUS_ACTIVE">Carte Attive</option>
        <option [value]="CARD_STATUS_BLOCKED">Carte Bloccate</option>
      </select>
    </div>
    <div *ngFor="let card of card$ | async">
      <p>Numero carta: {{ card.cardNumber }}</p>
      <p>Stato: {{ card.statoCartaPrepagata }}</p>
    </div>
  `,
})
export default class PrepaidCardFiltersComponent implements OnInit {
  pageTitle = 'Gestione carte prepagate';
  prepaidCards: IPrepaidCard[] = [];
  CARD_STATUS_TUTTE = CARD_STATUS_TUTTE;
  CARD_STATUS_ACTIVE = CARD_STATUS_ACTIVE;
  CARD_STATUS_BLOCKED = CARD_STATUS_BLOCKED;

  private cardSubject = new BehaviorSubject<IPrepaidCard[]>([]);
  card$ = this.cardSubject.asObservable();

  constructor(private prepaidCardService: PrepaidCardsService) {}

  ngOnInit(): void {
    this.prepaidCardService.loadPrepaidCards().subscribe((data) => {
      this.prepaidCards = Object.values(data.mappaCartePrepagate);
      this.cardSubject.next(this.prepaidCards);
    });
  }

  filterCards(event: any) {
    const value = event.target.value;
    let filteredCards: IPrepaidCard[] = [];

    if (value === CARD_STATUS_ACTIVE) {
      filteredCards = this.prepaidCards.filter(
        (card) => card.statoCartaPrepagata === CARD_STATUS_ACTIVE
      );
    } else if (value === CARD_STATUS_BLOCKED) {
      filteredCards = this.prepaidCards.filter(
        (card) => card.statoCartaPrepagata === CARD_STATUS_BLOCKED
      );
    } else if (value === CARD_STATUS_TUTTE) {
      filteredCards = [...this.prepaidCards];
    }

    this.cardSubject.next(filteredCards);
  }
}
