// Interface per l'indirizzo
export interface IIndirizzo {
  via: string;
  città: string;
  CAP: string;
  paese: string;
}

// Interface per il profilo utente
export interface IProfiloUtente {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  indirizzo: IIndirizzo;
  dataNascita: string;
  codiceFiscale: string;
}

// Interface per gli elementi della lista di messaggi
export interface IMessage {
  code: number;
  extraInfo: Record<string, any>; // Può essere esteso se necessario
  fieldList: string[];
  severity: number;
  text: string;
}

// Interface per la risposta complessiva
export interface IUserProfileResponse {
  esito: number;
  profiloUtente: IProfiloUtente;
  messageList: IMessage[];
}
