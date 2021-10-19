import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Fatture } from '../models/fatture';

@Injectable({
  providedIn: "root",
})
export class FattureService {
  api: string = environment.api;

  constructor(private http: HttpClient) {}

  getFattureAll(): Observable<Fatture[]> {
    return this.http.get<Fatture[]>(`${this.api}/api/fatture`);
  }

  async getFatture(id: string): Promise<Fatture[]> {
    return this.http
      .get<Fatture[]>(`${this.api}/api/fatture/${id}`)
      .toPromise();
  }

  async insertFattura(fattura: Fatture, id: string) {
    console.log("Insert fattura: ", fattura);
    var body = fattura;
    return this.http.post(`${this.api}/api/fatture/${id}`, body).toPromise();
  }

  async updateFattura(fattura: Fatture) {
    var body = fattura;
    console.log("body: ", body);
    return this.http.put(this.api + "/api/fatture/" + fattura._id, body).toPromise();
  }

  async remove(fattura: Fatture) {
    return this.http.delete(`${this.api}/api/fatture/${fattura._id}`).toPromise();
  }

  delete(fattura: Fatture): Observable<Fatture> {
    return this.http.delete<Fatture>(this.api + "/api/curriculum/" + fattura._id);
  }

}
