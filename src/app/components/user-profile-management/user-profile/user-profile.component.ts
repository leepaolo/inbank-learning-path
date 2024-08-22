import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserProfileDataService } from '../services/user-profile-data.service';
import {
  IMessage,
  IProfiloUtente,
  IUserProfileResponse,
} from '../model/user-profile.interface';
import UserProfileDetailsComponent from './user-profile-details.component';

@Component({
  selector: 'lee-user-profile',
  standalone: true,
  imports: [CommonModule, UserProfileDetailsComponent],
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

    <!-- Mostra dettagli utente-->
    <lee-user-profile-details
      [name]="profiloUtente.nome"
      [email]="profiloUtente.email"
      [codiceFiscale]="profiloUtente.codiceFiscale"
    >
    </lee-user-profile-details>

    <div>
      <p *ngIf="extraContent">
        Contenuto Extra: {{ extraContent.nativeElement.textContent }}
      </p>
    </div>

    }
  `,
})
export default class UserProfileComponent implements OnInit {
  esito!: number;
  profiloUtente!: IProfiloUtente;
  messageList: IMessage[] | undefined;

  @ViewChild(UserProfileDetailsComponent)
  userDetailComponent!: UserProfileDetailsComponent;
  @ContentChild('customContent') extraContent!: ElementRef;

  constructor(private userProfileService: UserProfileDataService) {}

  ngOnInit(): void {
    this.userProfileService.loadUserProfile().subscribe({
      next: (data: IUserProfileResponse) => {
        const profiloTrovato = data.profiloUtente.find(
          (profilo: any) => profilo.id === '54321'
        );
        if (profiloTrovato) {
          this.profiloUtente = profiloTrovato;
          this.esito = data.esito;
          this.messageList = data.messageList;
          console.log(
            'Profilo utente caricato con successo',
            this.profiloUtente
          );
        } else {
          console.error('Profilo utente non trovato');
        }
      },
      error: (error: any) => {
        console.error('Errore nel caricamento del profilo utente', error);
      },
    });
  }
}
