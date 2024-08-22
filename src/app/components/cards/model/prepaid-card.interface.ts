export interface IPrepaidCard {
  idCard: string;
  abi: string;
  abilitataDisposizioniWeb: boolean;
  circuito: string;
  saldoDisponibile: {
    importo: number;
    divisa: string;
  };
  statoCartaPrepagata: string;
  tipo: string;
}

export interface IPrepaidCardsResponse {
  abilitazione3DSecure: boolean;
  esito: number;
  mappaCartePrepagate: {
    [key: string]: IPrepaidCard;
  };
  utenteSecondario: boolean;
}
