export class Presidi {

    constructor() {
      this._id = "";
      this.rif_id = "";
      this.nome = "";
      this.descrizione = "";
      this.note = "";
      this.qty = 1;
      this.taglia   = "";

      this.operator = "";
      this.operatorName = "";
      this.paziente = "";
      this.pazienteName = "";
    }
  
    static clone(obj: Presidi) {
      return JSON.parse(JSON.stringify(obj));
    }
      _id?: string;
      rif_id:string;
      nome: string;
      descrizione: string;
      note: string;
      taglia: string;
      qty: number;
      giacenza?: number;

      operator: string;
      operatorName: string;
      paziente: string;
      pazienteName: string;
  }
  