import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { CartellaClinica } from "../models/cartellaClinica";
import { Diario } from "../models/diario";
import { Paziente } from "../models/paziente";

@Injectable({
  providedIn: "root",
})
export class PazienteService {

  api: string = environment.api;

  constructor(private http: HttpClient) {}

  getPazienti(): Promise<Paziente[]> {
    return this.http.get<Paziente[]>(this.api + "/api/pazienti").toPromise();
  }
}
