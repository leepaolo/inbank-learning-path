import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../../../api-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPrepaidCard } from '../model/prepaid-card.interface';

@Injectable({
  providedIn: 'root',
})
export class PrepaidCardsService {
  private USER_API = 'mocks/prepaid-cards.json';

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  loadPrepaidCards(): Observable<IPrepaidCard> {
    const url = ` ${this.baseUrl}/${this.USER_API}`;
    return this.http.get<IPrepaidCard>(url);
  }
}
