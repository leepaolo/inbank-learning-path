import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfileDataService } from '../services/user-profile-data.service';
import {
  IMessage,
  IProfiloUtente,
  IUserProfileResponse,
} from '../model/user-profile.interface';

@Component({
  selector: 'lee-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(profiloUtente) {
    <h1 class="text-2xl">Ciao {{ profiloUtente.nome }}</h1>
    <p>Nome: {{ profiloUtente.nome }}</p>
    <p>Cognome: {{ profiloUtente.cognome }}</p>
    <p>Email: {{ profiloUtente.email }}</p>
    <p>Telefono: {{ profiloUtente.telefono }}</p>
    <ng-template [ngIf]="esito === 1">
      <div *ngFor="let message of messageList">
        <p class="text-green-500">{{ message.text }}</p>
      </div>
    </ng-template>

    <ng-template [ngIf]="esito !== 1">
      <div *ngFor="let message of messageList">
        <p class="text-red-500">Errore: {{ message.text }}</p>
      </div>
    </ng-template>
    <ng-content></ng-content>
    }
  `,
})
export default class UserProfileComponent implements OnInit {
  esito!: number;
  profiloUtente!: IProfiloUtente;
  messageList: IMessage[] | undefined;

  constructor(private userProfileDataService: UserProfileDataService) {}

  ngOnInit(): void {
    this.userProfileDataService.loadUserProfile().subscribe({
      next: (data: IUserProfileResponse) => {
        this.profiloUtente = data.profiloUtente;
        this.esito = data.esito;
        this.messageList = data.messageList;
        console.log('Profilo utente caricato con successo', this.profiloUtente);
      },
      error: (error: any) => {
        console.error('Errore nel caricamento del profilo utente', error);
      },
    });
  }
}
