import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { NotaCredito } from '../models/notacredito';
import { Paziente } from '../models/paziente';

@Injectable({
  providedIn: "root",
})
export class NotaCreditoService {
  api: string = environment.api;

  constructor(private http: HttpClient) {}

  getNoteCreditoAll(): Observable<NotaCredito[]> {
    return this.http.get<NotaCredito[]>(`${this.api}/api/notecredito`);
  }

  async getNotaCredito(id: string): Promise<NotaCredito[]> {
    return this.http
      .get<NotaCredito[]>(`${this.api}/api/notacredito/${id}`)
      .toPromise();
  }

  async insertNotaCredito(notacredito: NotaCredito, id: string) {
    var body = notacredito;
    return this.http.post(`${this.api}/api/notacredito/${id}`, body).toPromise();
  }

  async updateNotaCredito(notacredito: NotaCredito) {
    var body = notacredito;
    console.log("body: ", body);
    return this.http.put(this.api + "/api/notacredito/" + notacredito._id, body).toPromise();
  }

  async remove(notacredito: NotaCredito) {
    return this.http.delete(`${this.api}/api/notacredito/${notacredito._id}`).toPromise();
  }

}
