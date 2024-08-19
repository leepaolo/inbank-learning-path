import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfileDataService } from '../services/user-profile-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'lee-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-2xl">User profile</h1>

    @if(profiloUtente){
    <h2>{{ profiloUtente.nome }} {{ profiloUtente.cognome }}</h2>
    <p>Email: {{ profiloUtente.email }}</p>
    <p>Telefono: {{ profiloUtente.telefono }}</p>
    }
  `,
})
export default class UserProfileComponent implements OnInit {
  profiloUtente: any;
  constructor(private userProfileDataService: UserProfileDataService) {}

  ngOnInit(): void {
    this.userProfileDataService.loadUserProfile().subscribe({
      next: (data: any) => {
        this.profiloUtente = data.profiloUtente;
        console.log('Profilo utente caricato con successo', this.profiloUtente);
      },
      error: (error: any) => {
        console.error('Errore nel caricamento del profilo utente', error);
      },
    });
  }
}
