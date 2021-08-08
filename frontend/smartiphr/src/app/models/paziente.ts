export class Paziente {
  cognome: string;
  nome: string;
  sesso: string;
  luogoNascita: string;
  dataNascita: Date;
  residenza: string;
  statoCivile: string;
  figli: number;
  scolarita: string;
  situazioneLavorativa: string;
  personeRiferimento: string;
  telefono: string;
  dataIngresso: Date;
  provincia: string;
  localita: string;
  provenienza?: string;

  schedaPisico?: {
    esame?: {
      statoEmotivo: string[];
      personalita: string[];
      linguaggio: string[];
      memoria: string[];
      orientamento: string[];
      abilitaPercettivo: string[];
      abilitaEsecutive: string[];
      ideazione: string[];
      umore: string[];

      partecipazioni: string;
      ansia: string;
      testEsecutivi: string;
    },
    valutazione: string;
    diario: {
      data: Date;
      valore: string;
      firma: string;
    } []
  };
}
