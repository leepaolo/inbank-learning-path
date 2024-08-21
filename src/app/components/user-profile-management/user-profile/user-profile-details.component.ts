import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';

@Component({
  selector: 'lee-user-profile-details',
  standalone: true,
  imports: [CommonModule, UpperCasePipe, HighlightDirective],
  template: `
    <div>
      <br />
      <h2>{{ userDetails | uppercase }}</h2>
      <p>Nome: <input #nameInput [value]="name" leeHighlight /></p>
      <p>Email: <input #emailInput [value]="email" leeHighlight /></p>
      <p>
        Codice Fiscale: <input #codiceFiscaleInput [value]="codiceFiscale" />
      </p>
      <button class="btn btn-secondary" (click)="saveDetails()">
        Salva Dettagli
      </button>
    </div>
  `,
})
export default class UserProfileDetailsComponent {
  userDetails = 'Dettagli utente';

  @Input() name: string = '';
  @Input() email: string = '';
  @Input() codiceFiscale: string = '';

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('codiceFiscaleInput')
  codiceFiscaleInput!: ElementRef<HTMLInputElement>;

  saveDetails() {
    console.log('Nome:', this.nameInput.nativeElement.value);
    console.log('Email:', this.emailInput.nativeElement.value);
    console.log('Codice fiscale', this.codiceFiscaleInput.nativeElement.value);
  }
}
