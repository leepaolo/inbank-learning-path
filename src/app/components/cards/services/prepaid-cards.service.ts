import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../../../api-config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  IPrepaidCard,
  IPrepaidCardsResponse,
} from '../model/prepaid-card.interface';

@Injectable({
  providedIn: 'root',
})
export class PrepaidCardsService {
  private USER_API = 'mocks/prepaid-cards.json';

  private cardSubject = new BehaviorSubject<IPrepaidCard[]>([]);
  card$ = this.cardSubject.asObservable();

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  loadPrepaidCards(): Observable<IPrepaidCardsResponse> {
    return this.http.get<IPrepaidCardsResponse>(
      `${this.baseUrl}/${this.USER_API}`
    );
  }
}
