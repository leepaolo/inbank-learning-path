import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UppercasePipe } from '../../../shared/pipes/uppercase.pipe';
import { PrepaidCardsService } from '../services/prepaid-cards.service';
import { BehaviorSubject, filter, map } from 'rxjs';
import { IPrepaidCard } from '../model/prepaid-card.interface';

@Component({
  selector: 'lee-prepaid-card-filters',
  standalone: true,
  imports: [CommonModule, UppercasePipe],
  template: ` <h1>{{ pageTitle | uppercase }}</h1>
    <div>
      <select
        class="select select-accent w-full max-w-xs"
        (change)="filterActiveCard($event)"
      >
        <option disabled selected>Select cards</option>
        <option value="tutte">Nessun filtro</option>
        <option value="active">Carte Attive</option>
      </select>
    </div>
    <div *ngFor="let card of card$ | async">
      <p>Numero carta: {{ card.cardNumber }}</p>
      <p>Stato: {{ card.statoCartaPrepagata }}</p>
    </div>`,
})
export default class PrepaidCardFiltersComponent implements OnInit {
  pageTitle = 'Gestione carte prepagate';
  prepaidCards: IPrepaidCard[] = [];
  filteredCards: IPrepaidCard[] = [];

  private cardSubject = new BehaviorSubject<IPrepaidCard[]>([]);
  card$ = this.cardSubject.asObservable();

  constructor(private prepaidCardService: PrepaidCardsService) {}

  ngOnInit(): void {
    this.prepaidCardService.loadPrepaidCards().subscribe((data) => {
      this.prepaidCards = Object.values(data.mappaCartePrepagate);
      this.cardSubject.next(this.prepaidCards);
    });
  }

  resetFilter() {
    this.cardSubject.next(this.prepaidCards);
  }

  filterActiveCard(event: any) {
    const value = event.target.value;
    if (value === 'active') {
      this.card$
        .pipe(
          filter((cards) =>
            cards.some((card) => card.statoCartaPrepagata === 'ATTIVA')
          ),
          map((cards) =>
            cards.filter((card) => card.statoCartaPrepagata === 'ATTIVA')
          )
        )
        .subscribe((filteredCards) => {
          this.filteredCards = filteredCards;
          this.cardSubject.next(this.filteredCards);
        });
    } else if (value === 'tutte') {
      this.resetFilter(); // Resetta il filtro e mostra tutte le carte
    }
  }
}
