import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfiloUtente } from '../model/user-profile.interface';
import { API_BASE_URL } from '../../../../../api-config';

@Injectable({
  providedIn: 'root',
})
export class UserProfileDataService {
  private USER_API = 'mocks/user-profile-response.json';

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  loadUserProfile(): Observable<IProfiloUtente> {
    const url = `${this.baseUrl}/${this.USER_API}`;
    return this.http.get<IProfiloUtente>(url);
  }
}
